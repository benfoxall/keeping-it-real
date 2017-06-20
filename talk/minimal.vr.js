import {getRenderer} from 'my-renderer.js'

window.addEventListener('vrdisplaypresentchange', event => {
  getRenderer(event.display).update()
})

btn.addEventListener('click', () => {
  navigator.getVRDisplays().then(displays => displays[0].requestPresent())
})


navigator.getVRDisplays()
  .then(displays => displays[0])








const canvas = document.createElement('canvas')
const gl = canvas.getContext('webgl')
document.body.appendChild(canvas)


let display
navigator.getVRDisplays()
  .then(displays => display = displays[0])


let left = display.getEyeParameters('left')
canvas.width = left.renderWidth * 2
canvas.height = left.renderHeight


renderer = micro(gl)
renderer(view, projection, [0,0,left.renderWidth,left.renderWidth])

display.requestPresent([{source: canvas}])



// get some frame data
const fd = new VRFrameData()
const left = {x:0, y:0, w:canvas.width / 2, h:canvas.height}
const right = {x:canvas.width / 2, y:0, w:canvas.width / 2, h:canvas.height}

const render = r => {
  display.requestAnimationFrame(render)
  display.getFrameData(fd)

  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

  renderer(
    fd.leftViewMatrix,
    fd.leftProjectionMatrix,
    left
  )
  renderer(
    fd.rightViewMatrix,
    fd.rightProjectionMatrix,
    right
  )

}
display.requestAnimationFrame(() => console.log('nope'))
display.getFrameData(fd)
