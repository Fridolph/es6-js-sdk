import { fetchJson } from '../common/fetch.js';

const tpl = (data = {}) => {
    return `
        <div class="security-wrap">
            <div class="security-info">
                <h4>您的基础信息</h4>
                <table>
                    <tr>
                        <td>会员名</td>
                        <td>${ data.nickname || '' }</td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>登录邮箱</td>
                        <td>${ data.email || '还没有设置邮箱' }</td>
                        <td>${ data.email ?
                            '<a href="profile.html">修改邮箱</a>' :
                            '<a href="profile.html">设置邮箱</a>' }
                        </td>
                    </tr>
                    <tr>
                        <td>绑定手机</td>
                        <td>${ data.mobile || '' }</td>
                        <td>${ data.email ?
                            '<a href="#">修改手机</a>' :
                            '<a href="register-mobile.html?bind=1">绑定手机</a>' }
                        </td>
                    </tr>

                </table>
            </div>

            <div class="security-level">
                <h4>您的安全服务</h4>
                <table>
                    <tr>
                        <td>
                            <i class="${ data.identity ?'ok' : 'alert' }"></i>
                            <div>${ data.identity ?'已认证' : '未认证' }</div>
                        </td>
                        <td>身份认证</td>
                        <td>用于提升账号的安全性和信任级别。认证后的有卖家记录的账号不能修改认证信息</td>
                        <td>${ data.identity ?
                            '<a href="#">查看</a>' :
                            '<a href="#">认证</a>' }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="${ data.password ?'ok' : 'alert' }"></i>
                            <div>${ data.password ?'已设置' : '未设置' }</div>
                        </td>
                        <td>登录密码</td>
                        <td>安全性高的密码可以使账号更安全。建议您定期更换密码，且设置一个包含数字和字母，并长度超过6位以上的密码。</td>
                        <td>${ data.password ?
                            '<a href="#">修改</a>' :
                            '<a href="#">设置</a>' }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="${ data.secretQuestion ?'ok' : 'alert' }"></i>
                            <div>${ data.secretQuestion ? '已设置' : '未设置' }</div>
                        </td>
                        <td>密保问题</td>
                        <td>是您找回登录密码的方式之一。建议您设置一个容易记住，且最不容易被他人获取的问题及答案，更有效保障您的密码安全。</td>
                        <td>${ data.secretQuestion ?
                            '<a href="#">修改</a>' :
                            '<a href="#">设置</a>' }
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <i class="${ data.mobile ?'ok' : 'alert' }"></i>
                            <div>${ data.mobile ? '已绑定' : '未绑定' }</div>
                        </td>
                        <td>绑定手机</td>
                        <td>绑定手机后，您即可享受丰富的手机服务，如手机找回密码等。</td>
                        <td>${ data.mobile ?
                            '<a href="#">修改</a>' :
                            '<a href="#">绑定</a>' }
                        </td>
                    </tr>
                </table>
            </div>

        </div>
    `
}

export default async (conf) => {
    const result = await fetchJson('/security-info', {});
    if (result.code === 200) {
        conf.container.innerHTML = tpl(result.data);
    }
    else {
        alert('数据拉取失败');
    }
}