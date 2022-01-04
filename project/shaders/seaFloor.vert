attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;

uniform sampler2D uSampler2;
uniform float offset;
uniform float maxHeight;

varying vec2 vTextureCoord;

void main() {
    vec4 filter = texture2D(uSampler2, aTextureCoord);

    vec3 newPosition = aVertexPosition;

    // The plan is rotated, so -z = +y
    if (filter.g > 0.49)
        newPosition -= aVertexNormal*vec3(0.0, 0.0, offset);
    if (newPosition.z < -maxHeight) newPosition.z = -maxHeight;

	gl_Position = uPMatrix * uMVMatrix * vec4(newPosition, 1.0);
	vTextureCoord = aTextureCoord;
}
