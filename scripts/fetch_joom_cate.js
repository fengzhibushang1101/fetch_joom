/**
 * Created by jyq on 2017/12/21.
 */

const axios = require('../server/utils/requests');
const JoomCate = require('../server/model/joom_cate');

const authorization = 'Bearer SEV0001MTUxMjcyMTY3OHxqaE8zMDZSMzNzR2FnQUQ4ZmxXT' +
    'EFza0hhQ3RxbjloN19yLW9vOUc3TUVGZ1A4aHFOUl9zc184dVl1RnFVX3ducn' +
    'VRMUlocy0xNnd0ZDZCb0Y4QU1aYjc1dDZhemltcn' +
    'psdi11dk9tMGkwV1BqSk5GZlFuNEdncHlqSDRSX0E4ZVZVeVlHTFhCYmIxQW1xbnFrQT09fLC19xnbmkYBjxaLkpDc44xmEmwh17ZuPGluGOv8YcO0';
const url = 'https://api.joom.com/1.1/categoriesHierarchy';

const param = {
    levels: 1,
    parentLevels: 1,
    language: 'en-US',
    currency: 'USD'
};

let queryNum = 1; // 要请求的链接数量
let queriedNum = 0; //请求完成的链接数量
let cateNum = 0; //已经获取的分类数量
let storedNum = 0; //已经成功创建的分类数量

function getAllCate(pTag = 0, level = 1) {
    const params = Object.assign({}, param);
    if (pTag) {
        params.categoryId = pTag;
    }
    console.log(`正在采集${pTag}的记录`);
    axios.get(url, params, {
        headers: { authorization }
    }).then((data) => {
        queriedNum += 1;
        console.log(`要查询的分类数量为${queryNum}, 已查询的分类数量为${queriedNum}`);
        const nLevel = level + 1;
        data.payload.children.forEach((child) => {
            const tag = child.id;
            const name = child.name;
            const is_leaf = !child.hasPublicChildren;
            let pro = Promise.resolve(0);
            if (pTag) {
                pro = JoomCate.findByTag(pTag).then(res => (res ? res.id : false));
            }
            pro.then((pId) => {
                JoomCate.findByTag(tag).then((res) => {
                    let tpro = Promise.resolve();
                    if (!res) {
                        console.log(`正在创建${name}的记录`);
                        cateNum += 1;
                        console.log(`已获取分类数量为${cateNum}, 已存储的分类数量为${storedNum}`);
                        tpro = JoomCate.create({
                            tag,
                            name,
                            p_id: pId,
                            is_leaf,
                            level,
                            pin: '',
                            site_id: 0
                        }).then((cdata) => {
                            console.log('创建成功');
                            storedNum += 1;
                            console.log(`已获取分类数量为${cateNum}, 已存储的分类数量为${storedNum}`);
                            return cdata;
                        }).catch((err) => {
                            console.log('创建失败');
                            console.log(err);
                            return err;
                        });
                    }
                    if (!is_leaf) {
                        queryNum += 1;
                        console.log(`要查询的分类数量为${queryNum}, 已查询的分类数量为${queriedNum}`);
                        tpro.then(() => {
                            getAllCate(tag, nLevel);
                        });
                    }
                });
            });
        });
    });
}

getAllCate();

