#ifdef GL_ES
precision highp float;
#endif

varying vec4 vTexturePos;

void main() {
    if (vTexturePos.y >= 0.5)
        gl_FragColor =  vec4(0.9,0.9,0.1, 1.0);
    else
        gl_FragColor =  vec4(0.5,0.5,1.0, 1.0);
}
