import gulp, { dest, series, src } from 'gulp';
import extensions from './src';
import { Extension } from 'types/extension';

gulp.task('export:extensions:dashboard', () => {
  try {
    return src('dist/index.js').pipe(
      dest('../dashboard/storage/app/extensions/')
    );
  } catch (error) {
    throw error;
  }
});

gulp.task('build:extensions:json', done => {
  try {
    const collection = extensions.manager.extensions.map(
      (extension: Extension) => {
        return extension;
      }
    );
    require('fs').writeFileSync(
      'dist/imports.json',
      JSON.stringify(collection)
    );
    done();
  } catch (error) {
    throw error;
  }
});

gulp.task('export:extensions:json', () => {
  try {
    return src('dist/imports.json').pipe(
      dest('../dashboard/storage/app/extensions/')
    );
  } catch (error) {
    throw error;
  }
});

gulp.task(
  'postbuild',
  series(
    'export:extensions:dashboard',
    'build:extensions:json',
    'export:extensions:json'
  )
);

export default gulp;
