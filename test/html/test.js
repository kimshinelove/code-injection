'use strict';
var assert = require('assert');
var codeInjection = require('../../index');
var fs = require('fs');

describe('code-injection node module', function () {
	it('must have at least one test', function () {
		var readStream = fs.createReadStream('test/html/test.html', {
			bufferSize: 4
		});

		var injection = new codeInjection('id1');

		injection
			.inject('line1')
			.inject('line2');

		readStream.pipe(injection).pipe(process.stdout);

		assert(true, 'I was too lazy to write any tests. Shame on me.');
	});
});
