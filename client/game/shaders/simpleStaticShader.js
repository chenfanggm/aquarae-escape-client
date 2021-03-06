
const vSource = `#version 300 es
  precision mediump float;
  
  layout(location = 0) in vec3 vPosition;
  layout(location = 1) in vec3 aColorCoord;
  out vec3 vColorCoord;
  uniform mat4 mvpMatrix;
  
  void main() {
    vColorCoord = aColorCoord;
    gl_Position = mvpMatrix * vec4(vPosition, 1.0);
  }
`;

const fSource = `#version 300 es
  precision mediump float;
  
  in vec3 vColorCoord;
  out vec4 outColor;
  
  void main() {
    outColor = vec4(vColorCoord, 1);
  }
`;

export default {
  name: 'simpleStandardShader',
  vSource,
  fSource
};