'use strict';

var Transform = require('stream').Transform;
var util = require('util');
var os = require('os');

util.inherits(CodeInjection, Transform);

function CodeInjection(injectionId, opt) {
  this._bIsInjectionOpen = false;
  this._injectionId = injectionId;
  this._injectContentList = [];

  Transform.call(this, opt);
}

CodeInjection.prototype._transform = function(chunk, _, next) {
  var chunkString = chunk.toString();
  var lineSplit = chunkString.split(/\r\n|\n/);
  var lineCount = lineSplit.length;
  var ouput = [];

  for(var i = 0; i < lineCount; i++) {
    var line = lineSplit[i];

    // injection comment check
    if(line.indexOf('@injection:' + this._injectionId) > 0) {
      ouput.push(line);
      ouput.push(this._injectContentList.join(/\r\n|\n/));

      this._bIsInjectionOpen = true;
    } else if(line.indexOf('injection@') > 0) {
      ouput.push(line);
      this._bIsInjectionOpen = false;
    } else {
      if(this._bIsInjectionOpen === false) {
        ouput.push(line);
      }
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
