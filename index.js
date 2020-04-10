var es = require("event-stream"),
  gutil = require("gulp-util"),
  File = gutil.File,
  PluginError = gutil.PluginError,
  crypto = require("crypto");

module.exports = function (juiceInstance) {
  return function (options) {
    options = options || {};
    return es.map(function (file, fn) {
      juiceInstance.juiceResources(file.contents.toString(), options, function (
        err,
        html
      ) {
        if (err) return fn(err);
        file.contents = new Buffer(html);
        fn(null, file);
      });
    });
  };
};
