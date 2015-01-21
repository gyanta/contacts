var pickFiles   = require('broccoli-static-compiler'),
    concatenate = require('broccoli-concat'),
    uglifyJs    = require('broccoli-uglify-js'),
    mergeTrees  = require('broccoli-merge-trees'),
    concatenate = require('broccoli-concat'),
    app = 'app',
    apphtml,
    appjs,
    libjs,
    appCss;

appHtml = pickFiles(app, {
        srcDir  : '/',
        files   : ['index.html', '**/*.html'],
        destDir : '/'
});

appJs = concatenate(app, {
        inputFiles : ['**/*.js'],
        outputFile : '/app.js'
});

libjs = pickFiles('bower_components', {
        srcDir: '/',
        destDir: '/lib'
});

appJs = uglifyJs(appJs, {
    compress: true
});

appCss = pickFiles('css', {
        srcDir  : '/',
        files   : ['**/*.css'],
        destDir : '/css'
});


module.exports = mergeTrees([appHtml, appJs, libjs, appCss], {overwrite: true});