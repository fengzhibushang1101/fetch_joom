/**
 * Created by jyq on 2017/12/25.
 */
const Base = require('./base');

const tableName = 'joom_data';

/**
 * @class
 * joom_data 表
 */
class JoomData extends Base {
    constructor(data) {
        super(data);
        this.pro_no = data.pro_no;
        this.pro_name = data.pro_name;
        this.cate_id = data.cate_id;
    }

    static create(data) {
        const newData = new this(data);
        const addSql = `INSERT INTO ${tableName}(create_date, modified_date, pro_no, pro_name, cate_id)
         VALUES ('${newData.create_date}', '${newData.modified_date}', '${newData.pro_no}', "${encodeURIComponent(newData.pro_name)}",
         '${newData.cate_id}')`;
        return this.exec(addSql);
    }
    static createMany(datas) {
        const newDatas = datas.map(item => new this(item));
        const insertStr = newDatas.map(newData => `('${newData.create_date}', '${newData.modified_date}', '${newData.pro_no}', "${encodeURIComponent(newData.pro_name)}",'${newData.cate_id}')`).join(',');
        const addSql = `INSERT INTO ${tableName}(create_date, modified_date, pro_no, pro_name, cate_id) VALUES ${insertStr}`;
        return this.exec(addSql);
    }
    static findByNo(proNo) {
        const querySql = `select * from ${tableName} where pro_no = '${proNo}' limit 1`;
        return this.exec(querySql).then(data => (data.rows.length ? new this(data.rows[0]) : false));
    }
}

module.exports = JoomData;

