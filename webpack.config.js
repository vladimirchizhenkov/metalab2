const path = require('path');

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");

module.exports = {
    entry: {
        main: path.resolve(__dirname, './src/index.js')
    },
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
        clean: true
    },
    mode: 'development',
    devServer: {
        historyApiFallback: true,
        open: true,
        compress: true,
        hot: true,
        port: 8080,
        static: {
            directory: path.join(__dirname, './src')
        }
    },
    module: {
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader"
                ]
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name:'[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/pug/pages/index.pug'),
            inject: 'body',
            minify: false
        }),
        new HtmlWebpackPugPlugin()
    ]
}