
export interface IGeometry {
    vertices: Array<Number>,
    normals: Array<Number>,
    indices: Array<Number>,
    uvs?: number[]
}

export function createCylinder(height: number, radiusBase: number) : IGeometry {
    let longitudeBands = 30;
    let vertexPositionData = [];
    let normals = [];
    let indices = [];
    // divide the 
    let radialSplits = 30;
    for(let i = 0; i <= radialSplits; ++i ){
        let theta = i * Math.PI * 2.0 / radialSplits;
        let xb = radiusBase * Math.cos(theta);
        let yb = radiusBase * Math.sin(theta);
    }
    return {
        vertices : vertexPositionData,
        normals : normals,
        indices : []
    };
}

export function createSphere(radius: number = 2): IGeometry {
    var latitudeBands = 30;
    var longitudeBands = 30;

    var vertexPositionData: Number[] = [];
    var normalData: Number[] = [];
    var textureCoordData = [];
    for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        var theta = latNumber * Math.PI / latitudeBands;
        var sinTheta = Math.sin(theta);
        var cosTheta = Math.cos(theta);

        for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

            normalData.push(x, y, z);
            textureCoordData.push(u, v);
            vertexPositionData.push(radius * x, radius * y, radius * z);
        }
    }

    var indexData: Number[] = [];
    for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first, second, first + 1);
            indexData.push(second, second + 1, first + 1);
        }
    }
    return {
        vertices: vertexPositionData,
        normals: normalData,
        indices: indexData,
        uvs: textureCoordData
    }
}

export function createRect(sz: number): IGeometry {
    let vertices = [
        -sz, -sz, 0,
        sz, -sz, 0,
        sz, sz, 0,
        -sz, sz, 0
    ];
    let indices = [
        0, 1, 2,
        2, 3, 0
    ];

    let normals = [
        0, 0, 1,
        0, 0, 1,
        0, 0, 1,
        0, 0, 1
    ];

    return {
        vertices: vertices,
        indices: indices,
        normals: normals
    };
}

export function createHat():IGeometry{
    var nCols : number = 50;
    var nRows : number = 50;

    var data = new Array(nRows);
    for(let i = 0 ; i < nRows; i++){ 
            data[i] = new Array(nCols);
    }
    for(let i = 0; i < nRows; ++i ){
        let x = Math.PI * (4*i/nRows - 2.0);
        for(let j = 0 ; j < nCols; ++j ){
            let y = Math.PI * (4*j/nCols - 2.0 );
            let r = Math.sqrt(x*x + y*y);

            if(r) data[i][j] = Math.sin(r) / r;
            else data[i][j] = 1;
        }
    }
    
    return null;
}
