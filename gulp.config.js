module.exports = {

    port: {
        dist: 4501,
        dev: 4500
    },
    src: {
        css: ['src/assets/css/*.css'],
        image: ['src/assets/images/**/*'],
        tpl: [
            'src/app/tpl/**/*.html'
        ],
        js: ['src/app/app.js', 'src/app/**/*.js'],
        index: 'src/index.html'
    },
    path: {
        dist: 'dist/'
    },
    dist: {
        css: 'dist/assets/css',
        font: 'dev/assets/fonts',
        image: 'dist/assets/images'
    },
    dev: {
        css: 'dev/assets/css',
        font: 'dev/assets/fonts',
        image: 'dev/assets/images'
    },
    cleanCSS: {
        compatibility: 'ie8'
    },
    templateCache: {
        file: 'js/templates.js',
        option: {
            module: 'Minesweeper',
            root: 'tpl'
        }
    },
    htmlmin: {
        collapseWhitespace: true
    },
    vendorCss: [
        'bower_components/angular-material/angular-material.min.css',
    ],
    vendorJs: [
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-animate/angular-animate.min.js',
        'bower_components/angular-aria/angular-aria.min.js',
        'bower_components/angular-messages/angular-messages.min.js',
        'bower_components/angular-material/angular-material.min.js',
        'bower_components/lodash/dist/lodash.min.js'
    ],
    vendorFont: [],
    vendorImage: []
};