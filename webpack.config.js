var webpack = require('webpack');

var path = require('path');
var node_modules = path.resolve(__dirname, 'node_modules');

module.exports = {
    entry: {
        build: './src/js/index.js'
    },
    output: {
        filename: '[name].js',
        path: path.join(__dirname, './src/js')
    },
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                query: {
                    presets: ['es2015']
                }
            }, {
                test: /\.(png|jpe?g|gif)(\?.*)?$/,
                loader: 'url-loader',
                query: {
                    limit: 10000,
                    name: 'images/version/[name].[hash:7].[ext]'
                }
            }, {
                test: /\.(woff|woff2|ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
                loader: 'file-loader?name=./fonts/[name].[ext]'
            }
        ]
    },
    devServer: {},
    context: path.resolve('./'),
    plugins: [
        // new webpack.optimize.UglifyJsPlugin({  //压缩代码
        //     compress: {
        //         warnings: false
        //     }
        // })
    ]
};