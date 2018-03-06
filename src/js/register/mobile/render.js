const tpl = (opts = {}) => {
  return `
    <div id="register-mobile-wrapper" class="register-mobile-wrapper">
      <form id="register-mobile-form">
        <label>
          <span>手机号</span>
          <input type="text" placeholder="${opts.mobilePlaceholder || ''}" valid="present, mobile" />
        </label>
        <br>
        <label>
          <span>验证</span>
          <div id="register-verify-wrapper"></div>
        </label>
      </form>
    </div>
  `
}

export default conf => {
  conf.container.innerHTML = tpl(conf)
}