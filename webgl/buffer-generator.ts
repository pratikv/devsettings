
export function createArrayBuffer(gl: WebGLRenderingContext, arr: Array<any>) : WebGLBuffer{
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr), gl.STATIC_DRAW);
    return buffer;
}

export function createElementArrayBuffer(gl: WebGLRenderingContext, arr: Array<any>) : WebGLBuffer{
    var buffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(arr), gl.STATIC_DRAW);
    return buffer;
}