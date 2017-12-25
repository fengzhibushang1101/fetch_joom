/**
 * Created by jyq on 2017/12/25.
 */

const JoomCate = require('../server/model/joom_cate');
const JoomData = require('../server/model/joom_data');
const axios = require('axios');

const authorization = 'Bearer SEV0001MTUxMjcyMTY3OHxqaE8zMDZSMzNzR2FnQUQ4ZmxXT' +
    'EFza0hhQ3RxbjloN19yLW9vOUc3TUVGZ1A4aHFOUl9zc184dVl1RnFVX3ducn' +
    'VRMUlocy0xNnd0ZDZCb0Y4QU1aYjc1dDZhemltcn' +
    'psdi11dk9tMGkwV1BqSk5GZlFuNEdncHlqSDRSX0E4ZVZVeVlHTFhCYmIxQW1xbnFrQT09fLC19xnbmkYBjxaLkpDc44xmEmwh17ZuPGluGOv8YcO0';

const AllCate = 1945;
let endCate = 0;
let AllProNo = 0;
let enProNo = 0;

let insertArr = [];

function getDataByUrl(url, no, time = 1) {
    axios.get(url, {
        headers: { authorization }
    }).then((res) => {
        const data = res.data.payload;
        const [pro_name, cate_id, pro_no] = [data.name, data.categoryId || '0', no];
        insertArr.push({ pro_name, cate_id, pro_no });
        if (insertArr.length === 100) {
            JoomData.createMany(insertArr).then(() => {
                enProNo += 1000;
                console.log(`产品总数量为${AllProNo}, 存储完成的产品数量为${enProNo}`);
            }).catch((err) => {
                console.log(`创建产品失败, 失败信息为${JSON.stringify(insertArr)}`);
                console.log(err);
            });
            insertArr = [];
        }
    }).catch((err) => {
        if (time === 3) {
            console.log(`获取产品${no}失败`);
            console.log(err);
        } else {
            setTimeout(() => {
                getDataByUrl(url, no, time + 1);
            }, Math.random() * 3000);
        }
    });
}

function getItemData(item) {
    const no = item.id;
    const url = `https://api.joom.com/1.1/products/${no}?language=en-US&currency=USD`;
    JoomData.findByNo(no).then((data) => {
        if (!data) {
            AllProNo += 1;
            console.log(`产品总数量为${AllProNo}, 即将抓取产品${no}`);
            getDataByUrl(url, no);
        }
    });
}

function getCateData(cate, off = 0) {
    if (cate.is_leaf) {
        const url = 'https://api.joom.com/1.1/search/products?language=en-US&currency=USD';
        const condata = {
            count: 50,
            pageToken: `off:${off}`,
            filters: [{
                id: 'categoryId',
                value: {
                    type: 'categories',
                    items: [{
                        id: cate.tag
                    }]
                }
            }]
        };
        console.log(`正在抓取${cate.tag}分类下第${off}个产品`);
        getCateDataByUrl(url, condata, off, cate);
    }
}

function getCateDataByUrl(url, condata, off, cate, time=1) {
    axios.post(url, condata, {
        headers: { authorization }
    }).then((res) => {
        const { data } = res;
        const { items } = data.payload;
        if (items.length === 0) {
            endCate += 1;
            console.log(`分类总数为${AllCate}, 采集完成的分类为${endCate}个`)
        } else {
            setTimeout(() => {
                getCateData(cate, off + 50);
            }, 5000)
            items.forEach((item, i) => {
                setTimeout(() => {
                    getItemData(item);
                }, i * 1000);
            });
        }
    }).catch((err) => {
        if (time === 3) {
            console.log(`获取分类${cate.tag}第${off}个产品失败:`);
            console.log(err);
        } else {
            setTimeout(() => {
                getCateDataByUrl(url, condata, off, cate, time + 1);
            }, Math.random() * 3000);
        }
    });
}


JoomCate.findAll().then((data) => {
    let no = 0;
    if (data) {
        data.forEach((cate) => {
            if (cate.is_leaf) {
                setTimeout(function () {
                    getCateData(cate);
                }, no * 3000);
                no += 1;
            } else {
                endCate += 1;
            }
        });
    }
}).catch((err) => {
    console.log(err);
});

