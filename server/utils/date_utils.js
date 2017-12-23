/**
 * Created by jyq on 2017/11/15.
 */

Object.assign(Date.prototype, {
    /**
     * 对Date的扩展，将 Date 转化为指定格式的String 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
     * 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 例子： (new
     * Date()).Format('yyyy-MM-dd hh:mm:ss.S') ==> 2006-07-02 08:09:04.423 (new
     * Date()).Format('yyyy-M-d h:m:s.S') ==> 2006-7-2 8:9:4.18
     * @param {String} fmt 时间格式
     * @return {String}
     */
    format(fmt) {
        let fmtStr = fmt;
        const o = {
            'M+': this.getMonth() + 1, // 月份
            'd+': this.getDate(), // 日
            'h+': this.getHours(), // 小时
            'm+': this.getMinutes(), // 分
            's+': this.getSeconds(), // 秒
            'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
            S: this.getMilliseconds(), // 毫秒
            '0+': '0'
        };
        if (o === undefined) {
            return fmtStr;
        }
        if (/(y+)/.test(fmtStr)) {
            fmtStr = fmtStr.replace(RegExp.$1, (`${this.getFullYear()}`).substr(4 - RegExp.$1.length));
        }
        Object.keys(o).forEach((k) => {
            if (new RegExp(`(${k})`).test(fmtStr)) {
                fmtStr = fmtStr.replace(RegExp.$1, RegExp.$1.length === 1 ?
                    o[k] : `00${o[k]}`.substr(`${o[k]}`.length));
            }
        });
        return fmtStr;
    },
    /**
     * 日期计算
     * @param {String}  strInterval - 对哪个值操作, s秒 n分等
     * @param {Number} Number - 间隔时间,可为正负
     * @returns {Date}
     * @constructor
     */
    DateAdd(strInterval, Number) {
        const dtTmp = this;
        switch (strInterval) {
        case 's': return new Date(
            dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate(),
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds() + Number
        );
        case 'n': return new Date(
            dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate(),
            dtTmp.getHours(), dtTmp.getMinutes() + Number, dtTmp.getSeconds()
        );
        case 'h': return new Date(
            dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate(),
            dtTmp.getHours() + Number, dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        case 'd': return new Date(
            dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate() + Number,
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        case 'w': return new Date(
            dtTmp.getFullYear(), dtTmp.getMonth(), dtTmp.getDate() + (Number * 7),
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        case 'q': return new Date(
            dtTmp.getFullYear(), (dtTmp.getMonth()) + (Number * 3), dtTmp.getDate(),
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        case 'm': return new Date(
            dtTmp.getFullYear(), (dtTmp.getMonth()) + Number, dtTmp.getDate(),
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        case 'y': return new Date(
            (dtTmp.getFullYear() + Number), dtTmp.getMonth(), dtTmp.getDate(),
            dtTmp.getHours(), dtTmp.getMinutes(), dtTmp.getSeconds()
        );
        default:
            return new Date();
        }
    }
});
/**
 * 字符串转为日期类型
 * @param {String} DateStr [yyyy-MM-dd HH:mm:ss|yyyy/MM/dd HH:mm:ss]
 * @return {Date}
 */
function s2d(DateStr) {
    const dateStr = DateStr.replace(/-/g, '/');
    return new Date(dateStr);
}

/**
 * 判断data1 是否大于 data2
 * @param {Date} data1
 * @param {Date} data2
 * @return {Boolean}
 */
function dateCompare(data1, data2) {
    return data1.getTime() > data2.getTime();
}
module.exports = {
    s2d, dateCompare
};
