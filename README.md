#  [![NPM version][npm-image]][npm-url] [![Dependency Status][daviddm-image]][daviddm-url]

> 소스의 특정 영역에 원하는 컨텐츠를 주입하고자 할 때 사용할 수 잇는 모듈


## Install

```sh
$ npm install --save code-injection
```


## Usage
코드를 주입하고자 하는 영역을 아래와 같은 형태로 주석 추가

```html
<!DOCTYPE html>
<html>
<head lang="en">
  <meta charset="UTF-8">
  <title></title>
  <script src="../../bower_components/jquery/dist/jquery.min.js"></script>
</head>
<body>
  <!-- @injection:id1 -->

  <!-- injection@ -->


  <!-- @injection:id2 -->

  <!-- injection@ -->
</body>
</html>

```

상단에 지정한 아이디로 codeInjection 생성 후 코드 추가

```js
// load module
var codeInjection = require('code-injection');

// create target read stream
var readStream = fs.createReadStream('test/html/test.html');

// @c
var id1 = new codeInjection('id1');
var id2 = new codeInjection('id2');

id1.inject('line1').inject('line2');
id2.inject('content1').inject('content2');

readStream.pipe(id1).pipe(id2).pipe(process.stdout);
```


## License

MIT © [JiTae, Kim]()


[npm-image]: https://badge.fury.io/js/code-injection.svg
[npm-url]: https://npmjs.org/package/code-injection
[travis-image]: https://travis-ci.org/kimshinelove/code-injection.svg?branch=master
[travis-url]: https://travis-ci.org/kimshinelove/code-injection
[daviddm-image]: https://david-dm.org/kimshinelove/code-injection.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/kimshinelove/code-injection
