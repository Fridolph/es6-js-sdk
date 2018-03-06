import {getId} from '../common/utils'

const template = (opts = {}) => {
  const autocompleteTpl = `
    <div id="no-autocomplete">
      <input type="text" />
      <input type="password" />
    </div>
  `
  const autocompleteAdapter = opts.autocomplete ? '' : autocompleteTpl
  const autocompleteValue = opts.autocomplete ? 'on' : 'off'

  const tpl = `    
    <div class="login-wrapper">    
      <form id="login-form">
        ${autocompleteAdapter}

        <label class="login-account-wrapper">
          <span class="account-label">${opts.accountLabel}</span>
          <input id="login-account" valid="present" name="account" type="text" placeholder="${opts.accountPlaceholder}" autocomplete="${autocompleteValue}" />
          <i id="clear-account" class="del"> x </i>
        </label>

        <label class="login-password-wrapper">
          <span class="password-label">${opts.passwordLabel}</span>
          <input id="login-password" valid="present" name="password" type="text" placeholder="${opts.passwordPlaceholder}" autocomplete="${autocompleteValue}" />
        </label>

        <label class="login-remember-wrapper" style="display: ${opts.showRemember}">
          <span>记住密码：</span>
          <input id="login-remember" name="rememeber" type="checkbox" />
        </label>

        <input id="login-btn" value="${opts.loginBtnText}" class="login-btn" type="submit" />

        <span id="login-error"></span>

        <div class="login-extra-wrapper">
          <a href="forget.html">忘记密码</a>
          <a href="register-mobile.html">免费注册</a>
        </div>
      </form>
    </div>
  `

  return tpl
}

export default (conf = {}) => {
  conf.container.innerHTML = template(conf)
  const $noAutocomplete = getId('no-autocomplete')
  if ($noAutocomplete) {
    $noAutocomplete.style.opacity = 0
    $noAutocomplete.style.height = 0
    $noAutocomplete.style.position = 'relative'
    $noAutocomplete.style.zIndex = '-1'
  }
}
