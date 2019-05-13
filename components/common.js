import Vue from 'vue';
import Component from "vue-class-component";

const Left = {
    name: 'Left',
    render() {
        // console.log(this)
        return (
            <div>
                left
            </div>
        )
    }
}


@Component()
class Looper extends Vue {
    constructor() {
        super();
        this.leftNode = null;
        this.curNode = null;
        this.rightNode = null;
        this.currentIndex = 1;
        this.total = 3;                 //默认三个
        this.slots = [];
        this.direction = 'toRight';
        this.interval = null;
        this.timer = null;
        this.looperDuration = 2000;     //轮播 速度
        this.duration = 500;     //动画 速度
        this.distance = -1 / 3;
        this.isMoving = false;
    }
    tap() {
        // console.log('work here', this);
    }
    touch() {
        // console.log('touch');
    }
    animate() {
        if (this.direction === 'toLeft') {
            this.interval = setInterval(() => {
                this.toLeft();
            }, this.looperDuration);
        } else if (this.direction === 'toRight') {
            this.interval = setInterval(() => {
                this.toRight();
            }, this.looperDuration);
        }
    }
    toLeft() {
        if (this.isMoving) { return }
        this.isMoving = true;
        this.timer = setTimeout(() => {
            this.leftNode = this.curNode;
            this.curNode = this.rightNode;
            this.rightNode = this.slots[(this.currentIndex + 2) % this.total];
            this.currentIndex = (this.currentIndex + 1) % this.total;
            this.distance = -1 / 3;
            this.isMoving = false;
            !!this.timer && clearTimeout(this.timer);
            this.timer = null;
        }, this.duration);
        this.distance = -1 / 3 * 2;
        // console.log(this.currentIndex);
    }
    toRight() {
        if (this.isMoving) { return }
        this.isMoving = true;
        this.timer = setTimeout(() => {
            this.rightNode = this.curNode;
            this.curNode = this.leftNode;
            this.leftNode = this.slots[(this.currentIndex - 2 + this.total) % this.total];
            this.currentIndex = (this.currentIndex - 1 + this.total) % this.total;
            this.distance = -1 / 3;
            this.isMoving = false;
            !!this.timer && clearTimeout(this.timer);
            this.timer = null;
        }, this.duration);
        this.distance = 0;
    }
    mounted() {
        // this.animate()
    }
    updated() {
        // console.log('updated');
    }
    beforeMount() {
        for (let i = 0; i < this.$slots.default.length; i++) {
            if (this.$slots.default[i].tag !== "li") {
                this.$slots.default.splice(i, 1);
            }
        }
        let slots = this.slots = this.$slots.default;
        let total = this.total = slots.length;
        if (total === 1) {
            this.leftNode = slots[0];
            this.curNode = slots[0];
            this.rightNode = slots[0];
        } else if (total === 2) {
            this.leftNode = slots[0];
            this.curNode = slots[1];
            this.rightNode = slots[0];
        } else {
            this.leftNode = slots[0];
            this.curNode = slots[1];
            this.rightNode = slots[2];
        }
    }
    beforeDestroy() {
        !!this.timer && clearTimeout(this.timer);
        !!this.interval && clearInterval(this.interval);
    }
    render() {
        return (
            <div class="cuz-looper" onTouchMove={this.touch} onTouchStart={this.touch}>
                <ul style={{
                    "transform": `translate3d(${this.distance * 100}%,0,1px)`,
                    "transition": `transform ${this.isMoving ? this.duration : 0}ms`
                }}>
                    {this.leftNode}
                    {this.curNode}
                    {this.rightNode}
                </ul>
                <div style={{
                    "position": 'absolute',
                    "right": '0',
                    "top": '0',
                    "backgourndColor": '#eee',
                    "lineHeight": '18px'
                }} onClick={this.toRight}>next</div>
            </div>
        )
    }
}


const Square = {
    name: "Square",
    props: {
        size: {
            type: Number,         //可不写
            default: 1,
        },
        claz: {
            type: String,
            default: '',
        }
    },
    render() {
        return (
            <div class={['cuz-square', this.$props.claz].join('')}>
                <div class='func'></div>
                <div class='inner'>
                    {this.$slots.default[0]}
                </div>
            </div>
        )
    }
}

export {
    Left,
    Looper,
    Square,                 //长方形
}