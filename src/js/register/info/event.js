/*
 * export {xx, yy} 可以这样import, export obj则不行，新的babel禁止
 */
import { fetchPost } from '../../common/fetch';
import utils from '../../common/utils';
import FormCheck from '../../common/form-check';

/*
 * 解构运算, 解构重命名
 */
const { domSelector: $ } = utils;

export default (opts) => {
    const $btn = $('#register-info-btn');
    const $form = $('#register-info-form');

    const formCheck = new FormCheck({
        form: document.getElementById('register-info-form')
    });

    const tipMap = {
        'nickname': '昵称',
        'email': '电子邮箱'
    }


    /*
     * 点击提交
     * */

    $btn.onclick = async () => {
        let checkResults = formCheck.check();

        let formValues = {};
        Array.from($form.elements).forEach((item) => {
            if (item.name) {
                formValues[item.name] = item.value
            }
        });
        if (checkResults.length) {
            const type = checkResults[0].type;
            const name = checkResults[0].name;
            if (type === 'present') {
                alert('请填写您的' + tipMap[name]);
            }
            else {
                alert('请填写正确的' + tipMap[name]);
            }
        }
        else {
            let data = await fetchPost('/register/info', formValues);
            if (data.code === 200) {
                opts.success && opts.success();
            }
        }


    }
}