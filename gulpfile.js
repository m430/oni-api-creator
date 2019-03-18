const gulp = require('gulp');
const babel = require('gulp-babel');
const rimraf = require('rimraf');
const runCmd = require('./utils/runCmd');
const { execSync } = require('child_process');
const packageJson = require('./package.json');

function tag() {
  console.log('tagging');
  const { version } = packageJson;
  execSync(`git tag ${version}`);
  execSync(`git push origin ${version}:${version}`);
  execSync('git push origin master:master');
  console.log('tagged');
}

gulp.task('default', (done) => {
  rimraf.sync('lib');
  gulp.src('src/**/*.js')
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.src('src/**/*.d.ts'))
    .pipe(gulp.dest('lib'))
    .on('finish', done)
});

gulp.task(
  'check-git',
  gulp.series(done => {
    runCmd('git', ['status', '--porcelain'], (code, result) => {
      if (/^\?\?/m.test(result)) {
        return done(`There are untracked files in the working tree.\n${result}
      `);
      }
      if (/^([ADRM]| [ADRM])/m.test(result)) {
        return done(`There are uncommitted changes in the working tree.\n${result}
      `);
      }
      return done();
    });
  })
);

gulp.task('publish',
  gulp.series('check-git', 'default', done => {
    tag();
    runCmd('npm', ['publish'], (code) => {
      console.log(`npm publish version ${packageJson.version} successfully`);
      done(code);
    });
    done();
  })
)