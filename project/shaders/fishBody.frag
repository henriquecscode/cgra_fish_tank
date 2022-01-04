#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec4 vFinalColor;
varying vec3 vertexPosition;

uniform sampler2D uSampler;
uniform float bodyTextRatio;
uniform vec4 fishColor;
uniform bool useTexture;

void main() {
	if (vertexPosition.x < bodyTextRatio && useTexture)
        gl_FragColor = texture2D(uSampler, vTextureCoord);

    else
        gl_FragColor = vFinalColor * fishColor;
}
