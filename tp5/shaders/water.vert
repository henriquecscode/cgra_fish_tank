attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform sampler2D uSampler2;
uniform float timeFactor;

varying vec2 vTextureCoord;
varying vec2 newCoords;

void main() {
    vec2 offset = mod((aTextureCoord + vec2(0.0001*timeFactor, 0.0001*timeFactor))/2.0, vec2(1.0, 1.0));

    vec4 filter = texture2D(uSampler2, offset);

    vec3 newPosition = aVertexPosition + 0.05*aVertexNormal*vec3(0.0, 0.0, filter.r);
	gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);

	vTextureCoord = aTextureCoord;
    newCoords = offset;
}

