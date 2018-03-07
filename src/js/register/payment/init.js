import '../../common/polyfill';
import render from './render';
import bindEvent from './event';
// import FormCheck from '../common/formCheck';
const regPayment = (opts = {}) => {
    var defaultOpts = {
        paymentPlaceHolder: '请输入您的XX宝账号',
        paymentPasswordPlaceHolder: '请输入您的XX宝密码'
    };

    var options = Object.assign(defaultOpts, opts)

    render(options);
    bindEvent(options);
}

export { regPayment }