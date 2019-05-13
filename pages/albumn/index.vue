<template>
    <div>

        <div id="certify">
            <div class="swiper-container">
                <div class="swiper-wrapper">
                    <div class="swiper-slide">
                        <nuxt-link :to="{name: 'albumn-detail',params:{ id: 1 }}">
                            <img src="@/assets/images/albumn/1.jpg" />
                            <em><p>非常难得又值钱的认证证书</p></em>
                        </nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link :to="{name: 'albumn-detail',params:{ id: 2 }}">
                            <img src="@/assets/images/albumn/2.jpg" />
                            <em><p>深圳市优秀互联网企业认定证书</p></em>
                        </nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link  :to="{name: 'albumn-detail',params:{ id: 2 }}">
                            <img src="@/assets/images/albumn/3.jpg" />
                            <em><p>质量管理体系认证荣誉证书</p></em>
                        </nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link  :to="{name: 'albumn-detail',params:{ id: 2 }}">
                            <img src="@/assets/images/albumn/4.jpg" />
                            <em><p>计算机软件著作权登记证书</p></em>
                        </nuxt-link>
                    </div>
                    <div class="swiper-slide">
                        <nuxt-link :to="{name: 'albumn-detail',params:{ id: 2 }}">
                            <img src="@/assets/images/albumn/5.jpg" />
                            <em><p>增值电信业务经营许可证</p></em>
                        </nuxt-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
    @import '~/assets/styles/plugins/swiper.css';
    /* @import '~/assets/styles/common/quill.snow.css'; */
</style>

<style lang="less" scoped>
    #certify{
        background-image: linear-gradient(to bottom right , #7A88FF, #7AFFAF);
        background-repeat: no-repeat;
        position: fixed;
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        .video{
            position: relative;
            video{
                width: 100%;
            }
            >div{
                color: #ffffff;
                position: absolute;
                left: 0;
                top: 0;
                height: 100%;
                width: 100%;
                display: flex;
                justify-content: center;
                align-items: center;
                flex-flow: column wrap;
            }
        }
        .swiper-slide{
            height: auto;
            img{
                width: 100%;
            }
            em{
                font-weight: bold;
                letter-spacing: 2px;
            }
        }
    }
</style>




<script>
import 'swiper/dist/css/swiper.css';
import Swiper from 'swiper';
export default {
    components:{
    },
    computed:{
    },
    data:function () {
        return{

        }
    },
    methods:{
    },
    mounted:function () {
        new Swiper('#certify .swiper-container', {
            watchSlidesProgress: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: true,
            loopedSlides: 5,
            // autoplay: true,
            navigation: {
                // nextEl: '.swiper-button-next',
                // prevEl: '.swiper-button-prev',
            },
            pagination: {
                // el: '.swiper-pagination',
            },
            on: {
                progress: function(progress) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i);
                        var slideProgress = this.slides[i].progress;
                        var modify = 1;
                        if (Math.abs(slideProgress) > 1) {
                            modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                        }
                        var translate = slideProgress * modify * 260 + 'px',
                        scale = 1 - Math.abs(slideProgress) / 5,
                        zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                        slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                        slide.css('zIndex', zIndex);
                        slide.css('opacity', 1);
                        if (Math.abs(slideProgress) > 3) {
                            slide.css('opacity', 0);
                        }
                    }
                },
                setTransition: function(transition) {
                    for (var i = 0; i < this.slides.length; i++) {
                        var slide = this.slides.eq(i)
                        slide.transition(transition);
                    }

                },
            }

        })


        // new Swiper ('.swiper-container', {
        //     loop: true,
        //     // 如果需要分页器
        //     pagination: '.swiper-pagination',
        //     // 如果需要前进后退按钮
        //     nextButton: '.swiper-button-next',
        //     prevButton: '.swiper-button-prev',
        //     // 如果需要滚动条
        //     scrollbar: '.swiper-scrollbar',
        // })
    }
}
</script>

