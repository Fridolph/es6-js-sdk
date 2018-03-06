import { getId } from '../common/utils'
import { fetchPost } from '../common/fetch'
import { check } from '../common/form-check'

export const bindEvent = (opts = {}) => {
  const $loginForm = getId('#login-form')
  const $loginBtn = getId('#login-btn')
  const $remember = getId('#login-remember')
  const $clearAccount = getId('#clear-account')
  // const clearPassword = getId('#clear-password')
  const $account = getId('#login-account')
  const $password = getId('#login-password')
  const $error = getId('#login-error')

  // 需要表单验证
  $loginForm.onsubmit = async e => {
    e.preventDefault()
    // 点击登录
    const checkResults = check($loginForm)
    console.log('checkResults\n', checkResults)

    if (!checkResults.length) {
      let remember = '0'
      if ($remember.getAttribute('checked')) {
        remember = '1'
      }
      const data = await fetchPost('/login', {
        account: $account.value,
        password: $password.value,
        remember
      })
      // console.log(data)
      // 开始登录逻辑
      if (data.code === 200) {
        opts.success && opts.success()
      } else {
        $error.innerHTML = data.message
      }
    } else {
      const name = checkResults[0].name
      const type = checkResults[0].type

      if (type === 'present') {
        if (name === 'account') {
          $error.innerHTML = '请填写用户名'
        }
        if (name === 'password') {
          $error.innerHTML = '请填写密码'
        }
      }
    }
  }

  // 用户名输入检测
  $account.oninput = () => {
    if ($account.value.length) {
      $clearAccount.style.display = 'block'
    } else {
      $clearAccount.style.display = 'none'
    }

    $error.innerHTML = ''
  }

  // 清空用户名
  $clearAccount.onclick = () => {
    $account.value = ''
    $clearAccount.style.display = 'none'
  }

  // 密码输入检测
  $password.oninput = () => {

  }  
}
