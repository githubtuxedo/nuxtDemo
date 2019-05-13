<template>
    <section class="container">
        <!-- <div>carts page {{test}} </div>
        <nuxt-link to="/carts/detail">关于</nuxt-link> -->
        <!-- <section class="grid">
            <div class="title">title</div>
            <div class="nav">nav</div>
            <div class="main">main</div>
            <div class="aside">aside</div>
            <div class="footer">footer</div>
        </section> -->
        <abbr title="Web Hypertext Application Technology Working Group">WHATWG</abbr>
        <mark>skldj</mark>
        <section class="grid">
            <div class="ii">
                <div>1 <sub>sdf</sub> <sup>sdf</sup></div>
                <div>1</div>
                <div>1</div>
            </div>
            <div class="ii">2</div>
            <div class="ii">3</div>
            <div class="ii">4</div>
            <div class="ii">4</div>
            <div class="ii">4</div>
        </section>

    </section>
</template>

<style>
.ii{

}
.layout-enter-active, .layout-leave-active {
  transition: opacity .5s
}
.layout-enter, .layout-leave-active {
  opacity: 0
}
.grid {
    display: grid;
    width: 100vw;
    height: 100vh;
    /* width: 100%;
    height: 100%; */
    /* grid-template-columns: minmax(1rem,80px) repeat(3,minmax(1rem,1fr)) minmax(1rem,80px);
    grid-template-rows: 80px 1fr 1fr 80px; */
    grid-template-columns: repeat(3,1fr);
    grid-template-rows: repeat(3,1fr);
    /* grid-template-areas: 'title title title title title'
                     'nav main main main aside'
                    'nav main main main aside'
                    'footer footer footer footer footer'; */
    font-size: 30px;
    text-align: center;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
    align-items: center;
}
.title {
    grid-column: span 5;
    /* grid-area: title; */
}
.nav {
    grid-column: span 1;
    /* grid-row: span 3; */
    /* grid-area: nav; */
    height: 30vh;
}
.main {
    grid-column: span 3;
    grid-row: span 3;
    /* grid-area: main; */
}
.aside {
    grid-column: span 1;
    grid-row: span 3;
    /* grid-area: aside; */
}
.footer {
    grid-column: span 5;
    grid-row: span 1;
    /* grid-area: footer; */
}
</style>

<script>
import {mapState} from 'vuex';
import Interface from '@/static/interface.js';

// import { async } from 'q';
export default {
    computed:{
        ...mapState({
            test: state => state.base.base.hhhh,
        })
    },
    methods:{

    },
    mounted:function () {
        // console.log(this);
        // return this.$axios.get('/CXF/rs/sys/payWay/pageList').then((res)=>{
        // return this.$axios.get('/CXF/rs/sys/cfg/status/usable/7/update').then((res)=>{
        //     console.log('fuck you :',res);
        // })
        return this.$axios.post('/CXF/rs/sys/common/actionlog/pageList',{
            beginCreateDate: "2018-10-27 00:00:00",
            endCreateDate: "2019-01-25 23:59:59",
            pageNum: 0,
            pageSize: 20,
            sortList: [],
        }).then((res)=>{
            // console.log('fuck you :',res);
        })
    },
    async asyncData (app) {
        // 这里data等同于上面的res.data
        // console.log('app:',app, this);
        // let data = await axios.get('/api/users')
        // let msg = await axios.get('/api/users')
        // return {
        //     users: data.data,
        //     msg: msg.data
        // }

    },
    fetch (app) {
        // return app.$axios.post('/CXF/rs/sys/common/actionlog/pageList',{
        //     beginCreateDate: "2018-10-27 00:00:00",
        //     endCreateDate: "2019-01-25 23:59:59",
        //     pageNum: 0,
        //     pageSize: 20,
        //     sortList: [],
        // }).then((res)=>{
        //     // console.log('fuck you :',res);
        // })

        // return axios.post('/CXF/rs/sys/msg/pageList',{
        //         flag: "N",
        //         messageType: "cloudShopRemind"
        // },{
        //     headers:{
        //         'Content-Type':'application/json; charset=UTF-8'
        //     }
        // }
        // )

        // return axios.get('http://music.163.com/#/search/m/?id=28193075&s=%E5%9C%A8%E4%BA%BA%E9%97%B4&type=1');
    },
    head(){
        return{
            meta:[
                {hid:'grid',name:'viewport',content:'width=device-width,initial-scale=1.0'}
            ]
        }
    },
    validate({ params, query }) {
        return true // 如果参数有效
        // return false // 参数无效，Nuxt.js 停止渲染当前页面并显示错误页面
    }
}
</script>


