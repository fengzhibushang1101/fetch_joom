/**
 * Created by jyq on 2017/12/21.
 */

const settings = require('./settings');
const mysql = require('mysql');
require('../utils/date_utils');


const pool = mysql.createPool({
    connectionLimit: 20,
    host: settings.host,
    user: settings.user,
    password: settings.password,
    database: settings.db,
    port: settings.port
});

/**
 * @class
 * mysql基类
 */
class Base {
    constructor(data) {
        this.id = data.id;
        this.create_date = data.create_date || (new Date()).format('yyyy-MM-dd hh:mm:ss');
        this.modified_date = data.modified_date || (new Date()).format('yyyy-MM-dd hh:mm:ss');
    }
    static exec(sql) {
        return new Promise((resolve, reject) => {
            pool.getConnection((error, conn) => {
                if (error) {
                    reject(error);
                } else {
                    conn.query(sql, (err, rows, fields) => {
                        // 释放连接
                        conn.release();
                        // 传递Promise回调对象
                        if (err) {
                            reject(err);
                        } else {
                            resolve({ rows, fields });
                        }
                    });
                }
            });
        });
    }
}
module.exports = Base;