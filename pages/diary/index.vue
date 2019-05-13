<template>
    <div id="diaryPage">
        <!-- 背景音乐 -->
        <audio src="someaudio.wav" autoplay loop>
            您的浏览器不支持 audio 标签。
        </audio>

        <!-- 欢迎提示 -->
        <section class="face" :class="finalTxt===brief?'hide':''">
            <h4><em>{{title}}</em></h4>
            <h6><b>{{finalTxt}}</b> </h6>
        </section>


        <!-- 显示页 -->
        <section :style="{
                display:finalTxt===brief?'inherit':'none'
            }">
            <!-- 头部banner -->
            <div class="top-banner">
                <figure>
                    <img src="@/assets/images/diary/banner.jpg" alt="">
                </figure>
                <div>
                    <div class="right-info">
                        <h5><em>访问量:<span>10000</span></em></h5>
                        <h5><em>日志:<span>10000</span></em></h5>
                    </div>
                </div>
            </div>
            <section>
                <div>写日志</div>
                <div>写日志</div>

                <div class="clearfix">
                    <div style="float:left;">sldfjsldfjsldfjsldfj</div>
                    <div style="margin-left:100px;">sldfjkl</div>
                </div>

                <section class="container">
                    <div class="quill-editor"
                        :content="content"
                        @change="onEditorChange($event)"
                        @blur="onEditorBlur($event)"
                        @focus="onEditorFocus($event)"
                        @ready="onEditorReady($event)"
                        v-quill:myQuillEditor="editorOption">
                    </div>
                </section>


            </section>
        </section>
    </div>
</template>

<style>
    @import '~/assets/styles/common/quill.snow.css';
</style>
<style lang="less" scoped>
    #diaryPage{
        .face{
            position: absolute;
            width: 100%;
            height: 100%;
            color: #ffffff;
            background-color: #7E7E7E;
            font-size: 30px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            opacity: 1;
            transition: opacity 1000ms;
            z-index: 99999;
            &.hide{
                opacity: 0;
                pointer-events: none;
            }
        }
        .top-banner{
            position: relative;
            figure img{
                width: 100%;
            }
            figure+div{
                position: absolute;
                top: 50%;
                left: 0;
                width: 100%;
                transform: translate3d(0,-50%,1px);
                .right-info{
                    float: right;
                    transform: translate3d(-100%,0,1px);
                    h5{
                        color: #ffffff;
                        font-size: 17px;
                        line-height: 34px;
                        letter-spacing: 2px;
                        text-align: right;
                    }
                }
            }
        }
        .container {
            width: 60%;
            margin: 0 auto;
            padding: 50px 0;
            .quill-editor {
                min-height: 200px;
                max-height: 400px;
                overflow-y: auto;
            }
        }
    }
</style>



<script>
export default {
    components:{
    },
    computed:{
        finalTxt:function () {
            return this.curTxt.join("");
        }
    },
    data:function () {
        const self = this
        return{
            // 欢迎打字数据
            title: 'welcome everyone, my name is Castiel',
            brief: '这里记录着和你的点点滴滴，续写着我们的过去和不久的将来...',
            curTxt: ['这','里','记','录','着'],
            printSpeed: 200,

            content: '<p>I am Example</p>',
            editorOption: {
            // some quill options
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                    ['blockquote', 'code-block'],

                    [{'header': 1}, {'header': 2}],               // custom button values
                    [{'list': 'ordered'}, {'list': 'bullet'}],
                    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
                    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
                    [{'direction': 'rtl'}],                         // text direction

                    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
                    [{'header': [1, 2, 3, 4, 5, 6, false]}],

                    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                    [{'font': []}],
                    [{'align': []}],
                    ['link', 'image', 'video'],
                    ['clean']                                         // remove formatting button
                ]
            }
          }
        }
    },
    methods:{
        onEditorBlur(editor) {
            console.log('editor blur!', editor)
        },
        onEditorFocus(editor) {
            console.log('editor focus!', editor)
        },
        onEditorReady(editor) {
            console.log('editor ready!', editor)
        },
        onEditorChange({ editor, html, text }) {
            console.log('editor change!', editor, html, text)
            this.content = html
        },
        startPrint:function () {
            let pos = this.curTxt.length;
            if(pos>-1){
                let rest = this.brief.slice(this.curTxt.length);
                let count = 0;
                this.interval = setInterval(() => {
                    this.curTxt.push(rest[count++]);
                    if(this.finalTxt === this.brief){
                        clearInterval(this.interval);
                        this.interval = null;
                        // this.finalTxt = this.curTxt;
                        // this.startPrint();
                    }
                }, this.printSpeed);
            }
        }
    },
    mounted:function () {
        this.startPrint();              //欢迎打字
    },
    beforeDestroy: function () {
        !!this.interval && clearInterval(this.interval);
    }
}
</script>


