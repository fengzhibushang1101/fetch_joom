/**
 * Created by jyq on 2017/10/27.
 */

const axios = require('axios');

axios.interceptors.response.use(res => Promise.resolve(res.data), err => Promise.reject(err));
const requests = {};
/**
 * post 方法
 * @param {String} url
 * @param {Object} data
 */
requests.post = (url, data = {}) => axios({
    url,
    method: 'post',
    params: data
});

requests.put = (url, data = {}) => axios({
    url,
    method: 'put',
    params: data
});
/**
 * get 方法
 * @param {String} url
 * @param {Object} data
 */
requests.get = (url, data = {}, config = {}) => {
    let str = Object.keys(data).map(key => `${key}=${encodeURIComponent(data[key])}`).join('&');
    if (str && !url.includes('?')) {
        str = `?${str}`;
    }
    return axios.get(`${url}${str}`, config);
};
module.exports = requests;
