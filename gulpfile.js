const gulp = require('gulp');
const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const goodFences = require('good-fences');

gulp.task('check-fences', function() {
    return new Promise((resolve, reject) => {
        const result = goodFences.run({rootDir: './'});
        if (result.errors && result.errors.length > 0) {
            const message = result.errors.map(err => err.detailedMessage).join('\n');
            return reject(new Error(message));
        } else {
            resolve();
        }
    });
});

gulp.task('build', gulp.series('check-fences', assets));
gulp.task('default', gulp.series('build'));

function assets() {
    return new Promise((resolve, reject) => {
        webpack(webpackConfig, (err, stats) => {
            if (err) {
                return reject(err)
            }
            if (stats.hasErrors()) {
                return reject(new Error(stats.compilation.errors.join('\n')))
            }
            resolve()
        })
    })
}