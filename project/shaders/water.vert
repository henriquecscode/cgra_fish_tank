attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

varying vec2 vTextureCoord;

void main() {
    vTextureCoord = aTextureCoord;
	vec4 vVertexPosition = uPMatrix * uMVMatrix * vec4(aVertexPosition, 1.0);
	gl_Position = vVertexPosition;
}
