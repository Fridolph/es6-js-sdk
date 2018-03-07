const tpl = (opts = {}) => {
    return `
        <div id="register-payment-wrapper" class="register-payment-wrapper">
            <form id="register-payment-form" onsubmit="return false">
                <label>
                    <span>XX宝账号： </span>
                    <input id="register-payment-input" name="uname" type="text" placeholder="${ opts.paymentPlaceHolder }" valid="present">
                </label>
                <label>
                    <span>XX宝密码： </span>
                    <input id="register-payment-password" name="password" type="text" placeholder="${ opts.paymentPasswordPlaceHolder }" valid="present">
                </label>
                <label>
                    <span>&nbsp;</span>
                    <div class="register-tip"><img src="../images/tip-fill.png">还没有XX宝账户，<a href="#">立即注册</a></div>
                </label>
                <input id="register-payment-btn" type="submit" value="下一步">
            </form>
        </div>
    `
}

export default (conf) => {
    conf.container.innerHTML = tpl(conf);
}