#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;
varying vec2 newCoords;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;

void main() {
	vec4 color = texture2D(uSampler, vTextureCoord);
	vec4 filter = texture2D(uSampler2, newCoords);
	
	gl_FragColor = color - vec4(0.3*filter.r, 0.3*filter.r, 0.3*filter.r, 0.0);
}