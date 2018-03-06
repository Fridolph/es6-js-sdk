import '../common/polyfill'
import render from './render'
import {bindEvent} from './event'

export const login = (opts = {}) => {
  const defaultOpts = {
    loginBtnText: '登录',
    accountPlaceholder: '手机号/邮箱/帐号',
    passwordPlaceholder: '请填写密码',
    accountLabel: '',
    passwordLabel: ''
  }

  const options = Object.assign(defaultOpts, opts)

  render(options)
  bindEvent(options)
}

