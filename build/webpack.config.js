const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require('autoprefixer');
const isDevelopment = process.env.NODE_ENV !== 'production';
module.exports = {
    entry: {
        bundle: './src/index.js'
    } ,
    output: {
        path: path.resolve(__dirname, '../dist')
    },
    devServer: {
        port: 2000,
        open: true,
        hot: true,
        contentBase: path.join(__dirname, "../src"),
    },
    module: {
        rules: [
            { test: /\.handlebars$/, loader: "handlebars-loader" },
            {
                test: /\.(scss|css)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: "css-loader",
                        options: {
                            sourceMap: isDevelopment,
                            minimize: !isDevelopment
                        }
                    },
                    {
                        loader: "postcss-loader",
                        options: {
                            autoprefixer: {
                                browsers: ["last 2 versions"]
                            },
                            sourceMap: isDevelopment,
                            plugins: () => [
                                autoprefixer
                            ]
                        },
                    },
                    {
                        loader: "sass-loader",
                        options: {
                            sourceMap: isDevelopment
                        }
                    }
                ]
            },
            {
                test: /\.(jpg|png|gif)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'static/',
                            useRelativePath: true,
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                          mozjpeg: {
                            progressive: true,
                            quality: 65
                          },
                          optipng: {
                            enabled: true,
                          },
                          pngquant: {
                            quality: '65-90',
                            speed: 4
                          },
                          gifsicle: {
                            interlaced: false,
                          },
                          webp: {
                            quality: 75
                          }
                        }
                    }
                ]
            }
        ] 
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
              handlebarsLoader: {}
            }
          }),
          new MiniCssExtractPlugin({
            filename: "[name]-styles.css",
            chunkFilename: "[id].css"
          }),  
         
        new HtmlWebpackPlugin({
            title: 'Webpack 4',
            template: './src/index.handlebars',
            minify: !isDevelopment && {
                html5: true,
                collapseWhitespace: true,
                caseSensitive: true,
                removeComments: true,
                removeEmptyElements: true
            },
})
      ]
  };