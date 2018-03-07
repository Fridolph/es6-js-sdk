const tpl = (opts = {}) => {
    return `
        <div id="forget-wrapper">
            <div class="choose-find-mod">
                <div class="find-mod" id="choose-mobile">使用手机号找回密码</div>
                <div class="find-mod" id="choose-email">使用邮箱找回密码</div>
                <div class="clear-fix"></div>
                <div class="forget-dialog" id="forget-dialog">

                </div>
            </div>
        </div>`
}

export default (conf) => {
    conf.container.innerHTML = tpl();
}