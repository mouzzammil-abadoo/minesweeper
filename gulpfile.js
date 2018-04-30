var gulp = require('gulp'),
    config = require('./gulp.config'),
    cleanCSS = require('gulp-clean-css'),
    templateCache = require('gulp-angular-templatecache'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    htmlmin = require('gulp-htmlmin'),
    gulpif = require('gulp-if'),
    util = require('gulp-util'),
    ngAnnotate = require('gulp-ng-annotate'),
    replace = require('gulp-replace'),
    modRewrite = require('connect-modrewrite'),
    proxyMiddleware = require('http-proxy-middleware'),
    runSequence = require('run-sequence'),
    browserSync = require('browser-sync').create(),
    reload = browserSync.reload,
    currentVersion = require('./package.json').version,
    packageName = require('./package.json').name;


gulp.task('default', ['build'], function() {
    var dist = util.env.dist;
    var port = (dist ? config.port.dist : config.port.dev);
    var folder = (dist ? 'dist/**/*' : 'dev/**/*');

    gulp.watch(['src/**/*'], function() {
        runSequence('build', reload);
    });

    browserSync.init({
        port: port,
        server: {
            baseDir: (dist ? 'dist' : 'dev')
        }
    });
});

gulp.task('build', ['vendor-css', 'styles', 'images', 'vendor-js', 'vendor-image', 'vendor-font', 'js', 'tpl', 'index'], function(done) {
    done();
});

gulp.task('styles', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.src.css)
        .pipe(concat('style.css'))
        .pipe(gulpif(dist, cleanCSS(config.cleanCSS)))
        .pipe(gulpif(dist, gulp.dest(config.dist.css), gulp.dest(config.dev.css)));

});

gulp.task('vendor-js', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.vendorJs)
        .pipe(concat('js/vendor.js'))
        .pipe(gulpif(dist, uglify({
            mangle: false
        })))
        .pipe(gulpif(dist, gulp.dest('dist'), gulp.dest('dev')));
});

gulp.task('vendor-css', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.vendorCss)
        .pipe(concat('vendor.css'))
        .pipe(gulpif(dist, cleanCSS(config.cleanCSS)))
        .pipe(gulpif(dist, gulp.dest(config.dist.css), gulp.dest(config.dev.css)));

});

gulp.task('images', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.src.image)
        .pipe(gulpif(dist, gulp.dest(config.dist.image), gulp.dest(config.dev.image)));
});
gulp.task('vendor-font', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.vendorFont)
        .pipe(gulpif(dist, gulp.dest(config.dist.font), gulp.dest(config.dev.font)));
});

gulp.task('vendor-image', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.vendorImage)
        .pipe(gulpif(dist, gulp.dest(config.dist.image), gulp.dest(config.dev.image)));
});

gulp.task('index', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.src.index)
        .pipe(replace("__version", currentVersion))
        .pipe(gulpif(dist, gulp.dest('dist'), gulp.dest('dev')));
});


gulp.task('js', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.src.js)
        .pipe(concat('js/all.js'))
        .pipe(ngAnnotate({
            add: true
        }))
        .pipe(gulpif(dist, uglify({
            mangle: false
        })))
        .pipe(gulpif(dist, gulp.dest('dist'), gulp.dest('dev')));
});

gulp.task('tpl', function() {
    var dist = util.env.dist;

    return gulp
        .src(config.src.tpl)
        .pipe(gulpif(dist, htmlmin(config.htmlmin)))
        .pipe(templateCache(config.templateCache.file, config.templateCache.option))
        .pipe(gulpif(dist, uglify()))
        .pipe(gulpif(dist, gulp.dest('dist'), gulp.dest('dev')));
});