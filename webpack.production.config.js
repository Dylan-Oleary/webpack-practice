const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//Loaders vs Plugins
//Loaders - import different files
//Plugins - everything else (minification, generate new files other than bundle.js, define global constants etc)

module.exports = {
    //Entry point
    entry: {
        "hello-webpack": "./src/hello-webpack.js",
        "image": "./src/image.js"
    },
    //Output File - specifies the name of the generated file and path to the directory where it will generate
    output: {
        filename: "[name].[contenthash].js", //[name] will check whatever entry it is trying to output and put its name in place of [name]
        path: path.join(__dirname, "/dist"),
        publicPath: ""
    },
    mode: "production", //Sets the NODE_ENV,
    optimization: {
        splitChunks: {
            chunks: "all", //Load in common dependencies - this will ensure that the user doesn't need to download it each time one of our own JS files change that use the dependency
            minSize: 7000, //the threshold at which we should bundle common dependencies separately
            automaticNameDelimiter: "_"
        }
    },
    module: {
        rules: [
            //Every time we try to import a file (in this case - an image), Webpack will check if it has a rule for it
            //if it doesn't have a rule, it will throw an error
            //If it does have a rule - it will import the file according to the rule
            {
                test: /\.(png|jpg)$/,
                use: [
                    "file-loader"
                ]
            },
            {
                test: /\.css$/,
                //We can also combine multiple loaders into one rule...
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader" //Reads our CSS from the file
                ]
            },
            {
                test: /\.scss$/,
                //We can also combine multiple loaders into one rule...
                use: [
                    //Webpack processes loaders from right to left (bottom to top)
                    MiniCssExtractPlugin.loader,
                    "css-loader", //Reads our CSS from the file
                    "sass-loader" //Convert sass to css
                ]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                        //ENV helps compile ECMAScript 6+ down to ECMAscript 5
                        presets: [ "@babel/env" ],
                        plugins: [ "transform-class-properties" ]
                        }
                    }
                ]
            },
            {
                test: /\.hbs$/,
                use: [
                    "handlebars-loader"
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({ //extracts CSS into a seperate file
            filename: "[name].[contenthash].css"
        }),
        new CleanWebpackPlugin({
            cleanOnceBeforeBuildPatterns: [
                "**/*", //Remove all files together with sub-directories inside of the .dist folder, no matter how many nesting levels there are
                path.join(process.cwd(), "build/**/*") //Remove all files together with subdirectories in the build directory
            ]
        }), //Clean outpath.path folder (./dist) - removes all of the bundled files from the folder before adding our new bundled files
        new HtmlWebpackPlugin({ //Generate index.html automatically inside of our /dist folder
            filename: "hello-webpack.html",
            title: "Hello Webpack",
            template: "src/page-template.hbs",
            description: "I can ride my bike with no handlebars!",
            chunks: [
                "hello-webpack",
                "vendors~hello-webpack~image"
            ] //What bundles to load in for this page
        }),
        new HtmlWebpackPlugin({
            filename: "image-test.html",
            title: "Image test",
            template: "src/page-template.hbs",
            description: "Image Testing!",
            chunks: [
                "image"
            ]
        })
    ]
}