//  "devDependencies": {
//    "awesome-typescript-loader": "1.1.1",
//    "typescript": "^1.8.10",
//    "webpack": "^1.13.2"
//  }

module.exports = {

    entry : {
        app : "./app.ts"
    },

    output : {
        path : "./dist",
        filename : "bundle.js"
    },

    // Currently we need to add '.ts' to the resolve.extensions array.
    resolve: {
        extensions: ['', '.ts', '.js']
    },

    // Source maps support ('inline-source-map' also works)
    devtool: 'source-map',

    // Add the loader for .ts files.
    module: {
        loaders: [
            {
                test: /\.ts$/,
                loader: 'awesome-typescript-loader'
            }
        ]
    }
};