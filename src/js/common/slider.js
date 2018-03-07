/*
 * @file 滑块验证插件
 * @params Dom opts.container 渲染父容器
 * @params String opts.unsuccessTip 未验证成功时的提示语
 * @params String opts.successTip 验证成功时的提示语
 */


/*
 * symbol可用于私有方法
 */

import utils from '../common/utils';

const { domSelector: $ } = utils;
const render = Symbol('render');
const bindEvent = Symbol('bindEvent');
const style =
`<style>
    .vs-wrapper {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .vs-moved-bg {
        background: green;
        width: 0;
        position: absolute;
        z-index: 999;
        height: 100%;
    }

    .vs-unmoved-bg {
        background: gray;
        width: 100%;
        position:absolute
        z-index: 998;
        height: 100%;
    }

    .vs-text {
        position: absolute;
        width: 100%;
        top: 0;
        z-index: 1000;
        backgound: rgba(0,0,0,0);
        text-align: center;
    }

    .vs-move-btn {
        height: 100%;
        width: 30px;
        background: #333333;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1001;
    }
</style>`

class Slider {
    constructor(opts) {
        this.opts = opts;
        if (!opts.container) {
            throw '请填写container配置';
        }
        else {
            this[render](opts);
            this[bindEvent](opts);
        }
    }

    [render](opts) {
        const unsuccessTip = opts.unsuccessTip || '请按住滑块，拖动到最右边';
        /*
         * vs = verify-slider
         */
        const tpl =  style + `
            <div id="vs-wrapper" class="vs-wrapper">
                <div id="vs-moved-bg" class="vs-moved-bg"></div>
                <span id="vs-move-btn" class="vs-move-btn"></span>
                <div id="vs-unmoved-bg" class="vs-unmoved-bg"></div>
                <span id="vs-text" class="vs-text" ondrag="return false;">${ unsuccessTip }</span>
            </div>
        `

        opts.container.innerHTML = tpl;
    }

    [bindEvent](opts) {
        const $btn = $('#vs-move-btn');
        const $moved = $('#vs-moved-bg');
        const $wrapper = $('#vs-wrapper');
        const $text = $('#vs-text');
        const reset = () => {
            this.startX = 0;
            this.start = false;
            this.end = false;
            $btn.style.left = '0px';
            $moved.style.width = '0px';
        }

        $btn.onmousedown = (e) => {
            this.startX = e.pageX;
            this.start = true;
        }

        window.onmousemove = (e) => {
            if (this.start && !this.end) {
                let offset = e.pageX - this.startX;
                let r1 = $moved.offsetLeft + parseInt(window.getComputedStyle($moved).width);
                let r2 = parseInt(window.getComputedStyle($wrapper).width) - parseInt(window.getComputedStyle($btn).width);
                $btn.style.left = offset + 'px';
                $moved.style.width = offset + 'px';
                if (r1 >= r2) {
                    this.end = true;
                    this.start = false;
                    $btn.style.left = r2 + 'px';
                    $moved.style.width = r2 + 'px';
                    opts.success && opts.success($wrapper, $text);
                }
            }
        }

        window.onmouseup = (e) => {
            if (!this.end) {
                reset();
            }
        }
    }

    reset() {
        this[render](this.opts);
        this[bindEvent](this.opts);
    }
}

export default Slider