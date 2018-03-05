import formCheck from '../common/formCheck'

export default () => {
  const btn = document.querySelector('#submit')
  const input = document.querySelector('#input')
  const check = formCheck(document.querySelector('#form'))

  btn.onclick = e => {
    e.preventDefault()

    check()
  }

  input.oninput = () => {
    check()
  }
}