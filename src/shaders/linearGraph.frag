precision mediump float;
#define PI 3.1459265359
varying vec2 vUv;

//plot a line on y using value between 0.0 - 1.0
float plot(vec2 st, float pct) {
    // return smoothstep(0.02, 0.0, abs(st.y - st.x));
    return smoothstep(pct-0.02, pct, st.y)-smoothstep(pct,pct+0.02,st.y);
}

void main() {
    vec2 uv = vUv;
    // float y = uv.x;
    float y = smoothstep(.1,.9,uv.x);
    vec3 color = vec3(y);

    //plot a line
    float pct = plot(uv,y);
    color = (1.0-pct)*color+pct*vec3(0.0,1.0,0.0);

    gl_FragColor = vec4(color,1.0);
} 