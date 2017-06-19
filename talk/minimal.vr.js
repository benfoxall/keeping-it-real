import {getRenderer} from 'my-renderer.js'

window.addEventListener('vrdisplaypresentchange', event => {
  getRenderer(event.display).update()
})

btn.addEventListener('click', () => {
  navigator.getVRDisplays().then(displays => displays[0].requestPresent())
})
