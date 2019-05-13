<template>
    <section>



        <script id="editor" type="text/plain" style="width:1024px;height:500px;"></script>
        sdfds
    </section>
</template>




<script>

export default {
    head: {
        script: [
            { src: require("@/static/UE/ueditor.config.js") },
            { src: require("@/static/UE/ueditor.all.js") },
            { src: require("@/static/UE/lang/zh-cn/zh-cn.js") },
        ],
    },
    data:function(){
        return{
            ue: null,
            // path1: require("@/static/UE/ueditor.config.js"),
            // path2: require("@/static/UE/ueditor.all.js"),
            // path3: require("@/static/UE/lang/zh-cn/zh-cn.js"),
        }
    },
    mounted:function(){
        this.ue = UE.getEditor('editor');
        // import '@/static/UE/ueditor.config.js';
        // import '@/static/UE/ueditor.all.js';
        // import '@/static/UE/lang/zh-cn/zh-cn.js';
    }

}
</script>
