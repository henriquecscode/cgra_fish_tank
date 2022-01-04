#ifdef GL_ES
precision highp float;
#endif

varying vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform sampler2D uSampler2;
uniform float timeFactor;
uniform float distortionScale;


void main(){
    vec4 filter = texture2D(uSampler2, vTextureCoord);
	vec2 timeOffset = 0.03*vec2(sin(timeFactor/10.0), cos(timeFactor/20.0));
	vec2 newCoords = mod((vTextureCoord + timeOffset), vec2(1.0, 1.0));

	vec2 distOffset = vec2(distortionScale * (filter.r - 0.5), distortionScale * (filter.g - 0.5));

	newCoords += distOffset;

    gl_FragColor = texture2D(uSampler, newCoords);
}
