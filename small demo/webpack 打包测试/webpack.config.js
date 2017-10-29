const path = require('path');

 module.exports = {
     entry: './js/commerJS/commer.js',
     output: {
         path: path.resolve(__dirname, './js/commerJS'),
         filename: 'app.min.js'
     }
 };