//解决IE10以下不支持Function.bind
// if (!Function.prototype.bind) {
//   Function.prototype.bind = function(oThis) {
//     if (typeof this !== 'function') {
//       throw new TypeError('Function.prototype.bind - what is trying to be bound is not callable');
//     }
//     var aArgs = Array.prototype.slice.call(arguments, 1),
//       fToBind = this,
//       fNOP = function() {},
//       fBound = function() {
//         return fToBind.apply(
//           this instanceof fNOP && oThis ? this : oThis,
//           aArgs.concat(Array.prototype.slice.call(arguments))
//         );
//       };
//     fNOP.prototype = this.prototype;
//     fBound.prototype = new fNOP();
//     return fBound;
//   };
// }
var React = require('anujs/dist/ReactIE');
var ReactDOM = require('anujs/dist/ReactIE.js');

var Routes = require('./routes');

if (typeof window !== 'undefined') {
  var container = document.getElementById('mainContainer');
  ReactDOM.render(<Routes />, container);
}
