<template>
  <section class="container" id='defaultPage'>
    <!-- head Banner -->

    <div class="banner">
      <img src="@/assets/images/home/banner.jpg" alt="" class="">
      <p>LOG THE SECRET BETWEEN US</p>
    </div>

    <section class="classify">
      <div :data-type="item.type" class="classify_item" @mouseenter="showBrief" @mouseleave="hideBrief" v-for="(item,index) in classifyList.list" :key="index">
        <nuxt-link :to="'/'+item.type.toLowerCase()">
            <div style="position:relative;overflow:hidden;">
              <img src="@/assets/images/home/timg.jpg" alt="">
              <div class="brief" :class="item.type==classifyList.active?'active':''">
                <div>{{item.type}}</div>
                <div>{{item.brief}}</div>
              </div>
            </div>
        </nuxt-link>
      </div>
    </section>

  </section>
</template>

<style>
  @import '~/assets/styles/index.less';
</style>
<style lang="less" scoped>
  #defaultPage{
    .banner{
      position: relative;
      p{
        color: #fff;
        font-size: 20px;
        line-height: 20px;
        position: absolute;
        right: 80px;
        top: 50%;
        transform: translate3d(0,-50%, 1px);
      }
      img{
        width:100%;
      }
    }
    .classify{
      zoom: 1;
      overflow: hidden;
      background-color: rgba(red, green, blue, 0.2);
      padding: 30px 20px;
      .classify_item{
        float: left;
        width: 25%;
        padding: 10px;
        >div{
          position: relative;
          overflow: hidden;
        }
        .brief{
          font-size: 17px;
          line-height: 17px;
          &.active{
            transform: translate3d(0px,0,1px);
          }
          background-color: rgba(0,0,0,0.55);
          position: absolute;
          bottom: 0%;
          left: 0;
          width: 100%;
          height: 100%;
          transform: translate3d(0px,100%,1px);
          // transform: translate3d(0px,0,1px);
          transition: transform 500ms;
          color: #fff;
          padding: 0 20px;
          >div{
            &:nth-child(1){
              text-align: center;
              margin-top: 20%;
            }
            &:nth-child(2){
              text-indent: 1em;
              margin-top: 10px;
            }
          }
        }
        img{
          width: 100%;
          // height: 100%;
        }
      }
    }
  }
</style>


<script>
import {Square} from '@/components/common.js';
import { mapState,mapActions } from "vuex";

export default {
  data:function (params) {
    return {
      classifyList:{
        active: '',
        list:[
          {type: 'ALBUMN', brief:'HERE IS PICTURES WE TAKE TOGETHER'},
          {type: 'DIARY', brief:'HERE IS DIARY WE WRITE TOGETHER'},
        ]
      }
    }
  },
  computed:{
    ...mapState({
        token: state => state.token, // 第二种写法
    })
  },
  mounted:function(){
  },
  components:{
    Square,
  },
  methods:{
    showBrief:function (e) {
      this.classifyList.active = e.target.dataset['type'];
    },
    hideBrief:function (e) {
      this.classifyList.active = '';
    },
    ...mapActions([
      'setToken',
    ])
  }
}
</script>

