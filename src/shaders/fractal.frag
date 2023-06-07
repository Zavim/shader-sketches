precision mediump float;

uniform vec3 u_scale;
uniform float u_time;

varying vec2 vUv;

vec3 pallete(float t) {
    // vec3 dc = vec3(0.5, 0.5, 0.5);
    // vec3 amp = vec3(0.5, 0.5, 0.5);
    // vec3 freq = vec3(1., 1., 1.);
    // vec3 phase = vec3(.263, .416, .557);

    // vec3 dc = vec3(1.308, 0.318, 0.120);
    // vec3 amp = vec3(-.941, 0.538, 3.138);
    // vec3 freq = vec3(1.378, 0.548, 0.278);
    // vec3 phase = vec3(-2.481, -1.952, -4.045);
    
    vec3 dc = vec3(1., 0.5, 0.120);
    vec3 amp = vec3(-1., 0.5, .5);
    vec3 freq = vec3(1., 0.5, 0.278);
    vec3 phase = vec3(-.5, -2., -1.);

    return dc + amp * cos(6.28318 * (freq * t + phase));
}

void main() {
    vec2 uv = (vUv * 2.0 * u_scale.xy - u_scale.xy) / u_scale.y; //center coords, change range from [-.5, .5] to [-1, 1], adjust for scale
    vec2 uv0 = uv; //keep track of OG uv
    vec3 finalColor = vec3(0.0);

    for (float i=0.; i < 4.; i++) {
        uv = fract(uv * 1.5) - .5; //scale to prep for repetitions, center uvs

        float d = length(uv) * exp(-length(uv0));
        vec3 col = pallete(length(uv0) + i * .4 + u_time * .4); 
    
        d = sin(d*8. + u_time)/8.; //animation
        d = abs(d);
        d = pow(.01 / d, 1.3); //use power func to mute darks but leave lights

        finalColor += col * d;
    }

    gl_FragColor = vec4(finalColor, 1.0);
} 