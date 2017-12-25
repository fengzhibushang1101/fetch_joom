/**
 * Created by jyq on 2017/12/23.
 */

const express = require('express');
const JoomCate = require('../model/joom_cate');

const router = express.Router();

/* GET home page. */
router.post('/get/joom/cate', (req, res) => {
    console.log(typeof req.query.pId);
    const pId = req.query.pId || 0;
    let mess;
    JoomCate.findBypId(pId).then((data) => {
        if (!data) {
            mess = { status: 0, message: '无数据' };
        } else {
            const cates = data.map(jc => ({ name: jc.name, tag: jc.tag, id: jc.id }));
            mess = { status: 1, cates };
        }
        res.send(mess);
    }).catch((err) => {
        console.log(err);
        res.send({ status: 0, message: '查找失败' });
    });
});

module.exports = router;
