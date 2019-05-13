<template>
    <div>
        home page
        <!-- <div id="container" style="width:500px; height:300px"></div> -->
        <!-- <li v-for="todo in todos" :key="todo">
            <input type="checkbox" :checked="todo.done" @change="toggle(todo)">
            <span :class="{ done: todo.done }">{{ todo.text }}</span>
        </li> -->
    </div>

</template>

<style>
a [title="到腾讯地图查看此区域"]{
    display: none!important;
}
</style>


<script>
export default {
    data:function(){
        return{
            options:{
                zoom: 10,
            },
            map: null,                      //地图对象
            marker: null,                      //标记对象
            citylocation: null,                      //城市坐标对象
            geocoder: null,                      //地理位置对象
            transferService: null,                      //换乘服务对象
            start_marker: 0,                      //换乘起点坐标
            end_marker: 0,                      //换乘终点坐标
            station_markers: [],                      //换乘公交站列表
            transfer_lines: [],                      //换乘线路列表
            walk_lines: [],                      //换乘走路路线列表
            transfer_plans: [],                      //换乘方案列表
            start_name: '苏州腾飞创新园',
            end_name: '苏州寒山寺',
            // end_name: '苏州馨乐花园',
            policy: '少换乘',
        }
    },
    methods:{
        //地址解析 地址->经纬度
        codeAddress:function(address) {
            //通过getLocation();方法获取位置信息值
            this.geocoder.getLocation(address);
            return new Promise((resolve,reject)=>{
                this.geocoder.setComplete(function(result) {
                    let location = result.detail.location;
                    // console.log('location',location)
                    resolve(location);
                    // resolve({lat: location.lng, lng: location.lat});
                })
            });
        },
        //搜索地图出行路线
        transferServiceMethod: function () {
            let me = this;
            me.transferService = new qq.maps.TransferService({
                location: "苏州",
                complete: function(result) {
                    result = result.detail;
                    var start = result.start,
                    end = result.end;
                    var anchor = new qq.maps.Point(6, 6),
                    size = new qq.maps.Size(24, 36),
                    start_icon = new qq.maps.MarkerImage('img/busmarker.png', size),
                    end_icon = new qq.maps.MarkerImage('img/busmarker.png', size, new qq.maps.Point(24, 0), anchor);

                    me.start_marker && me.start_marker.setMap(null);
                    me.end_marker && me.end_marker.setMap(null);
                    me.start_marker = new qq.maps.Marker({
                        icon: start_icon,
                        position: start.latLng,
                        map: me.map,
                        zIndex: 1
                    });
                    me.end_marker = new qq.maps.Marker({
                        icon: end_icon,
                        position: end.latLng,
                        map: me.map,
                        zIndex: 1
                    });

                    me.transfer_plans = result.plans;
                    var plans_desc = [];
                    for (var i = 0; i < me.transfer_plans.length; i++) {
                        //plan desc.
                        var p_attributes = ['onclick="renderPlan(' + i + ')"', 'onmouseover=this.style.background="#eee"', 'onmouseout=this.style.background="#fff"', 'style="margin-top:-4px;cursor:pointer"'].join(' ');
                        plans_desc.push('<p ' + p_attributes + '><b>方案' + (i + 1) + '.</b>');
                        var actions = me.transfer_plans[i].actions;
                        for (var j = 0; j < actions.length; j++) {
                            var action = actions[j],
                            img_position;
                            action.type == qq.maps.TransferActionType.BUS && (img_position = '-38px 0px');
                            action.type == qq.maps.TransferActionType.SUBWAY && (img_position = '-57px 0px');
                            action.type == qq.maps.TransferActionType.WALK && (img_position = '-76px 0px');

                            var action_img = '<span style="margin-bottom: -4px;' + 'display:inline-block;background:url(img/busicon.png) ' + 'no-repeat ' + img_position + ';width:19px;height:19px"></span>&nbsp;&nbsp;';
                            plans_desc.push(action_img + action.instructions);
                        }
                    }
                    //方案文本描述
                    // document.getElementById('plans').innerHTML = plans_desc.join('<br><br>');

                    //渲染到地图上
                    me.renderPlan(0);
                }
            });
        },
        initMap:function(){
            let me = this;
            me.map = new qq.maps.Map(document.getElementById("container"), this.options);
            //根据ip设置城市中心位置
            me.citylocation = new qq.maps.CityService({
                complete : function(result){
                    me.map.setCenter(result.detail.latLng);
                }
            });

            //获取地理位置信息
            me.geocoder = new qq.maps.Geocoder({
                //获取成功回调函数
                complete : function(result){
                    me.map.setCenter(result.detail.location);
                    me.marker = new qq.maps.Marker({
                        map:me.map,
                        position: result.detail.location
                    });
                    //添加监听事件 当标记被点击了  设置图层
                    var info = new qq.maps.InfoWindow({map: me.map});
                    qq.maps.event.addListener(me.marker, 'click', function() {
                        info.open();
                        info.setContent('<div style="width:280px;height:100px;">'+
                            result.detail.address+'</div>');
                        info.setPosition(result.detail.location);
                    });
                }
            });
            //地图绑定点击监听事件
            qq.maps.event.addListener(me.map, 'click', function(e) {
                console.log(e);
                let latLng = e.latLng;
                me.geocoder.getAddress(latLng);
            });
            //调用searchLocalCity();方法    根据用户IP查询城市信息。
            me.citylocation.searchLocalCity();
        },
        //清除地图上的marker
        clearOverlay:function(overlays) {
            var overlay;
            while (overlay = overlays.pop()) {
                overlay.setMap(null);
            }
        },
        //渲染地图路线
        renderPlan:function(index) {
            let me = this;
            var plan = me.transfer_plans[index],
            lines = plan.lines,
            walks = plan.walks,
            stations = plan.stations;
            me.map.fitBounds(plan.bounds);

            //clear overlays;
            me.clearOverlay(me.station_markers);
            me.clearOverlay(me.transfer_lines);
            me.clearOverlay(me.walk_lines);
            var anchor = new qq.maps.Point(6, 6),
            size = new qq.maps.Size(24, 36),
            bus_icon = new qq.maps.MarkerImage('img/busmarker.png', size, new qq.maps.Point(48, 0), anchor),
            subway_icon = new qq.maps.MarkerImage('img/busmarker.png', size, new qq.maps.Point(72, 0), anchor);
            //draw station marker
            for (var j = 0; j < stations.length; j++) {
                var station = stations[j];
                if (station.type == qq.maps.PoiType.SUBWAY_STATION) {
                    var station_icon = subway_icon;
                } else {
                    var station_icon = bus_icon;
                }
                var station_marker = new qq.maps.Marker({
                    icon: station_icon,
                    position: station.latLng,
                    map: me.map,
                    zIndex: 0
                });
                me.station_markers.push(station_marker);
            }

            //draw bus line
            for (var j = 0; j < lines.length; j++) {
                var line = lines[j];
                var polyline = new qq.maps.Polyline({
                    path: line.path,
                    strokeColor: '#3893F9',
                    strokeWeight: 6,
                    map: me.map
                });
                me.transfer_lines.push(polyline);
            }

            //draw walk line
            for (var j = 0; j < walks.length; j++) {
                var walk = walks[j];
                var polyline = new qq.maps.Polyline({
                    path: walk.path,
                    strokeColor: '#3FD2A3',
                    strokeWeight: 6,
                    map: me.map
                });
                me.walk_lines.push(polyline);
            }
        },
        //调用calcPlan用来判断出行方式
        calcPlan:async function() {
            let me = this;
            var start_name = await me.codeAddress(me.start_name);
            var end_name = await me.codeAddress(me.end_name);

            // var start_name = new qq.maps.LatLng(start_name[1], start_name[0]),
            //     end_name = new qq.maps.LatLng(end_name[1], end_name[0])

            me.transferService.search(start_name, end_name);

            // switch (me.policy) {
            //     case "较快捷":
            //         me.transferService.setPolicy(qq.maps.TransferActionType.LEAST_TIME);
            //         break;
            //     case "少换乘":
            //         me.transferService.setPolicy(qq.maps.TransferActionType.LEAST_TRANSFER);
            //         break;
            //     case "少步行":
            //         me.transferService.setPolicy(qq.maps.TransferActionType.LEAST_WALKING);
            //         console.log(1);
            //         break;
            //     case "不坐地铁":
            //         me.transferService.setPolicy(qq.maps.TransferActionType.NO_SUBWAY);
            //         break;
            // }
        },
        ...mapMutations({
            // counter: 'counter'
        })
    },
    compouted:{
    },
    mounted:function(){
        // this.initMap();
        //搜索出行方案
        // this.transferServiceMethod();
        //判断出行方式
        // this.calcPlan();
        console.log(this);
    },

    asyncData (context) {
        // 支持 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
        return { testname: 'World' }
    },
    fetch () {
        //由于在created钩子中不存在window对象(获取cookie、localStorage都需要window对象)，
        //当你需要判断是否存在token的时候，你必须要在mounted进行操作，这说明页面进来的一瞬间你无法得知是否已经登录了，
        //这会导致显示用户名、组件显示于隐藏都慢半拍

        //fetch钩子，还有nuxtServerInit，这两个钩子都运行在服务端并且我们能很快速地操作store

        //登陆cookie这种情形使用nuxtServerInit 会较好，参考笔记

        // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据
    },
    head () {
        // 配置当前页面的 Meta 标签,
        return{
            meta:[
                {
                    name: 'keywords',
                    content:`${this.testname},幽游白书`
                }
            ]
        }
    },
    layout(){
        //指定当前页面使用的布局（layouts 根目录下的布局文件）
    },
    loading(){
        //如果设置为false，则阻止页面自动调用this.$nuxt.$loading.finish()和this.$nuxt.$loading.start()
    },
    transition(){
        //指定页面切换的过渡动效
    },
    scrollToTop(){
        //  布尔值，默认: false。 用于判定渲染页面前是否需要将当前页面滚动至顶部。
    },

    // validate 这玩意 没用别加 会导致找不到页面
    // validate(){
    //     //  校验方法用于校验 动态路由的参数
    // },


    middleware(){
        //  指定页面的中间件，中间件会在页面渲染之前被调用，
    }

}
</script>

