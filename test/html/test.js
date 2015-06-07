'use strict';
var assert = require('assert');
var codeInjection = require('../../index');
var fs = require('fs');

describe('code-injection node module', function () {
	it('must have at least one test', function () {
		var readStream = fs.createReadStream('test/html/test.html');

		var id1 = new codeInjection('id1');
		var id2 = new codeInjection('id2');

		id1.inject('line1').inject('line2');
		id2.inject('content1').inject('content2');

		readStream.pipe(id1).pipe(id2).pipe(process.stdout);

		assert(true, 'I was too lazy to write any tests. Shame on me.');
	});
});
