import '../common/polyfill';
import render from './render';
import bindEvent from './event';



const login = (opts = {}) => {
    var defaultOpts = {
        loginBtnText: '登 录',
        accountPlaceHolder: '手机号/邮箱/账号',
        accountLabel: '',
        passwordPlaceHolder: '请填写密码',
        passwordLabel: '',
        verifyPlaceHolder: '验证码',
        accountMax: '30',
        passwordMax: '30',
        showRemember: true,
        autocomplete: false,
    };

    var options = Object.assign(defaultOpts, opts)

    render(options);
    bindEvent(options);
}

export { login }

// new FormCheck({});