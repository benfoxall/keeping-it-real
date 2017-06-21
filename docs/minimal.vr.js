// 1. set up a canvas
const canvas = document.createElement('canvas')
canvas.height = 1080
canvas.width = 960*2
document.body.appendChild(canvas)

const gl = canvas.getContext('webgl')


gl.clearColor(0.9,0.9,0.9,1)
gl.clear(gl.COLOR_BUFFER_BIT)


// 2. get a display
let display
navigator.getVRDisplays()
  .then(displays => display = displays[0])


// 3. Send the canvas to the display
display.requestPresent([{source: canvas}])


// Get some frame data
const fd = new VRFrameData()


display.requestAnimationFrame(() => {})
display.getFrameData(fd)



const renderFrameData=function(l){var k=function(a){for(var b=function(a,b,e,h){h=void 0===h?1:h;var g=Math.sqrt(1.25)/2*h,c=.5*h;h=[a+0,b+0,e+g];var f=[a-g,b-c,e-g],d=[a+0,b+c,e-g];a=[a+g,b-c,e-g];b=[1,.5,0];e=[0,1,.5];g=[.5,0,1];c=[1,0,.5];return[h,b,f,b,d,b,h,e,a,e,f,e,h,g,d,g,a,g,f,c,a,c,d,c].reduce(function(a,b){return a.concat(b)},[])},f=[],d=-7;7>d;d++)for(var m=-7;7>m;m++)f=f.concat(b(d,-.75,m,.2));b=a.createBuffer();a.bindBuffer(a.ARRAY_BUFFER,b);a.bufferData(a.ARRAY_BUFFER,new Float32Array(f),
a.STATIC_DRAW);b=a.createShader(a.FRAGMENT_SHADER);a.shaderSource(b,"precision mediump float; varying vec3 v_color; void main() { gl_FragColor = vec4(v_color, 1.0); }");a.compileShader(b);d=a.createShader(a.VERTEX_SHADER);a.shaderSource(d,"attribute vec3 a_position; attribute vec3 a_color; varying vec3 v_color; uniform mat4 u_view; uniform mat4 u_proj; void main() { v_color = a_color; gl_Position = u_proj * u_view * vec4(a_position, 1.0); }");a.compileShader(d);var c=a.createProgram();a.attachShader(c,
d);a.attachShader(c,b);a.linkProgram(c);var k=a.getAttribLocation(c,"a_position"),n=a.getAttribLocation(c,"a_color"),l=a.getUniformLocation(c,"u_view"),q=a.getUniformLocation(c,"u_proj"),p=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1]);a.enable(a.DEPTH_TEST);return function(b,d,e){a.useProgram(c);a.uniformMatrix4fv(l,!1,b||p);a.uniformMatrix4fv(q,!1,d||p);e?a.viewport.apply(a,e):a.viewport(0,0,a.canvas.width,a.canvas.height);a.vertexAttribPointer(k,3,a.FLOAT,!1,24,0);a.enableVertexAttribArray(k);
a.vertexAttribPointer(n,3,a.FLOAT,!1,24,12);a.enableVertexAttribArray(n);a.drawArrays(a.TRIANGLES,0,f.length/6)}}(l);return function(a){var b=canvas.width,f=canvas.height;k(a.leftViewMatrix,a.leftProjectionMatrix,[0,0,b/2,f]);k(a.rightViewMatrix,a.rightProjectionMatrix,[b/2,0,b/2,f])}}(gl);



renderFrameData(fd)

function animate() {
  if(display.isPresenting) display.requestAnimationFrame(animate)

  display.getFrameData(fd)


  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT)

  renderFrameData(fd)

  display.submitFrame()
}


gl.clearColor(.9,.9,.9,1)
display.requestAnimationFrame(animate)
