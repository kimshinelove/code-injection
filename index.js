'use strict';

var Transform = require('stream').Transform;
var util = require('util');
var os = require('os');

util.inherits(CodeInjection, Transform);

function CodeInjection(injectionId, opt) {
  this._injectionId = injectionId;
  this._injectContentList = [];

  Transform.call(this, opt);
}

CodeInjection.prototype._transform = function(chunk, _, next) {
  var chunkString = chunk.toString();
  var lineSplit = chunkString.split(os.EOL);
  var lineCount = lineSplit.length;
  var ouput = [];

  for(var i = 0; i < lineCount; i++) {
    var line = lineSplit[i];

    // injection comment check
    if(line.indexOf('@injection:' + this._injectionId) > 0) {
      ouput.push(line);
      ouput.push(this._injectContentList.join(os.EOL));
    } else {
      ouput.push(line);
    }
  }

  this.push(ouput.join(os.EOL));

  next();
};

CodeInjection.prototype.inject = function(somecontent) {
  this._injectContentList.push(somecontent);

  return this;
};

module.exports = CodeInjection;
