
var gulp   = require( 'gulp' ),
    server = require( 'gulp-develop-server' )
    jshint = require('gulp-jshint');
   
gulp.task('lint', function() {
  return gulp.src('nodeHttpServer.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});
   
    // run server
gulp.task( 'server:start', function() {
    server.listen( { path: './nodeHttpServer.js' } );
});
 
// restart server if files changed
gulp.task( 'server:restart', function() {
    gulp.watch( [ './nodeHttpServer.js', './Services/Dropbox/DropboxAPI.js', './Services/GastosMensuales/GoogleDriveAPI-new.js' ], server.restart );
});

gulp.task('default', ['lint','server:start','server:restart']);


