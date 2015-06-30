var gulp = require("gulp");
var gutil = require("gulp-util");
var watch = require('gulp-watch');
var del = require('del');
var sass = require('gulp-sass');
var bower = require('gulp-bower');
var plato = require('gulp-plato');
var mocha = require('gulp-mocha');
var spawn = require('child_process').spawn;
var nodemon = require('gulp-nodemon');
var webpack = require("webpack");

// heroku cmd log: heroku logs --app  heartbit-dev  --ps web --tail
var WebpackDevServer = require("webpack-dev-server");
var webpackConfig = require("./client/webpack.config.js");

gulp.task("install", ["bower", "build"]);
gulp.task("test-client", ["mocha", "casper"]);
gulp.task("dev", ["watch-sass", 'dev-demon']);
gulp.task("build", ["clean", "sass", "build:prod"]);
gulp.task("doc", ["jsdoc"]);



gulp.task('dev-demon', function(cb) {
    nodemon({
        script: 'webserver.js',
        ignore: ['node_modules/*','client/*'],
        args: ['-d'],
        env: {
            'NODE_ENV': 'local'
        }
    });
});

gulp.task('clean', function(cb) {
    del(['./client/dist/css/*', './client/dist/js/*'], cb);
});

gulp.task('watch-sass', function() {
    gulp.watch('./client/style/**', ['sass']);
    gulp.start('sass');
});

/* Css */
gulp.task('sass', function() {
    gulp.src('./client/style/bundle/*.scss')
        .pipe(sass({errLogToConsole: true}))
        .pipe(gulp.dest('./client/dist/css/'));
});

/* Bower */
gulp.task('bower', function() { 
    return bower() .pipe(gulp.dest('./client/lib/bower_components')) ;
});


/* Webpack */
gulp.task("build:prod", function(callback) {
    // modify some webpack config options
    var myConfig = Object.create(webpackConfig);
    myConfig.debug = true;

    myConfig.plugins = myConfig.plugins.concat([
        new webpack.DefinePlugin({
            "process.env": {
                // This has effect on the react lib size
                "NODE_ENV": JSON.stringify("production")
            }
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: false,
            compress: false,
            cache: false,
            sourceMap: false
        })
    ]);

    // run webpack
    var prodCompiler = webpack(myConfig);
    prodCompiler.run(function(err, stats) {
        if (err) {
            throw new gutil.PluginError("webpack:build", err);
            console.log(err);
        }
        gutil.log("[webpack:build]", stats.toString({
            colors: true
        }));
        callback();
    });
});

// modify some webpack config options
gulp.task("build:dev", function(callback) {
    var myDevConfig = Object.create(webpackConfig);
    myDevConfig.debug = true;
    var devCompiler = webpack(myDevConfig);
    devCompiler.run(function(err, stats) {
        if (err) throw new gutil.PluginError("webpack:build-dev", err);
        gutil.log("[webpack:build-dev]", stats.toString({
            colors: true
        }));
        callback();
    });
});