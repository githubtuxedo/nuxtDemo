<template>
    <footer>
            <div class="sec_01">
                <div>
                    <p>联系我们</p>
                    <span>联系电话:18701878710</span><br>
                    <span>工作时间:周一到周日 9:00~18:00</span>
                </div>
                <div>
                    <p>关于我们</p>
                    <a href="javascript:;">公司文化</a><br>
                    <a href="javascript:;">合作联系</a><br>
                    <a href="javascript:;">加入我们</a>
                    <figure>
                        <img src="" alt="扫描二维码">
                        <figcaption></figcaption>
                    </figure>
                </div>
                <div>
                    <p>联系我们</p>
                    <span>联系电话:</span><br>
                    <span>工作时间</span>
                </div>
                <div>
                    <p>联系我们</p>
                    <span>联系电话:</span><br>
                    <span>工作时间</span>
                </div>
            </div>
            <hr/>
            <div class="sec_02">
                <a href="">（浙）网械平台备字【2018】第00003号</a>
                <span>|</span>
                <a href="">（浙）网械平台备字【2018】第00003号</a>
                <br>
                <span>© 2012-2019 shenyong.com</span>
            </div>
        </footer>
</template>

<style lang="less" scoped>
    footer{
        background-color: #373D44;
        font-size: 14px;
        padding: 40px 0;
        line-height: 30px;
    hr{
        margin: 0 auto;
        height: 1px;
        width: 90%;
        background: radial-gradient(gray 24%, transparent 100%);
        border: none;
    }
    div.sec_01{
        display: relative;
        overflow: hidden;
        zoom: 1;
        width: 80%;
        margin:0 auto;
        color:#E5E5E5;
        letter-spacing: 0.58px;
        >div{
            float: left;
            &:nth-child(1){
                width: 35%;
            }
            &:nth-child(2){
                width: 20%;
            }
            &:nth-child(3){
                width: 20%;
            }
            &:nth-child(4){
                width: 25%;
            }
        }
    }
    div.sec_02{
        font-size: 12px;
        color: #b6b6b6;
        padding: 30px 0;
        text-align: center;
    }
}
</style>

<script>
export default {

}
</script>
