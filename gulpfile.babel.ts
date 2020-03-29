import gulp, { dest, series, src } from 'gulp';
import extensions from './src';
import { Extension } from 'types/extension';
import fs from 'fs-extra';
import pkg from './package.json';
// @ts-ignore
const { outputDirectory } = pkg.config;

gulp.task('export:extensions:dashboard', () => {
  try {
    return src(pkg.main).pipe(dest('../dashboard/storage/app/extensions/'));
  } catch (error) {
    throw error;
  }
});

gulp.task('prebuild:empty-directory', done => {
  try {
    // @ts-ignore
    return fs.emptyDir(outputDirectory);
  } catch (error) {
    throw error;
  }
});

gulp.task('build:declaration:move', done => {
  try {
    fs.copySync(`${outputDirectory}/src`, outputDirectory);
    fs.removeSync(`${outputDirectory}/src`);
    done();
  } catch (error) {
    throw error;
  }
});

gulp.task('build:extensions:json', done => {
  try {
    const collection = extensions.manager.extensions.map(
      (extension: Extension) => {
        return extension.toObject();
      }
    );
    fs.writeFileSync(
      `${outputDirectory}/imports.json`,
      JSON.stringify(collection)
    );
    done();
  } catch (error) {
    throw error;
  }
});

gulp.task('export:extensions:json', () => {
  try {
    return src(`${outputDirectory}/imports.json`).pipe(
      dest('../dashboard/storage/app/extensions/')
    );
  } catch (error) {
    throw error;
  }
});

gulp.task('prebuild', series('prebuild:empty-directory'));

gulp.task(
  'postbuild',
  series(
    'export:extensions:dashboard',
    'build:extensions:json',
    'export:extensions:json',
    'build:declaration:move'
  )
);

export default gulp;
