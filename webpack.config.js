const htmlwebpackplugin=require("html-webpack-plugin");
const cleanwebpackplugin=require("clean-webpack-plugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack=require('webpack');

module.exports={
    entry:{
        index:"./app/js/index.js",
        product:"./app/js/product.js",
        vendor:["jquery","bootstrap/dist/js/bootstrap.js"]
    },
    output:{
        path:__dirname+"/dist",
        filename:"js/[name][hash].js"
    },
    module:{
        rules:[
              {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract( 'css-loader')
              },
            {
              test: /\.scss$/,
              loader: ExtractTextPlugin.extract( 'css-loader!sass-loader')
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        outputPath: 'img/'
                    }
                  }
                ]
            },
            {
                test: /\.(htm|html)$/i,
                use:[ 'html-withimg-loader'] 
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
        inline: true
    },
    plugins:[
        new cleanwebpackplugin(['dist']),
        new htmlwebpackplugin({
            filename:"index.html",
            template:"app/index.html",
            chunks:["vendor","index"]
        }),
        new htmlwebpackplugin({
            filename:"product.html",
            template:"app/product.html",
            chunks:["vendor","product"]
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProvidePlugin({
          Popper: ['popper.js', 'default'],
        }),
        new ExtractTextPlugin('css/[name].min.css')
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all"
                }
            }
        }
    }

};