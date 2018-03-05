export default (container) => {
  const tpl = `<form id="form">
    <input name="uname" type="text" id="input" />
    <input name="password" type="password" />
    <input id="submit" value="登录" type="submit" />
  </form>`

  container.innerHTML = tpl
}