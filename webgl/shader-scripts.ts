
function createShader(gl: WebGLRenderingContext, src: string, shaderType: number): WebGLShader {
    let shader = gl.createShader(shaderType);
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    let param = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
    console.log(gl.getShaderInfoLog(shader));
    return shader;
}

export function createProgram(gl: WebGLRenderingContext, vsrc: string, fsrc: string): WebGLProgram {
    // Get the vertex and fragment shaders
    let vs = createShader(gl, vsrc, gl.VERTEX_SHADER);
    let fs = createShader(gl, fsrc, gl.FRAGMENT_SHADER);
    let prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    console.log(gl.getProgramInfoLog(prog));
    return prog;
}
