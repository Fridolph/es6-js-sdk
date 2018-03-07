import Slider from '../../common/slider.js';
import { fetchPost } from '../../common/fetch';
import utils from '../../common/utils';
import FormCheck from '../../common/form-check';

const { domSelector: $, removeClass, addClass } = utils;

export default (opts) => {
    let mobileVerifyToken;
    let checkResults;

    const $mobileInput = $('#register-mobile-input');
    const $verifyInput = $('#register-verify-input');
    const $verifyBtn = $('#register-verify-btn');
    const $mobileBtn = $('#register-mobile-btn');
    const $verifyMobile = $('#register-verify-mobile');
    const $dialog = $('#register-verify-dialog');
    const $dialogClose = $('#register-verify-dialog-close');

    const formCheck = new FormCheck({
        form: document.getElementById('register-mobile-form')
    });

    const slider = new Slider({
        container: document.getElementById('register-verify-wrapper'),
        success: async ($wrapper, $text) => {
            let data = await fetchPost('/getMobileVerifyToken', {});
            if (data.code === 200) {
                mobileVerifyToken = data.mobileVerifyToken;
                addClass($wrapper, 'success');
                $text.innerText = '验证成功';
            }
            else {
                addClass($wrapper, 'failed');
                $text.innerText = '验证失败';
            }

            $verifyBtn.removeAttribute('disabled');
            removeClass($verifyBtn, 'disabled');
        }
    });

    $verifyBtn.onclick = async () => {
        checkResults = formCheck.check();

        if (checkResults.length) {
            const type = checkResults[0].type;
            if (type === 'present') {
                alert('请填写您的手机号');
            }
            else if (type === 'mobile') {
                alert('请填写正确的手机号');
            }
        }
        else {
            let data = await fetchPost('/register/getVerifyCode', {
                mobile: $mobileInput.value,
                mobileVerifyToken: mobileVerifyToken
            });
            if (data.code === 200) {
                //location.replace('register-info.html');
                $dialog.style.display = 'block';
                $verifyMobile.innerText = data.mobile;
                // opts.success && opts.success();
                mobileVerifyToken = '';
                slider.reset();
            }
        }
    }

    $dialogClose.onclick = () => {
        $dialog.style.display = 'none';
        mobileVerifyToken = '';
        slider.reset();
    }

    /*
     * 验证码长度前端校验
     */
    $verifyInput.oninput = () => {
        const MSGLENGTH = 6;
        let value = $verifyInput.value;
        //过滤非数字输入
        $verifyInput.value = value.replace(/\D/g, '');
        //长度过滤
        if ($verifyInput.value.length > (MSGLENGTH - 1)) {
            $mobileBtn.removeAttribute('disabled');
            removeClass($mobileBtn, 'disabled');
            addClass($mobileBtn, 'btn-primary');
            if (value.length > MSGLENGTH) {
                $verifyInput.value = value.substring(0, MSGLENGTH);
            }
        }
        else {
            removeClass($mobileBtn, 'btn-primary');
            addClass($mobileBtn, 'disabled');
            $mobileBtn.setAttribute('disabled', 'disabled');
        }
    }

    $mobileBtn.onclick = async () => {
        let data = await fetchPost('/register/mobile', {
            mobile: $verifyMobile.innerText,
            verifyCode: $verifyInput.value,
            mobileVerifyToken: mobileVerifyToken,
        });
        if (data.code === 200) {
            opts.success && opts.success();
        }
        else {
            alert('验证码输入错误');
        }
    }

}