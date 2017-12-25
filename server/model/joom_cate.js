/**
 * Created by jyq on 2017/12/21.
 */
const Base = require('./base');

const tableName = 'joom_cate';

/**
 * @class
 * joom_cate 表
 */
class JoomCate extends Base {
    constructor(data) {
        super(data);
        this.tag = data.tag;
        this.name = data.name;
        this.p_id = data.p_id;
        this.is_leaf = data.is_leaf;
        this.level = data.level;
        this.pin = data.pin || '';
        this.site_id = data.site_id;
    }

    static create(data) {
        const newData = new this(data);
        const addSql = `INSERT INTO ${tableName}(create_date, modified_date,tag,name,p_id, is_leaf, level, pin, site_id)
         VALUES ('${newData.create_date}','${newData.modified_date}','${newData.tag}','${newData.name.replace(/[']/g, "\\\'")}',
         ${newData.p_id},${newData.is_leaf}, ${newData.level},'${newData.pin}',${newData.site_id})`;
        return this.exec(addSql);
    }

    static findById(id) {
        const querySql = `select * from ${tableName} where id = ${id}`;
        return this.exec(querySql).then(data => (data.rows.length ? new this(data.rows[0]) : false));
        //     .then((data) => {
        //     let info = {};
        //     data.fields.forEach((fieled))
        // }).catch((err)=>{
        //     return Promise.reject(err);
        // });
    }

    static findByTag(tag) {
        const querysSql = `select * from ${tableName} where tag = '${tag}' limit 1`;
        return this.exec(querysSql).then(data => (data.rows.length ? new this(data.rows[0]) : false));
    }

    static findBypId(pId) {
        const querySql = `select * from ${tableName} where p_id = ${pId} `;
        return this.exec(querySql).then(data => (data.rows.length ? data.rows.map(row => new this(row)) : false));
    }

    static findAll() {
        const querySql = `select * from ${tableName}`;
        return this.exec(querySql).then(data => (data.rows.length ? data.rows.map(row => new this(row)) : false));
    }
}

module.exports = JoomCate;

