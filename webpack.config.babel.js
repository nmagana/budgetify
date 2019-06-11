import path from 'path';
const publicPath = path.join(__dirname, 'public');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
module.exports = (env) => {
    const isProduction = env === 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
    entry: "./src/app.js",
    output: {
        path: publicPath,
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/
        },
        {
           use: CSSExtract.extract({
            use: [
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    },
                    
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
           }),
           test: /\.s?css$/
        }
    ]
    },
    plugins: [
        CSSExtract
    ],
    devtool: isProduction ? 'source-map' : 'inline-source-map',
    devServer: {
        contentBase: publicPath
    },
    mode: isProduction ? 'production' : 'development',
    performance: {
        hints: false
    }
}};