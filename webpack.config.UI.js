var path = require("path");
const MergeIntoSingleFilePlugin = require('webpack-merge-and-include-globally');
const CopyWebpackPlugin = require('copy-webpack-plugin');

var mergeFilesPlugin = new MergeIntoSingleFilePlugin({
    files: {
        "js/vendor.js": [
            // path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            path.resolve(__dirname, 'node_modules/materialize-css/dist/js/materialize.min.js'),
        ],
        "css/vendor.css": [
            path.resolve(__dirname, 'node_modules/materialize-css/dist/css/materialize.min.css'),
            path.resolve(__dirname, 'node_modules/font-awesome/css/font-awesome.css'),
        ]
    }
});

var copyAssetsPlugin = new CopyWebpackPlugin(
    [
        { from: path.resolve(__dirname, 'node_modules/font-awesome/fonts'), to: 'fonts' },
    ]
);

module.exports = [{
    mode: "development",
    entry: {
        main: path.resolve(__dirname, "app/index.js"),
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].umd.js',
        libraryTarget: "umd"
    },
    plugins: [mergeFilesPlugin, copyAssetsPlugin]
},
{
    mode: "production",
    entry: path.resolve(__dirname, "app/index.js"),
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].umd.min.js',
        libraryTarget: "umd"
    },
    plugins: [mergeFilesPlugin, copyAssetsPlugin]
}];