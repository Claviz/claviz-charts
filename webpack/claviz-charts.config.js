const path = require('path');

module.exports = {
    entry: './src',
    output: {
        path: path.resolve(__dirname, '../lib'),
        filename: 'claviz-charts.bundle.js',
        libraryTarget: 'umd',
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.json']
    },
    module: {
        rules: [{
            test: /\.(ts|js)x?$/,
            exclude: /node_modules/,
            loader: 'babel-loader',
        }, {
            test: /\.css$/,
            loaders: ['style-loader', 'css-loader'],
        }],
    }
};