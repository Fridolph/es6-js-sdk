import { fetchPost } from '../common/fetch.js';
import utils from '../common/utils.js';
import FormCheck from '../common/form-check';

const { domSelector: $, bindEvent } = utils;


export default (opts) => {
    const $saveBtn = $('#save-delivery-address');
    const $list = $('#delivery-address-list');
    const $form = $('#delivery-address-form');
    const tipMap = {
        'name': '收货人姓名',
        'region': '所在地信息',
        'detailAddress': '详细地址',
        'mobile': '手机号码'
    }

    const formCheck = new FormCheck({
        form: $form
    });

    /*
     * 删除收货地址
     */
    bindEvent($list, 'click', '.del-delivery-address', async (e) => {
        if (confirm('是否删除该条收货地址')) {
            let data = await fetchPost('/del-delivery', {
                addrId: e.target.getAttribute('data-id')
            });
            if (data.code === 200) {
                location.reload();
            }
        }
    })


    /*
     * 保存收货地址
     */
    $saveBtn.onclick = async () => {
        const checkResults = formCheck.check();

        if (!checkResults.length) {
            let formValues = {};
            /*
             * Array.from 将类数组对象转为真正的数组
             */
            Array.from($form.elements).forEach((item) => {
                if (item.name) {
                    formValues[item.name] = item.value
                }
            });

            let data = await fetchPost('/save-delivery', formValues);
            if (data.code === 200) {
                alert('保存成功');
                opts.success && opts.success();
            }
            else {
                alert('保存失败')
            }
        }
        else {
            /*
             * 表单校验失败分支
             */
            const type = checkResults[0].type;
            const name = checkResults[0].name;
            if (type === 'present') {
                alert('请填写您的' + tipMap[name]);
            }
            else {
                alert('请填写正确的' + tipMap[name]);
            }
        }

    }
}

