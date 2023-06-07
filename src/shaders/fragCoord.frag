precision mediump float;

varying vec2 vUv;

void main() {
    vec2 uv = vUv;
    gl_FragColor = vec4(uv.xy, 0, 1.0);
} 