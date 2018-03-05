import render from './render'
import event from './event'

window.login = opts => {
  const container = opts.container
  render(container)
  event()
}