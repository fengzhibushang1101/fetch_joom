/**
 * Created by jyq on 2017/12/21.
 */
import Vue from 'vue';
import './../../less/joom.less';
import './../../less/joom1.css';
import counter from './components/test.vue';
import axios from '../../../server/utils/requests';

/* eslint-disable no-new */
console.log('loading in112311231231231212333dex2');
new Vue({
    el: '#app',
    components: {
        counter
    },
    created() {
        axios.post('/api/get/joom/cate', {
            pId: 0
        }).then(() => {
        });
    }
});
