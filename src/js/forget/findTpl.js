export default (type, number) => {
    return `
        <div class="forget-verify-dialog-header">
            <div class="forget-dialog-close" id="forget-dialog-close"></div>
        </div>
        <p class="forget-tip">
            <img src="../images/tip-fill.png">校验码已发送到你的${ type }，15分钟内输入有效，请勿泄漏
        </p>
        <form id="forget-form" onsubmit="return false">
            <label>
                <span>${ type }： </span>
                <div id="forget-verify-number">${ number }</div>
            </label>
            <label>
                <span>验证码： </span>
                <input type="text" name="verify" id="forget-verify-input">
            </label>
            <label>
                <span>&nbsp;</span>
                <div class="forget-tip"><img src="../images/ok-fill.png">校验码已发送至你的${ type }，请查收</div>
            </label>
            <input id="forget-confirm-btn" class="disabled" disabled type="submit" value="确认">
        </form>`
}