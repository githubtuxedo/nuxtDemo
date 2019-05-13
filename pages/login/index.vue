<template>
    <div class="main">
    <div>
        <p>-{{qq}}--"{{num}}"</p>
        <q>
            这是一级引用
            <q>这是二级引用</q>
        </q>
        <div :class="1<2<3?'aaa':''">test</div>
        <form class="login_section" style="display:none">
            <div class="login_title">登陆</div>
            <div>
                <div class="form_row clearfix">
                    <label for="">用户名</label> <input type="text" placeholder="用户名"/>
                </div>
                <div class="form_row clearfix">
                    <label for="">密码</label> <input type="text" placeholder="密码"/>
                </div>
                <div class="login_btn" @click="login">登陆</div>
            </div>
            <div class="login_bottom">
                <span>注册</span>
                <span>忘记密码?</span>
            </div>
        </form>
        <div class="circle">
            <div class="inner">hello</div>
        </div>
        <button @click="testFn" style="width:100px;height:80px;">click me</button>
        <transition-group name='slide-fade'>
            <div class="flex" :key="key" v-if="show">
                <div>{{msg.info1}}</div>
                <div>{{msg.info2}}</div>
                <div>{{msg.info3}}</div>
                <div>{{msg.info4}}</div>
            </div>
        </transition-group>
        a little sleepy you know that u stupid monkey.        hey lxx. u do know that i have a crush on you right

        <div ref="drag" class="drag-cover" @dragstart="dragstart"  @dragover="dragover" @drop="drop" @dragend='dragend'>
            <div class="scroll" ref='scroll'>
                <div draggable="true" v-for="(item, index) in counts" :key="index" :data-index="index">
                    <div class="detail"><span></span>{{item}}</div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<style>
#__nuxt, #__layout, #__layout>div, .main{
    height: 100%;
}
</style>


<style lang="less" scoped>
.drag-cover {
    -webkit-user-select:none;
    -moz-user-select:none;
    -ms-user-select:none;
    user-select:none;
    width: 60%;
    margin: 0 auto;
    transition: all 0.2s;
    overflow: scroll;
    max-height: 500px;
    .scroll {
        &:after, &:before {
            clear: both;
            content: ' ';
            display: block;
            height: 0;
            visibility: hidden;
        }
        >div {
            width: 25%;
            float: left;
            text-align: center;
            transition: all 0.2s;
            .detail {
                margin: 5px;
                background-color: rgba(0,0,0,0.2);
                border: 1px solid black;
            }
        }
    }
}
.main {
    overflow-y: scroll;
}
.main>div{
    height: 200%;
}
.slide-fade-enter-active {
  transition: all .8s ease;
}
.slide-fade-leave-active {
//   transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}
.flex{
    display: flex;
    >div{
        float: left;
        width: 25%;
    }
}
q {
quotes: '«' '»' "‹" "›";
}
.circle{
    border-radius: 50%;
    background-color: pink;
    width: 100px;
    height: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.5s ease-in-out;
    &:hover{
        .inner{
            transform: rotateX(180deg);
            transform-origin: 50% 100%;
        }
    }
    .inner{
        width: 80%;
        height: 80%;
        border-radius: 50%;
        text-align: center;
        color: green;
        background-color: #eee;
        transition: all 0.5s ease-in-out;
            transform-origin: 50% 100%;
    }
}
    .login_section{
        position: absolute;
        min-width: 300px;
        padding: 0 20px 40px;
        top: 40%;
        right: 10%;
        transform: translate3d(0,-50%,1px);
        border: 1px solid #d9d9d9;
        border-radius: 4px;
        .login_title{
            text-align: center;
            font-size: 1.2em;
            font-weight: bold;
            letter-spacing: 2px;
            margin: 0 -20px;
            padding: 10px 0;
            border-bottom: 1px solid #d9d9d9;
        }
        .form_row{
            &:nth-child(1){
                margin-top: 20px;
            }
            position: relative;
            padding: 10px 8px;
            line-height: 40px;
            label{
                float: left;
                min-width: 60px;
                font-size: 1.1em;
            }
            input{
                height: 40px;
                border: 1px solid #d9d9d9;
                border-radius: 4px;
                padding: 0 10px;
                width: calc(100% - 60px);
                vertical-align: middle;
            }
        }
        .login_btn{
            background-color: cadetblue;
            text-align: center;
            margin: 10px 10px;
            border-radius: 4px;
            color: #fff;
            font-size: 1.1em;
            line-height: 2.2em;
        }
        .login_bottom{
            display: flex;
            align-items: center;
            padding: 0 10px;
            justify-content: space-between;
        }
    }
</style>
<script>
import { mapState, mapActions } from 'vuex';
// import * as $axios  from '~/plugins/axios'
import $axios  from '~/plugins/axios'

export default {
    data:function (params) {
        return{
            counts: [1,2,3,4,5,6,7,8],
            show:true,
            key:0,
            msg:{
                info1:0,
                info2:0,
                info3:0,
                info4:0,
            },
            containInfo: {//容器信息
                $dom : null,//容器dom
                originPoint: [-1, -1],//左上角顶点位置  暂时用不上
                len: 0,//容器长度
                height: 0,//容器高度
                perLen: 0,//每个item的宽度
                perHeight: 0,//每个item的宽度
                perLineCount: 4,//每行个数
                perHeightCount: 2,//行数
                dragDom: null,//拖动元素dom
            },
        }
    },
    computed: {
        claz:function (params) {
            console.log(params);
          return 'hhh'
        },
        qq:function (params) {
            return 'not qq';
        },
        ...mapState({
            // count: 'count', // 第一种写法
            num: state => state.base.num, // 第二种写法
        })
    },
    created: function () {
        let arr = [];
        for(let i = 0; i < 1000; i ++){
            arr.push(i);
        }
        this.counts = arr;
    },
    updated: function () {
    },
    mounted:function (params) {
        this.containInfo.perHeightCount = 1000 / this.containInfo.perLineCount;
        document.querySelector(".main").addEventListener('scroll', this.throttle(this.throttleHandler,300));
        // console.log(this);
        let $dom = this.$refs['drag'],
            totalLen = getComputedStyle($dom).width.split('px')[0],
            totalHeight = getComputedStyle($dom).height.split('px')[0];
        this.containInfo.$dom = $dom;
        this.containInfo.perLen = totalLen / this.containInfo.perLineCount;
        this.containInfo.perHeight = parseInt(getComputedStyle(this.$refs['scroll']).height.split('px')[0],10) / this.containInfo.perHeightCount;
        this.containInfo.len = totalLen;
        this.containInfo.height = totalHeight;
        console.log(this.containInfo);
    },
    methods:{
        dragend: function(e) {
            // /**拿到容器左上角顶点信息 */
            let rect = this.containInfo.$dom.getBoundingClientRect(),
                //中心位置
                center = {
                    left: rect.left + (rect.right - rect.left) / 2,
                    top: rect.top + (rect.bottom - rect.top) / 2
                },
                scrollLeft = document.body.scrollLeft || document.documentElement.scrollLeft,
                scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
            //最终的 左 和 上位置
            center.left = screenLeft + center.left;
            center.top = scrollTop + center.top;
            //内部滚动距离
            let innerY = this.containInfo.$dom.scrollTop;
            let x = e.pageX,
                y = e.pageY,
                originStartX = center.left - this.containInfo.len / 2,
                originStartY = center.top - this.containInfo.height / 2,
                originEndX = originStartX + parseInt(this.containInfo.len, 10),
                originEndY = originStartY + parseInt(this.containInfo.height, 10),
                perWidth = this.containInfo.perLen,
                perHeight = this.containInfo.perHeight;
            if(originStartX < x && x < originEndX && originStartY < y && y < originEndY) {
                let xGap = x - originStartX,
                    // yGap = y - (originStartY + (!!innerY ? innerY : 0)),
                    yGap = y + (!!innerY ? innerY : 0) - originStartY,
                    whichRow = Math.ceil(xGap / perWidth),
                    whichCol = Math.ceil(yGap / perHeight),

                    newIndex = (whichCol - 1)  * this.containInfo.perLineCount + whichRow;
                // console.log(this.containInfo, newIndex, 'col:',whichCol, 'row:',whichRow, 'newIndex:', newIndex);
                let tarNode = e.target;
                if(!!tarNode.parentNode) {
                    let $insertBefore = tarNode.parentNode.children[newIndex - 1];
                    tarNode.parentNode.insertBefore(this.dragDom, $insertBefore);
                    tarNode.parentNode.removeChild(tarNode);
                }

            }
        },
        drop: function(e) {
            console.error(e);
        },
        dragstart: function(e) {
            this.dragDom = e.target.cloneNode(true);
        },
        dragover: function(e) {
            e.dataTransfer.dropEffect = 'move';
            // console.log('over: ',e)
        },
        /**
         * 节流函数 throttle
         */
        throttleHandler: function() {
            // console.log('work',arguments);
        },
        throttle: function(fn, delay) {
            let timer = null,
                last = 0;
            return function() {
                let now = +new Date(),
                    content = this,
                    args = arguments;
                if(now - last < delay){
                    clearTimeout(timer);
                    timer = setTimeout(function() {
                        fn.apply(content, args);
                    }, delay);
                } else {
                    last = now;
                    fn.apply(content, args);
                }
            }
        },
        testFn:function (params) {
            this.key++;
            this.msg = {
                info1: this.key,
                info3: this.key,
                info2: this.key,
                info4: this.key,
            }
            // this.show = !this.show;
            console.log(arguments,this.key);
        },
        login:function () {
            this.$store.commit('base/decrement');
            // this.$store.dispatch('base/decrement',{aa:'aa',bb:'bb'});
            // this.$store.$router.replace(!!this.$route.query.redirect?this.$route.query.redirect:'/');

            $axios.post('/CXF/rs/sys/common/actionlog/pageList',{
                beginCreateDate: "2018-01-27 00:00:00",
                endCreateDate: "2019-03-11 23:59:59",
                pageNum: 0,
                pageSize: 20,
                sortList: [],
            }).then((res)=>{
                this.setToken('new token');
                console.log('fuck you :',res);
            })
        },
        ...mapActions([
            'setToken',
        ]),

    }
}
</script>

