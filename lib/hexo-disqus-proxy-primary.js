/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		1: 0
/******/ 	};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = 'text/javascript';
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({"0":"disqus-proxy"}[chunkId]||chunkId) + ".chunk." + chunkId + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/scripts/";
/******/
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = React;

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_react_dom___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_react_dom__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DisqusChecker__ = __webpack_require__(3);




let disqusProxy = document.getElementById('disqus_proxy_thread');
let disqus = document.getElementById('disqus-thread');
if (!disqusProxy) {
  disqusProxy = document.createElement('div');
  disqusProxy.id = 'disqus_proxy_thread';
  document.body.appendChild(disqusProxy);
}

if (!disqus) {
  disqus = document.createElement('div');
  disqus.id = 'disqus_thread';
  disqusProxy.parentNode.appendChild(disqus);
}

__WEBPACK_IMPORTED_MODULE_1_react_dom___default.a.render(__WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(__WEBPACK_IMPORTED_MODULE_2__DisqusChecker__["a" /* default */], null), disqusProxy);

const styleSheet = document.createElement('link');
styleSheet.rel = 'stylesheet';
styleSheet.href = '//cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css';
document.head.appendChild(styleSheet);

const moment = document.createElement('script');
moment.src = '//cdn.bootcss.com/moment.js/2.18.1/moment.min.js';
document.body.appendChild(moment);

const style = document.createElement('style');
style.innerHTML = `
#disqus_proxy_thread {
  padding-top: 30px;
}

#disqus_proxy_thread .comment-body a {
  color: #42b983;
  text-decoration: none;
}

#disqus_proxy_thread .disqus-statement {
  font-size: 12px;
  padding-left: 92px;
  color: rgba(0, 0, 0, 0.6);
}

#disqus_proxy_thread .disqus-statement a {
  text-decoration: none;
  color: #42b983;
}

#disqus_proxy_thread .disqus-proxy {
  width: 100%;
}

#disqus_proxy_thread .disqus-proxy ul, #disqus_proxy_thread .disqus-proxy li {
  list-style: none;
}

#disqus_proxy_thread .disqus-proxy ul {
  line-height: normal;
  margin-left: 56px;
  padding: 0;
}

@media screen and (max-width: 500px) {
  #disqus_proxy_thread .disqus-proxy ul, #disqus_proxy_thread .disqus-proxy ul.post-reply {
    margin-left: 10px;
  }

  #disqus_proxy_thread .disqus-proxy .disqus-statement {
    padding-left: 80px;
  }

  #disqus_proxy_thread .disqus-proxy .comment-box .comment-info .avatar img {
    width: 40px;
    height: 40px;
  }

  #disqus_proxy_thread .disqus-proxy .comment-box .comment-info textarea {
    left: 60px;
    width: calc(100% - 60px);
  }
}
`;

document.head.appendChild(style);

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = ReactDOM;

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_react___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_react__);
function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }



class DisqusChecker extends __WEBPACK_IMPORTED_MODULE_0_react__["Component"] {
  constructor(props) {
    var _this;

    _this = super(props);
    this.loadDisuqsProxy = _asyncToGenerator(function* () {
      if (_this.state.DisqusProxy) return;
      const DisqusProxy = (yield __webpack_require__.e/* import() */(0).then(__webpack_require__.bind(null, 4))).default;
      _this.setState({ DisqusProxy: DisqusProxy });
    });
    this.state = {
      disqusLoaded: false,
      isLoading: true,
      DisqusProxy: null
    };
  }

  componentWillMount() {
    var _this2 = this;

    return _asyncToGenerator(function* () {

      try {
        const thread = fetch(`https://disqus.com/next/config.json?timestamp=${Date.now()}`);

        const limit = new Promise(function (resolve) {
          return setTimeout(function () {
            return resolve({ status: 600 });
          }, 2000);
        });

        const res = yield Promise.race([thread, limit]);

        // 2秒内如果没加载出来config.json 则认为disqus无法访问
        if (res.status !== 200) {
          console.warn('pre-test loading failed, load disqus-proxy instead');
          _this2.setState({ isLoading: false });
          return yield _this2.loadDisuqsProxy();
        }

        const s = document.createElement('script');
        const shortname = window.disqusProxy.shortname;
        s.src = `https://${shortname}.disqus.com/embed.js`;
        s.async = true;
        s.setAttribute('data-timestamp', String(+new Date()));
        s.onload = function () {
          if (!_this2.state.isLoading) return;
          _this2.setState({ isLoading: false, disqusLoaded: true });
        };
        s.onerror = _asyncToGenerator(function* () {
          document.getElementById('disqus_thread').style.display = 'none';
          _this2.setState({ isLoading: false });
          console.warn('Failed to load disqus. Load disqus-proxy instead.');
          yield _this2.loadDisuqsProxy();
        });
        // 3秒内没加载embed.js 则认为还是无法访问disqus
        setTimeout(_asyncToGenerator(function* () {
          if (!_this2.state.disqusLoaded) {
            _this2.setState({ isLoading: false });
            document.getElementById('disqus_thread').style.display = 'none';
            yield _this2.loadDisuqsProxy();
          }
        }), 3000);

        document.body.appendChild(s);
      } catch (e) {
        console.warn(e);
        _this2.setState({ isLoading: false });
        document.getElementById('disqus_thread').style.display = 'none';
        yield _this2.loadDisuqsProxy();
      }
    })();
  }

  render() {
    const { disqusLoaded, isLoading, DisqusProxy } = this.state;
    return isLoading ? __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
      'div',
      { className: 'disqus-statement' },
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
        'span',
        null,
        '\u6B63\u5728\u5C1D\u8BD5\u52A0\u8F7D',
        __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(
          'a',
          { href: 'https://disqus.com',
            rel: 'noopener noreferrer',
            target: '_blank' },
          ' disqus '
        ),
        '\u8BC4\u8BBA\u7CFB\u7EDF'
      ),
      __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement('i', { className: 'fa fa-spinner fa-spin fa-fw' })
    ) : !disqusLoaded && DisqusProxy && __WEBPACK_IMPORTED_MODULE_0_react___default.a.createElement(DisqusProxy, null);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DisqusChecker;


/***/ })
/******/ ]);