/*
This file is for client side development using React, bootstrap and typescript
npm install --save react react-dom 
npm install --save-dev gulp gulp-typescript gulp-sourcemaps gulp-connect browserify reactify vinyl-source-stream gulp-concat vinyl-buffer bootstrap jquery
*/


"use strict";
var gulp = require("gulp");
var tsc = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var connect = require("gulp-connect"); // run a local dev server
var browserify = require("browserify");
var reactify = require("reactify");
var source = require("vinyl-source-stream");
var concat = require("gulp-concat"); // concats files
var buffer = require("vinyl-buffer");

var tsProject = tsc.createProject('tsconfig.json', { sortOutput: true });

var config = {
    port: "",
    devBaseUrl: "", //'http://localhost'
    paths: {
        html: "./*.html",
        js: "./scripts/**/*.js",
        jsx: "./scripts/**/*.jsx",
        ts: "./scripts/**/*.ts",
        tsx: "./scripts/**/*.tsx",
        css: [
            "node_modules/bootstrap/dist/css/bootstrap.min.css",
            "node_modules/bootstrap/dist/css/bootstrap-theme.min.css"
        ],
        images: "./src/images/*",
        dist: "./dist",
        mainJs: "./scripts/app.js"
    }
}

gulp.task('compile-ts', function () {
 var errors = 0;
    var tsResult = tsProject.src()//gulp.src()
                       .pipe(sourcemaps.init())
        .pipe(tsc(tsProject))
        .on("error", function() {
            errors++;
        })
        .on("finish", function() {
            if (errors !== 0) {
                console.error("Typescript error(s) found. Build Failed");
                process.exit(1);
            }
        });
    
    tsResult.dts.pipe(gulp.dest("./"));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest("./"));
						
//    var tsResult = tsProject.src()//gulp.src()
//        .pipe(sourcemaps.init())
//        .pipe(tsc(tsProject));
//
//    tsResult.dts.pipe(gulp.dest("./"));
//    return tsResult.js
//        .pipe(sourcemaps.write('.'))
//        .pipe(gulp.dest("."))
//        .pipe(connect.reload());
});


gulp.task("connect", function () {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task("html", function () {
    gulp
        .src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task("js", function () {
    browserify({
        entries: config.paths.mainJs,
        debug: true
    })
        .bundle()
        .on("error", console.error.bind(console))
        .pipe(source("bundle.js"))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.paths.dist + "/scripts"))
        .pipe(connect.reload());
})

gulp.task("css", function () {
    gulp.src(config.paths.css)
        .pipe(concat("bundle.css"))
        .pipe(gulp.dest(config.paths.dist + "/css"));
});

gulp.task("images", function () {
    gulp.src(config.paths.images)
        .pipe(gulp.dest(config.paths.dist + "/images"))
        .pipe(connect.reload());

    gulp.src("./src/favicon.ico")
        .pipe(gulp.dest(config.paths.dist));

});

gulp.task("watch", function () {
    gulp.watch(config.paths.html, ["html"]);
    gulp.watch(config.paths.js,  ["js"]);
    gulp.watch(config.paths.jsx, ["js"]);
    gulp.watch(config.paths.ts,  ["compile-ts"]);
    gulp.watch(config.paths.tsx, ["compile-ts"]);
})

gulp.task("default", ["html", "compile-ts","js", "css", "images", "connect", "watch"]);
