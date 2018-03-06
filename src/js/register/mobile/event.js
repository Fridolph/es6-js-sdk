import Slider from '../../common/slider'
import {getId, addClass, removeClass} from '../../common/utils'
import {fetchPost} from '../../common/fetch'

export const bindEvent = (conf = {}) => {
  let mobileVerifyToken

  const slider = new Slider({
    container: getId('register-verify-wrapper'),
    success: async ($wrapper, $text, offsetArr) => {
      const offsetMsg = offsetArr.join(':')
      let data = await fetchPost('/getMobileVerifyToken', {
        offsetMsg
      })

      if (data.code === 200) {
        mobileVerifyToken = data.mobileVerifyToken
        addClass($wrapper, 'success')
        $text.innerHTML = '验证成功'
      } else {
        addClass($wrapper, 'failed')
        $text.innerHTML = '验证失败'
      }
    }
  })
}

