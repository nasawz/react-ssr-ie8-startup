const path = require('path');
const __basename = path.dirname(__dirname);

const config = {
  port: 8080,
  __basename: __basename,
  webpack: {
    path: {
      src: path.resolve(__basename, 'src/client'),
      pub: path.resolve(__basename, 'dist'),
      build: path.resolve(__basename, 'build')
    }
  }
};
module.exports = config;
