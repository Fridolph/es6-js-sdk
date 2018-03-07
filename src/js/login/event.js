/*
 * export {xx, yy} 可以这样import, export obj则不行，新的babel禁止
 */
import { fetchPost } from '../common/fetch';
import utils from '../common/utils';
import FormCheck from '../common/form-check';

/*
 * 解构运算, 解构重命名
 */
const { domSelector: $ } = utils;

export default (opts) => {
    const $loginBtn = $('#login-btn');
    const $remember = $('#login-remember');
    const $clearAccount = $('#clear-account');
    const $clearPassword = $('#clear-password');
    const $account = $('#login-account');
    const $password = $('#login-password');
    const $error = $('#login-error');

    const formCheck = new FormCheck({
        form: document.getElementById('login-form')
    });

    $loginBtn.onclick = async () => {
        /*
         * 重新提交的时候重置错误提示框
         */
        $error.innerHTML = '';

        /*
         * 表单校验
         */
        const checkResults = formCheck.check();

        if (!checkResults.length) {
            /*
             * 点击后设置为不可点状态
             */
            $loginBtn.setAttribute('disabled', 'disabled');
            /*
             * 判断是否记住密码
             */
            let remember = '0';
            if ($remember.getAttribute('checked')) {
                remember = '1'
            }
            let data = await fetchPost('/login', {
                account: $account.value,
                password: $password.value,
                remember: remember
            });

            console.log(data);
            if (data.code === 200) {
                alert('登录成功');
                opts.success && opts.success();
            }
            else {
                $error.innerHTML = data.message;
            }

            /*
             * 请求完成后按钮设置为可点击状态
             */
            $loginBtn.removeAttribute('disabled');
        }
        else {
            const name = checkResults[0].name;
            const type = checkResults[0].type;
            if (type === 'present') {
                if (name === 'account') {
                    $error.innerHTML = '请填写您的用户名';
                }
                if (name === 'password') {
                    $error.innerHTML = '请填写您的密码';
                }
            }
        }
    };

    /*
     * 点击清空用户名
     */
    $clearAccount.onclick = () => {
        $account.value = '';
        $clearAccount.style.display = 'none';
    };


    /*
     * 有输入的时候展示清空按钮, 并清空错误信息
     */
    $account.oninput = () => {
        if ($account.value.length) {
            $clearAccount.style.display = 'block';
        }
        else {
            $clearAccount.style.display = 'none';
        }

        $error.innerHTML = '';
    }

    $password.oninput = () => {
        $error.innerHTML = '';
    }


}
