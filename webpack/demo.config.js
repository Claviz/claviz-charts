const path = require('path');

module.exports = {
    entry: './demo',
    output: {
        path: path.resolve(__dirname, '../demo/build'),
        filename: 'index.bundle.js'
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