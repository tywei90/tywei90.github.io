/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "./";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(1);

	__webpack_require__(11);

	var _viewer = __webpack_require__(14);

	var _viewer2 = _interopRequireDefault(_viewer);

	var _share = __webpack_require__(24);

	var _share2 = _interopRequireDefault(_share);

	var _aside = __webpack_require__(28);

	var _aside2 = _interopRequireDefault(_aside);

	var _util = __webpack_require__(29);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// 边缘

	// 图片查看器
	// 样式
	(0, _util.addLoadEvent)(function () {
		_share2.default.init();
		_viewer2.default.init();
		_aside2.default.init();
	});
	// 分享

	// 上报

/***/ }),

/***/ 1:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 11:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var jsCookie = __webpack_require__(12);

	__webpack_require__(13);

	function getQueryString(name) {
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
		var r = window.location.search.substr(1).match(reg);
		if (r != null) return unescape(r[2]);return null;
	}
	// 统计用，开发者不需要理会
	if (window.BJ_REPORT && false) {
		BJ_REPORT.init({
			id: 1
		});
		BJ_REPORT.init({
			id: 1,
			uin: window.location.origin,
			combo: 0,
			delay: 1000,
			url: "",
			ignore: [/Script error/i],
			random: 1,
			repeat: 500000,
			onReport: function onReport(id, errObj) {},
			ext: {}
		});
		// iframe不上报
		var host = window.location.host;
		var isNotFrame = top === window;
		var isNotLocal = !(/localhost/i.test(host) || /127.0.0.1/i.test(host) || /0.0.0.0/i.test(host));
		isNotFrame && isNotLocal && BJ_REPORT.report('yilia-' + window.location.host);

		// 来源上报
		var from = getQueryString('f');
		var fromKey = 'yilia-from';
		if (from) {
			isNotFrame && BJ_REPORT.report('from-' + from);
			// 种cookie
			jsCookie.set(fromKey, from);
		} else {
			if (document.referrer.indexOf(window.location.host) >= 0) {
				// 取cookie
				from = jsCookie.get(fromKey);
				from && isNotFrame && BJ_REPORT.report('from-' + from);
			} else {
				// 清cookie
				jsCookie.remove(fromKey);
			}
		}
	}

	module.exports = {
		init: function init() {}
	};

/***/ }),

/***/ 12:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * JavaScript Cookie v2.2.0
	 * https://github.com/js-cookie/js-cookie
	 *
	 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
	 * Released under the MIT license
	 */
	;(function (factory) {
		var registeredInModuleLoader = false;
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
			registeredInModuleLoader = true;
		}
		if (true) {
			module.exports = factory();
			registeredInModuleLoader = true;
		}
		if (!registeredInModuleLoader) {
			var OldCookies = window.Cookies;
			var api = window.Cookies = factory();
			api.noConflict = function () {
				window.Cookies = OldCookies;
				return api;
			};
		}
	}(function () {
		function extend () {
			var i = 0;
			var result = {};
			for (; i < arguments.length; i++) {
				var attributes = arguments[ i ];
				for (var key in attributes) {
					result[key] = attributes[key];
				}
			}
			return result;
		}

		function init (converter) {
			function api (key, value, attributes) {
				var result;
				if (typeof document === 'undefined') {
					return;
				}

				// Write

				if (arguments.length > 1) {
					attributes = extend({
						path: '/'
					}, api.defaults, attributes);

					if (typeof attributes.expires === 'number') {
						var expires = new Date();
						expires.setMilliseconds(expires.getMilliseconds() + attributes.expires * 864e+5);
						attributes.expires = expires;
					}

					// We're using "expires" because "max-age" is not supported by IE
					attributes.expires = attributes.expires ? attributes.expires.toUTCString() : '';

					try {
						result = JSON.stringify(value);
						if (/^[\{\[]/.test(result)) {
							value = result;
						}
					} catch (e) {}

					if (!converter.write) {
						value = encodeURIComponent(String(value))
							.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
					} else {
						value = converter.write(value, key);
					}

					key = encodeURIComponent(String(key));
					key = key.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent);
					key = key.replace(/[\(\)]/g, escape);

					var stringifiedAttributes = '';

					for (var attributeName in attributes) {
						if (!attributes[attributeName]) {
							continue;
						}
						stringifiedAttributes += '; ' + attributeName;
						if (attributes[attributeName] === true) {
							continue;
						}
						stringifiedAttributes += '=' + attributes[attributeName];
					}
					return (document.cookie = key + '=' + value + stringifiedAttributes);
				}

				// Read

				if (!key) {
					result = {};
				}

				// To prevent the for loop in the first place assign an empty array
				// in case there are no cookies at all. Also prevents odd result when
				// calling "get()"
				var cookies = document.cookie ? document.cookie.split('; ') : [];
				var rdecode = /(%[0-9A-Z]{2})+/g;
				var i = 0;

				for (; i < cookies.length; i++) {
					var parts = cookies[i].split('=');
					var cookie = parts.slice(1).join('=');

					if (!this.json && cookie.charAt(0) === '"') {
						cookie = cookie.slice(1, -1);
					}

					try {
						var name = parts[0].replace(rdecode, decodeURIComponent);
						cookie = converter.read ?
							converter.read(cookie, name) : converter(cookie, name) ||
							cookie.replace(rdecode, decodeURIComponent);

						if (this.json) {
							try {
								cookie = JSON.parse(cookie);
							} catch (e) {}
						}

						if (key === name) {
							result = cookie;
							break;
						}

						if (!key) {
							result[name] = cookie;
						}
					} catch (e) {}
				}

				return result;
			}

			api.set = api;
			api.get = function (key) {
				return api.call(api, key);
			};
			api.getJSON = function () {
				return api.apply({
					json: true
				}, [].slice.call(arguments));
			};
			api.defaults = {};

			api.remove = function (key, attributes) {
				api(key, '', extend(attributes, {
					expires: -1
				}));
			};

			api.withConverter = init;

			return api;
		}

		return init(function () {});
	}));


/***/ }),

/***/ 13:
/***/ (function(module, exports, __webpack_require__) {

	/*!
	 * @module report
	 * @author kael, chriscai
	 * @date @DATE
	 * Copyright (c) 2014 kael, chriscai
	 * Licensed under the MIT license.
	 */
	var BJ_REPORT = (function(global) {
	    if (global.BJ_REPORT) return global.BJ_REPORT;

	    var _log_list = [];
	    var _log_map = {};
	    var _config = {
	        id: 0, // 上报 id
	        uin: 0, // user id
	        url: "", // 上报 接口
	        offline_url: "", // 离线日志上报 接口
	        offline_auto_url: "", // 检测是否自动上报
	        ext: null, // 扩展参数 用于自定义上报
	        level: 4, // 错误级别 1-debug 2-info 4-error
	        ignore: [], // 忽略某个错误, 支持 Regexp 和 Function
	        random: 1, // 抽样 (0-1] 1-全量
	        delay: 1000, // 延迟上报 combo 为 true 时有效
	        submit: null, // 自定义上报方式
	        repeat: 5 , // 重复上报次数(对于同一个错误超过多少次不上报),
	        offlineLog : false,
	        offlineLogExp : 5,  // 离线日志过期时间 ， 默认5天
	        offlineLogAuto : false,  //是否自动询问服务器需要自动上报
	    };

	    var Offline_DB = {
	        db : null,
	        ready : function (callback){
	                var self = this;
	                if(!window.indexedDB || !_config.offlineLog ){
	                    _config.offlineLog = false;
	                    return callback();
	                }

	                if(this.db){
	                    setTimeout(function (){
	                        callback(null , self );
	                    },0);

	                    return;
	                }
	                var version= 1;
	                var request=window.indexedDB.open("badjs" , version);

	                if(!request){
	                    _config.offlineLog = false;
	                    return callback();
	                }

	                request.onerror=function(e){
	                    callback(e);
	                    _config.offlineLog = false;
	                    console.log("indexdb request error");
	                    return true;
	                };
	                request.onsuccess=function(e){
	                    self.db = e.target.result;

	                    setTimeout(function (){
	                        callback(null , self);
	                    },500);


	                };
	                request.onupgradeneeded=function(e){
	                    var db=e.target.result;
	                    if(!db.objectStoreNames.contains('logs')){
	                        db.createObjectStore('logs', { autoIncrement: true });
	                    }
	                };
	        },
	        insertToDB : function (log){
	            var store= this.getStore();
	            store.add(log);
	        },
	        addLog : function (log){
	            if(!this.db){
	                return ;
	            }
	            this.insertToDB(log);
	        },
	        addLogs : function (logs){
	            if(!this.db){
	                return;
	            }

	            for(var i = 0;i <  logs.length ; i++){
	                this.addLog( logs[i]);
	            }

	        },
	        getLogs : function (opt  , callback ){
	            if(!this.db){
	                return;
	            }
	            var store= this.getStore();
	            var request = store.openCursor();
	            var result = [];
	            request.onsuccess = function (event) {
	                var cursor = event.target.result;
	                if (cursor ) {
	                    if(cursor.value.time >= opt.start && cursor.value.time <= opt.end &&   cursor.value.id ==  opt.id && cursor.value.uin == opt.uin){
	                        result.push(cursor.value);
	                    }
	                    //# cursor.continue
	                    cursor["continue"]();
	                }else {
	                    callback(null , result);
	                }
	            };

	            request.onerror = function (e){
	                callback(e);
	                return true;
	            };
	        },
	        clearDB : function (daysToMaintain){
	            if(!this.db){
	                return;
	            }

	            var store= this.getStore();
	            if (!daysToMaintain) {
	                store.clear();
	                return ;
	            }
	            var range = (Date.now() - (daysToMaintain || 2) * 24 * 3600 * 1000);
	            var request = store.openCursor();
	            request.onsuccess = function (event) {
	                var cursor = event.target.result;
	                if (cursor && (cursor.value.time < range || !cursor.value.time)) {
	                    store["delete"](cursor.primaryKey);
	                    cursor["continue"]();
	                }
	            };
	        },

	        getStore: function (){
	            var transaction=this.db.transaction("logs",'readwrite');
	            return transaction.objectStore("logs");
	        },

	    };

	    var T = {
	        isOBJByType: function (o, type) {
	            return Object.prototype.toString.call(o) === "[object " + (type || "Object") + "]";
	        },

	        isOBJ: function (obj) {
	            var type = typeof obj;
	            return type === "object" && !!obj;
	        },
	        isEmpty: function (obj) {
	            if (obj === null) return true;
	            if (T.isOBJByType(obj, "Number")) {
	                return false;
	            }
	            return !obj;
	        },
	        extend : function (src , source){
	            for(var key in source){
	                src[key] = source[key];
	            }
	            return src;
	        },
	        processError: function (errObj) {
	            try {
	                if (errObj.stack) {
	                    var url = errObj.stack.match("https?://[^\n]+");
	                    url = url ? url[0] : "";
	                    var rowCols = url.match(":(\\d+):(\\d+)");
	                    if (!rowCols) {
	                        rowCols = [0, 0, 0];
	                    }

	                    var stack = T.processStackMsg(errObj);
	                    return {
	                        msg: stack,
	                        rowNum: rowCols[1],
	                        colNum: rowCols[2],
	                        target: url.replace(rowCols[0], ""),
	                        _orgMsg : errObj.toString()
	                    };
	                } else {
	                    //ie 独有 error 对象信息，try-catch 捕获到错误信息传过来，造成没有msg
	                    if (errObj.name && errObj.message && errObj.description) {
	                        return {
	                            msg: JSON.stringify(errObj)
	                        };
	                    }
	                    return errObj;
	                }
	            } catch (err) {
	                return errObj;
	            }
	        },

	        processStackMsg: function (error) {
	            var stack = error.stack
	                .replace(/\n/gi, "")
	                .split(/\bat\b/)
	                .slice(0, 9)
	                .join("@")
	                .replace(/\?[^:]+/gi, "");
	            var msg = error.toString();
	            if (stack.indexOf(msg) < 0) {
	                stack = msg + "@" + stack;
	            }
	            return stack;
	        },

	        isRepeat : function(error) {
	            if (!T.isOBJ(error)) return true;
	            var msg = error.msg;
	            var times = _log_map[msg] = (parseInt(_log_map[msg], 10) || 0) + 1;
	            return times > _config.repeat;
	        }
	    };

	    var orgError = global.onerror;
	    // rewrite window.oerror
	    global.onerror = function(msg, url, line, col, error) {
	        var newMsg = msg;

	        if (error && error.stack) {
	            newMsg = T.processStackMsg(error);
	        }

	        if (T.isOBJByType(newMsg, "Event")) {
	            newMsg += newMsg.type ?
	                ("--" + newMsg.type + "--" + (newMsg.target ?
	                    (newMsg.target.tagName + "::" + newMsg.target.src) : "")) : "";
	        }

	        report.push({
	            msg: newMsg,
	            target: url,
	            rowNum: line,
	            colNum: col,
	            _orgMsg : msg
	        });

	        _process_log();
	        orgError && orgError.apply(global, arguments);
	    };



	    var _report_log_tostring = function(error, index) {
	        var param = [];
	        var params = [];
	        var stringify = [];
	        if (T.isOBJ(error)) {
	            error.level = error.level || _config.level;
	            for (var key in error) {
	                var value = error[key];
	                if (!T.isEmpty(value)) {
	                    if (T.isOBJ(value)) {
	                        try {
	                            value = JSON.stringify(value);
	                        } catch (err) {
	                            value = "[BJ_REPORT detect value stringify error] " + err.toString();
	                        }
	                    }
	                    stringify.push(key + ":" + value);
	                    param.push(key + "=" + encodeURIComponent(value));
	                    params.push(key + "[" + index + "]=" + encodeURIComponent(value));
	                }
	            }
	        }

	        // msg[0]=msg&target[0]=target -- combo report
	        // msg:msg,target:target -- ignore
	        // msg=msg&target=target -- report with out combo
	        return [params.join("&"), stringify.join(","), param.join("&")];
	    };



	    var  _offline_buffer = [];
	    var _save2Offline = function(key , msgObj ) {
	        msgObj  = T.extend({id : _config.id , uin : _config.uin , time : new Date - 0} , msgObj);

	        if(Offline_DB.db){
	            Offline_DB.addLog(msgObj);
	            return ;
	        }


	        if(!Offline_DB.db && !_offline_buffer.length){
	            Offline_DB.ready(function (err , DB){
	                if(DB){
	                    if(_offline_buffer.length){
	                        DB.addLogs(_offline_buffer);
	                        _offline_buffer = [];
	                    }

	                }
	            });
	        }
	        _offline_buffer.push(msgObj);
	    };

	    var _autoReportOffline = function (){
	        var script = document.createElement("script");
	        script.src = _config.offline_auto_url || _config.url.replace(/badjs$/ , "offlineAuto") + "?id="+_config.id + "&uin="+_config.uin;
	        window._badjsOfflineAuto = function (isReport){
	            if(isReport){
	                BJ_REPORT.reportOfflineLog();
	            }
	        };
	        document.head.appendChild(script);
	    };



	    var submit_log_list = [];
	    var comboTimeout = 0;
	    var _submit_log = function() {
	        clearTimeout(comboTimeout);

	        if(!submit_log_list.length){
	            return ;
	        }

	        var url =_config._reportUrl + submit_log_list.join("&") + "&count=" + submit_log_list.length + "&_t=" + (+new Date);

	        if (_config.submit) {
	            _config.submit(url);
	        } else {
	            var _img = new Image();
	            _img.src = url;
	        }

	        comboTimeout = 0;
	        submit_log_list = [];
	    };

	    var _process_log = function(isReportNow) {
	        if (!_config._reportUrl) return;

	        var randomIgnore = Math.random() >= _config.random;


	        while (_log_list.length) {
	            var isIgnore = false;
	            var report_log = _log_list.shift();
	            //有效保证字符不要过长
	            report_log.msg = (report_log.msg + "" || "").substr(0,500);
	            // 重复上报
	            if (T.isRepeat(report_log)) continue;
	            var log_str = _report_log_tostring(report_log, submit_log_list.length);
	            if (T.isOBJByType(_config.ignore, "Array")) {
	                for (var i = 0, l = _config.ignore.length; i < l; i++) {
	                    var rule = _config.ignore[i];
	                    if ((T.isOBJByType(rule, "RegExp") && rule.test(log_str[1])) ||
	                        (T.isOBJByType(rule, "Function") && rule(report_log, log_str[1]))) {
	                        isIgnore = true;
	                        break;
	                    }
	                }
	            }
	            if (!isIgnore) {
	                _config.offlineLog && _save2Offline( "badjs_" + _config.id + _config.uin, report_log );
	                if(!randomIgnore && report_log.level != 20){
	                    submit_log_list.push(log_str[0]);
	                    _config.onReport && (_config.onReport(_config.id, report_log));
	                }

	            }
	        }


	        if (isReportNow) {
	            _submit_log(); // 立即上报
	        } else if (!comboTimeout) {
	            comboTimeout = setTimeout(_submit_log, _config.delay); // 延迟上报
	        }
	    };



	    var report = global.BJ_REPORT = {
	        push: function(msg) { // 将错误推到缓存池

	            var data = T.isOBJ(msg) ? T.processError(msg) : {
	                msg: msg
	            };

	            // ext 有默认值, 且上报不包含 ext, 使用默认 ext
	            if (_config.ext && !data.ext) {
	                data.ext = _config.ext;
	            }
	            // 在错误发生时获取页面链接
	            // https://github.com/BetterJS/badjs-report/issues/19
	            if (!data.from) {
	                data.from = location.href;
	            }

	            if(data._orgMsg){
	                var _orgMsg = data._orgMsg;
	                delete data._orgMsg;
	                data.level = 2;
	                var newData = T.extend({} , data);
	                newData.level = 4;
	                newData.msg = _orgMsg ;
	                _log_list.push(data);
	                _log_list.push(newData);
	            }else {
	                _log_list.push(data);
	            }

	            _process_log();
	            return report;
	        },
	        report: function(msg , isReportNow) { // error report
	            msg && report.push(msg);

	            isReportNow && _process_log(true);
	            return report;
	        },
	        info: function(msg) { // info report
	            if (!msg) {
	                return report;
	            }
	            if (T.isOBJ(msg)) {
	                msg.level = 2;
	            } else {
	                msg = {
	                    msg: msg,
	                    level: 2
	                };
	            }
	            report.push(msg);
	            return report;
	        },
	        debug: function(msg) { // debug report
	            if (!msg) {
	                return report;
	            }
	            if (T.isOBJ(msg)) {
	                msg.level = 1;
	            } else {
	                msg = {
	                    msg: msg,
	                    level: 1
	                };
	            }
	            report.push(msg);
	            return report;
	        },

	        reportOfflineLog : function (){
	            if (!window.indexedDB){
	                BJ_REPORT.info("unsupport offlineLog");
	                return ;
	            }
	            Offline_DB.ready(function (err , DB){
	                if(!DB){
	                    return;
	                }
	                var startDate = new Date - 0 - _config.offlineLogExp* 24 * 3600 * 1000;
	                var endDate = new Date - 0;
	                DB.getLogs( {
	                    start : startDate,
	                    end : endDate,
	                    id :  _config.id ,
	                    uin :  _config.uin
	                } , function (err , result){
	                    var iframe = document.createElement("iframe");
	                    iframe.name = "badjs_offline_"+(new Date -0 );
	                    iframe.frameborder = 0;
	                    iframe.height = 0;
	                    iframe.width = 0;
	                    iframe.src = "javascript:false;";

	                    iframe.onload = function (){
	                        var form = document.createElement("form");
	                        form.style.display = "none";
	                        form.target =  iframe.name ;
	                        form.method = "POST";
	                        form.action = _config.offline_url || _config.url.replace(/badjs$/ , "offlineLog");
	                        form.enctype.method = 'multipart/form-data';

	                        var input = document.createElement("input");
	                        input.style.display = "none";
	                        input.type = "hidden";
	                        input.name = "offline_log";
	                        input.value = JSON.stringify({logs : result , userAgent : navigator.userAgent , startDate : startDate , endDate : endDate , id :_config.id , uin:_config.uin});

	                        iframe.contentDocument.body.appendChild(form);
	                        form.appendChild(input);
	                        form.submit();

	                        setTimeout(function (){
	                            document.body.removeChild(iframe);
	                        },10000);

	                        iframe.onload = null;
	                    };
	                    document.body.appendChild(iframe);
	                });
	            });
	        },
	        offlineLog : function (msg){
	            if (!msg) {
	                return report;
	            }
	            if (T.isOBJ(msg)) {
	                msg.level = 20;
	            } else {
	                msg = {
	                    msg: msg,
	                    level: 20
	                };
	            }
	            report.push(msg);
	            return report;
	        },
	        init: function(config) { // 初始化
	            if (T.isOBJ(config)) {
	                for (var key in config) {
	                    _config[key] = config[key];
	                }
	            }
	            // 没有设置id将不上报
	            var id = parseInt(_config.id, 10);
	            if (id) {
	                // set default report url and uin
	                if (/qq\.com$/gi.test(location.hostname)) {
	                    if (!_config.url) {
	                        _config.url = "//badjs2.qq.com/badjs";
	                    }

	                    if (!_config.uin) {
	                        _config.uin = parseInt((document.cookie.match(/\buin=\D+(\d+)/) || [])[1], 10);
	                    }
	                }

	                _config._reportUrl = (_config.url || "/badjs") +
	                    "?id=" + id +
	                    "&uin=" + _config.uin +
	                    // "&from=" + encodeURIComponent(location.href) +
	                    "&";
	            }

	            // if had error in cache , report now
	            if (_log_list.length) {
	                _process_log();
	            }

	                // init offline
	            if(!Offline_DB._initing){
	                Offline_DB._initing = true;
	                Offline_DB.ready(function (err , DB){
	                    if(DB){
	                        setTimeout(function (){
	                            DB.clearDB(_config.offlineLogExp );
	                            setTimeout(function (){
	                                _config.offlineLogAuto && _autoReportOffline();
	                            },5000);
	                        },1000);
	                    }

	                });
	            }



	            return report;
	        },

	        __onerror__: global.onerror
	    };

	    typeof console !== "undefined" && console.error && setTimeout(function() {
	        var err = ((location.hash || "").match(/([#&])BJ_ERROR=([^&$]+)/) || [])[2];
	        err && console.error("BJ_ERROR", decodeURIComponent(err).replace(/(:\d+:\d+)\s*/g, "$1\n"));
	    }, 0);

	    return report;

	}(window));

	if (true) {
	    module.exports = BJ_REPORT;
	}
	;(function(global) {

	    if (!global.BJ_REPORT) {
	        console.error("please load bg-report first");
	        return;
	    }

	    var _onthrow = function(errObj) {
	        global.BJ_REPORT.push(errObj);
	    };

	    var tryJs = {};
	    global.BJ_REPORT.tryJs = function(throwCb) {
	        throwCb && (_onthrow = throwCb);
	        return tryJs;
	    };

	    // merge
	    var _merge = function(org, obj) {
	        for (var key in obj) {
	            org[key] = obj[key];
	        }
	    };

	    // function or not
	    var _isFunction = function(foo) {
	        return typeof foo === "function";
	    };

	    var timeoutkey;

	    var cat = function(foo, args) {
	        return function() {
	            try {
	                return foo.apply(this, args || arguments);
	            } catch (error) {

	                _onthrow(error);

	                //some browser throw error (chrome) , can not find error where it throw,  so print it on console;
	                if (error.stack && console && console.error) {
	                    console.error("[BJ-REPORT]", error.stack);
	                }

	                // hang up browser and throw , but it should trigger onerror , so rewrite onerror then recover it
	                if (!timeoutkey) {
	                    var orgOnerror = global.onerror;
	                    global.onerror = function() {};
	                    timeoutkey = setTimeout(function() {
	                        global.onerror = orgOnerror;
	                        timeoutkey = null;
	                    }, 50);
	                }
	                throw error;
	            }
	        };
	    };

	    var catArgs = function(foo) {
	        return function() {
	            var arg, args = [];
	            for (var i = 0, l = arguments.length; i < l; i++) {
	                arg = arguments[i];
	                _isFunction(arg) && (arg = cat(arg));
	                args.push(arg);
	            }
	            return foo.apply(this, args);
	        };
	    };

	    var catTimeout = function(foo) {
	        return function(cb, timeout) {
	            // for setTimeout(string, delay)
	            if (typeof cb === "string") {
	                try {
	                    cb = new Function(cb);
	                } catch (err) {
	                    throw err;
	                }
	            }
	            var args = [].slice.call(arguments, 2);
	            // for setTimeout(function, delay, param1, ...)
	            cb = cat(cb, args.length && args);
	            return foo(cb, timeout);
	        };
	    };

	    /**
	     * makeArgsTry
	     * wrap a function's arguments with try & catch
	     * @param {Function} foo
	     * @param {Object} self
	     * @returns {Function}
	     */
	    var makeArgsTry = function(foo, self) {
	        return function() {
	            var arg, tmp, args = [];
	            for (var i = 0, l = arguments.length; i < l; i++) {
	                arg = arguments[i];
	                if(_isFunction(arg)){
	                    if(arg.tryWrap){
	                        arg = arg.tryWrap;
	                    }else {
	                        tmp = cat(arg);
	                        arg.tryWrap = tmp;
	                        arg = tmp;
	                    }
	                }
	                args.push(arg);
	            }
	            return foo.apply(self || this, args);
	        };
	    };

	    /**
	     * makeObjTry
	     * wrap a object's all value with try & catch
	     * @param {Function} foo
	     * @param {Object} self
	     * @returns {Function}
	     */
	    var makeObjTry = function(obj) {
	        var key, value;
	        for (key in obj) {
	            value = obj[key];
	            if (_isFunction(value)) obj[key] = cat(value);
	        }
	        return obj;
	    };

	    /**
	     * wrap jquery async function ,exp : event.add , event.remove , ajax
	     * @returns {Function}
	     */
	    tryJs.spyJquery = function() {
	        var _$ = global.$;

	        if (!_$ || !_$.event) {
	            return tryJs;
	        }

	        var _add, _remove;
	        if (_$.zepto) {
	            _add = _$.fn.on, _remove = _$.fn.off;

	            _$.fn.on = makeArgsTry(_add);
	            _$.fn.off = function() {
	                var arg, args = [];
	                for (var i = 0, l = arguments.length; i < l; i++) {
	                    arg = arguments[i];
	                    _isFunction(arg) && arg.tryWrap && (arg = arg.tryWrap);
	                    args.push(arg);
	                }
	                return _remove.apply(this, args);
	            };

	        } else if (window.jQuery) {
	            _add = _$.event.add, _remove = _$.event.remove;

	            _$.event.add = makeArgsTry(_add);
	            _$.event.remove = function() {
	                var arg, args = [];
	                for (var i = 0, l = arguments.length; i < l; i++) {
	                    arg = arguments[i];
	                    _isFunction(arg) && arg.tryWrap && (arg = arg.tryWrap);
	                    args.push(arg);
	                }
	                return _remove.apply(this, args);
	            };
	        }

	        var _ajax = _$.ajax;

	        if (_ajax) {
	            _$.ajax = function(url, setting) {
	                if (!setting) {
	                    setting = url;
	                    url = undefined;
	                }
	                makeObjTry(setting);
	                if (url) return _ajax.call(_$, url, setting);
	                return _ajax.call(_$, setting);
	            };
	        }

	        return tryJs;
	    };

	    /**
	     * wrap amd or commonjs of function  ,exp :  define , require ,
	     * @returns {Function}
	     */
	    tryJs.spyModules = function() {
	        var _require = global.require,
	            _define = global.define;
	        if (_define && _define.amd && _require) {
	            global.require = catArgs(_require);
	            _merge(global.require, _require);
	            global.define = catArgs(_define);
	            _merge(global.define, _define);
	        }

	        if (global.seajs && _define) {
	            global.define = function() {
	                var arg, args = [];
	                for (var i = 0, l = arguments.length; i < l; i++) {
	                    arg = arguments[i];
	                    if (_isFunction(arg)) {
	                        arg = cat(arg);
	                        //seajs should use toString parse dependencies , so rewrite it
	                        arg.toString = (function(orgArg) {
	                            return function() {
	                                return orgArg.toString();
	                            };
	                        }(arguments[i]));
	                    }
	                    args.push(arg);
	                }
	                return _define.apply(this, args);
	            };

	            global.seajs.use = catArgs(global.seajs.use);

	            _merge(global.define, _define);
	        }

	        return tryJs;
	    };

	    /**
	     * wrap async of function in window , exp : setTimeout , setInterval
	     * @returns {Function}
	     */
	    tryJs.spySystem = function() {
	        global.setTimeout = catTimeout(global.setTimeout);
	        global.setInterval = catTimeout(global.setInterval);
	        return tryJs;
	    };

	    /**
	     * wrap custom of function ,
	     * @param obj - obj or  function
	     * @returns {Function}
	     */
	    tryJs.spyCustom = function(obj) {
	        if (_isFunction(obj)) {
	            return cat(obj);
	        } else {
	            return makeObjTry(obj);
	        }
	    };

	    /**
	     * run spyJquery() and spyModules() and spySystem()
	     * @returns {Function}
	     */
	    tryJs.spyAll = function() {
	        tryJs
	            .spyJquery()
	            .spyModules()
	            .spySystem();
	        return tryJs;
	    };

	}(window));


/***/ }),

/***/ 14:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _photoswipe = __webpack_require__(15);

	var _photoswipe2 = _interopRequireDefault(_photoswipe);

	var _photoswipeUiDefault = __webpack_require__(16);

	var _photoswipeUiDefault2 = _interopRequireDefault(_photoswipeUiDefault);

	__webpack_require__(17);

	__webpack_require__(22);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.PhotoSwipe = _photoswipe2.default;
	window.PhotoSwipeUI_Default = _photoswipeUiDefault2.default;

	function init() {
		var pswpElement = document.querySelectorAll('.pswp')[0];
		var $imgArr = document.querySelectorAll('.article-entry img:not(.reward-img)');

		$imgArr.forEach(function ($em, i) {
			$em.onclick = function () {
				// slider展开状态
				// todo: 这样不好，后面改成状态
				if (document.querySelector('.left-col.show')) return;
				var items = [];
				$imgArr.forEach(function ($em2, i2) {
					var img = $em2.getAttribute('data-idx', i2);
					var src = $em2.getAttribute('data-target') || $em2.getAttribute('src');
					var title = $em2.getAttribute('alt');
					items.push({
						src: src,
						w: $em2.width,
						h: $em2.height,
						title: title
					});
				});
				var gallery = new _photoswipe2.default(pswpElement, _photoswipeUiDefault2.default, items, {
					index: parseInt(i)
				});
				gallery.init();
			};
		});
	}

	module.exports = {
		init: init
	};

/***/ }),

/***/ 15:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! PhotoSwipe - v4.1.2 - 2017-04-05
	* http://photoswipe.com
	* Copyright (c) 2017 Dmitry Semenov; */
	(function (root, factory) { 
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipe = factory();
		}
	})(this, function () {

		'use strict';
		var PhotoSwipe = function(template, UiClass, items, options){

	/*>>framework-bridge*/
	/**
	 *
	 * Set of generic functions used by gallery.
	 * 
	 * You're free to modify anything here as long as functionality is kept.
	 * 
	 */
	var framework = {
		features: null,
		bind: function(target, type, listener, unbind) {
			var methodName = (unbind ? 'remove' : 'add') + 'EventListener';
			type = type.split(' ');
			for(var i = 0; i < type.length; i++) {
				if(type[i]) {
					target[methodName]( type[i], listener, false);
				}
			}
		},
		isArray: function(obj) {
			return (obj instanceof Array);
		},
		createEl: function(classes, tag) {
			var el = document.createElement(tag || 'div');
			if(classes) {
				el.className = classes;
			}
			return el;
		},
		getScrollY: function() {
			var yOffset = window.pageYOffset;
			return yOffset !== undefined ? yOffset : document.documentElement.scrollTop;
		},
		unbind: function(target, type, listener) {
			framework.bind(target,type,listener,true);
		},
		removeClass: function(el, className) {
			var reg = new RegExp('(\\s|^)' + className + '(\\s|$)');
			el.className = el.className.replace(reg, ' ').replace(/^\s\s*/, '').replace(/\s\s*$/, ''); 
		},
		addClass: function(el, className) {
			if( !framework.hasClass(el,className) ) {
				el.className += (el.className ? ' ' : '') + className;
			}
		},
		hasClass: function(el, className) {
			return el.className && new RegExp('(^|\\s)' + className + '(\\s|$)').test(el.className);
		},
		getChildByClass: function(parentEl, childClassName) {
			var node = parentEl.firstChild;
			while(node) {
				if( framework.hasClass(node, childClassName) ) {
					return node;
				}
				node = node.nextSibling;
			}
		},
		arraySearch: function(array, value, key) {
			var i = array.length;
			while(i--) {
				if(array[i][key] === value) {
					return i;
				} 
			}
			return -1;
		},
		extend: function(o1, o2, preventOverwrite) {
			for (var prop in o2) {
				if (o2.hasOwnProperty(prop)) {
					if(preventOverwrite && o1.hasOwnProperty(prop)) {
						continue;
					}
					o1[prop] = o2[prop];
				}
			}
		},
		easing: {
			sine: {
				out: function(k) {
					return Math.sin(k * (Math.PI / 2));
				},
				inOut: function(k) {
					return - (Math.cos(Math.PI * k) - 1) / 2;
				}
			},
			cubic: {
				out: function(k) {
					return --k * k * k + 1;
				}
			}
			/*
				elastic: {
					out: function ( k ) {

						var s, a = 0.1, p = 0.4;
						if ( k === 0 ) return 0;
						if ( k === 1 ) return 1;
						if ( !a || a < 1 ) { a = 1; s = p / 4; }
						else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
						return ( a * Math.pow( 2, - 10 * k) * Math.sin( ( k - s ) * ( 2 * Math.PI ) / p ) + 1 );

					},
				},
				back: {
					out: function ( k ) {
						var s = 1.70158;
						return --k * k * ( ( s + 1 ) * k + s ) + 1;
					}
				}
			*/
		},

		/**
		 * 
		 * @return {object}
		 * 
		 * {
		 *  raf : request animation frame function
		 *  caf : cancel animation frame function
		 *  transfrom : transform property key (with vendor), or null if not supported
		 *  oldIE : IE8 or below
		 * }
		 * 
		 */
		detectFeatures: function() {
			if(framework.features) {
				return framework.features;
			}
			var helperEl = framework.createEl(),
				helperStyle = helperEl.style,
				vendor = '',
				features = {};

			// IE8 and below
			features.oldIE = document.all && !document.addEventListener;

			features.touch = 'ontouchstart' in window;

			if(window.requestAnimationFrame) {
				features.raf = window.requestAnimationFrame;
				features.caf = window.cancelAnimationFrame;
			}

			features.pointerEvent = navigator.pointerEnabled || navigator.msPointerEnabled;

			// fix false-positive detection of old Android in new IE
			// (IE11 ua string contains "Android 4.0")
			
			if(!features.pointerEvent) { 

				var ua = navigator.userAgent;

				// Detect if device is iPhone or iPod and if it's older than iOS 8
				// http://stackoverflow.com/a/14223920
				// 
				// This detection is made because of buggy top/bottom toolbars
				// that don't trigger window.resize event.
				// For more info refer to _isFixedPosition variable in core.js

				if (/iP(hone|od)/.test(navigator.platform)) {
					var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
					if(v && v.length > 0) {
						v = parseInt(v[1], 10);
						if(v >= 1 && v < 8 ) {
							features.isOldIOSPhone = true;
						}
					}
				}

				// Detect old Android (before KitKat)
				// due to bugs related to position:fixed
				// http://stackoverflow.com/questions/7184573/pick-up-the-android-version-in-the-browser-by-javascript
				
				var match = ua.match(/Android\s([0-9\.]*)/);
				var androidversion =  match ? match[1] : 0;
				androidversion = parseFloat(androidversion);
				if(androidversion >= 1 ) {
					if(androidversion < 4.4) {
						features.isOldAndroid = true; // for fixed position bug & performance
					}
					features.androidVersion = androidversion; // for touchend bug
				}	
				features.isMobileOpera = /opera mini|opera mobi/i.test(ua);

				// p.s. yes, yes, UA sniffing is bad, propose your solution for above bugs.
			}
			
			var styleChecks = ['transform', 'perspective', 'animationName'],
				vendors = ['', 'webkit','Moz','ms','O'],
				styleCheckItem,
				styleName;

			for(var i = 0; i < 4; i++) {
				vendor = vendors[i];

				for(var a = 0; a < 3; a++) {
					styleCheckItem = styleChecks[a];

					// uppercase first letter of property name, if vendor is present
					styleName = vendor + (vendor ? 
											styleCheckItem.charAt(0).toUpperCase() + styleCheckItem.slice(1) : 
											styleCheckItem);
				
					if(!features[styleCheckItem] && styleName in helperStyle ) {
						features[styleCheckItem] = styleName;
					}
				}

				if(vendor && !features.raf) {
					vendor = vendor.toLowerCase();
					features.raf = window[vendor+'RequestAnimationFrame'];
					if(features.raf) {
						features.caf = window[vendor+'CancelAnimationFrame'] || 
										window[vendor+'CancelRequestAnimationFrame'];
					}
				}
			}
				
			if(!features.raf) {
				var lastTime = 0;
				features.raf = function(fn) {
					var currTime = new Date().getTime();
					var timeToCall = Math.max(0, 16 - (currTime - lastTime));
					var id = window.setTimeout(function() { fn(currTime + timeToCall); }, timeToCall);
					lastTime = currTime + timeToCall;
					return id;
				};
				features.caf = function(id) { clearTimeout(id); };
			}

			// Detect SVG support
			features.svg = !!document.createElementNS && 
							!!document.createElementNS('http://www.w3.org/2000/svg', 'svg').createSVGRect;

			framework.features = features;

			return features;
		}
	};

	framework.detectFeatures();

	// Override addEventListener for old versions of IE
	if(framework.features.oldIE) {

		framework.bind = function(target, type, listener, unbind) {
			
			type = type.split(' ');

			var methodName = (unbind ? 'detach' : 'attach') + 'Event',
				evName,
				_handleEv = function() {
					listener.handleEvent.call(listener);
				};

			for(var i = 0; i < type.length; i++) {
				evName = type[i];
				if(evName) {

					if(typeof listener === 'object' && listener.handleEvent) {
						if(!unbind) {
							listener['oldIE' + evName] = _handleEv;
						} else {
							if(!listener['oldIE' + evName]) {
								return false;
							}
						}

						target[methodName]( 'on' + evName, listener['oldIE' + evName]);
					} else {
						target[methodName]( 'on' + evName, listener);
					}

				}
			}
		};
		
	}

	/*>>framework-bridge*/

	/*>>core*/
	//function(template, UiClass, items, options)

	var self = this;

	/**
	 * Static vars, don't change unless you know what you're doing.
	 */
	var DOUBLE_TAP_RADIUS = 25, 
		NUM_HOLDERS = 3;

	/**
	 * Options
	 */
	var _options = {
		allowPanToNext:true,
		spacing: 0.12,
		bgOpacity: 1,
		mouseUsed: false,
		loop: true,
		pinchToClose: true,
		closeOnScroll: true,
		closeOnVerticalDrag: true,
		verticalDragRange: 0.75,
		hideAnimationDuration: 333,
		showAnimationDuration: 333,
		showHideOpacity: false,
		focus: true,
		escKey: true,
		arrowKeys: true,
		mainScrollEndFriction: 0.35,
		panEndFriction: 0.35,
		isClickableElement: function(el) {
	        return el.tagName === 'A';
	    },
	    getDoubleTapZoom: function(isMouseClick, item) {
	    	if(isMouseClick) {
	    		return 1;
	    	} else {
	    		return item.initialZoomLevel < 0.7 ? 1 : 1.33;
	    	}
	    },
	    maxSpreadZoom: 1.33,
		modal: true,

		// not fully implemented yet
		scaleMode: 'fit' // TODO
	};
	framework.extend(_options, options);


	/**
	 * Private helper variables & functions
	 */

	var _getEmptyPoint = function() { 
			return {x:0,y:0}; 
		};

	var _isOpen,
		_isDestroying,
		_closedByScroll,
		_currentItemIndex,
		_containerStyle,
		_containerShiftIndex,
		_currPanDist = _getEmptyPoint(),
		_startPanOffset = _getEmptyPoint(),
		_panOffset = _getEmptyPoint(),
		_upMoveEvents, // drag move, drag end & drag cancel events array
		_downEvents, // drag start events array
		_globalEventHandlers,
		_viewportSize = {},
		_currZoomLevel,
		_startZoomLevel,
		_translatePrefix,
		_translateSufix,
		_updateSizeInterval,
		_itemsNeedUpdate,
		_currPositionIndex = 0,
		_offset = {},
		_slideSize = _getEmptyPoint(), // size of slide area, including spacing
		_itemHolders,
		_prevItemIndex,
		_indexDiff = 0, // difference of indexes since last content update
		_dragStartEvent,
		_dragMoveEvent,
		_dragEndEvent,
		_dragCancelEvent,
		_transformKey,
		_pointerEventEnabled,
		_isFixedPosition = true,
		_likelyTouchDevice,
		_modules = [],
		_requestAF,
		_cancelAF,
		_initalClassName,
		_initalWindowScrollY,
		_oldIE,
		_currentWindowScrollY,
		_features,
		_windowVisibleSize = {},
		_renderMaxResolution = false,
		_orientationChangeTimeout,


		// Registers PhotoSWipe module (History, Controller ...)
		_registerModule = function(name, module) {
			framework.extend(self, module.publicMethods);
			_modules.push(name);
		},

		_getLoopedId = function(index) {
			var numSlides = _getNumItems();
			if(index > numSlides - 1) {
				return index - numSlides;
			} else  if(index < 0) {
				return numSlides + index;
			}
			return index;
		},
		
		// Micro bind/trigger
		_listeners = {},
		_listen = function(name, fn) {
			if(!_listeners[name]) {
				_listeners[name] = [];
			}
			return _listeners[name].push(fn);
		},
		_shout = function(name) {
			var listeners = _listeners[name];

			if(listeners) {
				var args = Array.prototype.slice.call(arguments);
				args.shift();

				for(var i = 0; i < listeners.length; i++) {
					listeners[i].apply(self, args);
				}
			}
		},

		_getCurrentTime = function() {
			return new Date().getTime();
		},
		_applyBgOpacity = function(opacity) {
			_bgOpacity = opacity;
			self.bg.style.opacity = opacity * _options.bgOpacity;
		},

		_applyZoomTransform = function(styleObj,x,y,zoom,item) {
			if(!_renderMaxResolution || (item && item !== self.currItem) ) {
				zoom = zoom / (item ? item.fitRatio : self.currItem.fitRatio);	
			}
				
			styleObj[_transformKey] = _translatePrefix + x + 'px, ' + y + 'px' + _translateSufix + ' scale(' + zoom + ')';
		},
		_applyCurrentZoomPan = function( allowRenderResolution ) {
			if(_currZoomElementStyle) {

				if(allowRenderResolution) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						if(!_renderMaxResolution) {
							_setImageSize(self.currItem, false, true);
							_renderMaxResolution = true;
						}
					} else {
						if(_renderMaxResolution) {
							_setImageSize(self.currItem);
							_renderMaxResolution = false;
						}
					}
				}
				

				_applyZoomTransform(_currZoomElementStyle, _panOffset.x, _panOffset.y, _currZoomLevel);
			}
		},
		_applyZoomPanToItem = function(item) {
			if(item.container) {

				_applyZoomTransform(item.container.style, 
									item.initialPosition.x, 
									item.initialPosition.y, 
									item.initialZoomLevel,
									item);
			}
		},
		_setTranslateX = function(x, elStyle) {
			elStyle[_transformKey] = _translatePrefix + x + 'px, 0px' + _translateSufix;
		},
		_moveMainScroll = function(x, dragging) {

			if(!_options.loop && dragging) {
				var newSlideIndexOffset = _currentItemIndex + (_slideSize.x * _currPositionIndex - x) / _slideSize.x,
					delta = Math.round(x - _mainScrollPos.x);

				if( (newSlideIndexOffset < 0 && delta > 0) || 
					(newSlideIndexOffset >= _getNumItems() - 1 && delta < 0) ) {
					x = _mainScrollPos.x + delta * _options.mainScrollEndFriction;
				} 
			}
			
			_mainScrollPos.x = x;
			_setTranslateX(x, _containerStyle);
		},
		_calculatePanOffset = function(axis, zoomLevel) {
			var m = _midZoomPoint[axis] - _offset[axis];
			return _startPanOffset[axis] + _currPanDist[axis] + m - m * ( zoomLevel / _startZoomLevel );
		},
		
		_equalizePoints = function(p1, p2) {
			p1.x = p2.x;
			p1.y = p2.y;
			if(p2.id) {
				p1.id = p2.id;
			}
		},
		_roundPoint = function(p) {
			p.x = Math.round(p.x);
			p.y = Math.round(p.y);
		},

		_mouseMoveTimeout = null,
		_onFirstMouseMove = function() {
			// Wait until mouse move event is fired at least twice during 100ms
			// We do this, because some mobile browsers trigger it on touchstart
			if(_mouseMoveTimeout ) { 
				framework.unbind(document, 'mousemove', _onFirstMouseMove);
				framework.addClass(template, 'pswp--has_mouse');
				_options.mouseUsed = true;
				_shout('mouseUsed');
			}
			_mouseMoveTimeout = setTimeout(function() {
				_mouseMoveTimeout = null;
			}, 100);
		},

		_bindEvents = function() {
			framework.bind(document, 'keydown', self);

			if(_features.transform) {
				// don't bind click event in browsers that don't support transform (mostly IE8)
				framework.bind(self.scrollWrap, 'click', self);
			}
			

			if(!_options.mouseUsed) {
				framework.bind(document, 'mousemove', _onFirstMouseMove);
			}

			framework.bind(window, 'resize scroll orientationchange', self);

			_shout('bindEvents');
		},

		_unbindEvents = function() {
			framework.unbind(window, 'resize scroll orientationchange', self);
			framework.unbind(window, 'scroll', _globalEventHandlers.scroll);
			framework.unbind(document, 'keydown', self);
			framework.unbind(document, 'mousemove', _onFirstMouseMove);

			if(_features.transform) {
				framework.unbind(self.scrollWrap, 'click', self);
			}

			if(_isDragging) {
				framework.unbind(window, _upMoveEvents, self);
			}

			clearTimeout(_orientationChangeTimeout);

			_shout('unbindEvents');
		},
		
		_calculatePanBounds = function(zoomLevel, update) {
			var bounds = _calculateItemSize( self.currItem, _viewportSize, zoomLevel );
			if(update) {
				_currPanBounds = bounds;
			}
			return bounds;
		},
		
		_getMinZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.initialZoomLevel;
		},
		_getMaxZoomLevel = function(item) {
			if(!item) {
				item = self.currItem;
			}
			return item.w > 0 ? _options.maxSpreadZoom : 1;
		},

		// Return true if offset is out of the bounds
		_modifyDestPanOffset = function(axis, destPanBounds, destPanOffset, destZoomLevel) {
			if(destZoomLevel === self.currItem.initialZoomLevel) {
				destPanOffset[axis] = self.currItem.initialPosition[axis];
				return true;
			} else {
				destPanOffset[axis] = _calculatePanOffset(axis, destZoomLevel); 

				if(destPanOffset[axis] > destPanBounds.min[axis]) {
					destPanOffset[axis] = destPanBounds.min[axis];
					return true;
				} else if(destPanOffset[axis] < destPanBounds.max[axis] ) {
					destPanOffset[axis] = destPanBounds.max[axis];
					return true;
				}
			}
			return false;
		},

		_setupTransforms = function() {

			if(_transformKey) {
				// setup 3d transforms
				var allow3dTransform = _features.perspective && !_likelyTouchDevice;
				_translatePrefix = 'translate' + (allow3dTransform ? '3d(' : '(');
				_translateSufix = _features.perspective ? ', 0px)' : ')';	
				return;
			}

			// Override zoom/pan/move functions in case old browser is used (most likely IE)
			// (so they use left/top/width/height, instead of CSS transform)
		
			_transformKey = 'left';
			framework.addClass(template, 'pswp--ie');

			_setTranslateX = function(x, elStyle) {
				elStyle.left = x + 'px';
			};
			_applyZoomPanToItem = function(item) {

				var zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
					s = item.container.style,
					w = zoomRatio * item.w,
					h = zoomRatio * item.h;

				s.width = w + 'px';
				s.height = h + 'px';
				s.left = item.initialPosition.x + 'px';
				s.top = item.initialPosition.y + 'px';

			};
			_applyCurrentZoomPan = function() {
				if(_currZoomElementStyle) {

					var s = _currZoomElementStyle,
						item = self.currItem,
						zoomRatio = item.fitRatio > 1 ? 1 : item.fitRatio,
						w = zoomRatio * item.w,
						h = zoomRatio * item.h;

					s.width = w + 'px';
					s.height = h + 'px';


					s.left = _panOffset.x + 'px';
					s.top = _panOffset.y + 'px';
				}
				
			};
		},

		_onKeyDown = function(e) {
			var keydownAction = '';
			if(_options.escKey && e.keyCode === 27) { 
				keydownAction = 'close';
			} else if(_options.arrowKeys) {
				if(e.keyCode === 37) {
					keydownAction = 'prev';
				} else if(e.keyCode === 39) { 
					keydownAction = 'next';
				}
			}

			if(keydownAction) {
				// don't do anything if special key pressed to prevent from overriding default browser actions
				// e.g. in Chrome on Mac cmd+arrow-left returns to previous page
				if( !e.ctrlKey && !e.altKey && !e.shiftKey && !e.metaKey ) {
					if(e.preventDefault) {
						e.preventDefault();
					} else {
						e.returnValue = false;
					} 
					self[keydownAction]();
				}
			}
		},

		_onGlobalClick = function(e) {
			if(!e) {
				return;
			}

			// don't allow click event to pass through when triggering after drag or some other gesture
			if(_moved || _zoomStarted || _mainScrollAnimating || _verticalDragInitiated) {
				e.preventDefault();
				e.stopPropagation();
			}
		},

		_updatePageScrollOffset = function() {
			self.setScrollOffset(0, framework.getScrollY());		
		};
		


		



	// Micro animation engine
	var _animations = {},
		_numAnimations = 0,
		_stopAnimation = function(name) {
			if(_animations[name]) {
				if(_animations[name].raf) {
					_cancelAF( _animations[name].raf );
				}
				_numAnimations--;
				delete _animations[name];
			}
		},
		_registerStartAnimation = function(name) {
			if(_animations[name]) {
				_stopAnimation(name);
			}
			if(!_animations[name]) {
				_numAnimations++;
				_animations[name] = {};
			}
		},
		_stopAllAnimations = function() {
			for (var prop in _animations) {

				if( _animations.hasOwnProperty( prop ) ) {
					_stopAnimation(prop);
				} 
				
			}
		},
		_animateProp = function(name, b, endProp, d, easingFn, onUpdate, onComplete) {
			var startAnimTime = _getCurrentTime(), t;
			_registerStartAnimation(name);

			var animloop = function(){
				if ( _animations[name] ) {
					
					t = _getCurrentTime() - startAnimTime; // time diff
					//b - beginning (start prop)
					//d - anim duration

					if ( t >= d ) {
						_stopAnimation(name);
						onUpdate(endProp);
						if(onComplete) {
							onComplete();
						}
						return;
					}
					onUpdate( (endProp - b) * easingFn(t/d) + b );

					_animations[name].raf = _requestAF(animloop);
				}
			};
			animloop();
		};
		


	var publicMethods = {

		// make a few local variables and functions public
		shout: _shout,
		listen: _listen,
		viewportSize: _viewportSize,
		options: _options,

		isMainScrollAnimating: function() {
			return _mainScrollAnimating;
		},
		getZoomLevel: function() {
			return _currZoomLevel;
		},
		getCurrentIndex: function() {
			return _currentItemIndex;
		},
		isDragging: function() {
			return _isDragging;
		},	
		isZooming: function() {
			return _isZooming;
		},
		setScrollOffset: function(x,y) {
			_offset.x = x;
			_currentWindowScrollY = _offset.y = y;
			_shout('updateScrollOffset', _offset);
		},
		applyZoomPan: function(zoomLevel,panX,panY,allowRenderResolution) {
			_panOffset.x = panX;
			_panOffset.y = panY;
			_currZoomLevel = zoomLevel;
			_applyCurrentZoomPan( allowRenderResolution );
		},

		init: function() {

			if(_isOpen || _isDestroying) {
				return;
			}

			var i;

			self.framework = framework; // basic functionality
			self.template = template; // root DOM element of PhotoSwipe
			self.bg = framework.getChildByClass(template, 'pswp__bg');

			_initalClassName = template.className;
			_isOpen = true;
					
			_features = framework.detectFeatures();
			_requestAF = _features.raf;
			_cancelAF = _features.caf;
			_transformKey = _features.transform;
			_oldIE = _features.oldIE;
			
			self.scrollWrap = framework.getChildByClass(template, 'pswp__scroll-wrap');
			self.container = framework.getChildByClass(self.scrollWrap, 'pswp__container');

			_containerStyle = self.container.style; // for fast access

			// Objects that hold slides (there are only 3 in DOM)
			self.itemHolders = _itemHolders = [
				{el:self.container.children[0] , wrap:0, index: -1},
				{el:self.container.children[1] , wrap:0, index: -1},
				{el:self.container.children[2] , wrap:0, index: -1}
			];

			// hide nearby item holders until initial zoom animation finishes (to avoid extra Paints)
			_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'none';

			_setupTransforms();

			// Setup global events
			_globalEventHandlers = {
				resize: self.updateSize,

				// Fixes: iOS 10.3 resize event
				// does not update scrollWrap.clientWidth instantly after resize
				// https://github.com/dimsemenov/PhotoSwipe/issues/1315
				orientationchange: function() {
					clearTimeout(_orientationChangeTimeout);
					_orientationChangeTimeout = setTimeout(function() {
						if(_viewportSize.x !== self.scrollWrap.clientWidth) {
							self.updateSize();
						}
					}, 500);
				},
				scroll: _updatePageScrollOffset,
				keydown: _onKeyDown,
				click: _onGlobalClick
			};

			// disable show/hide effects on old browsers that don't support CSS animations or transforms, 
			// old IOS, Android and Opera mobile. Blackberry seems to work fine, even older models.
			var oldPhone = _features.isOldIOSPhone || _features.isOldAndroid || _features.isMobileOpera;
			if(!_features.animationName || !_features.transform || oldPhone) {
				_options.showAnimationDuration = _options.hideAnimationDuration = 0;
			}

			// init modules
			for(i = 0; i < _modules.length; i++) {
				self['init' + _modules[i]]();
			}
			
			// init
			if(UiClass) {
				var ui = self.ui = new UiClass(self, framework);
				ui.init();
			}

			_shout('firstUpdate');
			_currentItemIndex = _currentItemIndex || _options.index || 0;
			// validate index
			if( isNaN(_currentItemIndex) || _currentItemIndex < 0 || _currentItemIndex >= _getNumItems() ) {
				_currentItemIndex = 0;
			}
			self.currItem = _getItemAt( _currentItemIndex );

			
			if(_features.isOldIOSPhone || _features.isOldAndroid) {
				_isFixedPosition = false;
			}
			
			template.setAttribute('aria-hidden', 'false');
			if(_options.modal) {
				if(!_isFixedPosition) {
					template.style.position = 'absolute';
					template.style.top = framework.getScrollY() + 'px';
				} else {
					template.style.position = 'fixed';
				}
			}

			if(_currentWindowScrollY === undefined) {
				_shout('initialLayout');
				_currentWindowScrollY = _initalWindowScrollY = framework.getScrollY();
			}
			
			// add classes to root element of PhotoSwipe
			var rootClasses = 'pswp--open ';
			if(_options.mainClass) {
				rootClasses += _options.mainClass + ' ';
			}
			if(_options.showHideOpacity) {
				rootClasses += 'pswp--animate_opacity ';
			}
			rootClasses += _likelyTouchDevice ? 'pswp--touch' : 'pswp--notouch';
			rootClasses += _features.animationName ? ' pswp--css_animation' : '';
			rootClasses += _features.svg ? ' pswp--svg' : '';
			framework.addClass(template, rootClasses);

			self.updateSize();

			// initial update
			_containerShiftIndex = -1;
			_indexDiff = null;
			for(i = 0; i < NUM_HOLDERS; i++) {
				_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, _itemHolders[i].el.style);
			}

			if(!_oldIE) {
				framework.bind(self.scrollWrap, _downEvents, self); // no dragging for old IE
			}	

			_listen('initialZoomInEnd', function() {
				self.setContent(_itemHolders[0], _currentItemIndex-1);
				self.setContent(_itemHolders[2], _currentItemIndex+1);

				_itemHolders[0].el.style.display = _itemHolders[2].el.style.display = 'block';

				if(_options.focus) {
					// focus causes layout, 
					// which causes lag during the animation, 
					// that's why we delay it untill the initial zoom transition ends
					template.focus();
				}
				 

				_bindEvents();
			});

			// set content for center slide (first time)
			self.setContent(_itemHolders[1], _currentItemIndex);
			
			self.updateCurrItem();

			_shout('afterInit');

			if(!_isFixedPosition) {

				// On all versions of iOS lower than 8.0, we check size of viewport every second.
				// 
				// This is done to detect when Safari top & bottom bars appear, 
				// as this action doesn't trigger any events (like resize). 
				// 
				// On iOS8 they fixed this.
				// 
				// 10 Nov 2014: iOS 7 usage ~40%. iOS 8 usage 56%.
				
				_updateSizeInterval = setInterval(function() {
					if(!_numAnimations && !_isDragging && !_isZooming && (_currZoomLevel === self.currItem.initialZoomLevel)  ) {
						self.updateSize();
					}
				}, 1000);
			}

			framework.addClass(template, 'pswp--visible');
		},

		// Close the gallery, then destroy it
		close: function() {
			if(!_isOpen) {
				return;
			}

			_isOpen = false;
			_isDestroying = true;
			_shout('close');
			_unbindEvents();

			_showOrHide(self.currItem, null, true, self.destroy);
		},

		// destroys the gallery (unbinds events, cleans up intervals and timeouts to avoid memory leaks)
		destroy: function() {
			_shout('destroy');

			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}
			
			template.setAttribute('aria-hidden', 'true');
			template.className = _initalClassName;

			if(_updateSizeInterval) {
				clearInterval(_updateSizeInterval);
			}

			framework.unbind(self.scrollWrap, _downEvents, self);

			// we unbind scroll event at the end, as closing animation may depend on it
			framework.unbind(window, 'scroll', self);

			_stopDragUpdateLoop();

			_stopAllAnimations();

			_listeners = null;
		},

		/**
		 * Pan image to position
		 * @param {Number} x     
		 * @param {Number} y     
		 * @param {Boolean} force Will ignore bounds if set to true.
		 */
		panTo: function(x,y,force) {
			if(!force) {
				if(x > _currPanBounds.min.x) {
					x = _currPanBounds.min.x;
				} else if(x < _currPanBounds.max.x) {
					x = _currPanBounds.max.x;
				}

				if(y > _currPanBounds.min.y) {
					y = _currPanBounds.min.y;
				} else if(y < _currPanBounds.max.y) {
					y = _currPanBounds.max.y;
				}
			}
			
			_panOffset.x = x;
			_panOffset.y = y;
			_applyCurrentZoomPan();
		},
		
		handleEvent: function (e) {
			e = e || window.event;
			if(_globalEventHandlers[e.type]) {
				_globalEventHandlers[e.type](e);
			}
		},


		goTo: function(index) {

			index = _getLoopedId(index);

			var diff = index - _currentItemIndex;
			_indexDiff = diff;

			_currentItemIndex = index;
			self.currItem = _getItemAt( _currentItemIndex );
			_currPositionIndex -= diff;
			
			_moveMainScroll(_slideSize.x * _currPositionIndex);
			

			_stopAllAnimations();
			_mainScrollAnimating = false;

			self.updateCurrItem();
		},
		next: function() {
			self.goTo( _currentItemIndex + 1);
		},
		prev: function() {
			self.goTo( _currentItemIndex - 1);
		},

		// update current zoom/pan objects
		updateCurrZoomItem: function(emulateSetContent) {
			if(emulateSetContent) {
				_shout('beforeChange', 0);
			}

			// itemHolder[1] is middle (current) item
			if(_itemHolders[1].el.children.length) {
				var zoomElement = _itemHolders[1].el.children[0];
				if( framework.hasClass(zoomElement, 'pswp__zoom-wrap') ) {
					_currZoomElementStyle = zoomElement.style;
				} else {
					_currZoomElementStyle = null;
				}
			} else {
				_currZoomElementStyle = null;
			}
			
			_currPanBounds = self.currItem.bounds;	
			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;

			_panOffset.x = _currPanBounds.center.x;
			_panOffset.y = _currPanBounds.center.y;

			if(emulateSetContent) {
				_shout('afterChange');
			}
		},


		invalidateCurrItems: function() {
			_itemsNeedUpdate = true;
			for(var i = 0; i < NUM_HOLDERS; i++) {
				if( _itemHolders[i].item ) {
					_itemHolders[i].item.needsUpdate = true;
				}
			}
		},

		updateCurrItem: function(beforeAnimation) {

			if(_indexDiff === 0) {
				return;
			}

			var diffAbs = Math.abs(_indexDiff),
				tempHolder;

			if(beforeAnimation && diffAbs < 2) {
				return;
			}


			self.currItem = _getItemAt( _currentItemIndex );
			_renderMaxResolution = false;
			
			_shout('beforeChange', _indexDiff);

			if(diffAbs >= NUM_HOLDERS) {
				_containerShiftIndex += _indexDiff + (_indexDiff > 0 ? -NUM_HOLDERS : NUM_HOLDERS);
				diffAbs = NUM_HOLDERS;
			}
			for(var i = 0; i < diffAbs; i++) {
				if(_indexDiff > 0) {
					tempHolder = _itemHolders.shift();
					_itemHolders[NUM_HOLDERS-1] = tempHolder; // move first to last

					_containerShiftIndex++;
					_setTranslateX( (_containerShiftIndex+2) * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex - diffAbs + i + 1 + 1);
				} else {
					tempHolder = _itemHolders.pop();
					_itemHolders.unshift( tempHolder ); // move last to first

					_containerShiftIndex--;
					_setTranslateX( _containerShiftIndex * _slideSize.x, tempHolder.el.style);
					self.setContent(tempHolder, _currentItemIndex + diffAbs - i - 1 - 1);
				}
				
			}

			// reset zoom/pan on previous item
			if(_currZoomElementStyle && Math.abs(_indexDiff) === 1) {

				var prevItem = _getItemAt(_prevItemIndex);
				if(prevItem.initialZoomLevel !== _currZoomLevel) {
					_calculateItemSize(prevItem , _viewportSize );
					_setImageSize(prevItem);
					_applyZoomPanToItem( prevItem ); 				
				}

			}

			// reset diff after update
			_indexDiff = 0;

			self.updateCurrZoomItem();

			_prevItemIndex = _currentItemIndex;

			_shout('afterChange');
			
		},



		updateSize: function(force) {
			
			if(!_isFixedPosition && _options.modal) {
				var windowScrollY = framework.getScrollY();
				if(_currentWindowScrollY !== windowScrollY) {
					template.style.top = windowScrollY + 'px';
					_currentWindowScrollY = windowScrollY;
				}
				if(!force && _windowVisibleSize.x === window.innerWidth && _windowVisibleSize.y === window.innerHeight) {
					return;
				}
				_windowVisibleSize.x = window.innerWidth;
				_windowVisibleSize.y = window.innerHeight;

				//template.style.width = _windowVisibleSize.x + 'px';
				template.style.height = _windowVisibleSize.y + 'px';
			}



			_viewportSize.x = self.scrollWrap.clientWidth;
			_viewportSize.y = self.scrollWrap.clientHeight;

			_updatePageScrollOffset();

			_slideSize.x = _viewportSize.x + Math.round(_viewportSize.x * _options.spacing);
			_slideSize.y = _viewportSize.y;

			_moveMainScroll(_slideSize.x * _currPositionIndex);

			_shout('beforeResize'); // even may be used for example to switch image sources


			// don't re-calculate size on inital size update
			if(_containerShiftIndex !== undefined) {

				var holder,
					item,
					hIndex;

				for(var i = 0; i < NUM_HOLDERS; i++) {
					holder = _itemHolders[i];
					_setTranslateX( (i+_containerShiftIndex) * _slideSize.x, holder.el.style);

					hIndex = _currentItemIndex+i-1;

					if(_options.loop && _getNumItems() > 2) {
						hIndex = _getLoopedId(hIndex);
					}

					// update zoom level on items and refresh source (if needsUpdate)
					item = _getItemAt( hIndex );

					// re-render gallery item if `needsUpdate`,
					// or doesn't have `bounds` (entirely new slide object)
					if( item && (_itemsNeedUpdate || item.needsUpdate || !item.bounds) ) {

						self.cleanSlide( item );
						
						self.setContent( holder, hIndex );

						// if "center" slide
						if(i === 1) {
							self.currItem = item;
							self.updateCurrZoomItem(true);
						}

						item.needsUpdate = false;

					} else if(holder.index === -1 && hIndex >= 0) {
						// add content first time
						self.setContent( holder, hIndex );
					}
					if(item && item.container) {
						_calculateItemSize(item, _viewportSize);
						_setImageSize(item);
						_applyZoomPanToItem( item );
					}
					
				}
				_itemsNeedUpdate = false;
			}	

			_startZoomLevel = _currZoomLevel = self.currItem.initialZoomLevel;
			_currPanBounds = self.currItem.bounds;

			if(_currPanBounds) {
				_panOffset.x = _currPanBounds.center.x;
				_panOffset.y = _currPanBounds.center.y;
				_applyCurrentZoomPan( true );
			}
			
			_shout('resize');
		},
		
		// Zoom current item to
		zoomTo: function(destZoomLevel, centerPoint, speed, easingFn, updateFn) {
			/*
				if(destZoomLevel === 'fit') {
					destZoomLevel = self.currItem.fitRatio;
				} else if(destZoomLevel === 'fill') {
					destZoomLevel = self.currItem.fillRatio;
				}
			*/

			if(centerPoint) {
				_startZoomLevel = _currZoomLevel;
				_midZoomPoint.x = Math.abs(centerPoint.x) - _panOffset.x ;
				_midZoomPoint.y = Math.abs(centerPoint.y) - _panOffset.y ;
				_equalizePoints(_startPanOffset, _panOffset);
			}

			var destPanBounds = _calculatePanBounds(destZoomLevel, false),
				destPanOffset = {};

			_modifyDestPanOffset('x', destPanBounds, destPanOffset, destZoomLevel);
			_modifyDestPanOffset('y', destPanBounds, destPanOffset, destZoomLevel);

			var initialZoomLevel = _currZoomLevel;
			var initialPanOffset = {
				x: _panOffset.x,
				y: _panOffset.y
			};

			_roundPoint(destPanOffset);

			var onUpdate = function(now) {
				if(now === 1) {
					_currZoomLevel = destZoomLevel;
					_panOffset.x = destPanOffset.x;
					_panOffset.y = destPanOffset.y;
				} else {
					_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
					_panOffset.x = (destPanOffset.x - initialPanOffset.x) * now + initialPanOffset.x;
					_panOffset.y = (destPanOffset.y - initialPanOffset.y) * now + initialPanOffset.y;
				}

				if(updateFn) {
					updateFn(now);
				}

				_applyCurrentZoomPan( now === 1 );
			};

			if(speed) {
				_animateProp('customZoomTo', 0, 1, speed, easingFn || framework.easing.sine.inOut, onUpdate);
			} else {
				onUpdate(1);
			}
		}


	};


	/*>>core*/

	/*>>gestures*/
	/**
	 * Mouse/touch/pointer event handlers.
	 * 
	 * separated from @core.js for readability
	 */

	var MIN_SWIPE_DISTANCE = 30,
		DIRECTION_CHECK_OFFSET = 10; // amount of pixels to drag to determine direction of swipe

	var _gestureStartTime,
		_gestureCheckSpeedTime,

		// pool of objects that are used during dragging of zooming
		p = {}, // first point
		p2 = {}, // second point (for zoom gesture)
		delta = {},
		_currPoint = {},
		_startPoint = {},
		_currPointers = [],
		_startMainScrollPos = {},
		_releaseAnimData,
		_posPoints = [], // array of points during dragging, used to determine type of gesture
		_tempPoint = {},

		_isZoomingIn,
		_verticalDragInitiated,
		_oldAndroidTouchEndTimeout,
		_currZoomedItemIndex = 0,
		_centerPoint = _getEmptyPoint(),
		_lastReleaseTime = 0,
		_isDragging, // at least one pointer is down
		_isMultitouch, // at least two _pointers are down
		_zoomStarted, // zoom level changed during zoom gesture
		_moved,
		_dragAnimFrame,
		_mainScrollShifted,
		_currentPoints, // array of current touch points
		_isZooming,
		_currPointsDistance,
		_startPointsDistance,
		_currPanBounds,
		_mainScrollPos = _getEmptyPoint(),
		_currZoomElementStyle,
		_mainScrollAnimating, // true, if animation after swipe gesture is running
		_midZoomPoint = _getEmptyPoint(),
		_currCenterPoint = _getEmptyPoint(),
		_direction,
		_isFirstMove,
		_opacityChanged,
		_bgOpacity,
		_wasOverInitialZoom,

		_isEqualPoints = function(p1, p2) {
			return p1.x === p2.x && p1.y === p2.y;
		},
		_isNearbyPoints = function(touch0, touch1) {
			return Math.abs(touch0.x - touch1.x) < DOUBLE_TAP_RADIUS && Math.abs(touch0.y - touch1.y) < DOUBLE_TAP_RADIUS;
		},
		_calculatePointsDistance = function(p1, p2) {
			_tempPoint.x = Math.abs( p1.x - p2.x );
			_tempPoint.y = Math.abs( p1.y - p2.y );
			return Math.sqrt(_tempPoint.x * _tempPoint.x + _tempPoint.y * _tempPoint.y);
		},
		_stopDragUpdateLoop = function() {
			if(_dragAnimFrame) {
				_cancelAF(_dragAnimFrame);
				_dragAnimFrame = null;
			}
		},
		_dragUpdateLoop = function() {
			if(_isDragging) {
				_dragAnimFrame = _requestAF(_dragUpdateLoop);
				_renderMovement();
			}
		},
		_canPan = function() {
			return !(_options.scaleMode === 'fit' && _currZoomLevel ===  self.currItem.initialZoomLevel);
		},
		
		// find the closest parent DOM element
		_closestElement = function(el, fn) {
		  	if(!el || el === document) {
		  		return false;
		  	}

		  	// don't search elements above pswp__scroll-wrap
		  	if(el.getAttribute('class') && el.getAttribute('class').indexOf('pswp__scroll-wrap') > -1 ) {
		  		return false;
		  	}

		  	if( fn(el) ) {
		  		return el;
		  	}

		  	return _closestElement(el.parentNode, fn);
		},

		_preventObj = {},
		_preventDefaultEventBehaviour = function(e, isDown) {
		    _preventObj.prevent = !_closestElement(e.target, _options.isClickableElement);

			_shout('preventDragEvent', e, isDown, _preventObj);
			return _preventObj.prevent;

		},
		_convertTouchToPoint = function(touch, p) {
			p.x = touch.pageX;
			p.y = touch.pageY;
			p.id = touch.identifier;
			return p;
		},
		_findCenterOfPoints = function(p1, p2, pCenter) {
			pCenter.x = (p1.x + p2.x) * 0.5;
			pCenter.y = (p1.y + p2.y) * 0.5;
		},
		_pushPosPoint = function(time, x, y) {
			if(time - _gestureCheckSpeedTime > 50) {
				var o = _posPoints.length > 2 ? _posPoints.shift() : {};
				o.x = x;
				o.y = y; 
				_posPoints.push(o);
				_gestureCheckSpeedTime = time;
			}
		},

		_calculateVerticalDragOpacityRatio = function() {
			var yOffset = _panOffset.y - self.currItem.initialPosition.y; // difference between initial and current position
			return 1 -  Math.abs( yOffset / (_viewportSize.y / 2)  );
		},

		
		// points pool, reused during touch events
		_ePoint1 = {},
		_ePoint2 = {},
		_tempPointsArr = [],
		_tempCounter,
		_getTouchPoints = function(e) {
			// clean up previous points, without recreating array
			while(_tempPointsArr.length > 0) {
				_tempPointsArr.pop();
			}

			if(!_pointerEventEnabled) {
				if(e.type.indexOf('touch') > -1) {

					if(e.touches && e.touches.length > 0) {
						_tempPointsArr[0] = _convertTouchToPoint(e.touches[0], _ePoint1);
						if(e.touches.length > 1) {
							_tempPointsArr[1] = _convertTouchToPoint(e.touches[1], _ePoint2);
						}
					}
					
				} else {
					_ePoint1.x = e.pageX;
					_ePoint1.y = e.pageY;
					_ePoint1.id = '';
					_tempPointsArr[0] = _ePoint1;//_ePoint1;
				}
			} else {
				_tempCounter = 0;
				// we can use forEach, as pointer events are supported only in modern browsers
				_currPointers.forEach(function(p) {
					if(_tempCounter === 0) {
						_tempPointsArr[0] = p;
					} else if(_tempCounter === 1) {
						_tempPointsArr[1] = p;
					}
					_tempCounter++;

				});
			}
			return _tempPointsArr;
		},

		_panOrMoveMainScroll = function(axis, delta) {

			var panFriction,
				overDiff = 0,
				newOffset = _panOffset[axis] + delta[axis],
				startOverDiff,
				dir = delta[axis] > 0,
				newMainScrollPosition = _mainScrollPos.x + delta.x,
				mainScrollDiff = _mainScrollPos.x - _startMainScrollPos.x,
				newPanPos,
				newMainScrollPos;

			// calculate fdistance over the bounds and friction
			if(newOffset > _currPanBounds.min[axis] || newOffset < _currPanBounds.max[axis]) {
				panFriction = _options.panEndFriction;
				// Linear increasing of friction, so at 1/4 of viewport it's at max value. 
				// Looks not as nice as was expected. Left for history.
				// panFriction = (1 - (_panOffset[axis] + delta[axis] + panBounds.min[axis]) / (_viewportSize[axis] / 4) );
			} else {
				panFriction = 1;
			}
			
			newOffset = _panOffset[axis] + delta[axis] * panFriction;

			// move main scroll or start panning
			if(_options.allowPanToNext || _currZoomLevel === self.currItem.initialZoomLevel) {


				if(!_currZoomElementStyle) {
					
					newMainScrollPos = newMainScrollPosition;

				} else if(_direction === 'h' && axis === 'x' && !_zoomStarted ) {
					
					if(dir) {
						if(newOffset > _currPanBounds.min[axis]) {
							panFriction = _options.panEndFriction;
							overDiff = _currPanBounds.min[axis] - newOffset;
							startOverDiff = _currPanBounds.min[axis] - _startPanOffset[axis];
						}
						
						// drag right
						if( (startOverDiff <= 0 || mainScrollDiff < 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;
							if(mainScrollDiff < 0 && newMainScrollPosition > _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}
						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
							
						}

					} else {

						if(newOffset < _currPanBounds.max[axis] ) {
							panFriction =_options.panEndFriction;
							overDiff = newOffset - _currPanBounds.max[axis];
							startOverDiff = _startPanOffset[axis] - _currPanBounds.max[axis];
						}

						if( (startOverDiff <= 0 || mainScrollDiff > 0) && _getNumItems() > 1 ) {
							newMainScrollPos = newMainScrollPosition;

							if(mainScrollDiff > 0 && newMainScrollPosition < _startMainScrollPos.x) {
								newMainScrollPos = _startMainScrollPos.x;
							}

						} else {
							if(_currPanBounds.min.x !== _currPanBounds.max.x) {
								newPanPos = newOffset;
							}
						}

					}


					//
				}

				if(axis === 'x') {

					if(newMainScrollPos !== undefined) {
						_moveMainScroll(newMainScrollPos, true);
						if(newMainScrollPos === _startMainScrollPos.x) {
							_mainScrollShifted = false;
						} else {
							_mainScrollShifted = true;
						}
					}

					if(_currPanBounds.min.x !== _currPanBounds.max.x) {
						if(newPanPos !== undefined) {
							_panOffset.x = newPanPos;
						} else if(!_mainScrollShifted) {
							_panOffset.x += delta.x * panFriction;
						}
					}

					return newMainScrollPos !== undefined;
				}

			}

			if(!_mainScrollAnimating) {
				
				if(!_mainScrollShifted) {
					if(_currZoomLevel > self.currItem.fitRatio) {
						_panOffset[axis] += delta[axis] * panFriction;
					
					}
				}

				
			}
			
		},

		// Pointerdown/touchstart/mousedown handler
		_onDragStart = function(e) {

			// Allow dragging only via left mouse button.
			// As this handler is not added in IE8 - we ignore e.which
			// 
			// http://www.quirksmode.org/js/events_properties.html
			// https://developer.mozilla.org/en-US/docs/Web/API/event.button
			if(e.type === 'mousedown' && e.button > 0  ) {
				return;
			}

			if(_initialZoomRunning) {
				e.preventDefault();
				return;
			}

			if(_oldAndroidTouchEndTimeout && e.type === 'mousedown') {
				return;
			}

			if(_preventDefaultEventBehaviour(e, true)) {
				e.preventDefault();
			}



			_shout('pointerDown');

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex < 0) {
					pointerIndex = _currPointers.length;
				}
				_currPointers[pointerIndex] = {x:e.pageX, y:e.pageY, id: e.pointerId};
			}
			


			var startPointsList = _getTouchPoints(e),
				numPoints = startPointsList.length;

			_currentPoints = null;

			_stopAllAnimations();

			// init drag
			if(!_isDragging || numPoints === 1) {

				

				_isDragging = _isFirstMove = true;
				framework.bind(window, _upMoveEvents, self);

				_isZoomingIn = 
					_wasOverInitialZoom = 
					_opacityChanged = 
					_verticalDragInitiated = 
					_mainScrollShifted = 
					_moved = 
					_isMultitouch = 
					_zoomStarted = false;

				_direction = null;

				_shout('firstTouchStart', startPointsList);

				_equalizePoints(_startPanOffset, _panOffset);

				_currPanDist.x = _currPanDist.y = 0;
				_equalizePoints(_currPoint, startPointsList[0]);
				_equalizePoints(_startPoint, _currPoint);

				//_equalizePoints(_startMainScrollPos, _mainScrollPos);
				_startMainScrollPos.x = _slideSize.x * _currPositionIndex;

				_posPoints = [{
					x: _currPoint.x,
					y: _currPoint.y
				}];

				_gestureCheckSpeedTime = _gestureStartTime = _getCurrentTime();

				//_mainScrollAnimationEnd(true);
				_calculatePanBounds( _currZoomLevel, true );
				
				// Start rendering
				_stopDragUpdateLoop();
				_dragUpdateLoop();
				
			}

			// init zoom
			if(!_isZooming && numPoints > 1 && !_mainScrollAnimating && !_mainScrollShifted) {
				_startZoomLevel = _currZoomLevel;
				_zoomStarted = false; // true if zoom changed at least once

				_isZooming = _isMultitouch = true;
				_currPanDist.y = _currPanDist.x = 0;

				_equalizePoints(_startPanOffset, _panOffset);

				_equalizePoints(p, startPointsList[0]);
				_equalizePoints(p2, startPointsList[1]);

				_findCenterOfPoints(p, p2, _currCenterPoint);

				_midZoomPoint.x = Math.abs(_currCenterPoint.x) - _panOffset.x;
				_midZoomPoint.y = Math.abs(_currCenterPoint.y) - _panOffset.y;
				_currPointsDistance = _startPointsDistance = _calculatePointsDistance(p, p2);
			}


		},

		// Pointermove/touchmove/mousemove handler
		_onDragMove = function(e) {

			e.preventDefault();

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				if(pointerIndex > -1) {
					var p = _currPointers[pointerIndex];
					p.x = e.pageX;
					p.y = e.pageY; 
				}
			}

			if(_isDragging) {
				var touchesList = _getTouchPoints(e);
				if(!_direction && !_moved && !_isZooming) {

					if(_mainScrollPos.x !== _slideSize.x * _currPositionIndex) {
						// if main scroll position is shifted – direction is always horizontal
						_direction = 'h';
					} else {
						var diff = Math.abs(touchesList[0].x - _currPoint.x) - Math.abs(touchesList[0].y - _currPoint.y);
						// check the direction of movement
						if(Math.abs(diff) >= DIRECTION_CHECK_OFFSET) {
							_direction = diff > 0 ? 'h' : 'v';
							_currentPoints = touchesList;
						}
					}
					
				} else {
					_currentPoints = touchesList;
				}
			}	
		},
		// 
		_renderMovement =  function() {

			if(!_currentPoints) {
				return;
			}

			var numPoints = _currentPoints.length;

			if(numPoints === 0) {
				return;
			}

			_equalizePoints(p, _currentPoints[0]);

			delta.x = p.x - _currPoint.x;
			delta.y = p.y - _currPoint.y;

			if(_isZooming && numPoints > 1) {
				// Handle behaviour for more than 1 point

				_currPoint.x = p.x;
				_currPoint.y = p.y;
			
				// check if one of two points changed
				if( !delta.x && !delta.y && _isEqualPoints(_currentPoints[1], p2) ) {
					return;
				}

				_equalizePoints(p2, _currentPoints[1]);


				if(!_zoomStarted) {
					_zoomStarted = true;
					_shout('zoomGestureStarted');
				}
				
				// Distance between two points
				var pointsDistance = _calculatePointsDistance(p,p2);

				var zoomLevel = _calculateZoomLevel(pointsDistance);

				// slightly over the of initial zoom level
				if(zoomLevel > self.currItem.initialZoomLevel + self.currItem.initialZoomLevel / 15) {
					_wasOverInitialZoom = true;
				}

				// Apply the friction if zoom level is out of the bounds
				var zoomFriction = 1,
					minZoomLevel = _getMinZoomLevel(),
					maxZoomLevel = _getMaxZoomLevel();

				if ( zoomLevel < minZoomLevel ) {
					
					if(_options.pinchToClose && !_wasOverInitialZoom && _startZoomLevel <= self.currItem.initialZoomLevel) {
						// fade out background if zooming out
						var minusDiff = minZoomLevel - zoomLevel;
						var percent = 1 - minusDiff / (minZoomLevel / 1.2);

						_applyBgOpacity(percent);
						_shout('onPinchClose', percent);
						_opacityChanged = true;
					} else {
						zoomFriction = (minZoomLevel - zoomLevel) / minZoomLevel;
						if(zoomFriction > 1) {
							zoomFriction = 1;
						}
						zoomLevel = minZoomLevel - zoomFriction * (minZoomLevel / 3);
					}
					
				} else if ( zoomLevel > maxZoomLevel ) {
					// 1.5 - extra zoom level above the max. E.g. if max is x6, real max 6 + 1.5 = 7.5
					zoomFriction = (zoomLevel - maxZoomLevel) / ( minZoomLevel * 6 );
					if(zoomFriction > 1) {
						zoomFriction = 1;
					}
					zoomLevel = maxZoomLevel + zoomFriction * minZoomLevel;
				}

				if(zoomFriction < 0) {
					zoomFriction = 0;
				}

				// distance between touch points after friction is applied
				_currPointsDistance = pointsDistance;

				// _centerPoint - The point in the middle of two pointers
				_findCenterOfPoints(p, p2, _centerPoint);
			
				// paning with two pointers pressed
				_currPanDist.x += _centerPoint.x - _currCenterPoint.x;
				_currPanDist.y += _centerPoint.y - _currCenterPoint.y;
				_equalizePoints(_currCenterPoint, _centerPoint);

				_panOffset.x = _calculatePanOffset('x', zoomLevel);
				_panOffset.y = _calculatePanOffset('y', zoomLevel);

				_isZoomingIn = zoomLevel > _currZoomLevel;
				_currZoomLevel = zoomLevel;
				_applyCurrentZoomPan();

			} else {

				// handle behaviour for one point (dragging or panning)

				if(!_direction) {
					return;
				}

				if(_isFirstMove) {
					_isFirstMove = false;

					// subtract drag distance that was used during the detection direction  

					if( Math.abs(delta.x) >= DIRECTION_CHECK_OFFSET) {
						delta.x -= _currentPoints[0].x - _startPoint.x;
					}
					
					if( Math.abs(delta.y) >= DIRECTION_CHECK_OFFSET) {
						delta.y -= _currentPoints[0].y - _startPoint.y;
					}
				}

				_currPoint.x = p.x;
				_currPoint.y = p.y;

				// do nothing if pointers position hasn't changed
				if(delta.x === 0 && delta.y === 0) {
					return;
				}

				if(_direction === 'v' && _options.closeOnVerticalDrag) {
					if(!_canPan()) {
						_currPanDist.y += delta.y;
						_panOffset.y += delta.y;

						var opacityRatio = _calculateVerticalDragOpacityRatio();

						_verticalDragInitiated = true;
						_shout('onVerticalDrag', opacityRatio);

						_applyBgOpacity(opacityRatio);
						_applyCurrentZoomPan();
						return ;
					}
				}

				_pushPosPoint(_getCurrentTime(), p.x, p.y);

				_moved = true;
				_currPanBounds = self.currItem.bounds;
				
				var mainScrollChanged = _panOrMoveMainScroll('x', delta);
				if(!mainScrollChanged) {
					_panOrMoveMainScroll('y', delta);

					_roundPoint(_panOffset);
					_applyCurrentZoomPan();
				}

			}

		},
		
		// Pointerup/pointercancel/touchend/touchcancel/mouseup event handler
		_onDragRelease = function(e) {

			if(_features.isOldAndroid ) {

				if(_oldAndroidTouchEndTimeout && e.type === 'mouseup') {
					return;
				}

				// on Android (v4.1, 4.2, 4.3 & possibly older) 
				// ghost mousedown/up event isn't preventable via e.preventDefault,
				// which causes fake mousedown event
				// so we block mousedown/up for 600ms
				if( e.type.indexOf('touch') > -1 ) {
					clearTimeout(_oldAndroidTouchEndTimeout);
					_oldAndroidTouchEndTimeout = setTimeout(function() {
						_oldAndroidTouchEndTimeout = 0;
					}, 600);
				}
				
			}

			_shout('pointerUp');

			if(_preventDefaultEventBehaviour(e, false)) {
				e.preventDefault();
			}

			var releasePoint;

			if(_pointerEventEnabled) {
				var pointerIndex = framework.arraySearch(_currPointers, e.pointerId, 'id');
				
				if(pointerIndex > -1) {
					releasePoint = _currPointers.splice(pointerIndex, 1)[0];

					if(navigator.pointerEnabled) {
						releasePoint.type = e.pointerType || 'mouse';
					} else {
						var MSPOINTER_TYPES = {
							4: 'mouse', // event.MSPOINTER_TYPE_MOUSE
							2: 'touch', // event.MSPOINTER_TYPE_TOUCH 
							3: 'pen' // event.MSPOINTER_TYPE_PEN
						};
						releasePoint.type = MSPOINTER_TYPES[e.pointerType];

						if(!releasePoint.type) {
							releasePoint.type = e.pointerType || 'mouse';
						}
					}

				}
			}

			var touchList = _getTouchPoints(e),
				gestureType,
				numPoints = touchList.length;

			if(e.type === 'mouseup') {
				numPoints = 0;
			}

			// Do nothing if there were 3 touch points or more
			if(numPoints === 2) {
				_currentPoints = null;
				return true;
			}

			// if second pointer released
			if(numPoints === 1) {
				_equalizePoints(_startPoint, touchList[0]);
			}				


			// pointer hasn't moved, send "tap release" point
			if(numPoints === 0 && !_direction && !_mainScrollAnimating) {
				if(!releasePoint) {
					if(e.type === 'mouseup') {
						releasePoint = {x: e.pageX, y: e.pageY, type:'mouse'};
					} else if(e.changedTouches && e.changedTouches[0]) {
						releasePoint = {x: e.changedTouches[0].pageX, y: e.changedTouches[0].pageY, type:'touch'};
					}		
				}

				_shout('touchRelease', e, releasePoint);
			}

			// Difference in time between releasing of two last touch points (zoom gesture)
			var releaseTimeDiff = -1;

			// Gesture completed, no pointers left
			if(numPoints === 0) {
				_isDragging = false;
				framework.unbind(window, _upMoveEvents, self);

				_stopDragUpdateLoop();

				if(_isZooming) {
					// Two points released at the same time
					releaseTimeDiff = 0;
				} else if(_lastReleaseTime !== -1) {
					releaseTimeDiff = _getCurrentTime() - _lastReleaseTime;
				}
			}
			_lastReleaseTime = numPoints === 1 ? _getCurrentTime() : -1;
			
			if(releaseTimeDiff !== -1 && releaseTimeDiff < 150) {
				gestureType = 'zoom';
			} else {
				gestureType = 'swipe';
			}

			if(_isZooming && numPoints < 2) {
				_isZooming = false;

				// Only second point released
				if(numPoints === 1) {
					gestureType = 'zoomPointerUp';
				}
				_shout('zoomGestureEnded');
			}

			_currentPoints = null;
			if(!_moved && !_zoomStarted && !_mainScrollAnimating && !_verticalDragInitiated) {
				// nothing to animate
				return;
			}
		
			_stopAllAnimations();

			
			if(!_releaseAnimData) {
				_releaseAnimData = _initDragReleaseAnimationData();
			}
			
			_releaseAnimData.calculateSwipeSpeed('x');


			if(_verticalDragInitiated) {

				var opacityRatio = _calculateVerticalDragOpacityRatio();

				if(opacityRatio < _options.verticalDragRange) {
					self.close();
				} else {
					var initalPanY = _panOffset.y,
						initialBgOpacity = _bgOpacity;

					_animateProp('verticalDrag', 0, 1, 300, framework.easing.cubic.out, function(now) {
						
						_panOffset.y = (self.currItem.initialPosition.y - initalPanY) * now + initalPanY;

						_applyBgOpacity(  (1 - initialBgOpacity) * now + initialBgOpacity );
						_applyCurrentZoomPan();
					});

					_shout('onVerticalDrag', 1);
				}

				return;
			}


			// main scroll 
			if(  (_mainScrollShifted || _mainScrollAnimating) && numPoints === 0) {
				var itemChanged = _finishSwipeMainScrollGesture(gestureType, _releaseAnimData);
				if(itemChanged) {
					return;
				}
				gestureType = 'zoomPointerUp';
			}

			// prevent zoom/pan animation when main scroll animation runs
			if(_mainScrollAnimating) {
				return;
			}
			
			// Complete simple zoom gesture (reset zoom level if it's out of the bounds)  
			if(gestureType !== 'swipe') {
				_completeZoomGesture();
				return;
			}
		
			// Complete pan gesture if main scroll is not shifted, and it's possible to pan current image
			if(!_mainScrollShifted && _currZoomLevel > self.currItem.fitRatio) {
				_completePanGesture(_releaseAnimData);
			}
		},


		// Returns object with data about gesture
		// It's created only once and then reused
		_initDragReleaseAnimationData  = function() {
			// temp local vars
			var lastFlickDuration,
				tempReleasePos;

			// s = this
			var s = {
				lastFlickOffset: {},
				lastFlickDist: {},
				lastFlickSpeed: {},
				slowDownRatio:  {},
				slowDownRatioReverse:  {},
				speedDecelerationRatio:  {},
				speedDecelerationRatioAbs:  {},
				distanceOffset:  {},
				backAnimDestination: {},
				backAnimStarted: {},
				calculateSwipeSpeed: function(axis) {
					

					if( _posPoints.length > 1) {
						lastFlickDuration = _getCurrentTime() - _gestureCheckSpeedTime + 50;
						tempReleasePos = _posPoints[_posPoints.length-2][axis];
					} else {
						lastFlickDuration = _getCurrentTime() - _gestureStartTime; // total gesture duration
						tempReleasePos = _startPoint[axis];
					}
					s.lastFlickOffset[axis] = _currPoint[axis] - tempReleasePos;
					s.lastFlickDist[axis] = Math.abs(s.lastFlickOffset[axis]);
					if(s.lastFlickDist[axis] > 20) {
						s.lastFlickSpeed[axis] = s.lastFlickOffset[axis] / lastFlickDuration;
					} else {
						s.lastFlickSpeed[axis] = 0;
					}
					if( Math.abs(s.lastFlickSpeed[axis]) < 0.1 ) {
						s.lastFlickSpeed[axis] = 0;
					}
					
					s.slowDownRatio[axis] = 0.95;
					s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
					s.speedDecelerationRatio[axis] = 1;
				},

				calculateOverBoundsAnimOffset: function(axis, speed) {
					if(!s.backAnimStarted[axis]) {

						if(_panOffset[axis] > _currPanBounds.min[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.min[axis];
							
						} else if(_panOffset[axis] < _currPanBounds.max[axis]) {
							s.backAnimDestination[axis] = _currPanBounds.max[axis];
						}

						if(s.backAnimDestination[axis] !== undefined) {
							s.slowDownRatio[axis] = 0.7;
							s.slowDownRatioReverse[axis] = 1 - s.slowDownRatio[axis];
							if(s.speedDecelerationRatioAbs[axis] < 0.05) {

								s.lastFlickSpeed[axis] = 0;
								s.backAnimStarted[axis] = true;

								_animateProp('bounceZoomPan'+axis,_panOffset[axis], 
									s.backAnimDestination[axis], 
									speed || 300, 
									framework.easing.sine.out, 
									function(pos) {
										_panOffset[axis] = pos;
										_applyCurrentZoomPan();
									}
								);

							}
						}
					}
				},

				// Reduces the speed by slowDownRatio (per 10ms)
				calculateAnimOffset: function(axis) {
					if(!s.backAnimStarted[axis]) {
						s.speedDecelerationRatio[axis] = s.speedDecelerationRatio[axis] * (s.slowDownRatio[axis] + 
													s.slowDownRatioReverse[axis] - 
													s.slowDownRatioReverse[axis] * s.timeDiff / 10);

						s.speedDecelerationRatioAbs[axis] = Math.abs(s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis]);
						s.distanceOffset[axis] = s.lastFlickSpeed[axis] * s.speedDecelerationRatio[axis] * s.timeDiff;
						_panOffset[axis] += s.distanceOffset[axis];

					}
				},

				panAnimLoop: function() {
					if ( _animations.zoomPan ) {
						_animations.zoomPan.raf = _requestAF(s.panAnimLoop);

						s.now = _getCurrentTime();
						s.timeDiff = s.now - s.lastNow;
						s.lastNow = s.now;
						
						s.calculateAnimOffset('x');
						s.calculateAnimOffset('y');

						_applyCurrentZoomPan();
						
						s.calculateOverBoundsAnimOffset('x');
						s.calculateOverBoundsAnimOffset('y');


						if (s.speedDecelerationRatioAbs.x < 0.05 && s.speedDecelerationRatioAbs.y < 0.05) {

							// round pan position
							_panOffset.x = Math.round(_panOffset.x);
							_panOffset.y = Math.round(_panOffset.y);
							_applyCurrentZoomPan();
							
							_stopAnimation('zoomPan');
							return;
						}
					}

				}
			};
			return s;
		},

		_completePanGesture = function(animData) {
			// calculate swipe speed for Y axis (paanning)
			animData.calculateSwipeSpeed('y');

			_currPanBounds = self.currItem.bounds;
			
			animData.backAnimDestination = {};
			animData.backAnimStarted = {};

			// Avoid acceleration animation if speed is too low
			if(Math.abs(animData.lastFlickSpeed.x) <= 0.05 && Math.abs(animData.lastFlickSpeed.y) <= 0.05 ) {
				animData.speedDecelerationRatioAbs.x = animData.speedDecelerationRatioAbs.y = 0;

				// Run pan drag release animation. E.g. if you drag image and release finger without momentum.
				animData.calculateOverBoundsAnimOffset('x');
				animData.calculateOverBoundsAnimOffset('y');
				return true;
			}

			// Animation loop that controls the acceleration after pan gesture ends
			_registerStartAnimation('zoomPan');
			animData.lastNow = _getCurrentTime();
			animData.panAnimLoop();
		},


		_finishSwipeMainScrollGesture = function(gestureType, _releaseAnimData) {
			var itemChanged;
			if(!_mainScrollAnimating) {
				_currZoomedItemIndex = _currentItemIndex;
			}


			
			var itemsDiff;

			if(gestureType === 'swipe') {
				var totalShiftDist = _currPoint.x - _startPoint.x,
					isFastLastFlick = _releaseAnimData.lastFlickDist.x < 10;

				// if container is shifted for more than MIN_SWIPE_DISTANCE, 
				// and last flick gesture was in right direction
				if(totalShiftDist > MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x > 20) ) {
					// go to prev item
					itemsDiff = -1;
				} else if(totalShiftDist < -MIN_SWIPE_DISTANCE && 
					(isFastLastFlick || _releaseAnimData.lastFlickOffset.x < -20) ) {
					// go to next item
					itemsDiff = 1;
				}
			}

			var nextCircle;

			if(itemsDiff) {
				
				_currentItemIndex += itemsDiff;

				if(_currentItemIndex < 0) {
					_currentItemIndex = _options.loop ? _getNumItems()-1 : 0;
					nextCircle = true;
				} else if(_currentItemIndex >= _getNumItems()) {
					_currentItemIndex = _options.loop ? 0 : _getNumItems()-1;
					nextCircle = true;
				}

				if(!nextCircle || _options.loop) {
					_indexDiff += itemsDiff;
					_currPositionIndex -= itemsDiff;
					itemChanged = true;
				}
				

				
			}

			var animateToX = _slideSize.x * _currPositionIndex;
			var animateToDist = Math.abs( animateToX - _mainScrollPos.x );
			var finishAnimDuration;


			if(!itemChanged && animateToX > _mainScrollPos.x !== _releaseAnimData.lastFlickSpeed.x > 0) {
				// "return to current" duration, e.g. when dragging from slide 0 to -1
				finishAnimDuration = 333; 
			} else {
				finishAnimDuration = Math.abs(_releaseAnimData.lastFlickSpeed.x) > 0 ? 
										animateToDist / Math.abs(_releaseAnimData.lastFlickSpeed.x) : 
										333;

				finishAnimDuration = Math.min(finishAnimDuration, 400);
				finishAnimDuration = Math.max(finishAnimDuration, 250);
			}

			if(_currZoomedItemIndex === _currentItemIndex) {
				itemChanged = false;
			}
			
			_mainScrollAnimating = true;
			
			_shout('mainScrollAnimStart');

			_animateProp('mainScroll', _mainScrollPos.x, animateToX, finishAnimDuration, framework.easing.cubic.out, 
				_moveMainScroll,
				function() {
					_stopAllAnimations();
					_mainScrollAnimating = false;
					_currZoomedItemIndex = -1;
					
					if(itemChanged || _currZoomedItemIndex !== _currentItemIndex) {
						self.updateCurrItem();
					}
					
					_shout('mainScrollAnimComplete');
				}
			);

			if(itemChanged) {
				self.updateCurrItem(true);
			}

			return itemChanged;
		},

		_calculateZoomLevel = function(touchesDistance) {
			return  1 / _startPointsDistance * touchesDistance * _startZoomLevel;
		},

		// Resets zoom if it's out of bounds
		_completeZoomGesture = function() {
			var destZoomLevel = _currZoomLevel,
				minZoomLevel = _getMinZoomLevel(),
				maxZoomLevel = _getMaxZoomLevel();

			if ( _currZoomLevel < minZoomLevel ) {
				destZoomLevel = minZoomLevel;
			} else if ( _currZoomLevel > maxZoomLevel ) {
				destZoomLevel = maxZoomLevel;
			}

			var destOpacity = 1,
				onUpdate,
				initialOpacity = _bgOpacity;

			if(_opacityChanged && !_isZoomingIn && !_wasOverInitialZoom && _currZoomLevel < minZoomLevel) {
				//_closedByScroll = true;
				self.close();
				return true;
			}

			if(_opacityChanged) {
				onUpdate = function(now) {
					_applyBgOpacity(  (destOpacity - initialOpacity) * now + initialOpacity );
				};
			}

			self.zoomTo(destZoomLevel, 0, 200,  framework.easing.cubic.out, onUpdate);
			return true;
		};


	_registerModule('Gestures', {
		publicMethods: {

			initGestures: function() {

				// helper function that builds touch/pointer/mouse events
				var addEventNames = function(pref, down, move, up, cancel) {
					_dragStartEvent = pref + down;
					_dragMoveEvent = pref + move;
					_dragEndEvent = pref + up;
					if(cancel) {
						_dragCancelEvent = pref + cancel;
					} else {
						_dragCancelEvent = '';
					}
				};

				_pointerEventEnabled = _features.pointerEvent;
				if(_pointerEventEnabled && _features.touch) {
					// we don't need touch events, if browser supports pointer events
					_features.touch = false;
				}

				if(_pointerEventEnabled) {
					if(navigator.pointerEnabled) {
						addEventNames('pointer', 'down', 'move', 'up', 'cancel');
					} else {
						// IE10 pointer events are case-sensitive
						addEventNames('MSPointer', 'Down', 'Move', 'Up', 'Cancel');
					}
				} else if(_features.touch) {
					addEventNames('touch', 'start', 'move', 'end', 'cancel');
					_likelyTouchDevice = true;
				} else {
					addEventNames('mouse', 'down', 'move', 'up');	
				}

				_upMoveEvents = _dragMoveEvent + ' ' + _dragEndEvent  + ' ' +  _dragCancelEvent;
				_downEvents = _dragStartEvent;

				if(_pointerEventEnabled && !_likelyTouchDevice) {
					_likelyTouchDevice = (navigator.maxTouchPoints > 1) || (navigator.msMaxTouchPoints > 1);
				}
				// make variable public
				self.likelyTouchDevice = _likelyTouchDevice; 
				
				_globalEventHandlers[_dragStartEvent] = _onDragStart;
				_globalEventHandlers[_dragMoveEvent] = _onDragMove;
				_globalEventHandlers[_dragEndEvent] = _onDragRelease; // the Kraken

				if(_dragCancelEvent) {
					_globalEventHandlers[_dragCancelEvent] = _globalEventHandlers[_dragEndEvent];
				}

				// Bind mouse events on device with detected hardware touch support, in case it supports multiple types of input.
				if(_features.touch) {
					_downEvents += ' mousedown';
					_upMoveEvents += ' mousemove mouseup';
					_globalEventHandlers.mousedown = _globalEventHandlers[_dragStartEvent];
					_globalEventHandlers.mousemove = _globalEventHandlers[_dragMoveEvent];
					_globalEventHandlers.mouseup = _globalEventHandlers[_dragEndEvent];
				}

				if(!_likelyTouchDevice) {
					// don't allow pan to next slide from zoomed state on Desktop
					_options.allowPanToNext = false;
				}
			}

		}
	});


	/*>>gestures*/

	/*>>show-hide-transition*/
	/**
	 * show-hide-transition.js:
	 *
	 * Manages initial opening or closing transition.
	 *
	 * If you're not planning to use transition for gallery at all,
	 * you may set options hideAnimationDuration and showAnimationDuration to 0,
	 * and just delete startAnimation function.
	 * 
	 */


	var _showOrHideTimeout,
		_showOrHide = function(item, img, out, completeFn) {

			if(_showOrHideTimeout) {
				clearTimeout(_showOrHideTimeout);
			}

			_initialZoomRunning = true;
			_initialContentSet = true;
			
			// dimensions of small thumbnail {x:,y:,w:}.
			// Height is optional, as calculated based on large image.
			var thumbBounds; 
			if(item.initialLayout) {
				thumbBounds = item.initialLayout;
				item.initialLayout = null;
			} else {
				thumbBounds = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
			}

			var duration = out ? _options.hideAnimationDuration : _options.showAnimationDuration;

			var onComplete = function() {
				_stopAnimation('initialZoom');
				if(!out) {
					_applyBgOpacity(1);
					if(img) {
						img.style.display = 'block';
					}
					framework.addClass(template, 'pswp--animated-in');
					_shout('initialZoom' + (out ? 'OutEnd' : 'InEnd'));
				} else {
					self.template.removeAttribute('style');
					self.bg.removeAttribute('style');
				}

				if(completeFn) {
					completeFn();
				}
				_initialZoomRunning = false;
			};

			// if bounds aren't provided, just open gallery without animation
			if(!duration || !thumbBounds || thumbBounds.x === undefined) {

				_shout('initialZoom' + (out ? 'Out' : 'In') );

				_currZoomLevel = item.initialZoomLevel;
				_equalizePoints(_panOffset,  item.initialPosition );
				_applyCurrentZoomPan();

				template.style.opacity = out ? 0 : 1;
				_applyBgOpacity(1);

				if(duration) {
					setTimeout(function() {
						onComplete();
					}, duration);
				} else {
					onComplete();
				}

				return;
			}

			var startAnimation = function() {
				var closeWithRaf = _closedByScroll,
					fadeEverything = !self.currItem.src || self.currItem.loadError || _options.showHideOpacity;
				
				// apply hw-acceleration to image
				if(item.miniImg) {
					item.miniImg.style.webkitBackfaceVisibility = 'hidden';
				}

				if(!out) {
					_currZoomLevel = thumbBounds.w / item.w;
					_panOffset.x = thumbBounds.x;
					_panOffset.y = thumbBounds.y - _initalWindowScrollY;

					self[fadeEverything ? 'template' : 'bg'].style.opacity = 0.001;
					_applyCurrentZoomPan();
				}

				_registerStartAnimation('initialZoom');
				
				if(out && !closeWithRaf) {
					framework.removeClass(template, 'pswp--animated-in');
				}

				if(fadeEverything) {
					if(out) {
						framework[ (closeWithRaf ? 'remove' : 'add') + 'Class' ](template, 'pswp--animate_opacity');
					} else {
						setTimeout(function() {
							framework.addClass(template, 'pswp--animate_opacity');
						}, 30);
					}
				}

				_showOrHideTimeout = setTimeout(function() {

					_shout('initialZoom' + (out ? 'Out' : 'In') );
					

					if(!out) {

						// "in" animation always uses CSS transitions (instead of rAF).
						// CSS transition work faster here, 
						// as developer may also want to animate other things, 
						// like ui on top of sliding area, which can be animated just via CSS
						
						_currZoomLevel = item.initialZoomLevel;
						_equalizePoints(_panOffset,  item.initialPosition );
						_applyCurrentZoomPan();
						_applyBgOpacity(1);

						if(fadeEverything) {
							template.style.opacity = 1;
						} else {
							_applyBgOpacity(1);
						}

						_showOrHideTimeout = setTimeout(onComplete, duration + 20);
					} else {

						// "out" animation uses rAF only when PhotoSwipe is closed by browser scroll, to recalculate position
						var destZoomLevel = thumbBounds.w / item.w,
							initialPanOffset = {
								x: _panOffset.x,
								y: _panOffset.y
							},
							initialZoomLevel = _currZoomLevel,
							initalBgOpacity = _bgOpacity,
							onUpdate = function(now) {
								
								if(now === 1) {
									_currZoomLevel = destZoomLevel;
									_panOffset.x = thumbBounds.x;
									_panOffset.y = thumbBounds.y  - _currentWindowScrollY;
								} else {
									_currZoomLevel = (destZoomLevel - initialZoomLevel) * now + initialZoomLevel;
									_panOffset.x = (thumbBounds.x - initialPanOffset.x) * now + initialPanOffset.x;
									_panOffset.y = (thumbBounds.y - _currentWindowScrollY - initialPanOffset.y) * now + initialPanOffset.y;
								}
								
								_applyCurrentZoomPan();
								if(fadeEverything) {
									template.style.opacity = 1 - now;
								} else {
									_applyBgOpacity( initalBgOpacity - now * initalBgOpacity );
								}
							};

						if(closeWithRaf) {
							_animateProp('initialZoom', 0, 1, duration, framework.easing.cubic.out, onUpdate, onComplete);
						} else {
							onUpdate(1);
							_showOrHideTimeout = setTimeout(onComplete, duration + 20);
						}
					}
				
				}, out ? 25 : 90); // Main purpose of this delay is to give browser time to paint and
						// create composite layers of PhotoSwipe UI parts (background, controls, caption, arrows).
						// Which avoids lag at the beginning of scale transition.
			};
			startAnimation();

			
		};

	/*>>show-hide-transition*/

	/*>>items-controller*/
	/**
	*
	* Controller manages gallery items, their dimensions, and their content.
	* 
	*/

	var _items,
		_tempPanAreaSize = {},
		_imagesToAppendPool = [],
		_initialContentSet,
		_initialZoomRunning,
		_controllerDefaultOptions = {
			index: 0,
			errorMsg: '<div class="pswp__error-msg"><a href="%url%" target="_blank">The image</a> could not be loaded.</div>',
			forceProgressiveLoading: false, // TODO
			preload: [1,1],
			getNumItemsFn: function() {
				return _items.length;
			}
		};


	var _getItemAt,
		_getNumItems,
		_initialIsLoop,
		_getZeroBounds = function() {
			return {
				center:{x:0,y:0}, 
				max:{x:0,y:0}, 
				min:{x:0,y:0}
			};
		},
		_calculateSingleItemPanBounds = function(item, realPanElementW, realPanElementH ) {
			var bounds = item.bounds;

			// position of element when it's centered
			bounds.center.x = Math.round((_tempPanAreaSize.x - realPanElementW) / 2);
			bounds.center.y = Math.round((_tempPanAreaSize.y - realPanElementH) / 2) + item.vGap.top;

			// maximum pan position
			bounds.max.x = (realPanElementW > _tempPanAreaSize.x) ? 
								Math.round(_tempPanAreaSize.x - realPanElementW) : 
								bounds.center.x;
			
			bounds.max.y = (realPanElementH > _tempPanAreaSize.y) ? 
								Math.round(_tempPanAreaSize.y - realPanElementH) + item.vGap.top : 
								bounds.center.y;
			
			// minimum pan position
			bounds.min.x = (realPanElementW > _tempPanAreaSize.x) ? 0 : bounds.center.x;
			bounds.min.y = (realPanElementH > _tempPanAreaSize.y) ? item.vGap.top : bounds.center.y;
		},
		_calculateItemSize = function(item, viewportSize, zoomLevel) {

			if (item.src && !item.loadError) {
				var isInitial = !zoomLevel;
				
				if(isInitial) {
					if(!item.vGap) {
						item.vGap = {top:0,bottom:0};
					}
					// allows overriding vertical margin for individual items
					_shout('parseVerticalMargin', item);
				}


				_tempPanAreaSize.x = viewportSize.x;
				_tempPanAreaSize.y = viewportSize.y - item.vGap.top - item.vGap.bottom;

				if (isInitial) {
					var hRatio = _tempPanAreaSize.x / item.w;
					var vRatio = _tempPanAreaSize.y / item.h;

					item.fitRatio = hRatio < vRatio ? hRatio : vRatio;
					//item.fillRatio = hRatio > vRatio ? hRatio : vRatio;

					var scaleMode = _options.scaleMode;

					if (scaleMode === 'orig') {
						zoomLevel = 1;
					} else if (scaleMode === 'fit') {
						zoomLevel = item.fitRatio;
					}

					if (zoomLevel > 1) {
						zoomLevel = 1;
					}

					item.initialZoomLevel = zoomLevel;
					
					if(!item.bounds) {
						// reuse bounds object
						item.bounds = _getZeroBounds(); 
					}
				}

				if(!zoomLevel) {
					return;
				}

				_calculateSingleItemPanBounds(item, item.w * zoomLevel, item.h * zoomLevel);

				if (isInitial && zoomLevel === item.initialZoomLevel) {
					item.initialPosition = item.bounds.center;
				}

				return item.bounds;
			} else {
				item.w = item.h = 0;
				item.initialZoomLevel = item.fitRatio = 1;
				item.bounds = _getZeroBounds();
				item.initialPosition = item.bounds.center;

				// if it's not image, we return zero bounds (content is not zoomable)
				return item.bounds;
			}
			
		},

		


		_appendImage = function(index, item, baseDiv, img, preventAnimation, keepPlaceholder) {
			

			if(item.loadError) {
				return;
			}

			if(img) {

				item.imageAppended = true;
				_setImageSize(item, img, (item === self.currItem && _renderMaxResolution) );
				
				baseDiv.appendChild(img);

				if(keepPlaceholder) {
					setTimeout(function() {
						if(item && item.loaded && item.placeholder) {
							item.placeholder.style.display = 'none';
							item.placeholder = null;
						}
					}, 500);
				}
			}
		},
		


		_preloadImage = function(item) {
			item.loading = true;
			item.loaded = false;
			var img = item.img = framework.createEl('pswp__img', 'img');
			var onComplete = function() {
				item.loading = false;
				item.loaded = true;

				if(item.loadComplete) {
					item.loadComplete(item);
				} else {
					item.img = null; // no need to store image object
				}
				img.onload = img.onerror = null;
				img = null;
			};
			img.onload = onComplete;
			img.onerror = function() {
				item.loadError = true;
				onComplete();
			};		

			img.src = item.src;// + '?a=' + Math.random();

			return img;
		},
		_checkForError = function(item, cleanUp) {
			if(item.src && item.loadError && item.container) {

				if(cleanUp) {
					item.container.innerHTML = '';
				}

				item.container.innerHTML = _options.errorMsg.replace('%url%',  item.src );
				return true;
				
			}
		},
		_setImageSize = function(item, img, maxRes) {
			if(!item.src) {
				return;
			}

			if(!img) {
				img = item.container.lastChild;
			}

			var w = maxRes ? item.w : Math.round(item.w * item.fitRatio),
				h = maxRes ? item.h : Math.round(item.h * item.fitRatio);
			
			if(item.placeholder && !item.loaded) {
				item.placeholder.style.width = w + 'px';
				item.placeholder.style.height = h + 'px';
			}

			img.style.width = w + 'px';
			img.style.height = h + 'px';
		},
		_appendImagesPool = function() {

			if(_imagesToAppendPool.length) {
				var poolItem;

				for(var i = 0; i < _imagesToAppendPool.length; i++) {
					poolItem = _imagesToAppendPool[i];
					if( poolItem.holder.index === poolItem.index ) {
						_appendImage(poolItem.index, poolItem.item, poolItem.baseDiv, poolItem.img, false, poolItem.clearPlaceholder);
					}
				}
				_imagesToAppendPool = [];
			}
		};
		


	_registerModule('Controller', {

		publicMethods: {

			lazyLoadItem: function(index) {
				index = _getLoopedId(index);
				var item = _getItemAt(index);

				if(!item || ((item.loaded || item.loading) && !_itemsNeedUpdate)) {
					return;
				}

				_shout('gettingData', index, item);

				if (!item.src) {
					return;
				}

				_preloadImage(item);
			},
			initController: function() {
				framework.extend(_options, _controllerDefaultOptions, true);
				self.items = _items = items;
				_getItemAt = self.getItemAt;
				_getNumItems = _options.getNumItemsFn; //self.getNumItems;



				_initialIsLoop = _options.loop;
				if(_getNumItems() < 3) {
					_options.loop = false; // disable loop if less then 3 items
				}

				_listen('beforeChange', function(diff) {

					var p = _options.preload,
						isNext = diff === null ? true : (diff >= 0),
						preloadBefore = Math.min(p[0], _getNumItems() ),
						preloadAfter = Math.min(p[1], _getNumItems() ),
						i;


					for(i = 1; i <= (isNext ? preloadAfter : preloadBefore); i++) {
						self.lazyLoadItem(_currentItemIndex+i);
					}
					for(i = 1; i <= (isNext ? preloadBefore : preloadAfter); i++) {
						self.lazyLoadItem(_currentItemIndex-i);
					}
				});

				_listen('initialLayout', function() {
					self.currItem.initialLayout = _options.getThumbBoundsFn && _options.getThumbBoundsFn(_currentItemIndex);
				});

				_listen('mainScrollAnimComplete', _appendImagesPool);
				_listen('initialZoomInEnd', _appendImagesPool);



				_listen('destroy', function() {
					var item;
					for(var i = 0; i < _items.length; i++) {
						item = _items[i];
						// remove reference to DOM elements, for GC
						if(item.container) {
							item.container = null; 
						}
						if(item.placeholder) {
							item.placeholder = null;
						}
						if(item.img) {
							item.img = null;
						}
						if(item.preloader) {
							item.preloader = null;
						}
						if(item.loadError) {
							item.loaded = item.loadError = false;
						}
					}
					_imagesToAppendPool = null;
				});
			},


			getItemAt: function(index) {
				if (index >= 0) {
					return _items[index] !== undefined ? _items[index] : false;
				}
				return false;
			},

			allowProgressiveImg: function() {
				// 1. Progressive image loading isn't working on webkit/blink 
				//    when hw-acceleration (e.g. translateZ) is applied to IMG element.
				//    That's why in PhotoSwipe parent element gets zoom transform, not image itself.
				//    
				// 2. Progressive image loading sometimes blinks in webkit/blink when applying animation to parent element.
				//    That's why it's disabled on touch devices (mainly because of swipe transition)
				//    
				// 3. Progressive image loading sometimes doesn't work in IE (up to 11).

				// Don't allow progressive loading on non-large touch devices
				return _options.forceProgressiveLoading || !_likelyTouchDevice || _options.mouseUsed || screen.width > 1200; 
				// 1200 - to eliminate touch devices with large screen (like Chromebook Pixel)
			},

			setContent: function(holder, index) {

				if(_options.loop) {
					index = _getLoopedId(index);
				}

				var prevItem = self.getItemAt(holder.index);
				if(prevItem) {
					prevItem.container = null;
				}
		
				var item = self.getItemAt(index),
					img;
				
				if(!item) {
					holder.el.innerHTML = '';
					return;
				}

				// allow to override data
				_shout('gettingData', index, item);

				holder.index = index;
				holder.item = item;

				// base container DIV is created only once for each of 3 holders
				var baseDiv = item.container = framework.createEl('pswp__zoom-wrap'); 

				

				if(!item.src && item.html) {
					if(item.html.tagName) {
						baseDiv.appendChild(item.html);
					} else {
						baseDiv.innerHTML = item.html;
					}
				}

				_checkForError(item);

				_calculateItemSize(item, _viewportSize);
				
				if(item.src && !item.loadError && !item.loaded) {

					item.loadComplete = function(item) {

						// gallery closed before image finished loading
						if(!_isOpen) {
							return;
						}

						// check if holder hasn't changed while image was loading
						if(holder && holder.index === index ) {
							if( _checkForError(item, true) ) {
								item.loadComplete = item.img = null;
								_calculateItemSize(item, _viewportSize);
								_applyZoomPanToItem(item);

								if(holder.index === _currentItemIndex) {
									// recalculate dimensions
									self.updateCurrZoomItem();
								}
								return;
							}
							if( !item.imageAppended ) {
								if(_features.transform && (_mainScrollAnimating || _initialZoomRunning) ) {
									_imagesToAppendPool.push({
										item:item,
										baseDiv:baseDiv,
										img:item.img,
										index:index,
										holder:holder,
										clearPlaceholder:true
									});
								} else {
									_appendImage(index, item, baseDiv, item.img, _mainScrollAnimating || _initialZoomRunning, true);
								}
							} else {
								// remove preloader & mini-img
								if(!_initialZoomRunning && item.placeholder) {
									item.placeholder.style.display = 'none';
									item.placeholder = null;
								}
							}
						}

						item.loadComplete = null;
						item.img = null; // no need to store image element after it's added

						_shout('imageLoadComplete', index, item);
					};

					if(framework.features.transform) {
						
						var placeholderClassName = 'pswp__img pswp__img--placeholder'; 
						placeholderClassName += (item.msrc ? '' : ' pswp__img--placeholder--blank');

						var placeholder = framework.createEl(placeholderClassName, item.msrc ? 'img' : '');
						if(item.msrc) {
							placeholder.src = item.msrc;
						}
						
						_setImageSize(item, placeholder);

						baseDiv.appendChild(placeholder);
						item.placeholder = placeholder;

					}
					

					

					if(!item.loading) {
						_preloadImage(item);
					}


					if( self.allowProgressiveImg() ) {
						// just append image
						if(!_initialContentSet && _features.transform) {
							_imagesToAppendPool.push({
								item:item, 
								baseDiv:baseDiv, 
								img:item.img, 
								index:index, 
								holder:holder
							});
						} else {
							_appendImage(index, item, baseDiv, item.img, true, true);
						}
					}
					
				} else if(item.src && !item.loadError) {
					// image object is created every time, due to bugs of image loading & delay when switching images
					img = framework.createEl('pswp__img', 'img');
					img.style.opacity = 1;
					img.src = item.src;
					_setImageSize(item, img);
					_appendImage(index, item, baseDiv, img, true);
				}
				

				if(!_initialContentSet && index === _currentItemIndex) {
					_currZoomElementStyle = baseDiv.style;
					_showOrHide(item, (img ||item.img) );
				} else {
					_applyZoomPanToItem(item);
				}

				holder.el.innerHTML = '';
				holder.el.appendChild(baseDiv);
			},

			cleanSlide: function( item ) {
				if(item.img ) {
					item.img.onload = item.img.onerror = null;
				}
				item.loaded = item.loading = item.img = item.imageAppended = false;
			}

		}
	});

	/*>>items-controller*/

	/*>>tap*/
	/**
	 * tap.js:
	 *
	 * Displatches tap and double-tap events.
	 * 
	 */

	var tapTimer,
		tapReleasePoint = {},
		_dispatchTapEvent = function(origEvent, releasePoint, pointerType) {		
			var e = document.createEvent( 'CustomEvent' ),
				eDetail = {
					origEvent:origEvent, 
					target:origEvent.target, 
					releasePoint: releasePoint, 
					pointerType:pointerType || 'touch'
				};

			e.initCustomEvent( 'pswpTap', true, true, eDetail );
			origEvent.target.dispatchEvent(e);
		};

	_registerModule('Tap', {
		publicMethods: {
			initTap: function() {
				_listen('firstTouchStart', self.onTapStart);
				_listen('touchRelease', self.onTapRelease);
				_listen('destroy', function() {
					tapReleasePoint = {};
					tapTimer = null;
				});
			},
			onTapStart: function(touchList) {
				if(touchList.length > 1) {
					clearTimeout(tapTimer);
					tapTimer = null;
				}
			},
			onTapRelease: function(e, releasePoint) {
				if(!releasePoint) {
					return;
				}

				if(!_moved && !_isMultitouch && !_numAnimations) {
					var p0 = releasePoint;
					if(tapTimer) {
						clearTimeout(tapTimer);
						tapTimer = null;

						// Check if taped on the same place
						if ( _isNearbyPoints(p0, tapReleasePoint) ) {
							_shout('doubleTap', p0);
							return;
						}
					}

					if(releasePoint.type === 'mouse') {
						_dispatchTapEvent(e, releasePoint, 'mouse');
						return;
					}

					var clickedTagName = e.target.tagName.toUpperCase();
					// avoid double tap delay on buttons and elements that have class pswp__single-tap
					if(clickedTagName === 'BUTTON' || framework.hasClass(e.target, 'pswp__single-tap') ) {
						_dispatchTapEvent(e, releasePoint);
						return;
					}

					_equalizePoints(tapReleasePoint, p0);

					tapTimer = setTimeout(function() {
						_dispatchTapEvent(e, releasePoint);
						tapTimer = null;
					}, 300);
				}
			}
		}
	});

	/*>>tap*/

	/*>>desktop-zoom*/
	/**
	 *
	 * desktop-zoom.js:
	 *
	 * - Binds mousewheel event for paning zoomed image.
	 * - Manages "dragging", "zoomed-in", "zoom-out" classes.
	 *   (which are used for cursors and zoom icon)
	 * - Adds toggleDesktopZoom function.
	 * 
	 */

	var _wheelDelta;
		
	_registerModule('DesktopZoom', {

		publicMethods: {

			initDesktopZoom: function() {

				if(_oldIE) {
					// no zoom for old IE (<=8)
					return;
				}

				if(_likelyTouchDevice) {
					// if detected hardware touch support, we wait until mouse is used,
					// and only then apply desktop-zoom features
					_listen('mouseUsed', function() {
						self.setupDesktopZoom();
					});
				} else {
					self.setupDesktopZoom(true);
				}

			},

			setupDesktopZoom: function(onInit) {

				_wheelDelta = {};

				var events = 'wheel mousewheel DOMMouseScroll';
				
				_listen('bindEvents', function() {
					framework.bind(template, events,  self.handleMouseWheel);
				});

				_listen('unbindEvents', function() {
					if(_wheelDelta) {
						framework.unbind(template, events, self.handleMouseWheel);
					}
				});

				self.mouseZoomedIn = false;

				var hasDraggingClass,
					updateZoomable = function() {
						if(self.mouseZoomedIn) {
							framework.removeClass(template, 'pswp--zoomed-in');
							self.mouseZoomedIn = false;
						}
						if(_currZoomLevel < 1) {
							framework.addClass(template, 'pswp--zoom-allowed');
						} else {
							framework.removeClass(template, 'pswp--zoom-allowed');
						}
						removeDraggingClass();
					},
					removeDraggingClass = function() {
						if(hasDraggingClass) {
							framework.removeClass(template, 'pswp--dragging');
							hasDraggingClass = false;
						}
					};

				_listen('resize' , updateZoomable);
				_listen('afterChange' , updateZoomable);
				_listen('pointerDown', function() {
					if(self.mouseZoomedIn) {
						hasDraggingClass = true;
						framework.addClass(template, 'pswp--dragging');
					}
				});
				_listen('pointerUp', removeDraggingClass);

				if(!onInit) {
					updateZoomable();
				}
				
			},

			handleMouseWheel: function(e) {

				if(_currZoomLevel <= self.currItem.fitRatio) {
					if( _options.modal ) {

						if (!_options.closeOnScroll || _numAnimations || _isDragging) {
							e.preventDefault();
						} else if(_transformKey && Math.abs(e.deltaY) > 2) {
							// close PhotoSwipe
							// if browser supports transforms & scroll changed enough
							_closedByScroll = true;
							self.close();
						}

					}
					return true;
				}

				// allow just one event to fire
				e.stopPropagation();

				// https://developer.mozilla.org/en-US/docs/Web/Events/wheel
				_wheelDelta.x = 0;

				if('deltaX' in e) {
					if(e.deltaMode === 1 /* DOM_DELTA_LINE */) {
						// 18 - average line height
						_wheelDelta.x = e.deltaX * 18;
						_wheelDelta.y = e.deltaY * 18;
					} else {
						_wheelDelta.x = e.deltaX;
						_wheelDelta.y = e.deltaY;
					}
				} else if('wheelDelta' in e) {
					if(e.wheelDeltaX) {
						_wheelDelta.x = -0.16 * e.wheelDeltaX;
					}
					if(e.wheelDeltaY) {
						_wheelDelta.y = -0.16 * e.wheelDeltaY;
					} else {
						_wheelDelta.y = -0.16 * e.wheelDelta;
					}
				} else if('detail' in e) {
					_wheelDelta.y = e.detail;
				} else {
					return;
				}

				_calculatePanBounds(_currZoomLevel, true);

				var newPanX = _panOffset.x - _wheelDelta.x,
					newPanY = _panOffset.y - _wheelDelta.y;

				// only prevent scrolling in nonmodal mode when not at edges
				if (_options.modal ||
					(
					newPanX <= _currPanBounds.min.x && newPanX >= _currPanBounds.max.x &&
					newPanY <= _currPanBounds.min.y && newPanY >= _currPanBounds.max.y
					) ) {
					e.preventDefault();
				}

				// TODO: use rAF instead of mousewheel?
				self.panTo(newPanX, newPanY);
			},

			toggleDesktopZoom: function(centerPoint) {
				centerPoint = centerPoint || {x:_viewportSize.x/2 + _offset.x, y:_viewportSize.y/2 + _offset.y };

				var doubleTapZoomLevel = _options.getDoubleTapZoom(true, self.currItem);
				var zoomOut = _currZoomLevel === doubleTapZoomLevel;
				
				self.mouseZoomedIn = !zoomOut;

				self.zoomTo(zoomOut ? self.currItem.initialZoomLevel : doubleTapZoomLevel, centerPoint, 333);
				framework[ (!zoomOut ? 'add' : 'remove') + 'Class'](template, 'pswp--zoomed-in');
			}

		}
	});


	/*>>desktop-zoom*/

	/*>>history*/
	/**
	 *
	 * history.js:
	 *
	 * - Back button to close gallery.
	 * 
	 * - Unique URL for each slide: example.com/&pid=1&gid=3
	 *   (where PID is picture index, and GID and gallery index)
	 *   
	 * - Switch URL when slides change.
	 * 
	 */


	var _historyDefaultOptions = {
		history: true,
		galleryUID: 1
	};

	var _historyUpdateTimeout,
		_hashChangeTimeout,
		_hashAnimCheckTimeout,
		_hashChangedByScript,
		_hashChangedByHistory,
		_hashReseted,
		_initialHash,
		_historyChanged,
		_closedFromURL,
		_urlChangedOnce,
		_windowLoc,

		_supportsPushState,

		_getHash = function() {
			return _windowLoc.hash.substring(1);
		},
		_cleanHistoryTimeouts = function() {

			if(_historyUpdateTimeout) {
				clearTimeout(_historyUpdateTimeout);
			}

			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}
		},

		// pid - Picture index
		// gid - Gallery index
		_parseItemIndexFromURL = function() {
			var hash = _getHash(),
				params = {};

			if(hash.length < 5) { // pid=1
				return params;
			}

			var i, vars = hash.split('&');
			for (i = 0; i < vars.length; i++) {
				if(!vars[i]) {
					continue;
				}
				var pair = vars[i].split('=');	
				if(pair.length < 2) {
					continue;
				}
				params[pair[0]] = pair[1];
			}
			if(_options.galleryPIDs) {
				// detect custom pid in hash and search for it among the items collection
				var searchfor = params.pid;
				params.pid = 0; // if custom pid cannot be found, fallback to the first item
				for(i = 0; i < _items.length; i++) {
					if(_items[i].pid === searchfor) {
						params.pid = i;
						break;
					}
				}
			} else {
				params.pid = parseInt(params.pid,10)-1;
			}
			if( params.pid < 0 ) {
				params.pid = 0;
			}
			return params;
		},
		_updateHash = function() {

			if(_hashAnimCheckTimeout) {
				clearTimeout(_hashAnimCheckTimeout);
			}


			if(_numAnimations || _isDragging) {
				// changing browser URL forces layout/paint in some browsers, which causes noticable lag during animation
				// that's why we update hash only when no animations running
				_hashAnimCheckTimeout = setTimeout(_updateHash, 500);
				return;
			}
			
			if(_hashChangedByScript) {
				clearTimeout(_hashChangeTimeout);
			} else {
				_hashChangedByScript = true;
			}


			var pid = (_currentItemIndex + 1);
			var item = _getItemAt( _currentItemIndex );
			if(item.hasOwnProperty('pid')) {
				// carry forward any custom pid assigned to the item
				pid = item.pid;
			}
			var newHash = _initialHash + '&'  +  'gid=' + _options.galleryUID + '&' + 'pid=' + pid;

			if(!_historyChanged) {
				if(_windowLoc.hash.indexOf(newHash) === -1) {
					_urlChangedOnce = true;
				}
				// first time - add new hisory record, then just replace
			}

			var newURL = _windowLoc.href.split('#')[0] + '#' +  newHash;

			if( _supportsPushState ) {

				if('#' + newHash !== window.location.hash) {
					history[_historyChanged ? 'replaceState' : 'pushState']('', document.title, newURL);
				}

			} else {
				if(_historyChanged) {
					_windowLoc.replace( newURL );
				} else {
					_windowLoc.hash = newHash;
				}
			}
			
			

			_historyChanged = true;
			_hashChangeTimeout = setTimeout(function() {
				_hashChangedByScript = false;
			}, 60);
		};



		

	_registerModule('History', {

		

		publicMethods: {
			initHistory: function() {

				framework.extend(_options, _historyDefaultOptions, true);

				if( !_options.history ) {
					return;
				}


				_windowLoc = window.location;
				_urlChangedOnce = false;
				_closedFromURL = false;
				_historyChanged = false;
				_initialHash = _getHash();
				_supportsPushState = ('pushState' in history);


				if(_initialHash.indexOf('gid=') > -1) {
					_initialHash = _initialHash.split('&gid=')[0];
					_initialHash = _initialHash.split('?gid=')[0];
				}
				

				_listen('afterChange', self.updateURL);
				_listen('unbindEvents', function() {
					framework.unbind(window, 'hashchange', self.onHashChange);
				});


				var returnToOriginal = function() {
					_hashReseted = true;
					if(!_closedFromURL) {

						if(_urlChangedOnce) {
							history.back();
						} else {

							if(_initialHash) {
								_windowLoc.hash = _initialHash;
							} else {
								if (_supportsPushState) {

									// remove hash from url without refreshing it or scrolling to top
									history.pushState('', document.title,  _windowLoc.pathname + _windowLoc.search );
								} else {
									_windowLoc.hash = '';
								}
							}
						}
						
					}

					_cleanHistoryTimeouts();
				};


				_listen('unbindEvents', function() {
					if(_closedByScroll) {
						// if PhotoSwipe is closed by scroll, we go "back" before the closing animation starts
						// this is done to keep the scroll position
						returnToOriginal();
					}
				});
				_listen('destroy', function() {
					if(!_hashReseted) {
						returnToOriginal();
					}
				});
				_listen('firstUpdate', function() {
					_currentItemIndex = _parseItemIndexFromURL().pid;
				});

				

				
				var index = _initialHash.indexOf('pid=');
				if(index > -1) {
					_initialHash = _initialHash.substring(0, index);
					if(_initialHash.slice(-1) === '&') {
						_initialHash = _initialHash.slice(0, -1);
					}
				}
				

				setTimeout(function() {
					if(_isOpen) { // hasn't destroyed yet
						framework.bind(window, 'hashchange', self.onHashChange);
					}
				}, 40);
				
			},
			onHashChange: function() {

				if(_getHash() === _initialHash) {

					_closedFromURL = true;
					self.close();
					return;
				}
				if(!_hashChangedByScript) {

					_hashChangedByHistory = true;
					self.goTo( _parseItemIndexFromURL().pid );
					_hashChangedByHistory = false;
				}
				
			},
			updateURL: function() {

				// Delay the update of URL, to avoid lag during transition, 
				// and to not to trigger actions like "refresh page sound" or "blinking favicon" to often
				
				_cleanHistoryTimeouts();
				

				if(_hashChangedByHistory) {
					return;
				}

				if(!_historyChanged) {
					_updateHash(); // first time
				} else {
					_historyUpdateTimeout = setTimeout(_updateHash, 800);
				}
			}
		
		}
	});


	/*>>history*/
		framework.extend(self, publicMethods); };
		return PhotoSwipe;
	});

/***/ }),

/***/ 16:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/*! PhotoSwipe Default UI - 4.1.2 - 2017-04-05
	* http://photoswipe.com
	* Copyright (c) 2017 Dmitry Semenov; */
	/**
	*
	* UI on top of main sliding area (caption, arrows, close button, etc.).
	* Built just using public methods/properties of PhotoSwipe.
	* 
	*/
	(function (root, factory) { 
		if (true) {
			!(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else if (typeof exports === 'object') {
			module.exports = factory();
		} else {
			root.PhotoSwipeUI_Default = factory();
		}
	})(this, function () {

		'use strict';



	var PhotoSwipeUI_Default =
	 function(pswp, framework) {

		var ui = this;
		var _overlayUIUpdated = false,
			_controlsVisible = true,
			_fullscrenAPI,
			_controls,
			_captionContainer,
			_fakeCaptionContainer,
			_indexIndicator,
			_shareButton,
			_shareModal,
			_shareModalHidden = true,
			_initalCloseOnScrollValue,
			_isIdle,
			_listen,

			_loadingIndicator,
			_loadingIndicatorHidden,
			_loadingIndicatorTimeout,

			_galleryHasOneSlide,

			_options,
			_defaultUIOptions = {
				barsSize: {top:44, bottom:'auto'},
				closeElClasses: ['item', 'caption', 'zoom-wrap', 'ui', 'top-bar'], 
				timeToIdle: 4000, 
				timeToIdleOutside: 1000,
				loadingIndicatorDelay: 1000, // 2s
				
				addCaptionHTMLFn: function(item, captionEl /*, isFake */) {
					if(!item.title) {
						captionEl.children[0].innerHTML = '';
						return false;
					}
					captionEl.children[0].innerHTML = item.title;
					return true;
				},

				closeEl:true,
				captionEl: true,
				fullscreenEl: true,
				zoomEl: true,
				shareEl: true,
				counterEl: true,
				arrowEl: true,
				preloaderEl: true,

				tapToClose: false,
				tapToToggleControls: true,

				clickToCloseNonZoomable: true,

				shareButtons: [
					{id:'facebook', label:'Share on Facebook', url:'https://www.facebook.com/sharer/sharer.php?u={{url}}'},
					{id:'twitter', label:'Tweet', url:'https://twitter.com/intent/tweet?text={{text}}&url={{url}}'},
					{id:'pinterest', label:'Pin it', url:'http://www.pinterest.com/pin/create/button/'+
														'?url={{url}}&media={{image_url}}&description={{text}}'},
					{id:'download', label:'Download image', url:'{{raw_image_url}}', download:true}
				],
				getImageURLForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.src || '';
				},
				getPageURLForShare: function( /* shareButtonData */ ) {
					return window.location.href;
				},
				getTextForShare: function( /* shareButtonData */ ) {
					return pswp.currItem.title || '';
				},
					
				indexIndicatorSep: ' / ',
				fitControlsWidth: 1200

			},
			_blockControlsTap,
			_blockControlsTapTimeout;



		var _onControlsTap = function(e) {
				if(_blockControlsTap) {
					return true;
				}


				e = e || window.event;

				if(_options.timeToIdle && _options.mouseUsed && !_isIdle) {
					// reset idle timer
					_onIdleMouseMove();
				}


				var target = e.target || e.srcElement,
					uiElement,
					clickedClass = target.getAttribute('class') || '',
					found;

				for(var i = 0; i < _uiElements.length; i++) {
					uiElement = _uiElements[i];
					if(uiElement.onTap && clickedClass.indexOf('pswp__' + uiElement.name ) > -1 ) {
						uiElement.onTap();
						found = true;

					}
				}

				if(found) {
					if(e.stopPropagation) {
						e.stopPropagation();
					}
					_blockControlsTap = true;

					// Some versions of Android don't prevent ghost click event 
					// when preventDefault() was called on touchstart and/or touchend.
					// 
					// This happens on v4.3, 4.2, 4.1, 
					// older versions strangely work correctly, 
					// but just in case we add delay on all of them)	
					var tapDelay = framework.features.isOldAndroid ? 600 : 30;
					_blockControlsTapTimeout = setTimeout(function() {
						_blockControlsTap = false;
					}, tapDelay);
				}

			},
			_fitControlsInViewport = function() {
				return !pswp.likelyTouchDevice || _options.mouseUsed || screen.width > _options.fitControlsWidth;
			},
			_togglePswpClass = function(el, cName, add) {
				framework[ (add ? 'add' : 'remove') + 'Class' ](el, 'pswp__' + cName);
			},

			// add class when there is just one item in the gallery
			// (by default it hides left/right arrows and 1ofX counter)
			_countNumItems = function() {
				var hasOneSlide = (_options.getNumItemsFn() === 1);

				if(hasOneSlide !== _galleryHasOneSlide) {
					_togglePswpClass(_controls, 'ui--one-slide', hasOneSlide);
					_galleryHasOneSlide = hasOneSlide;
				}
			},
			_toggleShareModalClass = function() {
				_togglePswpClass(_shareModal, 'share-modal--hidden', _shareModalHidden);
			},
			_toggleShareModal = function() {

				_shareModalHidden = !_shareModalHidden;
				
				
				if(!_shareModalHidden) {
					_toggleShareModalClass();
					setTimeout(function() {
						if(!_shareModalHidden) {
							framework.addClass(_shareModal, 'pswp__share-modal--fade-in');
						}
					}, 30);
				} else {
					framework.removeClass(_shareModal, 'pswp__share-modal--fade-in');
					setTimeout(function() {
						if(_shareModalHidden) {
							_toggleShareModalClass();
						}
					}, 300);
				}
				
				if(!_shareModalHidden) {
					_updateShareURLs();
				}
				return false;
			},

			_openWindowPopup = function(e) {
				e = e || window.event;
				var target = e.target || e.srcElement;

				pswp.shout('shareLinkClick', e, target);

				if(!target.href) {
					return false;
				}

				if( target.hasAttribute('download') ) {
					return true;
				}

				window.open(target.href, 'pswp_share', 'scrollbars=yes,resizable=yes,toolbar=no,'+
											'location=yes,width=550,height=420,top=100,left=' + 
											(window.screen ? Math.round(screen.width / 2 - 275) : 100)  );

				if(!_shareModalHidden) {
					_toggleShareModal();
				}
				
				return false;
			},
			_updateShareURLs = function() {
				var shareButtonOut = '',
					shareButtonData,
					shareURL,
					image_url,
					page_url,
					share_text;

				for(var i = 0; i < _options.shareButtons.length; i++) {
					shareButtonData = _options.shareButtons[i];

					image_url = _options.getImageURLForShare(shareButtonData);
					page_url = _options.getPageURLForShare(shareButtonData);
					share_text = _options.getTextForShare(shareButtonData);

					shareURL = shareButtonData.url.replace('{{url}}', encodeURIComponent(page_url) )
										.replace('{{image_url}}', encodeURIComponent(image_url) )
										.replace('{{raw_image_url}}', image_url )
										.replace('{{text}}', encodeURIComponent(share_text) );

					shareButtonOut += '<a href="' + shareURL + '" target="_blank" '+
										'class="pswp__share--' + shareButtonData.id + '"' +
										(shareButtonData.download ? 'download' : '') + '>' + 
										shareButtonData.label + '</a>';

					if(_options.parseShareButtonOut) {
						shareButtonOut = _options.parseShareButtonOut(shareButtonData, shareButtonOut);
					}
				}
				_shareModal.children[0].innerHTML = shareButtonOut;
				_shareModal.children[0].onclick = _openWindowPopup;

			},
			_hasCloseClass = function(target) {
				for(var  i = 0; i < _options.closeElClasses.length; i++) {
					if( framework.hasClass(target, 'pswp__' + _options.closeElClasses[i]) ) {
						return true;
					}
				}
			},
			_idleInterval,
			_idleTimer,
			_idleIncrement = 0,
			_onIdleMouseMove = function() {
				clearTimeout(_idleTimer);
				_idleIncrement = 0;
				if(_isIdle) {
					ui.setIdle(false);
				}
			},
			_onMouseLeaveWindow = function(e) {
				e = e ? e : window.event;
				var from = e.relatedTarget || e.toElement;
				if (!from || from.nodeName === 'HTML') {
					clearTimeout(_idleTimer);
					_idleTimer = setTimeout(function() {
						ui.setIdle(true);
					}, _options.timeToIdleOutside);
				}
			},
			_setupFullscreenAPI = function() {
				if(_options.fullscreenEl && !framework.features.isOldAndroid) {
					if(!_fullscrenAPI) {
						_fullscrenAPI = ui.getFullscreenAPI();
					}
					if(_fullscrenAPI) {
						framework.bind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
						ui.updateFullscreen();
						framework.addClass(pswp.template, 'pswp--supports-fs');
					} else {
						framework.removeClass(pswp.template, 'pswp--supports-fs');
					}
				}
			},
			_setupLoadingIndicator = function() {
				// Setup loading indicator
				if(_options.preloaderEl) {
				
					_toggleLoadingIndicator(true);

					_listen('beforeChange', function() {

						clearTimeout(_loadingIndicatorTimeout);

						// display loading indicator with delay
						_loadingIndicatorTimeout = setTimeout(function() {

							if(pswp.currItem && pswp.currItem.loading) {

								if( !pswp.allowProgressiveImg() || (pswp.currItem.img && !pswp.currItem.img.naturalWidth)  ) {
									// show preloader if progressive loading is not enabled, 
									// or image width is not defined yet (because of slow connection)
									_toggleLoadingIndicator(false); 
									// items-controller.js function allowProgressiveImg
								}
								
							} else {
								_toggleLoadingIndicator(true); // hide preloader
							}

						}, _options.loadingIndicatorDelay);
						
					});
					_listen('imageLoadComplete', function(index, item) {
						if(pswp.currItem === item) {
							_toggleLoadingIndicator(true);
						}
					});

				}
			},
			_toggleLoadingIndicator = function(hide) {
				if( _loadingIndicatorHidden !== hide ) {
					_togglePswpClass(_loadingIndicator, 'preloader--active', !hide);
					_loadingIndicatorHidden = hide;
				}
			},
			_applyNavBarGaps = function(item) {
				var gap = item.vGap;

				if( _fitControlsInViewport() ) {
					
					var bars = _options.barsSize; 
					if(_options.captionEl && bars.bottom === 'auto') {
						if(!_fakeCaptionContainer) {
							_fakeCaptionContainer = framework.createEl('pswp__caption pswp__caption--fake');
							_fakeCaptionContainer.appendChild( framework.createEl('pswp__caption__center') );
							_controls.insertBefore(_fakeCaptionContainer, _captionContainer);
							framework.addClass(_controls, 'pswp__ui--fit');
						}
						if( _options.addCaptionHTMLFn(item, _fakeCaptionContainer, true) ) {

							var captionSize = _fakeCaptionContainer.clientHeight;
							gap.bottom = parseInt(captionSize,10) || 44;
						} else {
							gap.bottom = bars.top; // if no caption, set size of bottom gap to size of top
						}
					} else {
						gap.bottom = bars.bottom === 'auto' ? 0 : bars.bottom;
					}
					
					// height of top bar is static, no need to calculate it
					gap.top = bars.top;
				} else {
					gap.top = gap.bottom = 0;
				}
			},
			_setupIdle = function() {
				// Hide controls when mouse is used
				if(_options.timeToIdle) {
					_listen('mouseUsed', function() {
						
						framework.bind(document, 'mousemove', _onIdleMouseMove);
						framework.bind(document, 'mouseout', _onMouseLeaveWindow);

						_idleInterval = setInterval(function() {
							_idleIncrement++;
							if(_idleIncrement === 2) {
								ui.setIdle(true);
							}
						}, _options.timeToIdle / 2);
					});
				}
			},
			_setupHidingControlsDuringGestures = function() {

				// Hide controls on vertical drag
				_listen('onVerticalDrag', function(now) {
					if(_controlsVisible && now < 0.95) {
						ui.hideControls();
					} else if(!_controlsVisible && now >= 0.95) {
						ui.showControls();
					}
				});

				// Hide controls when pinching to close
				var pinchControlsHidden;
				_listen('onPinchClose' , function(now) {
					if(_controlsVisible && now < 0.9) {
						ui.hideControls();
						pinchControlsHidden = true;
					} else if(pinchControlsHidden && !_controlsVisible && now > 0.9) {
						ui.showControls();
					}
				});

				_listen('zoomGestureEnded', function() {
					pinchControlsHidden = false;
					if(pinchControlsHidden && !_controlsVisible) {
						ui.showControls();
					}
				});

			};



		var _uiElements = [
			{ 
				name: 'caption', 
				option: 'captionEl',
				onInit: function(el) {  
					_captionContainer = el; 
				} 
			},
			{ 
				name: 'share-modal', 
				option: 'shareEl',
				onInit: function(el) {  
					_shareModal = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--share', 
				option: 'shareEl',
				onInit: function(el) { 
					_shareButton = el;
				},
				onTap: function() {
					_toggleShareModal();
				} 
			},
			{ 
				name: 'button--zoom', 
				option: 'zoomEl',
				onTap: pswp.toggleDesktopZoom
			},
			{ 
				name: 'counter', 
				option: 'counterEl',
				onInit: function(el) {  
					_indexIndicator = el;
				} 
			},
			{ 
				name: 'button--close', 
				option: 'closeEl',
				onTap: pswp.close
			},
			{ 
				name: 'button--arrow--left', 
				option: 'arrowEl',
				onTap: pswp.prev
			},
			{ 
				name: 'button--arrow--right', 
				option: 'arrowEl',
				onTap: pswp.next
			},
			{ 
				name: 'button--fs', 
				option: 'fullscreenEl',
				onTap: function() {  
					if(_fullscrenAPI.isFullscreen()) {
						_fullscrenAPI.exit();
					} else {
						_fullscrenAPI.enter();
					}
				} 
			},
			{ 
				name: 'preloader', 
				option: 'preloaderEl',
				onInit: function(el) {  
					_loadingIndicator = el;
				} 
			}

		];

		var _setupUIElements = function() {
			var item,
				classAttr,
				uiElement;

			var loopThroughChildElements = function(sChildren) {
				if(!sChildren) {
					return;
				}

				var l = sChildren.length;
				for(var i = 0; i < l; i++) {
					item = sChildren[i];
					classAttr = item.className;

					for(var a = 0; a < _uiElements.length; a++) {
						uiElement = _uiElements[a];

						if(classAttr.indexOf('pswp__' + uiElement.name) > -1  ) {

							if( _options[uiElement.option] ) { // if element is not disabled from options
								
								framework.removeClass(item, 'pswp__element--disabled');
								if(uiElement.onInit) {
									uiElement.onInit(item);
								}
								
								//item.style.display = 'block';
							} else {
								framework.addClass(item, 'pswp__element--disabled');
								//item.style.display = 'none';
							}
						}
					}
				}
			};
			loopThroughChildElements(_controls.children);

			var topBar =  framework.getChildByClass(_controls, 'pswp__top-bar');
			if(topBar) {
				loopThroughChildElements( topBar.children );
			}
		};


		

		ui.init = function() {

			// extend options
			framework.extend(pswp.options, _defaultUIOptions, true);

			// create local link for fast access
			_options = pswp.options;

			// find pswp__ui element
			_controls = framework.getChildByClass(pswp.scrollWrap, 'pswp__ui');

			// create local link
			_listen = pswp.listen;


			_setupHidingControlsDuringGestures();

			// update controls when slides change
			_listen('beforeChange', ui.update);

			// toggle zoom on double-tap
			_listen('doubleTap', function(point) {
				var initialZoomLevel = pswp.currItem.initialZoomLevel;
				if(pswp.getZoomLevel() !== initialZoomLevel) {
					pswp.zoomTo(initialZoomLevel, point, 333);
				} else {
					pswp.zoomTo(_options.getDoubleTapZoom(false, pswp.currItem), point, 333);
				}
			});

			// Allow text selection in caption
			_listen('preventDragEvent', function(e, isDown, preventObj) {
				var t = e.target || e.srcElement;
				if(
					t && 
					t.getAttribute('class') && e.type.indexOf('mouse') > -1 && 
					( t.getAttribute('class').indexOf('__caption') > 0 || (/(SMALL|STRONG|EM)/i).test(t.tagName) ) 
				) {
					preventObj.prevent = false;
				}
			});

			// bind events for UI
			_listen('bindEvents', function() {
				framework.bind(_controls, 'pswpTap click', _onControlsTap);
				framework.bind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);

				if(!pswp.likelyTouchDevice) {
					framework.bind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);
				}
			});

			// unbind events for UI
			_listen('unbindEvents', function() {
				if(!_shareModalHidden) {
					_toggleShareModal();
				}

				if(_idleInterval) {
					clearInterval(_idleInterval);
				}
				framework.unbind(document, 'mouseout', _onMouseLeaveWindow);
				framework.unbind(document, 'mousemove', _onIdleMouseMove);
				framework.unbind(_controls, 'pswpTap click', _onControlsTap);
				framework.unbind(pswp.scrollWrap, 'pswpTap', ui.onGlobalTap);
				framework.unbind(pswp.scrollWrap, 'mouseover', ui.onMouseOver);

				if(_fullscrenAPI) {
					framework.unbind(document, _fullscrenAPI.eventK, ui.updateFullscreen);
					if(_fullscrenAPI.isFullscreen()) {
						_options.hideAnimationDuration = 0;
						_fullscrenAPI.exit();
					}
					_fullscrenAPI = null;
				}
			});


			// clean up things when gallery is destroyed
			_listen('destroy', function() {
				if(_options.captionEl) {
					if(_fakeCaptionContainer) {
						_controls.removeChild(_fakeCaptionContainer);
					}
					framework.removeClass(_captionContainer, 'pswp__caption--empty');
				}

				if(_shareModal) {
					_shareModal.children[0].onclick = null;
				}
				framework.removeClass(_controls, 'pswp__ui--over-close');
				framework.addClass( _controls, 'pswp__ui--hidden');
				ui.setIdle(false);
			});
			

			if(!_options.showAnimationDuration) {
				framework.removeClass( _controls, 'pswp__ui--hidden');
			}
			_listen('initialZoomIn', function() {
				if(_options.showAnimationDuration) {
					framework.removeClass( _controls, 'pswp__ui--hidden');
				}
			});
			_listen('initialZoomOut', function() {
				framework.addClass( _controls, 'pswp__ui--hidden');
			});

			_listen('parseVerticalMargin', _applyNavBarGaps);
			
			_setupUIElements();

			if(_options.shareEl && _shareButton && _shareModal) {
				_shareModalHidden = true;
			}

			_countNumItems();

			_setupIdle();

			_setupFullscreenAPI();

			_setupLoadingIndicator();
		};

		ui.setIdle = function(isIdle) {
			_isIdle = isIdle;
			_togglePswpClass(_controls, 'ui--idle', isIdle);
		};

		ui.update = function() {
			// Don't update UI if it's hidden
			if(_controlsVisible && pswp.currItem) {
				
				ui.updateIndexIndicator();

				if(_options.captionEl) {
					_options.addCaptionHTMLFn(pswp.currItem, _captionContainer);

					_togglePswpClass(_captionContainer, 'caption--empty', !pswp.currItem.title);
				}

				_overlayUIUpdated = true;

			} else {
				_overlayUIUpdated = false;
			}

			if(!_shareModalHidden) {
				_toggleShareModal();
			}

			_countNumItems();
		};

		ui.updateFullscreen = function(e) {

			if(e) {
				// some browsers change window scroll position during the fullscreen
				// so PhotoSwipe updates it just in case
				setTimeout(function() {
					pswp.setScrollOffset( 0, framework.getScrollY() );
				}, 50);
			}
			
			// toogle pswp--fs class on root element
			framework[ (_fullscrenAPI.isFullscreen() ? 'add' : 'remove') + 'Class' ](pswp.template, 'pswp--fs');
		};

		ui.updateIndexIndicator = function() {
			if(_options.counterEl) {
				_indexIndicator.innerHTML = (pswp.getCurrentIndex()+1) + 
											_options.indexIndicatorSep + 
											_options.getNumItemsFn();
			}
		};
		
		ui.onGlobalTap = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			if(_blockControlsTap) {
				return;
			}

			if(e.detail && e.detail.pointerType === 'mouse') {

				// close gallery if clicked outside of the image
				if(_hasCloseClass(target)) {
					pswp.close();
					return;
				}

				if(framework.hasClass(target, 'pswp__img')) {
					if(pswp.getZoomLevel() === 1 && pswp.getZoomLevel() <= pswp.currItem.fitRatio) {
						if(_options.clickToCloseNonZoomable) {
							pswp.close();
						}
					} else {
						pswp.toggleDesktopZoom(e.detail.releasePoint);
					}
				}
				
			} else {

				// tap anywhere (except buttons) to toggle visibility of controls
				if(_options.tapToToggleControls) {
					if(_controlsVisible) {
						ui.hideControls();
					} else {
						ui.showControls();
					}
				}

				// tap to close gallery
				if(_options.tapToClose && (framework.hasClass(target, 'pswp__img') || _hasCloseClass(target)) ) {
					pswp.close();
					return;
				}
				
			}
		};
		ui.onMouseOver = function(e) {
			e = e || window.event;
			var target = e.target || e.srcElement;

			// add class when mouse is over an element that should close the gallery
			_togglePswpClass(_controls, 'ui--over-close', _hasCloseClass(target));
		};

		ui.hideControls = function() {
			framework.addClass(_controls,'pswp__ui--hidden');
			_controlsVisible = false;
		};

		ui.showControls = function() {
			_controlsVisible = true;
			if(!_overlayUIUpdated) {
				ui.update();
			}
			framework.removeClass(_controls,'pswp__ui--hidden');
		};

		ui.supportsFullscreen = function() {
			var d = document;
			return !!(d.exitFullscreen || d.mozCancelFullScreen || d.webkitExitFullscreen || d.msExitFullscreen);
		};

		ui.getFullscreenAPI = function() {
			var dE = document.documentElement,
				api,
				tF = 'fullscreenchange';

			if (dE.requestFullscreen) {
				api = {
					enterK: 'requestFullscreen',
					exitK: 'exitFullscreen',
					elementK: 'fullscreenElement',
					eventK: tF
				};

			} else if(dE.mozRequestFullScreen ) {
				api = {
					enterK: 'mozRequestFullScreen',
					exitK: 'mozCancelFullScreen',
					elementK: 'mozFullScreenElement',
					eventK: 'moz' + tF
				};

				

			} else if(dE.webkitRequestFullscreen) {
				api = {
					enterK: 'webkitRequestFullscreen',
					exitK: 'webkitExitFullscreen',
					elementK: 'webkitFullscreenElement',
					eventK: 'webkit' + tF
				};

			} else if(dE.msRequestFullscreen) {
				api = {
					enterK: 'msRequestFullscreen',
					exitK: 'msExitFullscreen',
					elementK: 'msFullscreenElement',
					eventK: 'MSFullscreenChange'
				};
			}

			if(api) {
				api.enter = function() { 
					// disable close-on-scroll in fullscreen
					_initalCloseOnScrollValue = _options.closeOnScroll; 
					_options.closeOnScroll = false; 

					if(this.enterK === 'webkitRequestFullscreen') {
						pswp.template[this.enterK]( Element.ALLOW_KEYBOARD_INPUT );
					} else {
						return pswp.template[this.enterK](); 
					}
				};
				api.exit = function() { 
					_options.closeOnScroll = _initalCloseOnScrollValue;

					return document[this.exitK](); 

				};
				api.isFullscreen = function() { return document[this.elementK]; };
			}

			return api;
		};



	};
	return PhotoSwipeUI_Default;


	});


/***/ }),

/***/ 17:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 22:
/***/ (function(module, exports) {

	// removed by extract-text-webpack-plugin

/***/ }),

/***/ 24:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _addClass = __webpack_require__(25);

	var _addClass2 = _interopRequireDefault(_addClass);

	var _removeClass = __webpack_require__(26);

	var _removeClass2 = _interopRequireDefault(_removeClass);

	var _jquery = __webpack_require__(438);

	var _jquery2 = _interopRequireDefault(_jquery);

	var _qrcode = __webpack_require__(27);

	var _qrcode2 = _interopRequireDefault(_qrcode);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function generate(url, opts) {
	    var url = url.replace(/<%-sUrl%>/g, encodeURIComponent(opts.sUrl)).replace(/<%-sTitle%>/g, opts.sTitle).replace(/<%-sDesc%>/g, opts.sDesc).replace(/<%-sPic%>/g, encodeURIComponent(opts.sPic));

	    window.open(url);
	}

	function showWX(url) {
	    var $wx = document.querySelector('.js-wx-box');
	    var $mask = document.querySelector('.mask');
	    (0, _addClass2.default)($wx, 'in');
	    (0, _addClass2.default)($wx, 'ready');
	    (0, _addClass2.default)($mask, 'in');
	    console.log(123333);
	    var qrcode = new _qrcode2.default(document.querySelector("wx-qrcode"), {
	        width: 200,
	        height: 200
	    });
	    qrcode.makeCode(url);
	}

	function hideWX() {
	    var $wx = document.querySelector('.js-wx-box');
	    var $mask = document.querySelector('.mask');
	    (0, _removeClass2.default)($wx, 'in');
	    (0, _removeClass2.default)($wx, 'ready');
	    (0, _removeClass2.default)($mask, 'in');
	}

	function handleClick(type, opts) {
	    if (type === 'weibo') {
	        generate('http://service.weibo.com/share/share.php?url=<%-sUrl%>&title=<%-sTitle%>&pic=<%-sPic%>', opts);
	    } else if (type === 'qq') {
	        generate('http://connect.qq.com/widget/shareqq/index.html?url=<%-sUrl%>&title=<%-sTitle%>&source=<%-sDesc%>', opts);
	    } else if (type === 'douban') {
	        generate('https://www.douban.com/share/service?image=<%-sPic%>&href=<%-sUrl%>&name=<%-sTitle%>&text=<%-sDesc%>', opts);
	    } else if (type === 'qzone') {
	        generate('http://sns.qzone.qq.com/cgi-bin/qzshare/cgi_qzshare_onekey?url=<%-sUrl%>&title=<%-sTitle%>&pics=<%-sPic%>&summary=<%-sDesc%>', opts);
	    } else if (type === 'facebook') {
	        generate('https://www.facebook.com/sharer/sharer.php?u=<%-sUrl%>', opts);
	    } else if (type === 'twitter') {
	        generate('https://twitter.com/intent/tweet?text=<%-sTitle%>&url=<%-sUrl%>&via=<%-config.url%>', opts);
	    } else if (type === 'google') {
	        generate('https://plus.google.com/share?url=<%-sUrl%>', opts);
	    } else if (type === 'weixin') {
	        showWX(opts.sUrl);
	    }
	}

	var init = function init() {
	    var $sns = document.querySelectorAll('.share-sns');
	    if (!$sns || $sns.length === 0) return;

	    var sUrl = window.location.href;
	    var sTitle = document.querySelector('title').innerHTML;
	    var $img = document.querySelectorAll('.article-entry img');
	    var sPic = $img.length ? document.querySelector('.article-entry img').getAttribute('src') : '';
	    if (sPic !== '' && !/^(http:|https:)?\/\//.test(sPic)) {
	        sPic = window.location.origin + sPic;
	    }

	    $sns.forEach(function ($em) {
	        $em.onclick = function (e) {
	            var type = $em.getAttribute('data-type');
	            console.log(222);
	            handleClick(type, {
	                sUrl: sUrl,
	                sPic: sPic,
	                sTitle: sTitle,
	                sDesc: sTitle
	            });
	        };
	    });

	    document.querySelector('.mask').onclick = hideWX;
	    document.querySelector('.js-modal-close').onclick = hideWX;
	};

	module.exports = {
	    init: init
	};

/***/ }),

/***/ 25:
/***/ (function(module, exports) {

	/**
	 * addClass : addClass(el, className)
	 * Adds a class name to an element. Compare with `$.fn.addClass`.
	 *
	 *     var addClass = require('dom101/add-class');
	 *
	 *     addClass(el, 'active');
	 */

	function addClass (el, className) {
	  if (el.classList) {
	    el.classList.add(className);
	  } else {
	    el.className += ' ' + className;
	  }
	}

	module.exports = addClass;


/***/ }),

/***/ 26:
/***/ (function(module, exports) {

	/**
	 * removeClass : removeClass(el, className)
	 * Removes a classname.
	 *
	 *     var removeClass = require('dom101/remove-class');
	 *
	 *     el.className = 'selected active';
	 *     removeClass(el, 'active');
	 *
	 *     el.className
	 *     => "selected"
	 */

	function removeClass (el, className) {
	  if (el.classList) {
	    el.classList.remove(className);
	  } else {
	    var expr =
	      new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi');

	    el.className = el.className.replace(expr, ' ');
	  }
	}

	module.exports = removeClass;


/***/ }),

/***/ 27:
/***/ (function(module, exports) {

	"use strict";

	var QRCode;!function () {
	  function a(a) {
	    this.mode = c.MODE_8BIT_BYTE, this.data = a, this.parsedData = [];for (var b = [], d = 0, e = this.data.length; e > d; d++) {
	      var f = this.data.charCodeAt(d);f > 65536 ? (b[0] = 240 | (1835008 & f) >>> 18, b[1] = 128 | (258048 & f) >>> 12, b[2] = 128 | (4032 & f) >>> 6, b[3] = 128 | 63 & f) : f > 2048 ? (b[0] = 224 | (61440 & f) >>> 12, b[1] = 128 | (4032 & f) >>> 6, b[2] = 128 | 63 & f) : f > 128 ? (b[0] = 192 | (1984 & f) >>> 6, b[1] = 128 | 63 & f) : b[0] = f, this.parsedData = this.parsedData.concat(b);
	    }this.parsedData.length != this.data.length && (this.parsedData.unshift(191), this.parsedData.unshift(187), this.parsedData.unshift(239));
	  }function b(a, b) {
	    this.typeNumber = a, this.errorCorrectLevel = b, this.modules = null, this.moduleCount = 0, this.dataCache = null, this.dataList = [];
	  }function i(a, b) {
	    if (void 0 == a.length) throw new Error(a.length + "/" + b);for (var c = 0; c < a.length && 0 == a[c];) {
	      c++;
	    }this.num = new Array(a.length - c + b);for (var d = 0; d < a.length - c; d++) {
	      this.num[d] = a[d + c];
	    }
	  }function j(a, b) {
	    this.totalCount = a, this.dataCount = b;
	  }function k() {
	    this.buffer = [], this.length = 0;
	  }function m() {
	    return "undefined" != typeof CanvasRenderingContext2D;
	  }function n() {
	    var a = !1,
	        b = navigator.userAgent;return (/android/i.test(b) && (a = !0, aMat = b.toString().match(/android ([0-9]\.[0-9])/i), aMat && aMat[1] && (a = parseFloat(aMat[1]))), a
	    );
	  }function r(a, b) {
	    for (var c = 1, e = s(a), f = 0, g = l.length; g >= f; f++) {
	      var h = 0;switch (b) {case d.L:
	          h = l[f][0];break;case d.M:
	          h = l[f][1];break;case d.Q:
	          h = l[f][2];break;case d.H:
	          h = l[f][3];}if (h >= e) break;c++;
	    }if (c > l.length) throw new Error("Too long data");return c;
	  }function s(a) {
	    var b = encodeURI(a).toString().replace(/\%[0-9a-fA-F]{2}/g, "a");return b.length + (b.length != a ? 3 : 0);
	  }a.prototype = { getLength: function getLength() {
	      return this.parsedData.length;
	    }, write: function write(a) {
	      for (var b = 0, c = this.parsedData.length; c > b; b++) {
	        a.put(this.parsedData[b], 8);
	      }
	    } }, b.prototype = { addData: function addData(b) {
	      var c = new a(b);this.dataList.push(c), this.dataCache = null;
	    }, isDark: function isDark(a, b) {
	      if (0 > a || this.moduleCount <= a || 0 > b || this.moduleCount <= b) throw new Error(a + "," + b);return this.modules[a][b];
	    }, getModuleCount: function getModuleCount() {
	      return this.moduleCount;
	    }, make: function make() {
	      this.makeImpl(!1, this.getBestMaskPattern());
	    }, makeImpl: function makeImpl(a, c) {
	      this.moduleCount = 4 * this.typeNumber + 17, this.modules = new Array(this.moduleCount);for (var d = 0; d < this.moduleCount; d++) {
	        this.modules[d] = new Array(this.moduleCount);for (var e = 0; e < this.moduleCount; e++) {
	          this.modules[d][e] = null;
	        }
	      }this.setupPositionProbePattern(0, 0), this.setupPositionProbePattern(this.moduleCount - 7, 0), this.setupPositionProbePattern(0, this.moduleCount - 7), this.setupPositionAdjustPattern(), this.setupTimingPattern(), this.setupTypeInfo(a, c), this.typeNumber >= 7 && this.setupTypeNumber(a), null == this.dataCache && (this.dataCache = b.createData(this.typeNumber, this.errorCorrectLevel, this.dataList)), this.mapData(this.dataCache, c);
	    }, setupPositionProbePattern: function setupPositionProbePattern(a, b) {
	      for (var c = -1; 7 >= c; c++) {
	        if (!(-1 >= a + c || this.moduleCount <= a + c)) for (var d = -1; 7 >= d; d++) {
	          -1 >= b + d || this.moduleCount <= b + d || (this.modules[a + c][b + d] = c >= 0 && 6 >= c && (0 == d || 6 == d) || d >= 0 && 6 >= d && (0 == c || 6 == c) || c >= 2 && 4 >= c && d >= 2 && 4 >= d ? !0 : !1);
	        }
	      }
	    }, getBestMaskPattern: function getBestMaskPattern() {
	      for (var a = 0, b = 0, c = 0; 8 > c; c++) {
	        this.makeImpl(!0, c);var d = f.getLostPoint(this);(0 == c || a > d) && (a = d, b = c);
	      }return b;
	    }, createMovieClip: function createMovieClip(a, b, c) {
	      var d = a.createEmptyMovieClip(b, c),
	          e = 1;this.make();for (var f = 0; f < this.modules.length; f++) {
	        for (var g = f * e, h = 0; h < this.modules[f].length; h++) {
	          var i = h * e,
	              j = this.modules[f][h];j && (d.beginFill(0, 100), d.moveTo(i, g), d.lineTo(i + e, g), d.lineTo(i + e, g + e), d.lineTo(i, g + e), d.endFill());
	        }
	      }return d;
	    }, setupTimingPattern: function setupTimingPattern() {
	      for (var a = 8; a < this.moduleCount - 8; a++) {
	        null == this.modules[a][6] && (this.modules[a][6] = 0 == a % 2);
	      }for (var b = 8; b < this.moduleCount - 8; b++) {
	        null == this.modules[6][b] && (this.modules[6][b] = 0 == b % 2);
	      }
	    }, setupPositionAdjustPattern: function setupPositionAdjustPattern() {
	      for (var a = f.getPatternPosition(this.typeNumber), b = 0; b < a.length; b++) {
	        for (var c = 0; c < a.length; c++) {
	          var d = a[b],
	              e = a[c];if (null == this.modules[d][e]) for (var g = -2; 2 >= g; g++) {
	            for (var h = -2; 2 >= h; h++) {
	              this.modules[d + g][e + h] = -2 == g || 2 == g || -2 == h || 2 == h || 0 == g && 0 == h ? !0 : !1;
	            }
	          }
	        }
	      }
	    }, setupTypeNumber: function setupTypeNumber(a) {
	      for (var b = f.getBCHTypeNumber(this.typeNumber), c = 0; 18 > c; c++) {
	        var d = !a && 1 == (1 & b >> c);this.modules[Math.floor(c / 3)][c % 3 + this.moduleCount - 8 - 3] = d;
	      }for (var c = 0; 18 > c; c++) {
	        var d = !a && 1 == (1 & b >> c);this.modules[c % 3 + this.moduleCount - 8 - 3][Math.floor(c / 3)] = d;
	      }
	    }, setupTypeInfo: function setupTypeInfo(a, b) {
	      for (var c = this.errorCorrectLevel << 3 | b, d = f.getBCHTypeInfo(c), e = 0; 15 > e; e++) {
	        var g = !a && 1 == (1 & d >> e);6 > e ? this.modules[e][8] = g : 8 > e ? this.modules[e + 1][8] = g : this.modules[this.moduleCount - 15 + e][8] = g;
	      }for (var e = 0; 15 > e; e++) {
	        var g = !a && 1 == (1 & d >> e);8 > e ? this.modules[8][this.moduleCount - e - 1] = g : 9 > e ? this.modules[8][15 - e - 1 + 1] = g : this.modules[8][15 - e - 1] = g;
	      }this.modules[this.moduleCount - 8][8] = !a;
	    }, mapData: function mapData(a, b) {
	      for (var c = -1, d = this.moduleCount - 1, e = 7, g = 0, h = this.moduleCount - 1; h > 0; h -= 2) {
	        for (6 == h && h--;;) {
	          for (var i = 0; 2 > i; i++) {
	            if (null == this.modules[d][h - i]) {
	              var j = !1;g < a.length && (j = 1 == (1 & a[g] >>> e));var k = f.getMask(b, d, h - i);k && (j = !j), this.modules[d][h - i] = j, e--, -1 == e && (g++, e = 7);
	            }
	          }if (d += c, 0 > d || this.moduleCount <= d) {
	            d -= c, c = -c;break;
	          }
	        }
	      }
	    } }, b.PAD0 = 236, b.PAD1 = 17, b.createData = function (a, c, d) {
	    for (var e = j.getRSBlocks(a, c), g = new k(), h = 0; h < d.length; h++) {
	      var i = d[h];g.put(i.mode, 4), g.put(i.getLength(), f.getLengthInBits(i.mode, a)), i.write(g);
	    }for (var l = 0, h = 0; h < e.length; h++) {
	      l += e[h].dataCount;
	    }if (g.getLengthInBits() > 8 * l) throw new Error("code length overflow. (" + g.getLengthInBits() + ">" + 8 * l + ")");for (g.getLengthInBits() + 4 <= 8 * l && g.put(0, 4); 0 != g.getLengthInBits() % 8;) {
	      g.putBit(!1);
	    }for (;;) {
	      if (g.getLengthInBits() >= 8 * l) break;if (g.put(b.PAD0, 8), g.getLengthInBits() >= 8 * l) break;g.put(b.PAD1, 8);
	    }return b.createBytes(g, e);
	  }, b.createBytes = function (a, b) {
	    for (var c = 0, d = 0, e = 0, g = new Array(b.length), h = new Array(b.length), j = 0; j < b.length; j++) {
	      var k = b[j].dataCount,
	          l = b[j].totalCount - k;d = Math.max(d, k), e = Math.max(e, l), g[j] = new Array(k);for (var m = 0; m < g[j].length; m++) {
	        g[j][m] = 255 & a.buffer[m + c];
	      }c += k;var n = f.getErrorCorrectPolynomial(l),
	          o = new i(g[j], n.getLength() - 1),
	          p = o.mod(n);h[j] = new Array(n.getLength() - 1);for (var m = 0; m < h[j].length; m++) {
	        var q = m + p.getLength() - h[j].length;h[j][m] = q >= 0 ? p.get(q) : 0;
	      }
	    }for (var r = 0, m = 0; m < b.length; m++) {
	      r += b[m].totalCount;
	    }for (var s = new Array(r), t = 0, m = 0; d > m; m++) {
	      for (var j = 0; j < b.length; j++) {
	        m < g[j].length && (s[t++] = g[j][m]);
	      }
	    }for (var m = 0; e > m; m++) {
	      for (var j = 0; j < b.length; j++) {
	        m < h[j].length && (s[t++] = h[j][m]);
	      }
	    }return s;
	  };for (var c = { MODE_NUMBER: 1, MODE_ALPHA_NUM: 2, MODE_8BIT_BYTE: 4, MODE_KANJI: 8 }, d = { L: 1, M: 0, Q: 3, H: 2 }, e = { PATTERN000: 0, PATTERN001: 1, PATTERN010: 2, PATTERN011: 3, PATTERN100: 4, PATTERN101: 5, PATTERN110: 6, PATTERN111: 7 }, f = { PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]], G15: 1335, G18: 7973, G15_MASK: 21522, getBCHTypeInfo: function getBCHTypeInfo(a) {
	      for (var b = a << 10; f.getBCHDigit(b) - f.getBCHDigit(f.G15) >= 0;) {
	        b ^= f.G15 << f.getBCHDigit(b) - f.getBCHDigit(f.G15);
	      }return (a << 10 | b) ^ f.G15_MASK;
	    }, getBCHTypeNumber: function getBCHTypeNumber(a) {
	      for (var b = a << 12; f.getBCHDigit(b) - f.getBCHDigit(f.G18) >= 0;) {
	        b ^= f.G18 << f.getBCHDigit(b) - f.getBCHDigit(f.G18);
	      }return a << 12 | b;
	    }, getBCHDigit: function getBCHDigit(a) {
	      for (var b = 0; 0 != a;) {
	        b++, a >>>= 1;
	      }return b;
	    }, getPatternPosition: function getPatternPosition(a) {
	      return f.PATTERN_POSITION_TABLE[a - 1];
	    }, getMask: function getMask(a, b, c) {
	      switch (a) {case e.PATTERN000:
	          return 0 == (b + c) % 2;case e.PATTERN001:
	          return 0 == b % 2;case e.PATTERN010:
	          return 0 == c % 3;case e.PATTERN011:
	          return 0 == (b + c) % 3;case e.PATTERN100:
	          return 0 == (Math.floor(b / 2) + Math.floor(c / 3)) % 2;case e.PATTERN101:
	          return 0 == b * c % 2 + b * c % 3;case e.PATTERN110:
	          return 0 == (b * c % 2 + b * c % 3) % 2;case e.PATTERN111:
	          return 0 == (b * c % 3 + (b + c) % 2) % 2;default:
	          throw new Error("bad maskPattern:" + a);}
	    }, getErrorCorrectPolynomial: function getErrorCorrectPolynomial(a) {
	      for (var b = new i([1], 0), c = 0; a > c; c++) {
	        b = b.multiply(new i([1, g.gexp(c)], 0));
	      }return b;
	    }, getLengthInBits: function getLengthInBits(a, b) {
	      if (b >= 1 && 10 > b) switch (a) {case c.MODE_NUMBER:
	          return 10;case c.MODE_ALPHA_NUM:
	          return 9;case c.MODE_8BIT_BYTE:
	          return 8;case c.MODE_KANJI:
	          return 8;default:
	          throw new Error("mode:" + a);} else if (27 > b) switch (a) {case c.MODE_NUMBER:
	          return 12;case c.MODE_ALPHA_NUM:
	          return 11;case c.MODE_8BIT_BYTE:
	          return 16;case c.MODE_KANJI:
	          return 10;default:
	          throw new Error("mode:" + a);} else {
	        if (!(41 > b)) throw new Error("type:" + b);switch (a) {case c.MODE_NUMBER:
	            return 14;case c.MODE_ALPHA_NUM:
	            return 13;case c.MODE_8BIT_BYTE:
	            return 16;case c.MODE_KANJI:
	            return 12;default:
	            throw new Error("mode:" + a);}
	      }
	    }, getLostPoint: function getLostPoint(a) {
	      for (var b = a.getModuleCount(), c = 0, d = 0; b > d; d++) {
	        for (var e = 0; b > e; e++) {
	          for (var f = 0, g = a.isDark(d, e), h = -1; 1 >= h; h++) {
	            if (!(0 > d + h || d + h >= b)) for (var i = -1; 1 >= i; i++) {
	              0 > e + i || e + i >= b || (0 != h || 0 != i) && g == a.isDark(d + h, e + i) && f++;
	            }
	          }f > 5 && (c += 3 + f - 5);
	        }
	      }for (var d = 0; b - 1 > d; d++) {
	        for (var e = 0; b - 1 > e; e++) {
	          var j = 0;a.isDark(d, e) && j++, a.isDark(d + 1, e) && j++, a.isDark(d, e + 1) && j++, a.isDark(d + 1, e + 1) && j++, (0 == j || 4 == j) && (c += 3);
	        }
	      }for (var d = 0; b > d; d++) {
	        for (var e = 0; b - 6 > e; e++) {
	          a.isDark(d, e) && !a.isDark(d, e + 1) && a.isDark(d, e + 2) && a.isDark(d, e + 3) && a.isDark(d, e + 4) && !a.isDark(d, e + 5) && a.isDark(d, e + 6) && (c += 40);
	        }
	      }for (var e = 0; b > e; e++) {
	        for (var d = 0; b - 6 > d; d++) {
	          a.isDark(d, e) && !a.isDark(d + 1, e) && a.isDark(d + 2, e) && a.isDark(d + 3, e) && a.isDark(d + 4, e) && !a.isDark(d + 5, e) && a.isDark(d + 6, e) && (c += 40);
	        }
	      }for (var k = 0, e = 0; b > e; e++) {
	        for (var d = 0; b > d; d++) {
	          a.isDark(d, e) && k++;
	        }
	      }var l = Math.abs(100 * k / b / b - 50) / 5;return c += 10 * l;
	    } }, g = { glog: function glog(a) {
	      if (1 > a) throw new Error("glog(" + a + ")");return g.LOG_TABLE[a];
	    }, gexp: function gexp(a) {
	      for (; 0 > a;) {
	        a += 255;
	      }for (; a >= 256;) {
	        a -= 255;
	      }return g.EXP_TABLE[a];
	    }, EXP_TABLE: new Array(256), LOG_TABLE: new Array(256) }, h = 0; 8 > h; h++) {
	    g.EXP_TABLE[h] = 1 << h;
	  }for (var h = 8; 256 > h; h++) {
	    g.EXP_TABLE[h] = g.EXP_TABLE[h - 4] ^ g.EXP_TABLE[h - 5] ^ g.EXP_TABLE[h - 6] ^ g.EXP_TABLE[h - 8];
	  }for (var h = 0; 255 > h; h++) {
	    g.LOG_TABLE[g.EXP_TABLE[h]] = h;
	  }i.prototype = { get: function get(a) {
	      return this.num[a];
	    }, getLength: function getLength() {
	      return this.num.length;
	    }, multiply: function multiply(a) {
	      for (var b = new Array(this.getLength() + a.getLength() - 1), c = 0; c < this.getLength(); c++) {
	        for (var d = 0; d < a.getLength(); d++) {
	          b[c + d] ^= g.gexp(g.glog(this.get(c)) + g.glog(a.get(d)));
	        }
	      }return new i(b, 0);
	    }, mod: function mod(a) {
	      if (this.getLength() - a.getLength() < 0) return this;for (var b = g.glog(this.get(0)) - g.glog(a.get(0)), c = new Array(this.getLength()), d = 0; d < this.getLength(); d++) {
	        c[d] = this.get(d);
	      }for (var d = 0; d < a.getLength(); d++) {
	        c[d] ^= g.gexp(g.glog(a.get(d)) + b);
	      }return new i(c, 0).mod(a);
	    } }, j.RS_BLOCK_TABLE = [[1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]], j.getRSBlocks = function (a, b) {
	    var c = j.getRsBlockTable(a, b);if (void 0 == c) throw new Error("bad rs block @ typeNumber:" + a + "/errorCorrectLevel:" + b);for (var d = c.length / 3, e = [], f = 0; d > f; f++) {
	      for (var g = c[3 * f + 0], h = c[3 * f + 1], i = c[3 * f + 2], k = 0; g > k; k++) {
	        e.push(new j(h, i));
	      }
	    }return e;
	  }, j.getRsBlockTable = function (a, b) {
	    switch (b) {case d.L:
	        return j.RS_BLOCK_TABLE[4 * (a - 1) + 0];case d.M:
	        return j.RS_BLOCK_TABLE[4 * (a - 1) + 1];case d.Q:
	        return j.RS_BLOCK_TABLE[4 * (a - 1) + 2];case d.H:
	        return j.RS_BLOCK_TABLE[4 * (a - 1) + 3];default:
	        return void 0;}
	  }, k.prototype = { get: function get(a) {
	      var b = Math.floor(a / 8);return 1 == (1 & this.buffer[b] >>> 7 - a % 8);
	    }, put: function put(a, b) {
	      for (var c = 0; b > c; c++) {
	        this.putBit(1 == (1 & a >>> b - c - 1));
	      }
	    }, getLengthInBits: function getLengthInBits() {
	      return this.length;
	    }, putBit: function putBit(a) {
	      var b = Math.floor(this.length / 8);this.buffer.length <= b && this.buffer.push(0), a && (this.buffer[b] |= 128 >>> this.length % 8), this.length++;
	    } };var l = [[17, 14, 11, 7], [32, 26, 20, 14], [53, 42, 32, 24], [78, 62, 46, 34], [106, 84, 60, 44], [134, 106, 74, 58], [154, 122, 86, 64], [192, 152, 108, 84], [230, 180, 130, 98], [271, 213, 151, 119], [321, 251, 177, 137], [367, 287, 203, 155], [425, 331, 241, 177], [458, 362, 258, 194], [520, 412, 292, 220], [586, 450, 322, 250], [644, 504, 364, 280], [718, 560, 394, 310], [792, 624, 442, 338], [858, 666, 482, 382], [929, 711, 509, 403], [1003, 779, 565, 439], [1091, 857, 611, 461], [1171, 911, 661, 511], [1273, 997, 715, 535], [1367, 1059, 751, 593], [1465, 1125, 805, 625], [1528, 1190, 868, 658], [1628, 1264, 908, 698], [1732, 1370, 982, 742], [1840, 1452, 1030, 790], [1952, 1538, 1112, 842], [2068, 1628, 1168, 898], [2188, 1722, 1228, 958], [2303, 1809, 1283, 983], [2431, 1911, 1351, 1051], [2563, 1989, 1423, 1093], [2699, 2099, 1499, 1139], [2809, 2213, 1579, 1219], [2953, 2331, 1663, 1273]],
	      o = function () {
	    var a = function a(_a, b) {
	      this._el = _a, this._htOption = b;
	    };return a.prototype.draw = function (a) {
	      function g(a, b) {
	        var c = document.createElementNS("http://www.w3.org/2000/svg", a);for (var d in b) {
	          b.hasOwnProperty(d) && c.setAttribute(d, b[d]);
	        }return c;
	      }var b = this._htOption,
	          c = this._el,
	          d = a.getModuleCount();Math.floor(b.width / d), Math.floor(b.height / d), this.clear();var h = g("svg", { viewBox: "0 0 " + String(d) + " " + String(d), width: "100%", height: "100%", fill: b.colorLight });h.setAttributeNS("http://www.w3.org/2000/xmlns/", "xmlns:xlink", "http://www.w3.org/1999/xlink"), c.appendChild(h), h.appendChild(g("rect", { fill: b.colorDark, width: "1", height: "1", id: "template" }));for (var i = 0; d > i; i++) {
	        for (var j = 0; d > j; j++) {
	          if (a.isDark(i, j)) {
	            var k = g("use", { x: String(i), y: String(j) });k.setAttributeNS("http://www.w3.org/1999/xlink", "href", "#template"), h.appendChild(k);
	          }
	        }
	      }
	    }, a.prototype.clear = function () {
	      for (; this._el.hasChildNodes();) {
	        this._el.removeChild(this._el.lastChild);
	      }
	    }, a;
	  }(),
	      p = "svg" === document.documentElement.tagName.toLowerCase(),
	      q = p ? o : m() ? function () {
	    function a() {
	      this._elImage.src = this._elCanvas.toDataURL("image/png"), this._elImage.style.display = "block", this._elCanvas.style.display = "none";
	    }function d(a, b) {
	      var c = this;if (c._fFail = b, c._fSuccess = a, null === c._bSupportDataURI) {
	        var d = document.createElement("img"),
	            e = function e() {
	          c._bSupportDataURI = !1, c._fFail && _fFail.call(c);
	        },
	            f = function f() {
	          c._bSupportDataURI = !0, c._fSuccess && c._fSuccess.call(c);
	        };return d.onabort = e, d.onerror = e, d.onload = f, d.src = "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==", void 0;
	      }c._bSupportDataURI === !0 && c._fSuccess ? c._fSuccess.call(c) : c._bSupportDataURI === !1 && c._fFail && c._fFail.call(c);
	    }if (this._android && this._android <= 2.1) {
	      var b = 1 / window.devicePixelRatio,
	          c = CanvasRenderingContext2D.prototype.drawImage;CanvasRenderingContext2D.prototype.drawImage = function (a, d, e, f, g, h, i, j) {
	        if ("nodeName" in a && /img/i.test(a.nodeName)) for (var l = arguments.length - 1; l >= 1; l--) {
	          arguments[l] = arguments[l] * b;
	        } else "undefined" == typeof j && (arguments[1] *= b, arguments[2] *= b, arguments[3] *= b, arguments[4] *= b);c.apply(this, arguments);
	      };
	    }var e = function e(a, b) {
	      this._bIsPainted = !1, this._android = n(), this._htOption = b, this._elCanvas = document.createElement("canvas"), this._elCanvas.width = b.width, this._elCanvas.height = b.height, a.appendChild(this._elCanvas), this._el = a, this._oContext = this._elCanvas.getContext("2d"), this._bIsPainted = !1, this._elImage = document.createElement("img"), this._elImage.style.display = "none", this._el.appendChild(this._elImage), this._bSupportDataURI = null;
	    };return e.prototype.draw = function (a) {
	      var b = this._elImage,
	          c = this._oContext,
	          d = this._htOption,
	          e = a.getModuleCount(),
	          f = d.width / e,
	          g = d.height / e,
	          h = Math.round(f),
	          i = Math.round(g);b.style.display = "none", this.clear();for (var j = 0; e > j; j++) {
	        for (var k = 0; e > k; k++) {
	          var l = a.isDark(j, k),
	              m = k * f,
	              n = j * g;c.strokeStyle = l ? d.colorDark : d.colorLight, c.lineWidth = 1, c.fillStyle = l ? d.colorDark : d.colorLight, c.fillRect(m, n, f, g), c.strokeRect(Math.floor(m) + .5, Math.floor(n) + .5, h, i), c.strokeRect(Math.ceil(m) - .5, Math.ceil(n) - .5, h, i);
	        }
	      }this._bIsPainted = !0;
	    }, e.prototype.makeImage = function () {
	      this._bIsPainted && d.call(this, a);
	    }, e.prototype.isPainted = function () {
	      return this._bIsPainted;
	    }, e.prototype.clear = function () {
	      this._oContext.clearRect(0, 0, this._elCanvas.width, this._elCanvas.height), this._bIsPainted = !1;
	    }, e.prototype.round = function (a) {
	      return a ? Math.floor(1e3 * a) / 1e3 : a;
	    }, e;
	  }() : function () {
	    var a = function a(_a2, b) {
	      this._el = _a2, this._htOption = b;
	    };return a.prototype.draw = function (a) {
	      for (var b = this._htOption, c = this._el, d = a.getModuleCount(), e = Math.floor(b.width / d), f = Math.floor(b.height / d), g = ['<table style="border:0;border-collapse:collapse;">'], h = 0; d > h; h++) {
	        g.push("<tr>");for (var i = 0; d > i; i++) {
	          g.push('<td style="border:0;border-collapse:collapse;padding:0;margin:0;width:' + e + "px;height:" + f + "px;background-color:" + (a.isDark(h, i) ? b.colorDark : b.colorLight) + ';"></td>');
	        }g.push("</tr>");
	      }g.push("</table>"), c.innerHTML = g.join("");var j = c.childNodes[0],
	          k = (b.width - j.offsetWidth) / 2,
	          l = (b.height - j.offsetHeight) / 2;k > 0 && l > 0 && (j.style.margin = l + "px " + k + "px");
	    }, a.prototype.clear = function () {
	      this._el.innerHTML = "";
	    }, a;
	  }();QRCode = function QRCode(a, b) {
	    if (this._htOption = { width: 256, height: 256, typeNumber: 4, colorDark: "#000000", colorLight: "#ffffff", correctLevel: d.H }, "string" == typeof b && (b = { text: b }), b) for (var c in b) {
	      this._htOption[c] = b[c];
	    }"string" == typeof a && (a = document.getElementById(a)), this._android = n(), this._el = a, this._oQRCode = null, this._oDrawing = new q(this._el, this._htOption), this._htOption.text && this.makeCode(this._htOption.text);
	  }, QRCode.prototype.makeCode = function (a) {
	    this._oQRCode = new b(r(a, this._htOption.correctLevel), this._htOption.correctLevel), this._oQRCode.addData(a), this._oQRCode.make(), this._el.title = a, this._oDrawing.draw(this._oQRCode), this.makeImage();
	  }, QRCode.prototype.makeImage = function () {
	    "function" == typeof this._oDrawing.makeImage && (!this._android || this._android >= 3) && this._oDrawing.makeImage();
	  }, QRCode.prototype.clear = function () {
	    this._oDrawing.clear();
	  }, QRCode.CorrectLevel = d;
	}();

/***/ }),

/***/ 28:
/***/ (function(module, exports) {

	'use strict';

	var backTop = function backTop(domE, ctn, distance) {
	    if (!domE) return;
	    var timer = null;
	    var _onscroll = window.onscroll,
	        _onclick = domE.onclick;
	    (ctn || window).onscroll = throttle(function () {
	        typeof _onscroll === 'function' && _onscroll.apply(this, arguments);
	        toggleDomE();
	    }, 100);
	    domE.onclick = function () {
	        typeof _onclick === 'function' && _onclick.apply(this, arguments);
	        var baseCt = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop;
	        timer = setInterval(function () {
	            //设置一个计时器
	            var ct = ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop; //获取距离顶部的距离
	            var diff = Math.max(10, ct / 6);
	            ct -= diff;
	            if (ct > 0) {
	                //如果与顶部的距离大于零
	                ctn.scrollTop = ctn.scrollTop - diff;
	                window.scrollTo(0, ct); //向上移动10px
	            } else {
	                //如果距离小于等于零
	                ctn.scrollTop = 0;
	                window.scrollTo(0, 0); //移动到顶部
	                clearInterval(timer); //清除计时器
	            }
	        }, 10); //隔10ms执行一次前面的function，展现一种平滑滑动效果
	    };

	    function toggleDomE() {
	        domE.style.display = (ctn.scrollTop || document.documentElement.scrollTop || document.body.scrollTop) > (distance || 500) ? 'block' : 'none';
	    }
	    function throttle(func, wait) {
	        var timer = null;
	        return function () {
	            var self = this,
	                args = arguments;
	            if (timer) clearTimeout(timer);
	            timer = setTimeout(function () {
	                return typeof func === 'function' && func.apply(self, args);
	            }, wait);
	        };
	    }
	};

	function init() {
	    backTop(document.getElementById('js-jump-container'), document.getElementById('container'));
	}

	module.exports = {
	    init: init
	};

/***/ }),

/***/ 29:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	var _typeof2 = __webpack_require__(30);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var e = function () {
	    function r(e, r, n) {
	        return r || n ? String.fromCharCode(r || n) : u[e] || e;
	    }
	    function n(e) {
	        return p[e];
	    }
	    var t = /&quot;|&lt;|&gt;|&amp;|&nbsp;|&apos;|&#(\d+);|&#(\d+)/g,
	        o = /['<> "&]/g,
	        u = {
	        "&quot;": '"',
	        "&lt;": "<",
	        "&gt;": ">",
	        "&amp;": "&",
	        "&nbsp;": " "
	    },
	        c = /\u00a0/g,
	        a = /<br\s*\/?>/gi,
	        i = /\r?\n/g,
	        f = /\s/g,
	        p = {};
	    for (var s in u) {
	        p[u[s]] = s;
	    }return u["&apos;"] = "'", p["'"] = "&#39;", {
	        encode: function encode(e) {
	            return e ? ("" + e).replace(o, n).replace(i, "<br/>").replace(f, "&nbsp;") : "";
	        },
	        decode: function decode(e) {
	            return e ? ("" + e).replace(a, "\n").replace(t, r).replace(c, " ") : "";
	        },
	        encodeBase16: function encodeBase16(e) {
	            if (!e) return e;
	            e += "";
	            for (var r = [], n = 0, t = e.length; t > n; n++) {
	                r.push(e.charCodeAt(n).toString(16).toUpperCase());
	            }return r.join("");
	        },
	        encodeBase16forJSON: function encodeBase16forJSON(e) {
	            if (!e) return e;
	            e = e.replace(/[\u4E00-\u9FBF]/gi, function (e) {
	                return escape(e).replace("%u", "\\u");
	            });
	            for (var r = [], n = 0, t = e.length; t > n; n++) {
	                r.push(e.charCodeAt(n).toString(16).toUpperCase());
	            }return r.join("");
	        },
	        decodeBase16: function decodeBase16(e) {
	            if (!e) return e;
	            e += "";
	            for (var r = [], n = 0, t = e.length; t > n; n += 2) {
	                r.push(String.fromCharCode("0x" + e.slice(n, n + 2)));
	            }return r.join("");
	        },
	        encodeObject: function encodeObject(r) {
	            if (r instanceof Array) for (var n = 0, t = r.length; t > n; n++) {
	                r[n] = e.encodeObject(r[n]);
	            } else if ("object" == (typeof r === "undefined" ? "undefined" : (0, _typeof3.default)(r))) for (var o in r) {
	                r[o] = e.encodeObject(r[o]);
	            } else if ("string" == typeof r) return e.encode(r);
	            return r;
	        },
	        loadScript: function loadScript(path) {
	            var $script = document.createElement('script');
	            document.getElementsByTagName('body')[0].appendChild($script);
	            $script.setAttribute('src', path);
	        },
	        addLoadEvent: function addLoadEvent(func) {
	            var oldonload = window.onload;
	            if (typeof window.onload != "function") {
	                window.onload = func;
	            } else {
	                window.onload = function () {
	                    oldonload();
	                    func();
	                };
	            }
	        }
	    };
	}();

	module.exports = e;

/***/ }),

/***/ 30:
/***/ (function(module, exports, __webpack_require__) {

	"use strict";

	exports.__esModule = true;

	var _iterator = __webpack_require__(31);

	var _iterator2 = _interopRequireDefault(_iterator);

	var _symbol = __webpack_require__(82);

	var _symbol2 = _interopRequireDefault(_symbol);

	var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
	  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
	} : function (obj) {
	  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
	};

/***/ }),

/***/ 31:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(32), __esModule: true };

/***/ }),

/***/ 32:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(33);
	__webpack_require__(77);
	module.exports = __webpack_require__(81).f('iterator');


/***/ }),

/***/ 33:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var $at = __webpack_require__(34)(true);

	// 21.1.3.27 String.prototype[@@iterator]()
	__webpack_require__(37)(String, 'String', function (iterated) {
	  this._t = String(iterated); // target
	  this._i = 0;                // next index
	// 21.1.5.2.1 %StringIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var index = this._i;
	  var point;
	  if (index >= O.length) return { value: undefined, done: true };
	  point = $at(O, index);
	  this._i += point.length;
	  return { value: point, done: false };
	});


/***/ }),

/***/ 34:
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var defined = __webpack_require__(36);
	// true  -> String#at
	// false -> String#codePointAt
	module.exports = function (TO_STRING) {
	  return function (that, pos) {
	    var s = String(defined(that));
	    var i = toInteger(pos);
	    var l = s.length;
	    var a, b;
	    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
	    a = s.charCodeAt(i);
	    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
	      ? TO_STRING ? s.charAt(i) : a
	      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
	  };
	};


/***/ }),

/***/ 35:
/***/ (function(module, exports) {

	// 7.1.4 ToInteger
	var ceil = Math.ceil;
	var floor = Math.floor;
	module.exports = function (it) {
	  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
	};


/***/ }),

/***/ 36:
/***/ (function(module, exports) {

	// 7.2.1 RequireObjectCoercible(argument)
	module.exports = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on  " + it);
	  return it;
	};


/***/ }),

/***/ 37:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var LIBRARY = __webpack_require__(38);
	var $export = __webpack_require__(39);
	var redefine = __webpack_require__(54);
	var hide = __webpack_require__(44);
	var has = __webpack_require__(55);
	var Iterators = __webpack_require__(56);
	var $iterCreate = __webpack_require__(57);
	var setToStringTag = __webpack_require__(73);
	var getPrototypeOf = __webpack_require__(75);
	var ITERATOR = __webpack_require__(74)('iterator');
	var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
	var FF_ITERATOR = '@@iterator';
	var KEYS = 'keys';
	var VALUES = 'values';

	var returnThis = function () { return this; };

	module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
	  $iterCreate(Constructor, NAME, next);
	  var getMethod = function (kind) {
	    if (!BUGGY && kind in proto) return proto[kind];
	    switch (kind) {
	      case KEYS: return function keys() { return new Constructor(this, kind); };
	      case VALUES: return function values() { return new Constructor(this, kind); };
	    } return function entries() { return new Constructor(this, kind); };
	  };
	  var TAG = NAME + ' Iterator';
	  var DEF_VALUES = DEFAULT == VALUES;
	  var VALUES_BUG = false;
	  var proto = Base.prototype;
	  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
	  var $default = $native || getMethod(DEFAULT);
	  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
	  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
	  var methods, key, IteratorPrototype;
	  // Fix native
	  if ($anyNative) {
	    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
	    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
	      // Set @@toStringTag to native iterators
	      setToStringTag(IteratorPrototype, TAG, true);
	      // fix for some old engines
	      if (!LIBRARY && !has(IteratorPrototype, ITERATOR)) hide(IteratorPrototype, ITERATOR, returnThis);
	    }
	  }
	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEF_VALUES && $native && $native.name !== VALUES) {
	    VALUES_BUG = true;
	    $default = function values() { return $native.call(this); };
	  }
	  // Define iterator
	  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
	    hide(proto, ITERATOR, $default);
	  }
	  // Plug for library
	  Iterators[NAME] = $default;
	  Iterators[TAG] = returnThis;
	  if (DEFAULT) {
	    methods = {
	      values: DEF_VALUES ? $default : getMethod(VALUES),
	      keys: IS_SET ? $default : getMethod(KEYS),
	      entries: $entries
	    };
	    if (FORCED) for (key in methods) {
	      if (!(key in proto)) redefine(proto, key, methods[key]);
	    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
	  }
	  return methods;
	};


/***/ }),

/***/ 38:
/***/ (function(module, exports) {

	module.exports = true;


/***/ }),

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(40);
	var core = __webpack_require__(41);
	var ctx = __webpack_require__(42);
	var hide = __webpack_require__(44);
	var PROTOTYPE = 'prototype';

	var $export = function (type, name, source) {
	  var IS_FORCED = type & $export.F;
	  var IS_GLOBAL = type & $export.G;
	  var IS_STATIC = type & $export.S;
	  var IS_PROTO = type & $export.P;
	  var IS_BIND = type & $export.B;
	  var IS_WRAP = type & $export.W;
	  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
	  var expProto = exports[PROTOTYPE];
	  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
	  var key, own, out;
	  if (IS_GLOBAL) source = name;
	  for (key in source) {
	    // contains in native
	    own = !IS_FORCED && target && target[key] !== undefined;
	    if (own && key in exports) continue;
	    // export native or passed
	    out = own ? target[key] : source[key];
	    // prevent global pollution for namespaces
	    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
	    // bind timers to global for call from export context
	    : IS_BIND && own ? ctx(out, global)
	    // wrap global constructors for prevent change them in library
	    : IS_WRAP && target[key] == out ? (function (C) {
	      var F = function (a, b, c) {
	        if (this instanceof C) {
	          switch (arguments.length) {
	            case 0: return new C();
	            case 1: return new C(a);
	            case 2: return new C(a, b);
	          } return new C(a, b, c);
	        } return C.apply(this, arguments);
	      };
	      F[PROTOTYPE] = C[PROTOTYPE];
	      return F;
	    // make static versions for prototype methods
	    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
	    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
	    if (IS_PROTO) {
	      (exports.virtual || (exports.virtual = {}))[key] = out;
	      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
	      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
	    }
	  }
	};
	// type bitmap
	$export.F = 1;   // forced
	$export.G = 2;   // global
	$export.S = 4;   // static
	$export.P = 8;   // proto
	$export.B = 16;  // bind
	$export.W = 32;  // wrap
	$export.U = 64;  // safe
	$export.R = 128; // real proto method for `library`
	module.exports = $export;


/***/ }),

/***/ 40:
/***/ (function(module, exports) {

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global = module.exports = typeof window != 'undefined' && window.Math == Math
	  ? window : typeof self != 'undefined' && self.Math == Math ? self
	  // eslint-disable-next-line no-new-func
	  : Function('return this')();
	if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),

/***/ 41:
/***/ (function(module, exports) {

	var core = module.exports = { version: '2.5.1' };
	if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

	// optional / simple context binding
	var aFunction = __webpack_require__(43);
	module.exports = function (fn, that, length) {
	  aFunction(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};


/***/ }),

/***/ 43:
/***/ (function(module, exports) {

	module.exports = function (it) {
	  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
	  return it;
	};


/***/ }),

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(45);
	var createDesc = __webpack_require__(53);
	module.exports = __webpack_require__(49) ? function (object, key, value) {
	  return dP.f(object, key, createDesc(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};


/***/ }),

/***/ 45:
/***/ (function(module, exports, __webpack_require__) {

	var anObject = __webpack_require__(46);
	var IE8_DOM_DEFINE = __webpack_require__(48);
	var toPrimitive = __webpack_require__(52);
	var dP = Object.defineProperty;

	exports.f = __webpack_require__(49) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (IE8_DOM_DEFINE) try {
	    return dP(O, P, Attributes);
	  } catch (e) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};


/***/ }),

/***/ 46:
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(47);
	module.exports = function (it) {
	  if (!isObject(it)) throw TypeError(it + ' is not an object!');
	  return it;
	};


/***/ }),

/***/ 47:
/***/ (function(module, exports) {

	module.exports = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};


/***/ }),

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = !__webpack_require__(49) && !__webpack_require__(50)(function () {
	  return Object.defineProperty(__webpack_require__(51)('div'), 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

	// Thank's IE8 for his funny defineProperty
	module.exports = !__webpack_require__(50)(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});


/***/ }),

/***/ 50:
/***/ (function(module, exports) {

	module.exports = function (exec) {
	  try {
	    return !!exec();
	  } catch (e) {
	    return true;
	  }
	};


/***/ }),

/***/ 51:
/***/ (function(module, exports, __webpack_require__) {

	var isObject = __webpack_require__(47);
	var document = __webpack_require__(40).document;
	// typeof document.createElement is 'object' in old IE
	var is = isObject(document) && isObject(document.createElement);
	module.exports = function (it) {
	  return is ? document.createElement(it) : {};
	};


/***/ }),

/***/ 52:
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.1 ToPrimitive(input [, PreferredType])
	var isObject = __webpack_require__(47);
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	module.exports = function (it, S) {
	  if (!isObject(it)) return it;
	  var fn, val;
	  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
	  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};


/***/ }),

/***/ 53:
/***/ (function(module, exports) {

	module.exports = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};


/***/ }),

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(44);


/***/ }),

/***/ 55:
/***/ (function(module, exports) {

	var hasOwnProperty = {}.hasOwnProperty;
	module.exports = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};


/***/ }),

/***/ 56:
/***/ (function(module, exports) {

	module.exports = {};


/***/ }),

/***/ 57:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var create = __webpack_require__(58);
	var descriptor = __webpack_require__(53);
	var setToStringTag = __webpack_require__(73);
	var IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	__webpack_require__(44)(IteratorPrototype, __webpack_require__(74)('iterator'), function () { return this; });

	module.exports = function (Constructor, NAME, next) {
	  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
	  setToStringTag(Constructor, NAME + ' Iterator');
	};


/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
	var anObject = __webpack_require__(46);
	var dPs = __webpack_require__(59);
	var enumBugKeys = __webpack_require__(71);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');
	var Empty = function () { /* empty */ };
	var PROTOTYPE = 'prototype';

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var createDict = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = __webpack_require__(51)('iframe');
	  var i = enumBugKeys.length;
	  var lt = '<';
	  var gt = '>';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  __webpack_require__(72).appendChild(iframe);
	  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
	  // createDict = iframe.contentWindow.Object;
	  // html.removeChild(iframe);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
	  iframeDocument.close();
	  createDict = iframeDocument.F;
	  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
	  return createDict();
	};

	module.exports = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    Empty[PROTOTYPE] = anObject(O);
	    result = new Empty();
	    Empty[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = createDict();
	  return Properties === undefined ? result : dPs(result, Properties);
	};


/***/ }),

/***/ 59:
/***/ (function(module, exports, __webpack_require__) {

	var dP = __webpack_require__(45);
	var anObject = __webpack_require__(46);
	var getKeys = __webpack_require__(60);

	module.exports = __webpack_require__(49) ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = getKeys(Properties);
	  var length = keys.length;
	  var i = 0;
	  var P;
	  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
	  return O;
	};


/***/ }),

/***/ 60:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.14 / 15.2.3.14 Object.keys(O)
	var $keys = __webpack_require__(61);
	var enumBugKeys = __webpack_require__(71);

	module.exports = Object.keys || function keys(O) {
	  return $keys(O, enumBugKeys);
	};


/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

	var has = __webpack_require__(55);
	var toIObject = __webpack_require__(62);
	var arrayIndexOf = __webpack_require__(65)(false);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');

	module.exports = function (object, names) {
	  var O = toIObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~arrayIndexOf(result, key) || result.push(key);
	  }
	  return result;
	};


/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

	// to indexed object, toObject with fallback for non-array-like ES3 strings
	var IObject = __webpack_require__(63);
	var defined = __webpack_require__(36);
	module.exports = function (it) {
	  return IObject(defined(it));
	};


/***/ }),

/***/ 63:
/***/ (function(module, exports, __webpack_require__) {

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var cof = __webpack_require__(64);
	// eslint-disable-next-line no-prototype-builtins
	module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
	  return cof(it) == 'String' ? it.split('') : Object(it);
	};


/***/ }),

/***/ 64:
/***/ (function(module, exports) {

	var toString = {}.toString;

	module.exports = function (it) {
	  return toString.call(it).slice(8, -1);
	};


/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

	// false -> Array#indexOf
	// true  -> Array#includes
	var toIObject = __webpack_require__(62);
	var toLength = __webpack_require__(66);
	var toAbsoluteIndex = __webpack_require__(67);
	module.exports = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
	      if (O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};


/***/ }),

/***/ 66:
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.15 ToLength
	var toInteger = __webpack_require__(35);
	var min = Math.min;
	module.exports = function (it) {
	  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
	};


/***/ }),

/***/ 67:
/***/ (function(module, exports, __webpack_require__) {

	var toInteger = __webpack_require__(35);
	var max = Math.max;
	var min = Math.min;
	module.exports = function (index, length) {
	  index = toInteger(index);
	  return index < 0 ? max(index + length, 0) : min(index, length);
	};


/***/ }),

/***/ 68:
/***/ (function(module, exports, __webpack_require__) {

	var shared = __webpack_require__(69)('keys');
	var uid = __webpack_require__(70);
	module.exports = function (key) {
	  return shared[key] || (shared[key] = uid(key));
	};


/***/ }),

/***/ 69:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(40);
	var SHARED = '__core-js_shared__';
	var store = global[SHARED] || (global[SHARED] = {});
	module.exports = function (key) {
	  return store[key] || (store[key] = {});
	};


/***/ }),

/***/ 70:
/***/ (function(module, exports) {

	var id = 0;
	var px = Math.random();
	module.exports = function (key) {
	  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
	};


/***/ }),

/***/ 71:
/***/ (function(module, exports) {

	// IE 8- don't enum bug keys
	module.exports = (
	  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
	).split(',');


/***/ }),

/***/ 72:
/***/ (function(module, exports, __webpack_require__) {

	var document = __webpack_require__(40).document;
	module.exports = document && document.documentElement;


/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

	var def = __webpack_require__(45).f;
	var has = __webpack_require__(55);
	var TAG = __webpack_require__(74)('toStringTag');

	module.exports = function (it, tag, stat) {
	  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
	};


/***/ }),

/***/ 74:
/***/ (function(module, exports, __webpack_require__) {

	var store = __webpack_require__(69)('wks');
	var uid = __webpack_require__(70);
	var Symbol = __webpack_require__(40).Symbol;
	var USE_SYMBOL = typeof Symbol == 'function';

	var $exports = module.exports = function (name) {
	  return store[name] || (store[name] =
	    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
	};

	$exports.store = store;


/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
	var has = __webpack_require__(55);
	var toObject = __webpack_require__(76);
	var IE_PROTO = __webpack_require__(68)('IE_PROTO');
	var ObjectProto = Object.prototype;

	module.exports = Object.getPrototypeOf || function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO)) return O[IE_PROTO];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectProto : null;
	};


/***/ }),

/***/ 76:
/***/ (function(module, exports, __webpack_require__) {

	// 7.1.13 ToObject(argument)
	var defined = __webpack_require__(36);
	module.exports = function (it) {
	  return Object(defined(it));
	};


/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(78);
	var global = __webpack_require__(40);
	var hide = __webpack_require__(44);
	var Iterators = __webpack_require__(56);
	var TO_STRING_TAG = __webpack_require__(74)('toStringTag');

	var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
	  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
	  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
	  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
	  'TextTrackList,TouchList').split(',');

	for (var i = 0; i < DOMIterables.length; i++) {
	  var NAME = DOMIterables[i];
	  var Collection = global[NAME];
	  var proto = Collection && Collection.prototype;
	  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
	  Iterators[NAME] = Iterators.Array;
	}


/***/ }),

/***/ 78:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	var addToUnscopables = __webpack_require__(79);
	var step = __webpack_require__(80);
	var Iterators = __webpack_require__(56);
	var toIObject = __webpack_require__(62);

	// 22.1.3.4 Array.prototype.entries()
	// 22.1.3.13 Array.prototype.keys()
	// 22.1.3.29 Array.prototype.values()
	// 22.1.3.30 Array.prototype[@@iterator]()
	module.exports = __webpack_require__(37)(Array, 'Array', function (iterated, kind) {
	  this._t = toIObject(iterated); // target
	  this._i = 0;                   // next index
	  this._k = kind;                // kind
	// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
	}, function () {
	  var O = this._t;
	  var kind = this._k;
	  var index = this._i++;
	  if (!O || index >= O.length) {
	    this._t = undefined;
	    return step(1);
	  }
	  if (kind == 'keys') return step(0, index);
	  if (kind == 'values') return step(0, O[index]);
	  return step(0, [index, O[index]]);
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
	Iterators.Arguments = Iterators.Array;

	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');


/***/ }),

/***/ 79:
/***/ (function(module, exports) {

	module.exports = function () { /* empty */ };


/***/ }),

/***/ 80:
/***/ (function(module, exports) {

	module.exports = function (done, value) {
	  return { value: value, done: !!done };
	};


/***/ }),

/***/ 81:
/***/ (function(module, exports, __webpack_require__) {

	exports.f = __webpack_require__(74);


/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

	module.exports = { "default": __webpack_require__(83), __esModule: true };

/***/ }),

/***/ 83:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(84);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	module.exports = __webpack_require__(41).Symbol;


/***/ }),

/***/ 84:
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	// ECMAScript 6 symbols shim
	var global = __webpack_require__(40);
	var has = __webpack_require__(55);
	var DESCRIPTORS = __webpack_require__(49);
	var $export = __webpack_require__(39);
	var redefine = __webpack_require__(54);
	var META = __webpack_require__(85).KEY;
	var $fails = __webpack_require__(50);
	var shared = __webpack_require__(69);
	var setToStringTag = __webpack_require__(73);
	var uid = __webpack_require__(70);
	var wks = __webpack_require__(74);
	var wksExt = __webpack_require__(81);
	var wksDefine = __webpack_require__(86);
	var enumKeys = __webpack_require__(87);
	var isArray = __webpack_require__(90);
	var anObject = __webpack_require__(46);
	var toIObject = __webpack_require__(62);
	var toPrimitive = __webpack_require__(52);
	var createDesc = __webpack_require__(53);
	var _create = __webpack_require__(58);
	var gOPNExt = __webpack_require__(91);
	var $GOPD = __webpack_require__(93);
	var $DP = __webpack_require__(45);
	var $keys = __webpack_require__(60);
	var gOPD = $GOPD.f;
	var dP = $DP.f;
	var gOPN = gOPNExt.f;
	var $Symbol = global.Symbol;
	var $JSON = global.JSON;
	var _stringify = $JSON && $JSON.stringify;
	var PROTOTYPE = 'prototype';
	var HIDDEN = wks('_hidden');
	var TO_PRIMITIVE = wks('toPrimitive');
	var isEnum = {}.propertyIsEnumerable;
	var SymbolRegistry = shared('symbol-registry');
	var AllSymbols = shared('symbols');
	var OPSymbols = shared('op-symbols');
	var ObjectProto = Object[PROTOTYPE];
	var USE_NATIVE = typeof $Symbol == 'function';
	var QObject = global.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDesc = DESCRIPTORS && $fails(function () {
	  return _create(dP({}, 'a', {
	    get: function () { return dP(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (it, key, D) {
	  var protoDesc = gOPD(ObjectProto, key);
	  if (protoDesc) delete ObjectProto[key];
	  dP(it, key, D);
	  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
	} : dP;

	var wrap = function (tag) {
	  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
	  sym._k = tag;
	  return sym;
	};

	var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return it instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(it, key, D) {
	  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
	  anObject(it);
	  key = toPrimitive(key, true);
	  anObject(D);
	  if (has(AllSymbols, key)) {
	    if (!D.enumerable) {
	      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
	      it[HIDDEN][key] = true;
	    } else {
	      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
	      D = _create(D, { enumerable: createDesc(0, false) });
	    } return setSymbolDesc(it, key, D);
	  } return dP(it, key, D);
	};
	var $defineProperties = function defineProperties(it, P) {
	  anObject(it);
	  var keys = enumKeys(P = toIObject(P));
	  var i = 0;
	  var l = keys.length;
	  var key;
	  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
	  return it;
	};
	var $create = function create(it, P) {
	  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
	};
	var $propertyIsEnumerable = function propertyIsEnumerable(key) {
	  var E = isEnum.call(this, key = toPrimitive(key, true));
	  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
	  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
	};
	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
	  it = toIObject(it);
	  key = toPrimitive(key, true);
	  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
	  var D = gOPD(it, key);
	  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
	  return D;
	};
	var $getOwnPropertyNames = function getOwnPropertyNames(it) {
	  var names = gOPN(toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
	  } return result;
	};
	var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
	  var IS_OP = it === ObjectProto;
	  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
	  var result = [];
	  var i = 0;
	  var key;
	  while (names.length > i) {
	    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
	  } return result;
	};

	// 19.4.1.1 Symbol([description])
	if (!USE_NATIVE) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
	    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
	    var $set = function (value) {
	      if (this === ObjectProto) $set.call(OPSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDesc(this, tag, createDesc(1, value));
	    };
	    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
	    return wrap(tag);
	  };
	  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
	    return this._k;
	  });

	  $GOPD.f = $getOwnPropertyDescriptor;
	  $DP.f = $defineProperty;
	  __webpack_require__(92).f = gOPNExt.f = $getOwnPropertyNames;
	  __webpack_require__(89).f = $propertyIsEnumerable;
	  __webpack_require__(88).f = $getOwnPropertySymbols;

	  if (DESCRIPTORS && !__webpack_require__(38)) {
	    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
	  }

	  wksExt.f = function (name) {
	    return wrap(wks(name));
	  };
	}

	$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

	for (var es6Symbols = (
	  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
	  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
	).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

	for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

	$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
	  // 19.4.2.1 Symbol.for(key)
	  'for': function (key) {
	    return has(SymbolRegistry, key += '')
	      ? SymbolRegistry[key]
	      : SymbolRegistry[key] = $Symbol(key);
	  },
	  // 19.4.2.5 Symbol.keyFor(sym)
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
	    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
	  },
	  useSetter: function () { setter = true; },
	  useSimple: function () { setter = false; }
	});

	$export($export.S + $export.F * !USE_NATIVE, 'Object', {
	  // 19.1.2.2 Object.create(O [, Properties])
	  create: $create,
	  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
	  defineProperty: $defineProperty,
	  // 19.1.2.3 Object.defineProperties(O, Properties)
	  defineProperties: $defineProperties,
	  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
	  // 19.1.2.7 Object.getOwnPropertyNames(O)
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // 19.1.2.8 Object.getOwnPropertySymbols(O)
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// 24.3.2 JSON.stringify(value [, replacer [, space]])
	$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
	  var S = $Symbol();
	  // MS Edge converts symbol values to JSON as {}
	  // WebKit converts symbol values to JSON as null
	  // V8 throws on boxed symbols
	  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
	})), 'JSON', {
	  stringify: function stringify(it) {
	    if (it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	    var args = [it];
	    var i = 1;
	    var replacer, $replacer;
	    while (arguments.length > i) args.push(arguments[i++]);
	    replacer = args[1];
	    if (typeof replacer == 'function') $replacer = replacer;
	    if ($replacer || !isArray(replacer)) replacer = function (key, value) {
	      if ($replacer) value = $replacer.call(this, key, value);
	      if (!isSymbol(value)) return value;
	    };
	    args[1] = replacer;
	    return _stringify.apply($JSON, args);
	  }
	});

	// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
	$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(44)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
	// 19.4.3.5 Symbol.prototype[@@toStringTag]
	setToStringTag($Symbol, 'Symbol');
	// 20.2.1.9 Math[@@toStringTag]
	setToStringTag(Math, 'Math', true);
	// 24.3.3 JSON[@@toStringTag]
	setToStringTag(global.JSON, 'JSON', true);


/***/ }),

/***/ 85:
/***/ (function(module, exports, __webpack_require__) {

	var META = __webpack_require__(70)('meta');
	var isObject = __webpack_require__(47);
	var has = __webpack_require__(55);
	var setDesc = __webpack_require__(45).f;
	var id = 0;
	var isExtensible = Object.isExtensible || function () {
	  return true;
	};
	var FREEZE = !__webpack_require__(50)(function () {
	  return isExtensible(Object.preventExtensions({}));
	});
	var setMeta = function (it) {
	  setDesc(it, META, { value: {
	    i: 'O' + ++id, // object ID
	    w: {}          // weak collections IDs
	  } });
	};
	var fastKey = function (it, create) {
	  // return primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMeta(it);
	  // return object ID
	  } return it[META].i;
	};
	var getWeak = function (it, create) {
	  if (!has(it, META)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMeta(it);
	  // return hash weak collections IDs
	  } return it[META].w;
	};
	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
	  return it;
	};
	var meta = module.exports = {
	  KEY: META,
	  NEED: false,
	  fastKey: fastKey,
	  getWeak: getWeak,
	  onFreeze: onFreeze
	};


/***/ }),

/***/ 86:
/***/ (function(module, exports, __webpack_require__) {

	var global = __webpack_require__(40);
	var core = __webpack_require__(41);
	var LIBRARY = __webpack_require__(38);
	var wksExt = __webpack_require__(81);
	var defineProperty = __webpack_require__(45).f;
	module.exports = function (name) {
	  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
	  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
	};


/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

	// all enumerable object keys, includes symbols
	var getKeys = __webpack_require__(60);
	var gOPS = __webpack_require__(88);
	var pIE = __webpack_require__(89);
	module.exports = function (it) {
	  var result = getKeys(it);
	  var getSymbols = gOPS.f;
	  if (getSymbols) {
	    var symbols = getSymbols(it);
	    var isEnum = pIE.f;
	    var i = 0;
	    var key;
	    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
	  } return result;
	};


/***/ }),

/***/ 88:
/***/ (function(module, exports) {

	exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ 89:
/***/ (function(module, exports) {

	exports.f = {}.propertyIsEnumerable;


/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

	// 7.2.2 IsArray(argument)
	var cof = __webpack_require__(64);
	module.exports = Array.isArray || function isArray(arg) {
	  return cof(arg) == 'Array';
	};


/***/ }),

/***/ 91:
/***/ (function(module, exports, __webpack_require__) {

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var toIObject = __webpack_require__(62);
	var gOPN = __webpack_require__(92).f;
	var toString = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return gOPN(it);
	  } catch (e) {
	    return windowNames.slice();
	  }
	};

	module.exports.f = function getOwnPropertyNames(it) {
	  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
	};


/***/ }),

/***/ 92:
/***/ (function(module, exports, __webpack_require__) {

	// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
	var $keys = __webpack_require__(61);
	var hiddenKeys = __webpack_require__(71).concat('length', 'prototype');

	exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return $keys(O, hiddenKeys);
	};


/***/ }),

/***/ 93:
/***/ (function(module, exports, __webpack_require__) {

	var pIE = __webpack_require__(89);
	var createDesc = __webpack_require__(53);
	var toIObject = __webpack_require__(62);
	var toPrimitive = __webpack_require__(52);
	var has = __webpack_require__(55);
	var IE8_DOM_DEFINE = __webpack_require__(48);
	var gOPD = Object.getOwnPropertyDescriptor;

	exports.f = __webpack_require__(49) ? gOPD : function getOwnPropertyDescriptor(O, P) {
	  O = toIObject(O);
	  P = toPrimitive(P, true);
	  if (IE8_DOM_DEFINE) try {
	    return gOPD(O, P);
	  } catch (e) { /* empty */ }
	  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
	};


/***/ }),

/***/ 94:
/***/ (function(module, exports) {

	

/***/ }),

/***/ 95:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(86)('asyncIterator');


/***/ }),

/***/ 96:
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(86)('observable');


/***/ }),

/***/ 438:
/***/ (function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;"use strict";

	var _typeof2 = __webpack_require__(30);

	var _typeof3 = _interopRequireDefault(_typeof2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*! jQuery v1.8.3 jquery.com | jquery.org/license */
	(function (e, t) {
	  function _(e) {
	    var t = M[e] = {};return v.each(e.split(y), function (e, n) {
	      t[n] = !0;
	    }), t;
	  }function H(e, n, r) {
	    if (r === t && e.nodeType === 1) {
	      var i = "data-" + n.replace(P, "-$1").toLowerCase();r = e.getAttribute(i);if (typeof r == "string") {
	        try {
	          r = r === "true" ? !0 : r === "false" ? !1 : r === "null" ? null : +r + "" === r ? +r : D.test(r) ? v.parseJSON(r) : r;
	        } catch (s) {}v.data(e, n, r);
	      } else r = t;
	    }return r;
	  }function B(e) {
	    var t;for (t in e) {
	      if (t === "data" && v.isEmptyObject(e[t])) continue;if (t !== "toJSON") return !1;
	    }return !0;
	  }function et() {
	    return !1;
	  }function tt() {
	    return !0;
	  }function ut(e) {
	    return !e || !e.parentNode || e.parentNode.nodeType === 11;
	  }function at(e, t) {
	    do {
	      e = e[t];
	    } while (e && e.nodeType !== 1);return e;
	  }function ft(e, t, n) {
	    t = t || 0;if (v.isFunction(t)) return v.grep(e, function (e, r) {
	      var i = !!t.call(e, r, e);return i === n;
	    });if (t.nodeType) return v.grep(e, function (e, r) {
	      return e === t === n;
	    });if (typeof t == "string") {
	      var r = v.grep(e, function (e) {
	        return e.nodeType === 1;
	      });if (it.test(t)) return v.filter(t, r, !n);t = v.filter(t, r);
	    }return v.grep(e, function (e, r) {
	      return v.inArray(e, t) >= 0 === n;
	    });
	  }function lt(e) {
	    var t = ct.split("|"),
	        n = e.createDocumentFragment();if (n.createElement) while (t.length) {
	      n.createElement(t.pop());
	    }return n;
	  }function Lt(e, t) {
	    return e.getElementsByTagName(t)[0] || e.appendChild(e.ownerDocument.createElement(t));
	  }function At(e, t) {
	    if (t.nodeType !== 1 || !v.hasData(e)) return;var n,
	        r,
	        i,
	        s = v._data(e),
	        o = v._data(t, s),
	        u = s.events;if (u) {
	      delete o.handle, o.events = {};for (n in u) {
	        for (r = 0, i = u[n].length; r < i; r++) {
	          v.event.add(t, n, u[n][r]);
	        }
	      }
	    }o.data && (o.data = v.extend({}, o.data));
	  }function Ot(e, t) {
	    var n;if (t.nodeType !== 1) return;t.clearAttributes && t.clearAttributes(), t.mergeAttributes && t.mergeAttributes(e), n = t.nodeName.toLowerCase(), n === "object" ? (t.parentNode && (t.outerHTML = e.outerHTML), v.support.html5Clone && e.innerHTML && !v.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : n === "input" && Et.test(e.type) ? (t.defaultChecked = t.checked = e.checked, t.value !== e.value && (t.value = e.value)) : n === "option" ? t.selected = e.defaultSelected : n === "input" || n === "textarea" ? t.defaultValue = e.defaultValue : n === "script" && t.text !== e.text && (t.text = e.text), t.removeAttribute(v.expando);
	  }function Mt(e) {
	    return typeof e.getElementsByTagName != "undefined" ? e.getElementsByTagName("*") : typeof e.querySelectorAll != "undefined" ? e.querySelectorAll("*") : [];
	  }function _t(e) {
	    Et.test(e.type) && (e.defaultChecked = e.checked);
	  }function Qt(e, t) {
	    if (t in e) return t;var n = t.charAt(0).toUpperCase() + t.slice(1),
	        r = t,
	        i = Jt.length;while (i--) {
	      t = Jt[i] + n;if (t in e) return t;
	    }return r;
	  }function Gt(e, t) {
	    return e = t || e, v.css(e, "display") === "none" || !v.contains(e.ownerDocument, e);
	  }function Yt(e, t) {
	    var n,
	        r,
	        i = [],
	        s = 0,
	        o = e.length;for (; s < o; s++) {
	      n = e[s];if (!n.style) continue;i[s] = v._data(n, "olddisplay"), t ? (!i[s] && n.style.display === "none" && (n.style.display = ""), n.style.display === "" && Gt(n) && (i[s] = v._data(n, "olddisplay", nn(n.nodeName)))) : (r = Dt(n, "display"), !i[s] && r !== "none" && v._data(n, "olddisplay", r));
	    }for (s = 0; s < o; s++) {
	      n = e[s];if (!n.style) continue;if (!t || n.style.display === "none" || n.style.display === "") n.style.display = t ? i[s] || "" : "none";
	    }return e;
	  }function Zt(e, t, n) {
	    var r = Rt.exec(t);return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t;
	  }function en(e, t, n, r) {
	    var i = n === (r ? "border" : "content") ? 4 : t === "width" ? 1 : 0,
	        s = 0;for (; i < 4; i += 2) {
	      n === "margin" && (s += v.css(e, n + $t[i], !0)), r ? (n === "content" && (s -= parseFloat(Dt(e, "padding" + $t[i])) || 0), n !== "margin" && (s -= parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0)) : (s += parseFloat(Dt(e, "padding" + $t[i])) || 0, n !== "padding" && (s += parseFloat(Dt(e, "border" + $t[i] + "Width")) || 0));
	    }return s;
	  }function tn(e, t, n) {
	    var r = t === "width" ? e.offsetWidth : e.offsetHeight,
	        i = !0,
	        s = v.support.boxSizing && v.css(e, "boxSizing") === "border-box";if (r <= 0 || r == null) {
	      r = Dt(e, t);if (r < 0 || r == null) r = e.style[t];if (Ut.test(r)) return r;i = s && (v.support.boxSizingReliable || r === e.style[t]), r = parseFloat(r) || 0;
	    }return r + en(e, t, n || (s ? "border" : "content"), i) + "px";
	  }function nn(e) {
	    if (Wt[e]) return Wt[e];var t = v("<" + e + ">").appendTo(i.body),
	        n = t.css("display");t.remove();if (n === "none" || n === "") {
	      Pt = i.body.appendChild(Pt || v.extend(i.createElement("iframe"), { frameBorder: 0, width: 0, height: 0 }));if (!Ht || !Pt.createElement) Ht = (Pt.contentWindow || Pt.contentDocument).document, Ht.write("<!doctype html><html><body>"), Ht.close();t = Ht.body.appendChild(Ht.createElement(e)), n = Dt(t, "display"), i.body.removeChild(Pt);
	    }return Wt[e] = n, n;
	  }function fn(e, t, n, r) {
	    var i;if (v.isArray(t)) v.each(t, function (t, i) {
	      n || sn.test(e) ? r(e, i) : fn(e + "[" + ((typeof i === "undefined" ? "undefined" : (0, _typeof3.default)(i)) == "object" ? t : "") + "]", i, n, r);
	    });else if (!n && v.type(t) === "object") for (i in t) {
	      fn(e + "[" + i + "]", t[i], n, r);
	    } else r(e, t);
	  }function Cn(e) {
	    return function (t, n) {
	      typeof t != "string" && (n = t, t = "*");var r,
	          i,
	          s,
	          o = t.toLowerCase().split(y),
	          u = 0,
	          a = o.length;if (v.isFunction(n)) for (; u < a; u++) {
	        r = o[u], s = /^\+/.test(r), s && (r = r.substr(1) || "*"), i = e[r] = e[r] || [], i[s ? "unshift" : "push"](n);
	      }
	    };
	  }function kn(e, n, r, i, s, o) {
	    s = s || n.dataTypes[0], o = o || {}, o[s] = !0;var u,
	        a = e[s],
	        f = 0,
	        l = a ? a.length : 0,
	        c = e === Sn;for (; f < l && (c || !u); f++) {
	      u = a[f](n, r, i), typeof u == "string" && (!c || o[u] ? u = t : (n.dataTypes.unshift(u), u = kn(e, n, r, i, u, o)));
	    }return (c || !u) && !o["*"] && (u = kn(e, n, r, i, "*", o)), u;
	  }function Ln(e, n) {
	    var r,
	        i,
	        s = v.ajaxSettings.flatOptions || {};for (r in n) {
	      n[r] !== t && ((s[r] ? e : i || (i = {}))[r] = n[r]);
	    }i && v.extend(!0, e, i);
	  }function An(e, n, r) {
	    var i,
	        s,
	        o,
	        u,
	        a = e.contents,
	        f = e.dataTypes,
	        l = e.responseFields;for (s in l) {
	      s in r && (n[l[s]] = r[s]);
	    }while (f[0] === "*") {
	      f.shift(), i === t && (i = e.mimeType || n.getResponseHeader("content-type"));
	    }if (i) for (s in a) {
	      if (a[s] && a[s].test(i)) {
	        f.unshift(s);break;
	      }
	    }if (f[0] in r) o = f[0];else {
	      for (s in r) {
	        if (!f[0] || e.converters[s + " " + f[0]]) {
	          o = s;break;
	        }u || (u = s);
	      }o = o || u;
	    }if (o) return o !== f[0] && f.unshift(o), r[o];
	  }function On(e, t) {
	    var n,
	        r,
	        i,
	        s,
	        o = e.dataTypes.slice(),
	        u = o[0],
	        a = {},
	        f = 0;e.dataFilter && (t = e.dataFilter(t, e.dataType));if (o[1]) for (n in e.converters) {
	      a[n.toLowerCase()] = e.converters[n];
	    }for (; i = o[++f];) {
	      if (i !== "*") {
	        if (u !== "*" && u !== i) {
	          n = a[u + " " + i] || a["* " + i];if (!n) for (r in a) {
	            s = r.split(" ");if (s[1] === i) {
	              n = a[u + " " + s[0]] || a["* " + s[0]];if (n) {
	                n === !0 ? n = a[r] : a[r] !== !0 && (i = s[0], o.splice(f--, 0, i));break;
	              }
	            }
	          }if (n !== !0) if (n && e["throws"]) t = n(t);else try {
	            t = n(t);
	          } catch (l) {
	            return { state: "parsererror", error: n ? l : "No conversion from " + u + " to " + i };
	          }
	        }u = i;
	      }
	    }return { state: "success", data: t };
	  }function Fn() {
	    try {
	      return new e.XMLHttpRequest();
	    } catch (t) {}
	  }function In() {
	    try {
	      return new e.ActiveXObject("Microsoft.XMLHTTP");
	    } catch (t) {}
	  }function $n() {
	    return setTimeout(function () {
	      qn = t;
	    }, 0), qn = v.now();
	  }function Jn(e, t) {
	    v.each(t, function (t, n) {
	      var r = (Vn[t] || []).concat(Vn["*"]),
	          i = 0,
	          s = r.length;for (; i < s; i++) {
	        if (r[i].call(e, t, n)) return;
	      }
	    });
	  }function Kn(e, t, n) {
	    var r,
	        i = 0,
	        s = 0,
	        o = Xn.length,
	        u = v.Deferred().always(function () {
	      delete a.elem;
	    }),
	        a = function a() {
	      var t = qn || $n(),
	          n = Math.max(0, f.startTime + f.duration - t),
	          r = n / f.duration || 0,
	          i = 1 - r,
	          s = 0,
	          o = f.tweens.length;for (; s < o; s++) {
	        f.tweens[s].run(i);
	      }return u.notifyWith(e, [f, i, n]), i < 1 && o ? n : (u.resolveWith(e, [f]), !1);
	    },
	        f = u.promise({ elem: e, props: v.extend({}, t), opts: v.extend(!0, { specialEasing: {} }, n), originalProperties: t, originalOptions: n, startTime: qn || $n(), duration: n.duration, tweens: [], createTween: function createTween(t, n, r) {
	        var i = v.Tween(e, f.opts, t, n, f.opts.specialEasing[t] || f.opts.easing);return f.tweens.push(i), i;
	      }, stop: function stop(t) {
	        var n = 0,
	            r = t ? f.tweens.length : 0;for (; n < r; n++) {
	          f.tweens[n].run(1);
	        }return t ? u.resolveWith(e, [f, t]) : u.rejectWith(e, [f, t]), this;
	      } }),
	        l = f.props;Qn(l, f.opts.specialEasing);for (; i < o; i++) {
	      r = Xn[i].call(f, e, l, f.opts);if (r) return r;
	    }return Jn(f, l), v.isFunction(f.opts.start) && f.opts.start.call(e, f), v.fx.timer(v.extend(a, { anim: f, queue: f.opts.queue, elem: e })), f.progress(f.opts.progress).done(f.opts.done, f.opts.complete).fail(f.opts.fail).always(f.opts.always);
	  }function Qn(e, t) {
	    var n, r, i, s, o;for (n in e) {
	      r = v.camelCase(n), i = t[r], s = e[n], v.isArray(s) && (i = s[1], s = e[n] = s[0]), n !== r && (e[r] = s, delete e[n]), o = v.cssHooks[r];if (o && "expand" in o) {
	        s = o.expand(s), delete e[r];for (n in s) {
	          n in e || (e[n] = s[n], t[n] = i);
	        }
	      } else t[r] = i;
	    }
	  }function Gn(e, t, n) {
	    var r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h = this,
	        p = e.style,
	        d = {},
	        m = [],
	        g = e.nodeType && Gt(e);n.queue || (l = v._queueHooks(e, "fx"), l.unqueued == null && (l.unqueued = 0, c = l.empty.fire, l.empty.fire = function () {
	      l.unqueued || c();
	    }), l.unqueued++, h.always(function () {
	      h.always(function () {
	        l.unqueued--, v.queue(e, "fx").length || l.empty.fire();
	      });
	    })), e.nodeType === 1 && ("height" in t || "width" in t) && (n.overflow = [p.overflow, p.overflowX, p.overflowY], v.css(e, "display") === "inline" && v.css(e, "float") === "none" && (!v.support.inlineBlockNeedsLayout || nn(e.nodeName) === "inline" ? p.display = "inline-block" : p.zoom = 1)), n.overflow && (p.overflow = "hidden", v.support.shrinkWrapBlocks || h.done(function () {
	      p.overflow = n.overflow[0], p.overflowX = n.overflow[1], p.overflowY = n.overflow[2];
	    }));for (r in t) {
	      s = t[r];if (Un.exec(s)) {
	        delete t[r], a = a || s === "toggle";if (s === (g ? "hide" : "show")) continue;m.push(r);
	      }
	    }o = m.length;if (o) {
	      u = v._data(e, "fxshow") || v._data(e, "fxshow", {}), "hidden" in u && (g = u.hidden), a && (u.hidden = !g), g ? v(e).show() : h.done(function () {
	        v(e).hide();
	      }), h.done(function () {
	        var t;v.removeData(e, "fxshow", !0);for (t in d) {
	          v.style(e, t, d[t]);
	        }
	      });for (r = 0; r < o; r++) {
	        i = m[r], f = h.createTween(i, g ? u[i] : 0), d[i] = u[i] || v.style(e, i), i in u || (u[i] = f.start, g && (f.end = f.start, f.start = i === "width" || i === "height" ? 1 : 0));
	      }
	    }
	  }function Yn(e, t, n, r, i) {
	    return new Yn.prototype.init(e, t, n, r, i);
	  }function Zn(e, t) {
	    var n,
	        r = { height: e },
	        i = 0;t = t ? 1 : 0;for (; i < 4; i += 2 - t) {
	      n = $t[i], r["margin" + n] = r["padding" + n] = e;
	    }return t && (r.opacity = r.width = e), r;
	  }function tr(e) {
	    return v.isWindow(e) ? e : e.nodeType === 9 ? e.defaultView || e.parentWindow : !1;
	  }var n,
	      r,
	      i = e.document,
	      s = e.location,
	      o = e.navigator,
	      u = e.jQuery,
	      a = e.$,
	      f = Array.prototype.push,
	      l = Array.prototype.slice,
	      c = Array.prototype.indexOf,
	      h = Object.prototype.toString,
	      p = Object.prototype.hasOwnProperty,
	      d = String.prototype.trim,
	      v = function v(e, t) {
	    return new v.fn.init(e, t, n);
	  },
	      m = /[\-+]?(?:\d*\.|)\d+(?:[eE][\-+]?\d+|)/.source,
	      g = /\S/,
	      y = /\s+/,
	      b = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
	      w = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/,
	      E = /^<(\w+)\s*\/?>(?:<\/\1>|)$/,
	      S = /^[\],:{}\s]*$/,
	      x = /(?:^|:|,)(?:\s*\[)+/g,
	      T = /\\(?:["\\\/bfnrt]|u[\da-fA-F]{4})/g,
	      N = /"[^"\\\r\n]*"|true|false|null|-?(?:\d\d*\.|)\d+(?:[eE][\-+]?\d+|)/g,
	      C = /^-ms-/,
	      k = /-([\da-z])/gi,
	      L = function L(e, t) {
	    return (t + "").toUpperCase();
	  },
	      A = function A() {
	    i.addEventListener ? (i.removeEventListener("DOMContentLoaded", A, !1), v.ready()) : i.readyState === "complete" && (i.detachEvent("onreadystatechange", A), v.ready());
	  },
	      O = {};v.fn = v.prototype = { constructor: v, init: function init(e, n, r) {
	      var s, o, u, a;if (!e) return this;if (e.nodeType) return this.context = this[0] = e, this.length = 1, this;if (typeof e == "string") {
	        e.charAt(0) === "<" && e.charAt(e.length - 1) === ">" && e.length >= 3 ? s = [null, e, null] : s = w.exec(e);if (s && (s[1] || !n)) {
	          if (s[1]) return n = n instanceof v ? n[0] : n, a = n && n.nodeType ? n.ownerDocument || n : i, e = v.parseHTML(s[1], a, !0), E.test(s[1]) && v.isPlainObject(n) && this.attr.call(e, n, !0), v.merge(this, e);o = i.getElementById(s[2]);if (o && o.parentNode) {
	            if (o.id !== s[2]) return r.find(e);this.length = 1, this[0] = o;
	          }return this.context = i, this.selector = e, this;
	        }return !n || n.jquery ? (n || r).find(e) : this.constructor(n).find(e);
	      }return v.isFunction(e) ? r.ready(e) : (e.selector !== t && (this.selector = e.selector, this.context = e.context), v.makeArray(e, this));
	    }, selector: "", jquery: "1.8.3", length: 0, size: function size() {
	      return this.length;
	    }, toArray: function toArray() {
	      return l.call(this);
	    }, get: function get(e) {
	      return e == null ? this.toArray() : e < 0 ? this[this.length + e] : this[e];
	    }, pushStack: function pushStack(e, t, n) {
	      var r = v.merge(this.constructor(), e);return r.prevObject = this, r.context = this.context, t === "find" ? r.selector = this.selector + (this.selector ? " " : "") + n : t && (r.selector = this.selector + "." + t + "(" + n + ")"), r;
	    }, each: function each(e, t) {
	      return v.each(this, e, t);
	    }, ready: function ready(e) {
	      return v.ready.promise().done(e), this;
	    }, eq: function eq(e) {
	      return e = +e, e === -1 ? this.slice(e) : this.slice(e, e + 1);
	    }, first: function first() {
	      return this.eq(0);
	    }, last: function last() {
	      return this.eq(-1);
	    }, slice: function slice() {
	      return this.pushStack(l.apply(this, arguments), "slice", l.call(arguments).join(","));
	    }, map: function map(e) {
	      return this.pushStack(v.map(this, function (t, n) {
	        return e.call(t, n, t);
	      }));
	    }, end: function end() {
	      return this.prevObject || this.constructor(null);
	    }, push: f, sort: [].sort, splice: [].splice }, v.fn.init.prototype = v.fn, v.extend = v.fn.extend = function () {
	    var e,
	        n,
	        r,
	        i,
	        s,
	        o,
	        u = arguments[0] || {},
	        a = 1,
	        f = arguments.length,
	        l = !1;typeof u == "boolean" && (l = u, u = arguments[1] || {}, a = 2), (typeof u === "undefined" ? "undefined" : (0, _typeof3.default)(u)) != "object" && !v.isFunction(u) && (u = {}), f === a && (u = this, --a);for (; a < f; a++) {
	      if ((e = arguments[a]) != null) for (n in e) {
	        r = u[n], i = e[n];if (u === i) continue;l && i && (v.isPlainObject(i) || (s = v.isArray(i))) ? (s ? (s = !1, o = r && v.isArray(r) ? r : []) : o = r && v.isPlainObject(r) ? r : {}, u[n] = v.extend(l, o, i)) : i !== t && (u[n] = i);
	      }
	    }return u;
	  }, v.extend({ noConflict: function noConflict(t) {
	      return e.$ === v && (e.$ = a), t && e.jQuery === v && (e.jQuery = u), v;
	    }, isReady: !1, readyWait: 1, holdReady: function holdReady(e) {
	      e ? v.readyWait++ : v.ready(!0);
	    }, ready: function ready(e) {
	      if (e === !0 ? --v.readyWait : v.isReady) return;if (!i.body) return setTimeout(v.ready, 1);v.isReady = !0;if (e !== !0 && --v.readyWait > 0) return;r.resolveWith(i, [v]), v.fn.trigger && v(i).trigger("ready").off("ready");
	    }, isFunction: function isFunction(e) {
	      return v.type(e) === "function";
	    }, isArray: Array.isArray || function (e) {
	      return v.type(e) === "array";
	    }, isWindow: function isWindow(e) {
	      return e != null && e == e.window;
	    }, isNumeric: function isNumeric(e) {
	      return !isNaN(parseFloat(e)) && isFinite(e);
	    }, type: function type(e) {
	      return e == null ? String(e) : O[h.call(e)] || "object";
	    }, isPlainObject: function isPlainObject(e) {
	      if (!e || v.type(e) !== "object" || e.nodeType || v.isWindow(e)) return !1;try {
	        if (e.constructor && !p.call(e, "constructor") && !p.call(e.constructor.prototype, "isPrototypeOf")) return !1;
	      } catch (n) {
	        return !1;
	      }var r;for (r in e) {}return r === t || p.call(e, r);
	    }, isEmptyObject: function isEmptyObject(e) {
	      var t;for (t in e) {
	        return !1;
	      }return !0;
	    }, error: function error(e) {
	      throw new Error(e);
	    }, parseHTML: function parseHTML(e, t, n) {
	      var r;return !e || typeof e != "string" ? null : (typeof t == "boolean" && (n = t, t = 0), t = t || i, (r = E.exec(e)) ? [t.createElement(r[1])] : (r = v.buildFragment([e], t, n ? null : []), v.merge([], (r.cacheable ? v.clone(r.fragment) : r.fragment).childNodes)));
	    }, parseJSON: function parseJSON(t) {
	      if (!t || typeof t != "string") return null;t = v.trim(t);if (e.JSON && e.JSON.parse) return e.JSON.parse(t);if (S.test(t.replace(T, "@").replace(N, "]").replace(x, ""))) return new Function("return " + t)();v.error("Invalid JSON: " + t);
	    }, parseXML: function parseXML(n) {
	      var r, i;if (!n || typeof n != "string") return null;try {
	        e.DOMParser ? (i = new DOMParser(), r = i.parseFromString(n, "text/xml")) : (r = new ActiveXObject("Microsoft.XMLDOM"), r.async = "false", r.loadXML(n));
	      } catch (s) {
	        r = t;
	      }return (!r || !r.documentElement || r.getElementsByTagName("parsererror").length) && v.error("Invalid XML: " + n), r;
	    }, noop: function noop() {}, globalEval: function globalEval(t) {
	      t && g.test(t) && (e.execScript || function (t) {
	        e.eval.call(e, t);
	      })(t);
	    }, camelCase: function camelCase(e) {
	      return e.replace(C, "ms-").replace(k, L);
	    }, nodeName: function nodeName(e, t) {
	      return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase();
	    }, each: function each(e, n, r) {
	      var i,
	          s = 0,
	          o = e.length,
	          u = o === t || v.isFunction(e);if (r) {
	        if (u) {
	          for (i in e) {
	            if (n.apply(e[i], r) === !1) break;
	          }
	        } else for (; s < o;) {
	          if (n.apply(e[s++], r) === !1) break;
	        }
	      } else if (u) {
	        for (i in e) {
	          if (n.call(e[i], i, e[i]) === !1) break;
	        }
	      } else for (; s < o;) {
	        if (n.call(e[s], s, e[s++]) === !1) break;
	      }return e;
	    }, trim: d && !d.call("\uFEFF\xA0") ? function (e) {
	      return e == null ? "" : d.call(e);
	    } : function (e) {
	      return e == null ? "" : (e + "").replace(b, "");
	    }, makeArray: function makeArray(e, t) {
	      var n,
	          r = t || [];return e != null && (n = v.type(e), e.length == null || n === "string" || n === "function" || n === "regexp" || v.isWindow(e) ? f.call(r, e) : v.merge(r, e)), r;
	    }, inArray: function inArray(e, t, n) {
	      var r;if (t) {
	        if (c) return c.call(t, e, n);r = t.length, n = n ? n < 0 ? Math.max(0, r + n) : n : 0;for (; n < r; n++) {
	          if (n in t && t[n] === e) return n;
	        }
	      }return -1;
	    }, merge: function merge(e, n) {
	      var r = n.length,
	          i = e.length,
	          s = 0;if (typeof r == "number") for (; s < r; s++) {
	        e[i++] = n[s];
	      } else while (n[s] !== t) {
	        e[i++] = n[s++];
	      }return e.length = i, e;
	    }, grep: function grep(e, t, n) {
	      var r,
	          i = [],
	          s = 0,
	          o = e.length;n = !!n;for (; s < o; s++) {
	        r = !!t(e[s], s), n !== r && i.push(e[s]);
	      }return i;
	    }, map: function map(e, n, r) {
	      var i,
	          s,
	          o = [],
	          u = 0,
	          a = e.length,
	          f = e instanceof v || a !== t && typeof a == "number" && (a > 0 && e[0] && e[a - 1] || a === 0 || v.isArray(e));if (f) for (; u < a; u++) {
	        i = n(e[u], u, r), i != null && (o[o.length] = i);
	      } else for (s in e) {
	        i = n(e[s], s, r), i != null && (o[o.length] = i);
	      }return o.concat.apply([], o);
	    }, guid: 1, proxy: function proxy(e, n) {
	      var r, i, s;return typeof n == "string" && (r = e[n], n = e, e = r), v.isFunction(e) ? (i = l.call(arguments, 2), s = function s() {
	        return e.apply(n, i.concat(l.call(arguments)));
	      }, s.guid = e.guid = e.guid || v.guid++, s) : t;
	    }, access: function access(e, n, r, i, s, o, u) {
	      var a,
	          f = r == null,
	          l = 0,
	          c = e.length;if (r && (typeof r === "undefined" ? "undefined" : (0, _typeof3.default)(r)) == "object") {
	        for (l in r) {
	          v.access(e, n, l, r[l], 1, o, i);
	        }s = 1;
	      } else if (i !== t) {
	        a = u === t && v.isFunction(i), f && (a ? (a = n, n = function n(e, t, _n2) {
	          return a.call(v(e), _n2);
	        }) : (n.call(e, i), n = null));if (n) for (; l < c; l++) {
	          n(e[l], r, a ? i.call(e[l], l, n(e[l], r)) : i, u);
	        }s = 1;
	      }return s ? e : f ? n.call(e) : c ? n(e[0], r) : o;
	    }, now: function now() {
	      return new Date().getTime();
	    } }), v.ready.promise = function (t) {
	    if (!r) {
	      r = v.Deferred();if (i.readyState === "complete") setTimeout(v.ready, 1);else if (i.addEventListener) i.addEventListener("DOMContentLoaded", A, !1), e.addEventListener("load", v.ready, !1);else {
	        i.attachEvent("onreadystatechange", A), e.attachEvent("onload", v.ready);var n = !1;try {
	          n = e.frameElement == null && i.documentElement;
	        } catch (s) {}n && n.doScroll && function o() {
	          if (!v.isReady) {
	            try {
	              n.doScroll("left");
	            } catch (e) {
	              return setTimeout(o, 50);
	            }v.ready();
	          }
	        }();
	      }
	    }return r.promise(t);
	  }, v.each("Boolean Number String Function Array Date RegExp Object".split(" "), function (e, t) {
	    O["[object " + t + "]"] = t.toLowerCase();
	  }), n = v(i);var M = {};v.Callbacks = function (e) {
	    e = typeof e == "string" ? M[e] || _(e) : v.extend({}, e);var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a = [],
	        f = !e.once && [],
	        l = function l(t) {
	      n = e.memory && t, r = !0, u = s || 0, s = 0, o = a.length, i = !0;for (; a && u < o; u++) {
	        if (a[u].apply(t[0], t[1]) === !1 && e.stopOnFalse) {
	          n = !1;break;
	        }
	      }i = !1, a && (f ? f.length && l(f.shift()) : n ? a = [] : c.disable());
	    },
	        c = { add: function add() {
	        if (a) {
	          var t = a.length;(function r(t) {
	            v.each(t, function (t, n) {
	              var i = v.type(n);i === "function" ? (!e.unique || !c.has(n)) && a.push(n) : n && n.length && i !== "string" && r(n);
	            });
	          })(arguments), i ? o = a.length : n && (s = t, l(n));
	        }return this;
	      }, remove: function remove() {
	        return a && v.each(arguments, function (e, t) {
	          var n;while ((n = v.inArray(t, a, n)) > -1) {
	            a.splice(n, 1), i && (n <= o && o--, n <= u && u--);
	          }
	        }), this;
	      }, has: function has(e) {
	        return v.inArray(e, a) > -1;
	      }, empty: function empty() {
	        return a = [], this;
	      }, disable: function disable() {
	        return a = f = n = t, this;
	      }, disabled: function disabled() {
	        return !a;
	      }, lock: function lock() {
	        return f = t, n || c.disable(), this;
	      }, locked: function locked() {
	        return !f;
	      }, fireWith: function fireWith(e, t) {
	        return t = t || [], t = [e, t.slice ? t.slice() : t], a && (!r || f) && (i ? f.push(t) : l(t)), this;
	      }, fire: function fire() {
	        return c.fireWith(this, arguments), this;
	      }, fired: function fired() {
	        return !!r;
	      } };return c;
	  }, v.extend({ Deferred: function Deferred(e) {
	      var t = [["resolve", "done", v.Callbacks("once memory"), "resolved"], ["reject", "fail", v.Callbacks("once memory"), "rejected"], ["notify", "progress", v.Callbacks("memory")]],
	          n = "pending",
	          r = { state: function state() {
	          return n;
	        }, always: function always() {
	          return i.done(arguments).fail(arguments), this;
	        }, then: function then() {
	          var e = arguments;return v.Deferred(function (n) {
	            v.each(t, function (t, r) {
	              var s = r[0],
	                  o = e[t];i[r[1]](v.isFunction(o) ? function () {
	                var e = o.apply(this, arguments);e && v.isFunction(e.promise) ? e.promise().done(n.resolve).fail(n.reject).progress(n.notify) : n[s + "With"](this === i ? n : this, [e]);
	              } : n[s]);
	            }), e = null;
	          }).promise();
	        }, promise: function promise(e) {
	          return e != null ? v.extend(e, r) : r;
	        } },
	          i = {};return r.pipe = r.then, v.each(t, function (e, s) {
	        var o = s[2],
	            u = s[3];r[s[1]] = o.add, u && o.add(function () {
	          n = u;
	        }, t[e ^ 1][2].disable, t[2][2].lock), i[s[0]] = o.fire, i[s[0] + "With"] = o.fireWith;
	      }), r.promise(i), e && e.call(i, i), i;
	    }, when: function when(e) {
	      var t = 0,
	          n = l.call(arguments),
	          r = n.length,
	          i = r !== 1 || e && v.isFunction(e.promise) ? r : 0,
	          s = i === 1 ? e : v.Deferred(),
	          o = function o(e, t, n) {
	        return function (r) {
	          t[e] = this, n[e] = arguments.length > 1 ? l.call(arguments) : r, n === u ? s.notifyWith(t, n) : --i || s.resolveWith(t, n);
	        };
	      },
	          u,
	          a,
	          f;if (r > 1) {
	        u = new Array(r), a = new Array(r), f = new Array(r);for (; t < r; t++) {
	          n[t] && v.isFunction(n[t].promise) ? n[t].promise().done(o(t, f, n)).fail(s.reject).progress(o(t, a, u)) : --i;
	        }
	      }return i || s.resolveWith(f, n), s.promise();
	    } }), v.support = function () {
	    var t,
	        n,
	        r,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h,
	        p = i.createElement("div");p.setAttribute("className", "t"), p.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>", n = p.getElementsByTagName("*"), r = p.getElementsByTagName("a")[0];if (!n || !r || !n.length) return {};s = i.createElement("select"), o = s.appendChild(i.createElement("option")), u = p.getElementsByTagName("input")[0], r.style.cssText = "top:1px;float:left;opacity:.5", t = { leadingWhitespace: p.firstChild.nodeType === 3, tbody: !p.getElementsByTagName("tbody").length, htmlSerialize: !!p.getElementsByTagName("link").length, style: /top/.test(r.getAttribute("style")), hrefNormalized: r.getAttribute("href") === "/a", opacity: /^0.5/.test(r.style.opacity), cssFloat: !!r.style.cssFloat, checkOn: u.value === "on", optSelected: o.selected, getSetAttribute: p.className !== "t", enctype: !!i.createElement("form").enctype, html5Clone: i.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>", boxModel: i.compatMode === "CSS1Compat", submitBubbles: !0, changeBubbles: !0, focusinBubbles: !1, deleteExpando: !0, noCloneEvent: !0, inlineBlockNeedsLayout: !1, shrinkWrapBlocks: !1, reliableMarginRight: !0, boxSizingReliable: !0, pixelPosition: !1 }, u.checked = !0, t.noCloneChecked = u.cloneNode(!0).checked, s.disabled = !0, t.optDisabled = !o.disabled;try {
	      delete p.test;
	    } catch (d) {
	      t.deleteExpando = !1;
	    }!p.addEventListener && p.attachEvent && p.fireEvent && (p.attachEvent("onclick", h = function h() {
	      t.noCloneEvent = !1;
	    }), p.cloneNode(!0).fireEvent("onclick"), p.detachEvent("onclick", h)), u = i.createElement("input"), u.value = "t", u.setAttribute("type", "radio"), t.radioValue = u.value === "t", u.setAttribute("checked", "checked"), u.setAttribute("name", "t"), p.appendChild(u), a = i.createDocumentFragment(), a.appendChild(p.lastChild), t.checkClone = a.cloneNode(!0).cloneNode(!0).lastChild.checked, t.appendChecked = u.checked, a.removeChild(u), a.appendChild(p);if (p.attachEvent) for (l in { submit: !0, change: !0, focusin: !0 }) {
	      f = "on" + l, c = f in p, c || (p.setAttribute(f, "return;"), c = typeof p[f] == "function"), t[l + "Bubbles"] = c;
	    }return v(function () {
	      var n,
	          r,
	          s,
	          o,
	          u = "padding:0;margin:0;border:0;display:block;overflow:hidden;",
	          a = i.getElementsByTagName("body")[0];if (!a) return;n = i.createElement("div"), n.style.cssText = "visibility:hidden;border:0;width:0;height:0;position:static;top:0;margin-top:1px", a.insertBefore(n, a.firstChild), r = i.createElement("div"), n.appendChild(r), r.innerHTML = "<table><tr><td></td><td>t</td></tr></table>", s = r.getElementsByTagName("td"), s[0].style.cssText = "padding:0;margin:0;border:0;display:none", c = s[0].offsetHeight === 0, s[0].style.display = "", s[1].style.display = "none", t.reliableHiddenOffsets = c && s[0].offsetHeight === 0, r.innerHTML = "", r.style.cssText = "box-sizing:border-box;-moz-box-sizing:border-box;-webkit-box-sizing:border-box;padding:1px;border:1px;display:block;width:4px;margin-top:1%;position:absolute;top:1%;", t.boxSizing = r.offsetWidth === 4, t.doesNotIncludeMarginInBodyOffset = a.offsetTop !== 1, e.getComputedStyle && (t.pixelPosition = (e.getComputedStyle(r, null) || {}).top !== "1%", t.boxSizingReliable = (e.getComputedStyle(r, null) || { width: "4px" }).width === "4px", o = i.createElement("div"), o.style.cssText = r.style.cssText = u, o.style.marginRight = o.style.width = "0", r.style.width = "1px", r.appendChild(o), t.reliableMarginRight = !parseFloat((e.getComputedStyle(o, null) || {}).marginRight)), typeof r.style.zoom != "undefined" && (r.innerHTML = "", r.style.cssText = u + "width:1px;padding:1px;display:inline;zoom:1", t.inlineBlockNeedsLayout = r.offsetWidth === 3, r.style.display = "block", r.style.overflow = "visible", r.innerHTML = "<div></div>", r.firstChild.style.width = "5px", t.shrinkWrapBlocks = r.offsetWidth !== 3, n.style.zoom = 1), a.removeChild(n), n = r = s = o = null;
	    }), a.removeChild(p), n = r = s = o = u = a = p = null, t;
	  }();var D = /(?:\{[\s\S]*\}|\[[\s\S]*\])$/,
	      P = /([A-Z])/g;v.extend({ cache: {}, deletedIds: [], uuid: 0, expando: "jQuery" + (v.fn.jquery + Math.random()).replace(/\D/g, ""), noData: { embed: !0, object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000", applet: !0 }, hasData: function hasData(e) {
	      return e = e.nodeType ? v.cache[e[v.expando]] : e[v.expando], !!e && !B(e);
	    }, data: function data(e, n, r, i) {
	      if (!v.acceptData(e)) return;var s,
	          o,
	          u = v.expando,
	          a = typeof n == "string",
	          f = e.nodeType,
	          l = f ? v.cache : e,
	          c = f ? e[u] : e[u] && u;if ((!c || !l[c] || !i && !l[c].data) && a && r === t) return;c || (f ? e[u] = c = v.deletedIds.pop() || v.guid++ : c = u), l[c] || (l[c] = {}, f || (l[c].toJSON = v.noop));if ((typeof n === "undefined" ? "undefined" : (0, _typeof3.default)(n)) == "object" || typeof n == "function") i ? l[c] = v.extend(l[c], n) : l[c].data = v.extend(l[c].data, n);return s = l[c], i || (s.data || (s.data = {}), s = s.data), r !== t && (s[v.camelCase(n)] = r), a ? (o = s[n], o == null && (o = s[v.camelCase(n)])) : o = s, o;
	    }, removeData: function removeData(e, t, n) {
	      if (!v.acceptData(e)) return;var r,
	          i,
	          s,
	          o = e.nodeType,
	          u = o ? v.cache : e,
	          a = o ? e[v.expando] : v.expando;if (!u[a]) return;if (t) {
	        r = n ? u[a] : u[a].data;if (r) {
	          v.isArray(t) || (t in r ? t = [t] : (t = v.camelCase(t), t in r ? t = [t] : t = t.split(" ")));for (i = 0, s = t.length; i < s; i++) {
	            delete r[t[i]];
	          }if (!(n ? B : v.isEmptyObject)(r)) return;
	        }
	      }if (!n) {
	        delete u[a].data;if (!B(u[a])) return;
	      }o ? v.cleanData([e], !0) : v.support.deleteExpando || u != u.window ? delete u[a] : u[a] = null;
	    }, _data: function _data(e, t, n) {
	      return v.data(e, t, n, !0);
	    }, acceptData: function acceptData(e) {
	      var t = e.nodeName && v.noData[e.nodeName.toLowerCase()];return !t || t !== !0 && e.getAttribute("classid") === t;
	    } }), v.fn.extend({ data: function data(e, n) {
	      var r,
	          i,
	          s,
	          o,
	          u,
	          a = this[0],
	          f = 0,
	          l = null;if (e === t) {
	        if (this.length) {
	          l = v.data(a);if (a.nodeType === 1 && !v._data(a, "parsedAttrs")) {
	            s = a.attributes;for (u = s.length; f < u; f++) {
	              o = s[f].name, o.indexOf("data-") || (o = v.camelCase(o.substring(5)), H(a, o, l[o]));
	            }v._data(a, "parsedAttrs", !0);
	          }
	        }return l;
	      }return (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) == "object" ? this.each(function () {
	        v.data(this, e);
	      }) : (r = e.split(".", 2), r[1] = r[1] ? "." + r[1] : "", i = r[1] + "!", v.access(this, function (n) {
	        if (n === t) return l = this.triggerHandler("getData" + i, [r[0]]), l === t && a && (l = v.data(a, e), l = H(a, e, l)), l === t && r[1] ? this.data(r[0]) : l;r[1] = n, this.each(function () {
	          var t = v(this);t.triggerHandler("setData" + i, r), v.data(this, e, n), t.triggerHandler("changeData" + i, r);
	        });
	      }, null, n, arguments.length > 1, null, !1));
	    }, removeData: function removeData(e) {
	      return this.each(function () {
	        v.removeData(this, e);
	      });
	    } }), v.extend({ queue: function queue(e, t, n) {
	      var r;if (e) return t = (t || "fx") + "queue", r = v._data(e, t), n && (!r || v.isArray(n) ? r = v._data(e, t, v.makeArray(n)) : r.push(n)), r || [];
	    }, dequeue: function dequeue(e, t) {
	      t = t || "fx";var n = v.queue(e, t),
	          r = n.length,
	          i = n.shift(),
	          s = v._queueHooks(e, t),
	          o = function o() {
	        v.dequeue(e, t);
	      };i === "inprogress" && (i = n.shift(), r--), i && (t === "fx" && n.unshift("inprogress"), delete s.stop, i.call(e, o, s)), !r && s && s.empty.fire();
	    }, _queueHooks: function _queueHooks(e, t) {
	      var n = t + "queueHooks";return v._data(e, n) || v._data(e, n, { empty: v.Callbacks("once memory").add(function () {
	          v.removeData(e, t + "queue", !0), v.removeData(e, n, !0);
	        }) });
	    } }), v.fn.extend({ queue: function queue(e, n) {
	      var r = 2;return typeof e != "string" && (n = e, e = "fx", r--), arguments.length < r ? v.queue(this[0], e) : n === t ? this : this.each(function () {
	        var t = v.queue(this, e, n);v._queueHooks(this, e), e === "fx" && t[0] !== "inprogress" && v.dequeue(this, e);
	      });
	    }, dequeue: function dequeue(e) {
	      return this.each(function () {
	        v.dequeue(this, e);
	      });
	    }, delay: function delay(e, t) {
	      return e = v.fx ? v.fx.speeds[e] || e : e, t = t || "fx", this.queue(t, function (t, n) {
	        var r = setTimeout(t, e);n.stop = function () {
	          clearTimeout(r);
	        };
	      });
	    }, clearQueue: function clearQueue(e) {
	      return this.queue(e || "fx", []);
	    }, promise: function promise(e, n) {
	      var r,
	          i = 1,
	          s = v.Deferred(),
	          o = this,
	          u = this.length,
	          a = function a() {
	        --i || s.resolveWith(o, [o]);
	      };typeof e != "string" && (n = e, e = t), e = e || "fx";while (u--) {
	        r = v._data(o[u], e + "queueHooks"), r && r.empty && (i++, r.empty.add(a));
	      }return a(), s.promise(n);
	    } });var j,
	      F,
	      I,
	      q = /[\t\r\n]/g,
	      R = /\r/g,
	      U = /^(?:button|input)$/i,
	      z = /^(?:button|input|object|select|textarea)$/i,
	      W = /^a(?:rea|)$/i,
	      X = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i,
	      V = v.support.getSetAttribute;v.fn.extend({ attr: function attr(e, t) {
	      return v.access(this, v.attr, e, t, arguments.length > 1);
	    }, removeAttr: function removeAttr(e) {
	      return this.each(function () {
	        v.removeAttr(this, e);
	      });
	    }, prop: function prop(e, t) {
	      return v.access(this, v.prop, e, t, arguments.length > 1);
	    }, removeProp: function removeProp(e) {
	      return e = v.propFix[e] || e, this.each(function () {
	        try {
	          this[e] = t, delete this[e];
	        } catch (n) {}
	      });
	    }, addClass: function addClass(e) {
	      var t, n, r, i, s, o, u;if (v.isFunction(e)) return this.each(function (t) {
	        v(this).addClass(e.call(this, t, this.className));
	      });if (e && typeof e == "string") {
	        t = e.split(y);for (n = 0, r = this.length; n < r; n++) {
	          i = this[n];if (i.nodeType === 1) if (!i.className && t.length === 1) i.className = e;else {
	            s = " " + i.className + " ";for (o = 0, u = t.length; o < u; o++) {
	              s.indexOf(" " + t[o] + " ") < 0 && (s += t[o] + " ");
	            }i.className = v.trim(s);
	          }
	        }
	      }return this;
	    }, removeClass: function removeClass(e) {
	      var n, r, i, s, o, u, a;if (v.isFunction(e)) return this.each(function (t) {
	        v(this).removeClass(e.call(this, t, this.className));
	      });if (e && typeof e == "string" || e === t) {
	        n = (e || "").split(y);for (u = 0, a = this.length; u < a; u++) {
	          i = this[u];if (i.nodeType === 1 && i.className) {
	            r = (" " + i.className + " ").replace(q, " ");for (s = 0, o = n.length; s < o; s++) {
	              while (r.indexOf(" " + n[s] + " ") >= 0) {
	                r = r.replace(" " + n[s] + " ", " ");
	              }
	            }i.className = e ? v.trim(r) : "";
	          }
	        }
	      }return this;
	    }, toggleClass: function toggleClass(e, t) {
	      var n = typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e),
	          r = typeof t == "boolean";return v.isFunction(e) ? this.each(function (n) {
	        v(this).toggleClass(e.call(this, n, this.className, t), t);
	      }) : this.each(function () {
	        if (n === "string") {
	          var i,
	              s = 0,
	              o = v(this),
	              u = t,
	              a = e.split(y);while (i = a[s++]) {
	            u = r ? u : !o.hasClass(i), o[u ? "addClass" : "removeClass"](i);
	          }
	        } else if (n === "undefined" || n === "boolean") this.className && v._data(this, "__className__", this.className), this.className = this.className || e === !1 ? "" : v._data(this, "__className__") || "";
	      });
	    }, hasClass: function hasClass(e) {
	      var t = " " + e + " ",
	          n = 0,
	          r = this.length;for (; n < r; n++) {
	        if (this[n].nodeType === 1 && (" " + this[n].className + " ").replace(q, " ").indexOf(t) >= 0) return !0;
	      }return !1;
	    }, val: function val(e) {
	      var n,
	          r,
	          i,
	          s = this[0];if (!arguments.length) {
	        if (s) return n = v.valHooks[s.type] || v.valHooks[s.nodeName.toLowerCase()], n && "get" in n && (r = n.get(s, "value")) !== t ? r : (r = s.value, typeof r == "string" ? r.replace(R, "") : r == null ? "" : r);return;
	      }return i = v.isFunction(e), this.each(function (r) {
	        var s,
	            o = v(this);if (this.nodeType !== 1) return;i ? s = e.call(this, r, o.val()) : s = e, s == null ? s = "" : typeof s == "number" ? s += "" : v.isArray(s) && (s = v.map(s, function (e) {
	          return e == null ? "" : e + "";
	        })), n = v.valHooks[this.type] || v.valHooks[this.nodeName.toLowerCase()];if (!n || !("set" in n) || n.set(this, s, "value") === t) this.value = s;
	      });
	    } }), v.extend({ valHooks: { option: { get: function get(e) {
	          var t = e.attributes.value;return !t || t.specified ? e.value : e.text;
	        } }, select: { get: function get(e) {
	          var t,
	              n,
	              r = e.options,
	              i = e.selectedIndex,
	              s = e.type === "select-one" || i < 0,
	              o = s ? null : [],
	              u = s ? i + 1 : r.length,
	              a = i < 0 ? u : s ? i : 0;for (; a < u; a++) {
	            n = r[a];if ((n.selected || a === i) && (v.support.optDisabled ? !n.disabled : n.getAttribute("disabled") === null) && (!n.parentNode.disabled || !v.nodeName(n.parentNode, "optgroup"))) {
	              t = v(n).val();if (s) return t;o.push(t);
	            }
	          }return o;
	        }, set: function set(e, t) {
	          var n = v.makeArray(t);return v(e).find("option").each(function () {
	            this.selected = v.inArray(v(this).val(), n) >= 0;
	          }), n.length || (e.selectedIndex = -1), n;
	        } } }, attrFn: {}, attr: function attr(e, n, r, i) {
	      var s,
	          o,
	          u,
	          a = e.nodeType;if (!e || a === 3 || a === 8 || a === 2) return;if (i && v.isFunction(v.fn[n])) return v(e)[n](r);if (typeof e.getAttribute == "undefined") return v.prop(e, n, r);u = a !== 1 || !v.isXMLDoc(e), u && (n = n.toLowerCase(), o = v.attrHooks[n] || (X.test(n) ? F : j));if (r !== t) {
	        if (r === null) {
	          v.removeAttr(e, n);return;
	        }return o && "set" in o && u && (s = o.set(e, r, n)) !== t ? s : (e.setAttribute(n, r + ""), r);
	      }return o && "get" in o && u && (s = o.get(e, n)) !== null ? s : (s = e.getAttribute(n), s === null ? t : s);
	    }, removeAttr: function removeAttr(e, t) {
	      var n,
	          r,
	          i,
	          s,
	          o = 0;if (t && e.nodeType === 1) {
	        r = t.split(y);for (; o < r.length; o++) {
	          i = r[o], i && (n = v.propFix[i] || i, s = X.test(i), s || v.attr(e, i, ""), e.removeAttribute(V ? i : n), s && n in e && (e[n] = !1));
	        }
	      }
	    }, attrHooks: { type: { set: function set(e, t) {
	          if (U.test(e.nodeName) && e.parentNode) v.error("type property can't be changed");else if (!v.support.radioValue && t === "radio" && v.nodeName(e, "input")) {
	            var n = e.value;return e.setAttribute("type", t), n && (e.value = n), t;
	          }
	        } }, value: { get: function get(e, t) {
	          return j && v.nodeName(e, "button") ? j.get(e, t) : t in e ? e.value : null;
	        }, set: function set(e, t, n) {
	          if (j && v.nodeName(e, "button")) return j.set(e, t, n);e.value = t;
	        } } }, propFix: { tabindex: "tabIndex", readonly: "readOnly", "for": "htmlFor", "class": "className", maxlength: "maxLength", cellspacing: "cellSpacing", cellpadding: "cellPadding", rowspan: "rowSpan", colspan: "colSpan", usemap: "useMap", frameborder: "frameBorder", contenteditable: "contentEditable" }, prop: function prop(e, n, r) {
	      var i,
	          s,
	          o,
	          u = e.nodeType;if (!e || u === 3 || u === 8 || u === 2) return;return o = u !== 1 || !v.isXMLDoc(e), o && (n = v.propFix[n] || n, s = v.propHooks[n]), r !== t ? s && "set" in s && (i = s.set(e, r, n)) !== t ? i : e[n] = r : s && "get" in s && (i = s.get(e, n)) !== null ? i : e[n];
	    }, propHooks: { tabIndex: { get: function get(e) {
	          var n = e.getAttributeNode("tabindex");return n && n.specified ? parseInt(n.value, 10) : z.test(e.nodeName) || W.test(e.nodeName) && e.href ? 0 : t;
	        } } } }), F = { get: function get(e, n) {
	      var r,
	          i = v.prop(e, n);return i === !0 || typeof i != "boolean" && (r = e.getAttributeNode(n)) && r.nodeValue !== !1 ? n.toLowerCase() : t;
	    }, set: function set(e, t, n) {
	      var r;return t === !1 ? v.removeAttr(e, n) : (r = v.propFix[n] || n, r in e && (e[r] = !0), e.setAttribute(n, n.toLowerCase())), n;
	    } }, V || (I = { name: !0, id: !0, coords: !0 }, j = v.valHooks.button = { get: function get(e, n) {
	      var r;return r = e.getAttributeNode(n), r && (I[n] ? r.value !== "" : r.specified) ? r.value : t;
	    }, set: function set(e, t, n) {
	      var r = e.getAttributeNode(n);return r || (r = i.createAttribute(n), e.setAttributeNode(r)), r.value = t + "";
	    } }, v.each(["width", "height"], function (e, t) {
	    v.attrHooks[t] = v.extend(v.attrHooks[t], { set: function set(e, n) {
	        if (n === "") return e.setAttribute(t, "auto"), n;
	      } });
	  }), v.attrHooks.contenteditable = { get: j.get, set: function set(e, t, n) {
	      t === "" && (t = "false"), j.set(e, t, n);
	    } }), v.support.hrefNormalized || v.each(["href", "src", "width", "height"], function (e, n) {
	    v.attrHooks[n] = v.extend(v.attrHooks[n], { get: function get(e) {
	        var r = e.getAttribute(n, 2);return r === null ? t : r;
	      } });
	  }), v.support.style || (v.attrHooks.style = { get: function get(e) {
	      return e.style.cssText.toLowerCase() || t;
	    }, set: function set(e, t) {
	      return e.style.cssText = t + "";
	    } }), v.support.optSelected || (v.propHooks.selected = v.extend(v.propHooks.selected, { get: function get(e) {
	      var t = e.parentNode;return t && (t.selectedIndex, t.parentNode && t.parentNode.selectedIndex), null;
	    } })), v.support.enctype || (v.propFix.enctype = "encoding"), v.support.checkOn || v.each(["radio", "checkbox"], function () {
	    v.valHooks[this] = { get: function get(e) {
	        return e.getAttribute("value") === null ? "on" : e.value;
	      } };
	  }), v.each(["radio", "checkbox"], function () {
	    v.valHooks[this] = v.extend(v.valHooks[this], { set: function set(e, t) {
	        if (v.isArray(t)) return e.checked = v.inArray(v(e).val(), t) >= 0;
	      } });
	  });var $ = /^(?:textarea|input|select)$/i,
	      J = /^([^\.]*|)(?:\.(.+)|)$/,
	      K = /(?:^|\s)hover(\.\S+|)\b/,
	      Q = /^key/,
	      G = /^(?:mouse|contextmenu)|click/,
	      Y = /^(?:focusinfocus|focusoutblur)$/,
	      Z = function Z(e) {
	    return v.event.special.hover ? e : e.replace(K, "mouseenter$1 mouseleave$1");
	  };v.event = { add: function add(e, n, r, i, s) {
	      var o, _u, a, f, l, c, h, p, d, m, g;if (e.nodeType === 3 || e.nodeType === 8 || !n || !r || !(o = v._data(e))) return;r.handler && (d = r, r = d.handler, s = d.selector), r.guid || (r.guid = v.guid++), a = o.events, a || (o.events = a = {}), _u = o.handle, _u || (o.handle = _u = function u(e) {
	        return typeof v == "undefined" || !!e && v.event.triggered === e.type ? t : v.event.dispatch.apply(_u.elem, arguments);
	      }, _u.elem = e), n = v.trim(Z(n)).split(" ");for (f = 0; f < n.length; f++) {
	        l = J.exec(n[f]) || [], c = l[1], h = (l[2] || "").split(".").sort(), g = v.event.special[c] || {}, c = (s ? g.delegateType : g.bindType) || c, g = v.event.special[c] || {}, p = v.extend({ type: c, origType: l[1], data: i, handler: r, guid: r.guid, selector: s, needsContext: s && v.expr.match.needsContext.test(s), namespace: h.join(".") }, d), m = a[c];if (!m) {
	          m = a[c] = [], m.delegateCount = 0;if (!g.setup || g.setup.call(e, i, h, _u) === !1) e.addEventListener ? e.addEventListener(c, _u, !1) : e.attachEvent && e.attachEvent("on" + c, _u);
	        }g.add && (g.add.call(e, p), p.handler.guid || (p.handler.guid = r.guid)), s ? m.splice(m.delegateCount++, 0, p) : m.push(p), v.event.global[c] = !0;
	      }e = null;
	    }, global: {}, remove: function remove(e, t, n, r, i) {
	      var s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c,
	          h,
	          p,
	          d,
	          m,
	          g = v.hasData(e) && v._data(e);if (!g || !(h = g.events)) return;t = v.trim(Z(t || "")).split(" ");for (s = 0; s < t.length; s++) {
	        o = J.exec(t[s]) || [], u = a = o[1], f = o[2];if (!u) {
	          for (u in h) {
	            v.event.remove(e, u + t[s], n, r, !0);
	          }continue;
	        }p = v.event.special[u] || {}, u = (r ? p.delegateType : p.bindType) || u, d = h[u] || [], l = d.length, f = f ? new RegExp("(^|\\.)" + f.split(".").sort().join("\\.(?:.*\\.|)") + "(\\.|$)") : null;for (c = 0; c < d.length; c++) {
	          m = d[c], (i || a === m.origType) && (!n || n.guid === m.guid) && (!f || f.test(m.namespace)) && (!r || r === m.selector || r === "**" && m.selector) && (d.splice(c--, 1), m.selector && d.delegateCount--, p.remove && p.remove.call(e, m));
	        }d.length === 0 && l !== d.length && ((!p.teardown || p.teardown.call(e, f, g.handle) === !1) && v.removeEvent(e, u, g.handle), delete h[u]);
	      }v.isEmptyObject(h) && (delete g.handle, v.removeData(e, "events", !0));
	    }, customEvent: { getData: !0, setData: !0, changeData: !0 }, trigger: function trigger(n, r, s, o) {
	      if (!s || s.nodeType !== 3 && s.nodeType !== 8) {
	        var u,
	            a,
	            f,
	            l,
	            c,
	            h,
	            p,
	            d,
	            m,
	            g,
	            y = n.type || n,
	            b = [];if (Y.test(y + v.event.triggered)) return;y.indexOf("!") >= 0 && (y = y.slice(0, -1), a = !0), y.indexOf(".") >= 0 && (b = y.split("."), y = b.shift(), b.sort());if ((!s || v.event.customEvent[y]) && !v.event.global[y]) return;n = (typeof n === "undefined" ? "undefined" : (0, _typeof3.default)(n)) == "object" ? n[v.expando] ? n : new v.Event(y, n) : new v.Event(y), n.type = y, n.isTrigger = !0, n.exclusive = a, n.namespace = b.join("."), n.namespace_re = n.namespace ? new RegExp("(^|\\.)" + b.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, h = y.indexOf(":") < 0 ? "on" + y : "";if (!s) {
	          u = v.cache;for (f in u) {
	            u[f].events && u[f].events[y] && v.event.trigger(n, r, u[f].handle.elem, !0);
	          }return;
	        }n.result = t, n.target || (n.target = s), r = r != null ? v.makeArray(r) : [], r.unshift(n), p = v.event.special[y] || {};if (p.trigger && p.trigger.apply(s, r) === !1) return;m = [[s, p.bindType || y]];if (!o && !p.noBubble && !v.isWindow(s)) {
	          g = p.delegateType || y, l = Y.test(g + y) ? s : s.parentNode;for (c = s; l; l = l.parentNode) {
	            m.push([l, g]), c = l;
	          }c === (s.ownerDocument || i) && m.push([c.defaultView || c.parentWindow || e, g]);
	        }for (f = 0; f < m.length && !n.isPropagationStopped(); f++) {
	          l = m[f][0], n.type = m[f][1], d = (v._data(l, "events") || {})[n.type] && v._data(l, "handle"), d && d.apply(l, r), d = h && l[h], d && v.acceptData(l) && d.apply && d.apply(l, r) === !1 && n.preventDefault();
	        }return n.type = y, !o && !n.isDefaultPrevented() && (!p._default || p._default.apply(s.ownerDocument, r) === !1) && (y !== "click" || !v.nodeName(s, "a")) && v.acceptData(s) && h && s[y] && (y !== "focus" && y !== "blur" || n.target.offsetWidth !== 0) && !v.isWindow(s) && (c = s[h], c && (s[h] = null), v.event.triggered = y, s[y](), v.event.triggered = t, c && (s[h] = c)), n.result;
	      }return;
	    }, dispatch: function dispatch(n) {
	      n = v.event.fix(n || e.event);var r,
	          i,
	          s,
	          o,
	          u,
	          a,
	          f,
	          c,
	          h,
	          p,
	          d = (v._data(this, "events") || {})[n.type] || [],
	          m = d.delegateCount,
	          g = l.call(arguments),
	          y = !n.exclusive && !n.namespace,
	          b = v.event.special[n.type] || {},
	          w = [];g[0] = n, n.delegateTarget = this;if (b.preDispatch && b.preDispatch.call(this, n) === !1) return;if (m && (!n.button || n.type !== "click")) for (s = n.target; s != this; s = s.parentNode || this) {
	        if (s.disabled !== !0 || n.type !== "click") {
	          u = {}, f = [];for (r = 0; r < m; r++) {
	            c = d[r], h = c.selector, u[h] === t && (u[h] = c.needsContext ? v(h, this).index(s) >= 0 : v.find(h, this, null, [s]).length), u[h] && f.push(c);
	          }f.length && w.push({ elem: s, matches: f });
	        }
	      }d.length > m && w.push({ elem: this, matches: d.slice(m) });for (r = 0; r < w.length && !n.isPropagationStopped(); r++) {
	        a = w[r], n.currentTarget = a.elem;for (i = 0; i < a.matches.length && !n.isImmediatePropagationStopped(); i++) {
	          c = a.matches[i];if (y || !n.namespace && !c.namespace || n.namespace_re && n.namespace_re.test(c.namespace)) n.data = c.data, n.handleObj = c, o = ((v.event.special[c.origType] || {}).handle || c.handler).apply(a.elem, g), o !== t && (n.result = o, o === !1 && (n.preventDefault(), n.stopPropagation()));
	        }
	      }return b.postDispatch && b.postDispatch.call(this, n), n.result;
	    }, props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "), fixHooks: {}, keyHooks: { props: "char charCode key keyCode".split(" "), filter: function filter(e, t) {
	        return e.which == null && (e.which = t.charCode != null ? t.charCode : t.keyCode), e;
	      } }, mouseHooks: { props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "), filter: function filter(e, n) {
	        var r,
	            s,
	            o,
	            u = n.button,
	            a = n.fromElement;return e.pageX == null && n.clientX != null && (r = e.target.ownerDocument || i, s = r.documentElement, o = r.body, e.pageX = n.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = n.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0)), !e.relatedTarget && a && (e.relatedTarget = a === e.target ? n.toElement : a), !e.which && u !== t && (e.which = u & 1 ? 1 : u & 2 ? 3 : u & 4 ? 2 : 0), e;
	      } }, fix: function fix(e) {
	      if (e[v.expando]) return e;var t,
	          n,
	          r = e,
	          s = v.event.fixHooks[e.type] || {},
	          o = s.props ? this.props.concat(s.props) : this.props;e = v.Event(r);for (t = o.length; t;) {
	        n = o[--t], e[n] = r[n];
	      }return e.target || (e.target = r.srcElement || i), e.target.nodeType === 3 && (e.target = e.target.parentNode), e.metaKey = !!e.metaKey, s.filter ? s.filter(e, r) : e;
	    }, special: { load: { noBubble: !0 }, focus: { delegateType: "focusin" }, blur: { delegateType: "focusout" }, beforeunload: { setup: function setup(e, t, n) {
	          v.isWindow(this) && (this.onbeforeunload = n);
	        }, teardown: function teardown(e, t) {
	          this.onbeforeunload === t && (this.onbeforeunload = null);
	        } } }, simulate: function simulate(e, t, n, r) {
	      var i = v.extend(new v.Event(), n, { type: e, isSimulated: !0, originalEvent: {} });r ? v.event.trigger(i, null, t) : v.event.dispatch.call(t, i), i.isDefaultPrevented() && n.preventDefault();
	    } }, v.event.handle = v.event.dispatch, v.removeEvent = i.removeEventListener ? function (e, t, n) {
	    e.removeEventListener && e.removeEventListener(t, n, !1);
	  } : function (e, t, n) {
	    var r = "on" + t;e.detachEvent && (typeof e[r] == "undefined" && (e[r] = null), e.detachEvent(r, n));
	  }, v.Event = function (e, t) {
	    if (!(this instanceof v.Event)) return new v.Event(e, t);e && e.type ? (this.originalEvent = e, this.type = e.type, this.isDefaultPrevented = e.defaultPrevented || e.returnValue === !1 || e.getPreventDefault && e.getPreventDefault() ? tt : et) : this.type = e, t && v.extend(this, t), this.timeStamp = e && e.timeStamp || v.now(), this[v.expando] = !0;
	  }, v.Event.prototype = { preventDefault: function preventDefault() {
	      this.isDefaultPrevented = tt;var e = this.originalEvent;if (!e) return;e.preventDefault ? e.preventDefault() : e.returnValue = !1;
	    }, stopPropagation: function stopPropagation() {
	      this.isPropagationStopped = tt;var e = this.originalEvent;if (!e) return;e.stopPropagation && e.stopPropagation(), e.cancelBubble = !0;
	    }, stopImmediatePropagation: function stopImmediatePropagation() {
	      this.isImmediatePropagationStopped = tt, this.stopPropagation();
	    }, isDefaultPrevented: et, isPropagationStopped: et, isImmediatePropagationStopped: et }, v.each({ mouseenter: "mouseover", mouseleave: "mouseout" }, function (e, t) {
	    v.event.special[e] = { delegateType: t, bindType: t, handle: function handle(e) {
	        var n,
	            r = this,
	            i = e.relatedTarget,
	            s = e.handleObj,
	            o = s.selector;if (!i || i !== r && !v.contains(r, i)) e.type = s.origType, n = s.handler.apply(this, arguments), e.type = t;return n;
	      } };
	  }), v.support.submitBubbles || (v.event.special.submit = { setup: function setup() {
	      if (v.nodeName(this, "form")) return !1;v.event.add(this, "click._submit keypress._submit", function (e) {
	        var n = e.target,
	            r = v.nodeName(n, "input") || v.nodeName(n, "button") ? n.form : t;r && !v._data(r, "_submit_attached") && (v.event.add(r, "submit._submit", function (e) {
	          e._submit_bubble = !0;
	        }), v._data(r, "_submit_attached", !0));
	      });
	    }, postDispatch: function postDispatch(e) {
	      e._submit_bubble && (delete e._submit_bubble, this.parentNode && !e.isTrigger && v.event.simulate("submit", this.parentNode, e, !0));
	    }, teardown: function teardown() {
	      if (v.nodeName(this, "form")) return !1;v.event.remove(this, "._submit");
	    } }), v.support.changeBubbles || (v.event.special.change = { setup: function setup() {
	      if ($.test(this.nodeName)) {
	        if (this.type === "checkbox" || this.type === "radio") v.event.add(this, "propertychange._change", function (e) {
	          e.originalEvent.propertyName === "checked" && (this._just_changed = !0);
	        }), v.event.add(this, "click._change", function (e) {
	          this._just_changed && !e.isTrigger && (this._just_changed = !1), v.event.simulate("change", this, e, !0);
	        });return !1;
	      }v.event.add(this, "beforeactivate._change", function (e) {
	        var t = e.target;$.test(t.nodeName) && !v._data(t, "_change_attached") && (v.event.add(t, "change._change", function (e) {
	          this.parentNode && !e.isSimulated && !e.isTrigger && v.event.simulate("change", this.parentNode, e, !0);
	        }), v._data(t, "_change_attached", !0));
	      });
	    }, handle: function handle(e) {
	      var t = e.target;if (this !== t || e.isSimulated || e.isTrigger || t.type !== "radio" && t.type !== "checkbox") return e.handleObj.handler.apply(this, arguments);
	    }, teardown: function teardown() {
	      return v.event.remove(this, "._change"), !$.test(this.nodeName);
	    } }), v.support.focusinBubbles || v.each({ focus: "focusin", blur: "focusout" }, function (e, t) {
	    var n = 0,
	        r = function r(e) {
	      v.event.simulate(t, e.target, v.event.fix(e), !0);
	    };v.event.special[t] = { setup: function setup() {
	        n++ === 0 && i.addEventListener(e, r, !0);
	      }, teardown: function teardown() {
	        --n === 0 && i.removeEventListener(e, r, !0);
	      } };
	  }), v.fn.extend({ on: function on(e, n, r, i, s) {
	      var o, u;if ((typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) == "object") {
	        typeof n != "string" && (r = r || n, n = t);for (u in e) {
	          this.on(u, n, r, e[u], s);
	        }return this;
	      }r == null && i == null ? (i = n, r = n = t) : i == null && (typeof n == "string" ? (i = r, r = t) : (i = r, r = n, n = t));if (i === !1) i = et;else if (!i) return this;return s === 1 && (o = i, i = function i(e) {
	        return v().off(e), o.apply(this, arguments);
	      }, i.guid = o.guid || (o.guid = v.guid++)), this.each(function () {
	        v.event.add(this, e, i, r, n);
	      });
	    }, one: function one(e, t, n, r) {
	      return this.on(e, t, n, r, 1);
	    }, off: function off(e, n, r) {
	      var i, s;if (e && e.preventDefault && e.handleObj) return i = e.handleObj, v(e.delegateTarget).off(i.namespace ? i.origType + "." + i.namespace : i.origType, i.selector, i.handler), this;if ((typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) == "object") {
	        for (s in e) {
	          this.off(s, n, e[s]);
	        }return this;
	      }if (n === !1 || typeof n == "function") r = n, n = t;return r === !1 && (r = et), this.each(function () {
	        v.event.remove(this, e, r, n);
	      });
	    }, bind: function bind(e, t, n) {
	      return this.on(e, null, t, n);
	    }, unbind: function unbind(e, t) {
	      return this.off(e, null, t);
	    }, live: function live(e, t, n) {
	      return v(this.context).on(e, this.selector, t, n), this;
	    }, die: function die(e, t) {
	      return v(this.context).off(e, this.selector || "**", t), this;
	    }, delegate: function delegate(e, t, n, r) {
	      return this.on(t, e, n, r);
	    }, undelegate: function undelegate(e, t, n) {
	      return arguments.length === 1 ? this.off(e, "**") : this.off(t, e || "**", n);
	    }, trigger: function trigger(e, t) {
	      return this.each(function () {
	        v.event.trigger(e, t, this);
	      });
	    }, triggerHandler: function triggerHandler(e, t) {
	      if (this[0]) return v.event.trigger(e, t, this[0], !0);
	    }, toggle: function toggle(e) {
	      var t = arguments,
	          n = e.guid || v.guid++,
	          r = 0,
	          i = function i(n) {
	        var i = (v._data(this, "lastToggle" + e.guid) || 0) % r;return v._data(this, "lastToggle" + e.guid, i + 1), n.preventDefault(), t[i].apply(this, arguments) || !1;
	      };i.guid = n;while (r < t.length) {
	        t[r++].guid = n;
	      }return this.click(i);
	    }, hover: function hover(e, t) {
	      return this.mouseenter(e).mouseleave(t || e);
	    } }), v.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function (e, t) {
	    v.fn[t] = function (e, n) {
	      return n == null && (n = e, e = null), arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t);
	    }, Q.test(t) && (v.event.fixHooks[t] = v.event.keyHooks), G.test(t) && (v.event.fixHooks[t] = v.event.mouseHooks);
	  }), function (e, t) {
	    function nt(e, t, n, r) {
	      n = n || [], t = t || g;var i,
	          s,
	          a,
	          f,
	          l = t.nodeType;if (!e || typeof e != "string") return n;if (l !== 1 && l !== 9) return [];a = o(t);if (!a && !r) if (i = R.exec(e)) if (f = i[1]) {
	        if (l === 9) {
	          s = t.getElementById(f);if (!s || !s.parentNode) return n;if (s.id === f) return n.push(s), n;
	        } else if (t.ownerDocument && (s = t.ownerDocument.getElementById(f)) && u(t, s) && s.id === f) return n.push(s), n;
	      } else {
	        if (i[2]) return S.apply(n, x.call(t.getElementsByTagName(e), 0)), n;if ((f = i[3]) && Z && t.getElementsByClassName) return S.apply(n, x.call(t.getElementsByClassName(f), 0)), n;
	      }return vt(e.replace(j, "$1"), t, n, r, a);
	    }function rt(e) {
	      return function (t) {
	        var n = t.nodeName.toLowerCase();return n === "input" && t.type === e;
	      };
	    }function it(e) {
	      return function (t) {
	        var n = t.nodeName.toLowerCase();return (n === "input" || n === "button") && t.type === e;
	      };
	    }function st(e) {
	      return N(function (t) {
	        return t = +t, N(function (n, r) {
	          var i,
	              s = e([], n.length, t),
	              o = s.length;while (o--) {
	            n[i = s[o]] && (n[i] = !(r[i] = n[i]));
	          }
	        });
	      });
	    }function ot(e, t, n) {
	      if (e === t) return n;var r = e.nextSibling;while (r) {
	        if (r === t) return -1;r = r.nextSibling;
	      }return 1;
	    }function ut(e, t) {
	      var n,
	          r,
	          s,
	          o,
	          u,
	          a,
	          f,
	          l = L[d][e + " "];if (l) return t ? 0 : l.slice(0);u = e, a = [], f = i.preFilter;while (u) {
	        if (!n || (r = F.exec(u))) r && (u = u.slice(r[0].length) || u), a.push(s = []);n = !1;if (r = I.exec(u)) s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = r[0].replace(j, " ");for (o in i.filter) {
	          (r = J[o].exec(u)) && (!f[o] || (r = f[o](r))) && (s.push(n = new m(r.shift())), u = u.slice(n.length), n.type = o, n.matches = r);
	        }if (!n) break;
	      }return t ? u.length : u ? nt.error(e) : L(e, a).slice(0);
	    }function at(e, t, r) {
	      var i = t.dir,
	          s = r && t.dir === "parentNode",
	          o = w++;return t.first ? function (t, n, r) {
	        while (t = t[i]) {
	          if (s || t.nodeType === 1) return e(t, n, r);
	        }
	      } : function (t, r, u) {
	        if (!u) {
	          var a,
	              f = b + " " + o + " ",
	              l = f + n;while (t = t[i]) {
	            if (s || t.nodeType === 1) {
	              if ((a = t[d]) === l) return t.sizset;if (typeof a == "string" && a.indexOf(f) === 0) {
	                if (t.sizset) return t;
	              } else {
	                t[d] = l;if (e(t, r, u)) return t.sizset = !0, t;t.sizset = !1;
	              }
	            }
	          }
	        } else while (t = t[i]) {
	          if (s || t.nodeType === 1) if (e(t, r, u)) return t;
	        }
	      };
	    }function ft(e) {
	      return e.length > 1 ? function (t, n, r) {
	        var i = e.length;while (i--) {
	          if (!e[i](t, n, r)) return !1;
	        }return !0;
	      } : e[0];
	    }function lt(e, t, n, r, i) {
	      var s,
	          o = [],
	          u = 0,
	          a = e.length,
	          f = t != null;for (; u < a; u++) {
	        if (s = e[u]) if (!n || n(s, r, i)) o.push(s), f && t.push(u);
	      }return o;
	    }function ct(e, t, n, r, i, s) {
	      return r && !r[d] && (r = ct(r)), i && !i[d] && (i = ct(i, s)), N(function (s, o, u, a) {
	        var f,
	            l,
	            c,
	            h = [],
	            p = [],
	            d = o.length,
	            v = s || dt(t || "*", u.nodeType ? [u] : u, []),
	            m = e && (s || !t) ? lt(v, h, e, u, a) : v,
	            g = n ? i || (s ? e : d || r) ? [] : o : m;n && n(m, g, u, a);if (r) {
	          f = lt(g, p), r(f, [], u, a), l = f.length;while (l--) {
	            if (c = f[l]) g[p[l]] = !(m[p[l]] = c);
	          }
	        }if (s) {
	          if (i || e) {
	            if (i) {
	              f = [], l = g.length;while (l--) {
	                (c = g[l]) && f.push(m[l] = c);
	              }i(null, g = [], f, a);
	            }l = g.length;while (l--) {
	              (c = g[l]) && (f = i ? T.call(s, c) : h[l]) > -1 && (s[f] = !(o[f] = c));
	            }
	          }
	        } else g = lt(g === o ? g.splice(d, g.length) : g), i ? i(null, o, g, a) : S.apply(o, g);
	      });
	    }function ht(e) {
	      var t,
	          n,
	          r,
	          s = e.length,
	          o = i.relative[e[0].type],
	          u = o || i.relative[" "],
	          a = o ? 1 : 0,
	          f = at(function (e) {
	        return e === t;
	      }, u, !0),
	          l = at(function (e) {
	        return T.call(t, e) > -1;
	      }, u, !0),
	          h = [function (e, n, r) {
	        return !o && (r || n !== c) || ((t = n).nodeType ? f(e, n, r) : l(e, n, r));
	      }];for (; a < s; a++) {
	        if (n = i.relative[e[a].type]) h = [at(ft(h), n)];else {
	          n = i.filter[e[a].type].apply(null, e[a].matches);if (n[d]) {
	            r = ++a;for (; r < s; r++) {
	              if (i.relative[e[r].type]) break;
	            }return ct(a > 1 && ft(h), a > 1 && e.slice(0, a - 1).join("").replace(j, "$1"), n, a < r && ht(e.slice(a, r)), r < s && ht(e = e.slice(r)), r < s && e.join(""));
	          }h.push(n);
	        }
	      }return ft(h);
	    }function pt(e, t) {
	      var r = t.length > 0,
	          s = e.length > 0,
	          o = function o(u, a, f, l, h) {
	        var p,
	            d,
	            v,
	            m = [],
	            y = 0,
	            w = "0",
	            x = u && [],
	            T = h != null,
	            N = c,
	            C = u || s && i.find.TAG("*", h && a.parentNode || a),
	            k = b += N == null ? 1 : Math.E;T && (c = a !== g && a, n = o.el);for (; (p = C[w]) != null; w++) {
	          if (s && p) {
	            for (d = 0; v = e[d]; d++) {
	              if (v(p, a, f)) {
	                l.push(p);break;
	              }
	            }T && (b = k, n = ++o.el);
	          }r && ((p = !v && p) && y--, u && x.push(p));
	        }y += w;if (r && w !== y) {
	          for (d = 0; v = t[d]; d++) {
	            v(x, m, a, f);
	          }if (u) {
	            if (y > 0) while (w--) {
	              !x[w] && !m[w] && (m[w] = E.call(l));
	            }m = lt(m);
	          }S.apply(l, m), T && !u && m.length > 0 && y + t.length > 1 && nt.uniqueSort(l);
	        }return T && (b = k, c = N), x;
	      };return o.el = 0, r ? N(o) : o;
	    }function dt(e, t, n) {
	      var r = 0,
	          i = t.length;for (; r < i; r++) {
	        nt(e, t[r], n);
	      }return n;
	    }function vt(e, t, n, r, s) {
	      var o,
	          u,
	          f,
	          l,
	          c,
	          h = ut(e),
	          p = h.length;if (!r && h.length === 1) {
	        u = h[0] = h[0].slice(0);if (u.length > 2 && (f = u[0]).type === "ID" && t.nodeType === 9 && !s && i.relative[u[1].type]) {
	          t = i.find.ID(f.matches[0].replace($, ""), t, s)[0];if (!t) return n;e = e.slice(u.shift().length);
	        }for (o = J.POS.test(e) ? -1 : u.length - 1; o >= 0; o--) {
	          f = u[o];if (i.relative[l = f.type]) break;if (c = i.find[l]) if (r = c(f.matches[0].replace($, ""), z.test(u[0].type) && t.parentNode || t, s)) {
	            u.splice(o, 1), e = r.length && u.join("");if (!e) return S.apply(n, x.call(r, 0)), n;break;
	          }
	        }
	      }return a(e, h)(r, t, s, n, z.test(e)), n;
	    }function mt() {}var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f,
	        l,
	        c,
	        h = !0,
	        p = "undefined",
	        d = ("sizcache" + Math.random()).replace(".", ""),
	        m = String,
	        g = e.document,
	        y = g.documentElement,
	        b = 0,
	        w = 0,
	        E = [].pop,
	        S = [].push,
	        x = [].slice,
	        T = [].indexOf || function (e) {
	      var t = 0,
	          n = this.length;for (; t < n; t++) {
	        if (this[t] === e) return t;
	      }return -1;
	    },
	        N = function N(e, t) {
	      return e[d] = t == null || t, e;
	    },
	        C = function C() {
	      var e = {},
	          t = [];return N(function (n, r) {
	        return t.push(n) > i.cacheLength && delete e[t.shift()], e[n + " "] = r;
	      }, e);
	    },
	        k = C(),
	        L = C(),
	        A = C(),
	        O = "[\\x20\\t\\r\\n\\f]",
	        M = "(?:\\\\.|[-\\w]|[^\\x00-\\xa0])+",
	        _ = M.replace("w", "w#"),
	        D = "([*^$|!~]?=)",
	        P = "\\[" + O + "*(" + M + ")" + O + "*(?:" + D + O + "*(?:(['\"])((?:\\\\.|[^\\\\])*?)\\3|(" + _ + ")|)|)" + O + "*\\]",
	        H = ":(" + M + ")(?:\\((?:(['\"])((?:\\\\.|[^\\\\])*?)\\2|([^()[\\]]*|(?:(?:" + P + ")|[^:]|\\\\.)*|.*))\\)|)",
	        B = ":(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + O + "*((?:-\\d)?\\d*)" + O + "*\\)|)(?=[^-]|$)",
	        j = new RegExp("^" + O + "+|((?:^|[^\\\\])(?:\\\\.)*)" + O + "+$", "g"),
	        F = new RegExp("^" + O + "*," + O + "*"),
	        I = new RegExp("^" + O + "*([\\x20\\t\\r\\n\\f>+~])" + O + "*"),
	        q = new RegExp(H),
	        R = /^(?:#([\w\-]+)|(\w+)|\.([\w\-]+))$/,
	        U = /^:not/,
	        z = /[\x20\t\r\n\f]*[+~]/,
	        W = /:not\($/,
	        X = /h\d/i,
	        V = /input|select|textarea|button/i,
	        $ = /\\(?!\\)/g,
	        J = { ID: new RegExp("^#(" + M + ")"), CLASS: new RegExp("^\\.(" + M + ")"), NAME: new RegExp("^\\[name=['\"]?(" + M + ")['\"]?\\]"), TAG: new RegExp("^(" + M.replace("w", "w*") + ")"), ATTR: new RegExp("^" + P), PSEUDO: new RegExp("^" + H), POS: new RegExp(B, "i"), CHILD: new RegExp("^:(only|nth|first|last)-child(?:\\(" + O + "*(even|odd|(([+-]|)(\\d*)n|)" + O + "*(?:([+-]|)" + O + "*(\\d+)|))" + O + "*\\)|)", "i"), needsContext: new RegExp("^" + O + "*[>+~]|" + B, "i") },
	        K = function K(e) {
	      var t = g.createElement("div");try {
	        return e(t);
	      } catch (n) {
	        return !1;
	      } finally {
	        t = null;
	      }
	    },
	        Q = K(function (e) {
	      return e.appendChild(g.createComment("")), !e.getElementsByTagName("*").length;
	    }),
	        G = K(function (e) {
	      return e.innerHTML = "<a href='#'></a>", e.firstChild && (0, _typeof3.default)(e.firstChild.getAttribute) !== p && e.firstChild.getAttribute("href") === "#";
	    }),
	        Y = K(function (e) {
	      e.innerHTML = "<select></select>";var t = (0, _typeof3.default)(e.lastChild.getAttribute("multiple"));return t !== "boolean" && t !== "string";
	    }),
	        Z = K(function (e) {
	      return e.innerHTML = "<div class='hidden e'></div><div class='hidden'></div>", !e.getElementsByClassName || !e.getElementsByClassName("e").length ? !1 : (e.lastChild.className = "e", e.getElementsByClassName("e").length === 2);
	    }),
	        et = K(function (e) {
	      e.id = d + 0, e.innerHTML = "<a name='" + d + "'></a><div name='" + d + "'></div>", y.insertBefore(e, y.firstChild);var t = g.getElementsByName && g.getElementsByName(d).length === 2 + g.getElementsByName(d + 0).length;return r = !g.getElementById(d), y.removeChild(e), t;
	    });try {
	      x.call(y.childNodes, 0)[0].nodeType;
	    } catch (tt) {
	      x = function x(e) {
	        var t,
	            n = [];for (; t = this[e]; e++) {
	          n.push(t);
	        }return n;
	      };
	    }nt.matches = function (e, t) {
	      return nt(e, null, null, t);
	    }, nt.matchesSelector = function (e, t) {
	      return nt(t, null, null, [e]).length > 0;
	    }, s = nt.getText = function (e) {
	      var t,
	          n = "",
	          r = 0,
	          i = e.nodeType;if (i) {
	        if (i === 1 || i === 9 || i === 11) {
	          if (typeof e.textContent == "string") return e.textContent;for (e = e.firstChild; e; e = e.nextSibling) {
	            n += s(e);
	          }
	        } else if (i === 3 || i === 4) return e.nodeValue;
	      } else for (; t = e[r]; r++) {
	        n += s(t);
	      }return n;
	    }, o = nt.isXML = function (e) {
	      var t = e && (e.ownerDocument || e).documentElement;return t ? t.nodeName !== "HTML" : !1;
	    }, u = nt.contains = y.contains ? function (e, t) {
	      var n = e.nodeType === 9 ? e.documentElement : e,
	          r = t && t.parentNode;return e === r || !!(r && r.nodeType === 1 && n.contains && n.contains(r));
	    } : y.compareDocumentPosition ? function (e, t) {
	      return t && !!(e.compareDocumentPosition(t) & 16);
	    } : function (e, t) {
	      while (t = t.parentNode) {
	        if (t === e) return !0;
	      }return !1;
	    }, nt.attr = function (e, t) {
	      var n,
	          r = o(e);return r || (t = t.toLowerCase()), (n = i.attrHandle[t]) ? n(e) : r || Y ? e.getAttribute(t) : (n = e.getAttributeNode(t), n ? typeof e[t] == "boolean" ? e[t] ? t : null : n.specified ? n.value : null : null);
	    }, i = nt.selectors = { cacheLength: 50, createPseudo: N, match: J, attrHandle: G ? {} : { href: function href(e) {
	          return e.getAttribute("href", 2);
	        }, type: function type(e) {
	          return e.getAttribute("type");
	        } }, find: { ID: r ? function (e, t, n) {
	          if ((0, _typeof3.default)(t.getElementById) !== p && !n) {
	            var r = t.getElementById(e);return r && r.parentNode ? [r] : [];
	          }
	        } : function (e, n, r) {
	          if ((0, _typeof3.default)(n.getElementById) !== p && !r) {
	            var i = n.getElementById(e);return i ? i.id === e || (0, _typeof3.default)(i.getAttributeNode) !== p && i.getAttributeNode("id").value === e ? [i] : t : [];
	          }
	        }, TAG: Q ? function (e, t) {
	          if ((0, _typeof3.default)(t.getElementsByTagName) !== p) return t.getElementsByTagName(e);
	        } : function (e, t) {
	          var n = t.getElementsByTagName(e);if (e === "*") {
	            var r,
	                i = [],
	                s = 0;for (; r = n[s]; s++) {
	              r.nodeType === 1 && i.push(r);
	            }return i;
	          }return n;
	        }, NAME: et && function (e, t) {
	          if ((0, _typeof3.default)(t.getElementsByName) !== p) return t.getElementsByName(name);
	        }, CLASS: Z && function (e, t, n) {
	          if ((0, _typeof3.default)(t.getElementsByClassName) !== p && !n) return t.getElementsByClassName(e);
	        } }, relative: { ">": { dir: "parentNode", first: !0 }, " ": { dir: "parentNode" }, "+": { dir: "previousSibling", first: !0 }, "~": { dir: "previousSibling" } }, preFilter: { ATTR: function ATTR(e) {
	          return e[1] = e[1].replace($, ""), e[3] = (e[4] || e[5] || "").replace($, ""), e[2] === "~=" && (e[3] = " " + e[3] + " "), e.slice(0, 4);
	        }, CHILD: function CHILD(e) {
	          return e[1] = e[1].toLowerCase(), e[1] === "nth" ? (e[2] || nt.error(e[0]), e[3] = +(e[3] ? e[4] + (e[5] || 1) : 2 * (e[2] === "even" || e[2] === "odd")), e[4] = +(e[6] + e[7] || e[2] === "odd")) : e[2] && nt.error(e[0]), e;
	        }, PSEUDO: function PSEUDO(e) {
	          var t, n;if (J.CHILD.test(e[0])) return null;if (e[3]) e[2] = e[3];else if (t = e[4]) q.test(t) && (n = ut(t, !0)) && (n = t.indexOf(")", t.length - n) - t.length) && (t = t.slice(0, n), e[0] = e[0].slice(0, n)), e[2] = t;return e.slice(0, 3);
	        } }, filter: { ID: r ? function (e) {
	          return e = e.replace($, ""), function (t) {
	            return t.getAttribute("id") === e;
	          };
	        } : function (e) {
	          return e = e.replace($, ""), function (t) {
	            var n = (0, _typeof3.default)(t.getAttributeNode) !== p && t.getAttributeNode("id");return n && n.value === e;
	          };
	        }, TAG: function TAG(e) {
	          return e === "*" ? function () {
	            return !0;
	          } : (e = e.replace($, "").toLowerCase(), function (t) {
	            return t.nodeName && t.nodeName.toLowerCase() === e;
	          });
	        }, CLASS: function CLASS(e) {
	          var t = k[d][e + " "];return t || (t = new RegExp("(^|" + O + ")" + e + "(" + O + "|$)")) && k(e, function (e) {
	            return t.test(e.className || (0, _typeof3.default)(e.getAttribute) !== p && e.getAttribute("class") || "");
	          });
	        }, ATTR: function ATTR(e, t, n) {
	          return function (r, i) {
	            var s = nt.attr(r, e);return s == null ? t === "!=" : t ? (s += "", t === "=" ? s === n : t === "!=" ? s !== n : t === "^=" ? n && s.indexOf(n) === 0 : t === "*=" ? n && s.indexOf(n) > -1 : t === "$=" ? n && s.substr(s.length - n.length) === n : t === "~=" ? (" " + s + " ").indexOf(n) > -1 : t === "|=" ? s === n || s.substr(0, n.length + 1) === n + "-" : !1) : !0;
	          };
	        }, CHILD: function CHILD(e, t, n, r) {
	          return e === "nth" ? function (e) {
	            var t,
	                i,
	                s = e.parentNode;if (n === 1 && r === 0) return !0;if (s) {
	              i = 0;for (t = s.firstChild; t; t = t.nextSibling) {
	                if (t.nodeType === 1) {
	                  i++;if (e === t) break;
	                }
	              }
	            }return i -= r, i === n || i % n === 0 && i / n >= 0;
	          } : function (t) {
	            var n = t;switch (e) {case "only":case "first":
	                while (n = n.previousSibling) {
	                  if (n.nodeType === 1) return !1;
	                }if (e === "first") return !0;n = t;case "last":
	                while (n = n.nextSibling) {
	                  if (n.nodeType === 1) return !1;
	                }return !0;}
	          };
	        }, PSEUDO: function PSEUDO(e, t) {
	          var n,
	              r = i.pseudos[e] || i.setFilters[e.toLowerCase()] || nt.error("unsupported pseudo: " + e);return r[d] ? r(t) : r.length > 1 ? (n = [e, e, "", t], i.setFilters.hasOwnProperty(e.toLowerCase()) ? N(function (e, n) {
	            var i,
	                s = r(e, t),
	                o = s.length;while (o--) {
	              i = T.call(e, s[o]), e[i] = !(n[i] = s[o]);
	            }
	          }) : function (e) {
	            return r(e, 0, n);
	          }) : r;
	        } }, pseudos: { not: N(function (e) {
	          var t = [],
	              n = [],
	              r = a(e.replace(j, "$1"));return r[d] ? N(function (e, t, n, i) {
	            var s,
	                o = r(e, null, i, []),
	                u = e.length;while (u--) {
	              if (s = o[u]) e[u] = !(t[u] = s);
	            }
	          }) : function (e, i, s) {
	            return t[0] = e, r(t, null, s, n), !n.pop();
	          };
	        }), has: N(function (e) {
	          return function (t) {
	            return nt(e, t).length > 0;
	          };
	        }), contains: N(function (e) {
	          return function (t) {
	            return (t.textContent || t.innerText || s(t)).indexOf(e) > -1;
	          };
	        }), enabled: function enabled(e) {
	          return e.disabled === !1;
	        }, disabled: function disabled(e) {
	          return e.disabled === !0;
	        }, checked: function checked(e) {
	          var t = e.nodeName.toLowerCase();return t === "input" && !!e.checked || t === "option" && !!e.selected;
	        }, selected: function selected(e) {
	          return e.parentNode && e.parentNode.selectedIndex, e.selected === !0;
	        }, parent: function parent(e) {
	          return !i.pseudos.empty(e);
	        }, empty: function empty(e) {
	          var t;e = e.firstChild;while (e) {
	            if (e.nodeName > "@" || (t = e.nodeType) === 3 || t === 4) return !1;e = e.nextSibling;
	          }return !0;
	        }, header: function header(e) {
	          return X.test(e.nodeName);
	        }, text: function text(e) {
	          var t, n;return e.nodeName.toLowerCase() === "input" && (t = e.type) === "text" && ((n = e.getAttribute("type")) == null || n.toLowerCase() === t);
	        }, radio: rt("radio"), checkbox: rt("checkbox"), file: rt("file"), password: rt("password"), image: rt("image"), submit: it("submit"), reset: it("reset"), button: function button(e) {
	          var t = e.nodeName.toLowerCase();return t === "input" && e.type === "button" || t === "button";
	        }, input: function input(e) {
	          return V.test(e.nodeName);
	        }, focus: function focus(e) {
	          var t = e.ownerDocument;return e === t.activeElement && (!t.hasFocus || t.hasFocus()) && !!(e.type || e.href || ~e.tabIndex);
	        }, active: function active(e) {
	          return e === e.ownerDocument.activeElement;
	        }, first: st(function () {
	          return [0];
	        }), last: st(function (e, t) {
	          return [t - 1];
	        }), eq: st(function (e, t, n) {
	          return [n < 0 ? n + t : n];
	        }), even: st(function (e, t) {
	          for (var n = 0; n < t; n += 2) {
	            e.push(n);
	          }return e;
	        }), odd: st(function (e, t) {
	          for (var n = 1; n < t; n += 2) {
	            e.push(n);
	          }return e;
	        }), lt: st(function (e, t, n) {
	          for (var r = n < 0 ? n + t : n; --r >= 0;) {
	            e.push(r);
	          }return e;
	        }), gt: st(function (e, t, n) {
	          for (var r = n < 0 ? n + t : n; ++r < t;) {
	            e.push(r);
	          }return e;
	        }) } }, f = y.compareDocumentPosition ? function (e, t) {
	      return e === t ? (l = !0, 0) : (!e.compareDocumentPosition || !t.compareDocumentPosition ? e.compareDocumentPosition : e.compareDocumentPosition(t) & 4) ? -1 : 1;
	    } : function (e, t) {
	      if (e === t) return l = !0, 0;if (e.sourceIndex && t.sourceIndex) return e.sourceIndex - t.sourceIndex;var n,
	          r,
	          i = [],
	          s = [],
	          o = e.parentNode,
	          u = t.parentNode,
	          a = o;if (o === u) return ot(e, t);if (!o) return -1;if (!u) return 1;while (a) {
	        i.unshift(a), a = a.parentNode;
	      }a = u;while (a) {
	        s.unshift(a), a = a.parentNode;
	      }n = i.length, r = s.length;for (var f = 0; f < n && f < r; f++) {
	        if (i[f] !== s[f]) return ot(i[f], s[f]);
	      }return f === n ? ot(e, s[f], -1) : ot(i[f], t, 1);
	    }, [0, 0].sort(f), h = !l, nt.uniqueSort = function (e) {
	      var t,
	          n = [],
	          r = 1,
	          i = 0;l = h, e.sort(f);if (l) {
	        for (; t = e[r]; r++) {
	          t === e[r - 1] && (i = n.push(r));
	        }while (i--) {
	          e.splice(n[i], 1);
	        }
	      }return e;
	    }, nt.error = function (e) {
	      throw new Error("Syntax error, unrecognized expression: " + e);
	    }, a = nt.compile = function (e, t) {
	      var n,
	          r = [],
	          i = [],
	          s = A[d][e + " "];if (!s) {
	        t || (t = ut(e)), n = t.length;while (n--) {
	          s = ht(t[n]), s[d] ? r.push(s) : i.push(s);
	        }s = A(e, pt(i, r));
	      }return s;
	    }, g.querySelectorAll && function () {
	      var e,
	          t = vt,
	          n = /'|\\/g,
	          r = /\=[\x20\t\r\n\f]*([^'"\]]*)[\x20\t\r\n\f]*\]/g,
	          i = [":focus"],
	          s = [":active"],
	          u = y.matchesSelector || y.mozMatchesSelector || y.webkitMatchesSelector || y.oMatchesSelector || y.msMatchesSelector;K(function (e) {
	        e.innerHTML = "<select><option selected=''></option></select>", e.querySelectorAll("[selected]").length || i.push("\\[" + O + "*(?:checked|disabled|ismap|multiple|readonly|selected|value)"), e.querySelectorAll(":checked").length || i.push(":checked");
	      }), K(function (e) {
	        e.innerHTML = "<p test=''></p>", e.querySelectorAll("[test^='']").length && i.push("[*^$]=" + O + "*(?:\"\"|'')"), e.innerHTML = "<input type='hidden'/>", e.querySelectorAll(":enabled").length || i.push(":enabled", ":disabled");
	      }), i = new RegExp(i.join("|")), vt = function vt(e, r, s, o, u) {
	        if (!o && !u && !i.test(e)) {
	          var a,
	              f,
	              l = !0,
	              c = d,
	              h = r,
	              p = r.nodeType === 9 && e;if (r.nodeType === 1 && r.nodeName.toLowerCase() !== "object") {
	            a = ut(e), (l = r.getAttribute("id")) ? c = l.replace(n, "\\$&") : r.setAttribute("id", c), c = "[id='" + c + "'] ", f = a.length;while (f--) {
	              a[f] = c + a[f].join("");
	            }h = z.test(e) && r.parentNode || r, p = a.join(",");
	          }if (p) try {
	            return S.apply(s, x.call(h.querySelectorAll(p), 0)), s;
	          } catch (v) {} finally {
	            l || r.removeAttribute("id");
	          }
	        }return t(e, r, s, o, u);
	      }, u && (K(function (t) {
	        e = u.call(t, "div");try {
	          u.call(t, "[test!='']:sizzle"), s.push("!=", H);
	        } catch (n) {}
	      }), s = new RegExp(s.join("|")), nt.matchesSelector = function (t, n) {
	        n = n.replace(r, "='$1']");if (!o(t) && !s.test(n) && !i.test(n)) try {
	          var a = u.call(t, n);if (a || e || t.document && t.document.nodeType !== 11) return a;
	        } catch (f) {}return nt(n, null, null, [t]).length > 0;
	      });
	    }(), i.pseudos.nth = i.pseudos.eq, i.filters = mt.prototype = i.pseudos, i.setFilters = new mt(), nt.attr = v.attr, v.find = nt, v.expr = nt.selectors, v.expr[":"] = v.expr.pseudos, v.unique = nt.uniqueSort, v.text = nt.getText, v.isXMLDoc = nt.isXML, v.contains = nt.contains;
	  }(e);var nt = /Until$/,
	      rt = /^(?:parents|prev(?:Until|All))/,
	      it = /^.[^:#\[\.,]*$/,
	      st = v.expr.match.needsContext,
	      ot = { children: !0, contents: !0, next: !0, prev: !0 };v.fn.extend({ find: function find(e) {
	      var t,
	          n,
	          r,
	          i,
	          s,
	          o,
	          u = this;if (typeof e != "string") return v(e).filter(function () {
	        for (t = 0, n = u.length; t < n; t++) {
	          if (v.contains(u[t], this)) return !0;
	        }
	      });o = this.pushStack("", "find", e);for (t = 0, n = this.length; t < n; t++) {
	        r = o.length, v.find(e, this[t], o);if (t > 0) for (i = r; i < o.length; i++) {
	          for (s = 0; s < r; s++) {
	            if (o[s] === o[i]) {
	              o.splice(i--, 1);break;
	            }
	          }
	        }
	      }return o;
	    }, has: function has(e) {
	      var t,
	          n = v(e, this),
	          r = n.length;return this.filter(function () {
	        for (t = 0; t < r; t++) {
	          if (v.contains(this, n[t])) return !0;
	        }
	      });
	    }, not: function not(e) {
	      return this.pushStack(ft(this, e, !1), "not", e);
	    }, filter: function filter(e) {
	      return this.pushStack(ft(this, e, !0), "filter", e);
	    }, is: function is(e) {
	      return !!e && (typeof e == "string" ? st.test(e) ? v(e, this.context).index(this[0]) >= 0 : v.filter(e, this).length > 0 : this.filter(e).length > 0);
	    }, closest: function closest(e, t) {
	      var n,
	          r = 0,
	          i = this.length,
	          s = [],
	          o = st.test(e) || typeof e != "string" ? v(e, t || this.context) : 0;for (; r < i; r++) {
	        n = this[r];while (n && n.ownerDocument && n !== t && n.nodeType !== 11) {
	          if (o ? o.index(n) > -1 : v.find.matchesSelector(n, e)) {
	            s.push(n);break;
	          }n = n.parentNode;
	        }
	      }return s = s.length > 1 ? v.unique(s) : s, this.pushStack(s, "closest", e);
	    }, index: function index(e) {
	      return e ? typeof e == "string" ? v.inArray(this[0], v(e)) : v.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
	    }, add: function add(e, t) {
	      var n = typeof e == "string" ? v(e, t) : v.makeArray(e && e.nodeType ? [e] : e),
	          r = v.merge(this.get(), n);return this.pushStack(ut(n[0]) || ut(r[0]) ? r : v.unique(r));
	    }, addBack: function addBack(e) {
	      return this.add(e == null ? this.prevObject : this.prevObject.filter(e));
	    } }), v.fn.andSelf = v.fn.addBack, v.each({ parent: function parent(e) {
	      var t = e.parentNode;return t && t.nodeType !== 11 ? t : null;
	    }, parents: function parents(e) {
	      return v.dir(e, "parentNode");
	    }, parentsUntil: function parentsUntil(e, t, n) {
	      return v.dir(e, "parentNode", n);
	    }, next: function next(e) {
	      return at(e, "nextSibling");
	    }, prev: function prev(e) {
	      return at(e, "previousSibling");
	    }, nextAll: function nextAll(e) {
	      return v.dir(e, "nextSibling");
	    }, prevAll: function prevAll(e) {
	      return v.dir(e, "previousSibling");
	    }, nextUntil: function nextUntil(e, t, n) {
	      return v.dir(e, "nextSibling", n);
	    }, prevUntil: function prevUntil(e, t, n) {
	      return v.dir(e, "previousSibling", n);
	    }, siblings: function siblings(e) {
	      return v.sibling((e.parentNode || {}).firstChild, e);
	    }, children: function children(e) {
	      return v.sibling(e.firstChild);
	    }, contents: function contents(e) {
	      return v.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : v.merge([], e.childNodes);
	    } }, function (e, t) {
	    v.fn[e] = function (n, r) {
	      var i = v.map(this, t, n);return nt.test(e) || (r = n), r && typeof r == "string" && (i = v.filter(r, i)), i = this.length > 1 && !ot[e] ? v.unique(i) : i, this.length > 1 && rt.test(e) && (i = i.reverse()), this.pushStack(i, e, l.call(arguments).join(","));
	    };
	  }), v.extend({ filter: function filter(e, t, n) {
	      return n && (e = ":not(" + e + ")"), t.length === 1 ? v.find.matchesSelector(t[0], e) ? [t[0]] : [] : v.find.matches(e, t);
	    }, dir: function dir(e, n, r) {
	      var i = [],
	          s = e[n];while (s && s.nodeType !== 9 && (r === t || s.nodeType !== 1 || !v(s).is(r))) {
	        s.nodeType === 1 && i.push(s), s = s[n];
	      }return i;
	    }, sibling: function sibling(e, t) {
	      var n = [];for (; e; e = e.nextSibling) {
	        e.nodeType === 1 && e !== t && n.push(e);
	      }return n;
	    } });var ct = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video",
	      ht = / jQuery\d+="(?:null|\d+)"/g,
	      pt = /^\s+/,
	      dt = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,
	      vt = /<([\w:]+)/,
	      mt = /<tbody/i,
	      gt = /<|&#?\w+;/,
	      yt = /<(?:script|style|link)/i,
	      bt = /<(?:script|object|embed|option|style)/i,
	      wt = new RegExp("<(?:" + ct + ")[\\s/>]", "i"),
	      Et = /^(?:checkbox|radio)$/,
	      St = /checked\s*(?:[^=]|=\s*.checked.)/i,
	      xt = /\/(java|ecma)script/i,
	      Tt = /^\s*<!(?:\[CDATA\[|\-\-)|[\]\-]{2}>\s*$/g,
	      Nt = { option: [1, "<select multiple='multiple'>", "</select>"], legend: [1, "<fieldset>", "</fieldset>"], thead: [1, "<table>", "</table>"], tr: [2, "<table><tbody>", "</tbody></table>"], td: [3, "<table><tbody><tr>", "</tr></tbody></table>"], col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"], area: [1, "<map>", "</map>"], _default: [0, "", ""] },
	      Ct = lt(i),
	      kt = Ct.appendChild(i.createElement("div"));Nt.optgroup = Nt.option, Nt.tbody = Nt.tfoot = Nt.colgroup = Nt.caption = Nt.thead, Nt.th = Nt.td, v.support.htmlSerialize || (Nt._default = [1, "X<div>", "</div>"]), v.fn.extend({ text: function text(e) {
	      return v.access(this, function (e) {
	        return e === t ? v.text(this) : this.empty().append((this[0] && this[0].ownerDocument || i).createTextNode(e));
	      }, null, e, arguments.length);
	    }, wrapAll: function wrapAll(e) {
	      if (v.isFunction(e)) return this.each(function (t) {
	        v(this).wrapAll(e.call(this, t));
	      });if (this[0]) {
	        var t = v(e, this[0].ownerDocument).eq(0).clone(!0);this[0].parentNode && t.insertBefore(this[0]), t.map(function () {
	          var e = this;while (e.firstChild && e.firstChild.nodeType === 1) {
	            e = e.firstChild;
	          }return e;
	        }).append(this);
	      }return this;
	    }, wrapInner: function wrapInner(e) {
	      return v.isFunction(e) ? this.each(function (t) {
	        v(this).wrapInner(e.call(this, t));
	      }) : this.each(function () {
	        var t = v(this),
	            n = t.contents();n.length ? n.wrapAll(e) : t.append(e);
	      });
	    }, wrap: function wrap(e) {
	      var t = v.isFunction(e);return this.each(function (n) {
	        v(this).wrapAll(t ? e.call(this, n) : e);
	      });
	    }, unwrap: function unwrap() {
	      return this.parent().each(function () {
	        v.nodeName(this, "body") || v(this).replaceWith(this.childNodes);
	      }).end();
	    }, append: function append() {
	      return this.domManip(arguments, !0, function (e) {
	        (this.nodeType === 1 || this.nodeType === 11) && this.appendChild(e);
	      });
	    }, prepend: function prepend() {
	      return this.domManip(arguments, !0, function (e) {
	        (this.nodeType === 1 || this.nodeType === 11) && this.insertBefore(e, this.firstChild);
	      });
	    }, before: function before() {
	      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
	        this.parentNode.insertBefore(e, this);
	      });if (arguments.length) {
	        var e = v.clean(arguments);return this.pushStack(v.merge(e, this), "before", this.selector);
	      }
	    }, after: function after() {
	      if (!ut(this[0])) return this.domManip(arguments, !1, function (e) {
	        this.parentNode.insertBefore(e, this.nextSibling);
	      });if (arguments.length) {
	        var e = v.clean(arguments);return this.pushStack(v.merge(this, e), "after", this.selector);
	      }
	    }, remove: function remove(e, t) {
	      var n,
	          r = 0;for (; (n = this[r]) != null; r++) {
	        if (!e || v.filter(e, [n]).length) !t && n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), v.cleanData([n])), n.parentNode && n.parentNode.removeChild(n);
	      }return this;
	    }, empty: function empty() {
	      var e,
	          t = 0;for (; (e = this[t]) != null; t++) {
	        e.nodeType === 1 && v.cleanData(e.getElementsByTagName("*"));while (e.firstChild) {
	          e.removeChild(e.firstChild);
	        }
	      }return this;
	    }, clone: function clone(e, t) {
	      return e = e == null ? !1 : e, t = t == null ? e : t, this.map(function () {
	        return v.clone(this, e, t);
	      });
	    }, html: function html(e) {
	      return v.access(this, function (e) {
	        var n = this[0] || {},
	            r = 0,
	            i = this.length;if (e === t) return n.nodeType === 1 ? n.innerHTML.replace(ht, "") : t;if (typeof e == "string" && !yt.test(e) && (v.support.htmlSerialize || !wt.test(e)) && (v.support.leadingWhitespace || !pt.test(e)) && !Nt[(vt.exec(e) || ["", ""])[1].toLowerCase()]) {
	          e = e.replace(dt, "<$1></$2>");try {
	            for (; r < i; r++) {
	              n = this[r] || {}, n.nodeType === 1 && (v.cleanData(n.getElementsByTagName("*")), n.innerHTML = e);
	            }n = 0;
	          } catch (s) {}
	        }n && this.empty().append(e);
	      }, null, e, arguments.length);
	    }, replaceWith: function replaceWith(e) {
	      return ut(this[0]) ? this.length ? this.pushStack(v(v.isFunction(e) ? e() : e), "replaceWith", e) : this : v.isFunction(e) ? this.each(function (t) {
	        var n = v(this),
	            r = n.html();n.replaceWith(e.call(this, t, r));
	      }) : (typeof e != "string" && (e = v(e).detach()), this.each(function () {
	        var t = this.nextSibling,
	            n = this.parentNode;v(this).remove(), t ? v(t).before(e) : v(n).append(e);
	      }));
	    }, detach: function detach(e) {
	      return this.remove(e, !0);
	    }, domManip: function domManip(e, n, r) {
	      e = [].concat.apply([], e);var i,
	          s,
	          o,
	          u,
	          a = 0,
	          f = e[0],
	          l = [],
	          c = this.length;if (!v.support.checkClone && c > 1 && typeof f == "string" && St.test(f)) return this.each(function () {
	        v(this).domManip(e, n, r);
	      });if (v.isFunction(f)) return this.each(function (i) {
	        var s = v(this);e[0] = f.call(this, i, n ? s.html() : t), s.domManip(e, n, r);
	      });if (this[0]) {
	        i = v.buildFragment(e, this, l), o = i.fragment, s = o.firstChild, o.childNodes.length === 1 && (o = s);if (s) {
	          n = n && v.nodeName(s, "tr");for (u = i.cacheable || c - 1; a < c; a++) {
	            r.call(n && v.nodeName(this[a], "table") ? Lt(this[a], "tbody") : this[a], a === u ? o : v.clone(o, !0, !0));
	          }
	        }o = s = null, l.length && v.each(l, function (e, t) {
	          t.src ? v.ajax ? v.ajax({ url: t.src, type: "GET", dataType: "script", async: !1, global: !1, "throws": !0 }) : v.error("no ajax") : v.globalEval((t.text || t.textContent || t.innerHTML || "").replace(Tt, "")), t.parentNode && t.parentNode.removeChild(t);
	        });
	      }return this;
	    } }), v.buildFragment = function (e, n, r) {
	    var s,
	        o,
	        u,
	        a = e[0];return n = n || i, n = !n.nodeType && n[0] || n, n = n.ownerDocument || n, e.length === 1 && typeof a == "string" && a.length < 512 && n === i && a.charAt(0) === "<" && !bt.test(a) && (v.support.checkClone || !St.test(a)) && (v.support.html5Clone || !wt.test(a)) && (o = !0, s = v.fragments[a], u = s !== t), s || (s = n.createDocumentFragment(), v.clean(e, n, s, r), o && (v.fragments[a] = u && s)), { fragment: s, cacheable: o };
	  }, v.fragments = {}, v.each({ appendTo: "append", prependTo: "prepend", insertBefore: "before", insertAfter: "after", replaceAll: "replaceWith" }, function (e, t) {
	    v.fn[e] = function (n) {
	      var r,
	          i = 0,
	          s = [],
	          o = v(n),
	          u = o.length,
	          a = this.length === 1 && this[0].parentNode;if ((a == null || a && a.nodeType === 11 && a.childNodes.length === 1) && u === 1) return o[t](this[0]), this;for (; i < u; i++) {
	        r = (i > 0 ? this.clone(!0) : this).get(), v(o[i])[t](r), s = s.concat(r);
	      }return this.pushStack(s, e, o.selector);
	    };
	  }), v.extend({ clone: function clone(e, t, n) {
	      var r, i, s, o;v.support.html5Clone || v.isXMLDoc(e) || !wt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (kt.innerHTML = e.outerHTML, kt.removeChild(o = kt.firstChild));if ((!v.support.noCloneEvent || !v.support.noCloneChecked) && (e.nodeType === 1 || e.nodeType === 11) && !v.isXMLDoc(e)) {
	        Ot(e, o), r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
	          i[s] && Ot(r[s], i[s]);
	        }
	      }if (t) {
	        At(e, o);if (n) {
	          r = Mt(e), i = Mt(o);for (s = 0; r[s]; ++s) {
	            At(r[s], i[s]);
	          }
	        }
	      }return r = i = null, o;
	    }, clean: function clean(e, t, n, r) {
	      var s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c,
	          h,
	          p,
	          d,
	          m,
	          g,
	          y = t === i && Ct,
	          b = [];if (!t || typeof t.createDocumentFragment == "undefined") t = i;for (s = 0; (u = e[s]) != null; s++) {
	        typeof u == "number" && (u += "");if (!u) continue;if (typeof u == "string") if (!gt.test(u)) u = t.createTextNode(u);else {
	          y = y || lt(t), c = t.createElement("div"), y.appendChild(c), u = u.replace(dt, "<$1></$2>"), a = (vt.exec(u) || ["", ""])[1].toLowerCase(), f = Nt[a] || Nt._default, l = f[0], c.innerHTML = f[1] + u + f[2];while (l--) {
	            c = c.lastChild;
	          }if (!v.support.tbody) {
	            h = mt.test(u), p = a === "table" && !h ? c.firstChild && c.firstChild.childNodes : f[1] === "<table>" && !h ? c.childNodes : [];for (o = p.length - 1; o >= 0; --o) {
	              v.nodeName(p[o], "tbody") && !p[o].childNodes.length && p[o].parentNode.removeChild(p[o]);
	            }
	          }!v.support.leadingWhitespace && pt.test(u) && c.insertBefore(t.createTextNode(pt.exec(u)[0]), c.firstChild), u = c.childNodes, c.parentNode.removeChild(c);
	        }u.nodeType ? b.push(u) : v.merge(b, u);
	      }c && (u = c = y = null);if (!v.support.appendChecked) for (s = 0; (u = b[s]) != null; s++) {
	        v.nodeName(u, "input") ? _t(u) : typeof u.getElementsByTagName != "undefined" && v.grep(u.getElementsByTagName("input"), _t);
	      }if (n) {
	        m = function m(e) {
	          if (!e.type || xt.test(e.type)) return r ? r.push(e.parentNode ? e.parentNode.removeChild(e) : e) : n.appendChild(e);
	        };for (s = 0; (u = b[s]) != null; s++) {
	          if (!v.nodeName(u, "script") || !m(u)) n.appendChild(u), typeof u.getElementsByTagName != "undefined" && (g = v.grep(v.merge([], u.getElementsByTagName("script")), m), b.splice.apply(b, [s + 1, 0].concat(g)), s += g.length);
	        }
	      }return b;
	    }, cleanData: function cleanData(e, t) {
	      var n,
	          r,
	          i,
	          s,
	          o = 0,
	          u = v.expando,
	          a = v.cache,
	          f = v.support.deleteExpando,
	          l = v.event.special;for (; (i = e[o]) != null; o++) {
	        if (t || v.acceptData(i)) {
	          r = i[u], n = r && a[r];if (n) {
	            if (n.events) for (s in n.events) {
	              l[s] ? v.event.remove(i, s) : v.removeEvent(i, s, n.handle);
	            }a[r] && (delete a[r], f ? delete i[u] : i.removeAttribute ? i.removeAttribute(u) : i[u] = null, v.deletedIds.push(r));
	          }
	        }
	      }
	    } }), function () {
	    var e, t;v.uaMatch = function (e) {
	      e = e.toLowerCase();var t = /(chrome)[ \/]([\w.]+)/.exec(e) || /(webkit)[ \/]([\w.]+)/.exec(e) || /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e) || /(msie) ([\w.]+)/.exec(e) || e.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e) || [];return { browser: t[1] || "", version: t[2] || "0" };
	    }, e = v.uaMatch(o.userAgent), t = {}, e.browser && (t[e.browser] = !0, t.version = e.version), t.chrome ? t.webkit = !0 : t.webkit && (t.safari = !0), v.browser = t, v.sub = function () {
	      function e(t, n) {
	        return new e.fn.init(t, n);
	      }v.extend(!0, e, this), e.superclass = this, e.fn = e.prototype = this(), e.fn.constructor = e, e.sub = this.sub, e.fn.init = function (r, i) {
	        return i && i instanceof v && !(i instanceof e) && (i = e(i)), v.fn.init.call(this, r, i, t);
	      }, e.fn.init.prototype = e.fn;var t = e(i);return e;
	    };
	  }();var Dt,
	      Pt,
	      Ht,
	      Bt = /alpha\([^)]*\)/i,
	      jt = /opacity=([^)]*)/,
	      Ft = /^(top|right|bottom|left)$/,
	      It = /^(none|table(?!-c[ea]).+)/,
	      qt = /^margin/,
	      Rt = new RegExp("^(" + m + ")(.*)$", "i"),
	      Ut = new RegExp("^(" + m + ")(?!px)[a-z%]+$", "i"),
	      zt = new RegExp("^([-+])=(" + m + ")", "i"),
	      Wt = { BODY: "block" },
	      Xt = { position: "absolute", visibility: "hidden", display: "block" },
	      Vt = { letterSpacing: 0, fontWeight: 400 },
	      $t = ["Top", "Right", "Bottom", "Left"],
	      Jt = ["Webkit", "O", "Moz", "ms"],
	      Kt = v.fn.toggle;v.fn.extend({ css: function css(e, n) {
	      return v.access(this, function (e, n, r) {
	        return r !== t ? v.style(e, n, r) : v.css(e, n);
	      }, e, n, arguments.length > 1);
	    }, show: function show() {
	      return Yt(this, !0);
	    }, hide: function hide() {
	      return Yt(this);
	    }, toggle: function toggle(e, t) {
	      var n = typeof e == "boolean";return v.isFunction(e) && v.isFunction(t) ? Kt.apply(this, arguments) : this.each(function () {
	        (n ? e : Gt(this)) ? v(this).show() : v(this).hide();
	      });
	    } }), v.extend({ cssHooks: { opacity: { get: function get(e, t) {
	          if (t) {
	            var n = Dt(e, "opacity");return n === "" ? "1" : n;
	          }
	        } } }, cssNumber: { fillOpacity: !0, fontWeight: !0, lineHeight: !0, opacity: !0, orphans: !0, widows: !0, zIndex: !0, zoom: !0 }, cssProps: { "float": v.support.cssFloat ? "cssFloat" : "styleFloat" }, style: function style(e, n, r, i) {
	      if (!e || e.nodeType === 3 || e.nodeType === 8 || !e.style) return;var s,
	          o,
	          u,
	          a = v.camelCase(n),
	          f = e.style;n = v.cssProps[a] || (v.cssProps[a] = Qt(f, a)), u = v.cssHooks[n] || v.cssHooks[a];if (r === t) return u && "get" in u && (s = u.get(e, !1, i)) !== t ? s : f[n];o = typeof r === "undefined" ? "undefined" : (0, _typeof3.default)(r), o === "string" && (s = zt.exec(r)) && (r = (s[1] + 1) * s[2] + parseFloat(v.css(e, n)), o = "number");if (r == null || o === "number" && isNaN(r)) return;o === "number" && !v.cssNumber[a] && (r += "px");if (!u || !("set" in u) || (r = u.set(e, r, i)) !== t) try {
	        f[n] = r;
	      } catch (l) {}
	    }, css: function css(e, n, r, i) {
	      var s,
	          o,
	          u,
	          a = v.camelCase(n);return n = v.cssProps[a] || (v.cssProps[a] = Qt(e.style, a)), u = v.cssHooks[n] || v.cssHooks[a], u && "get" in u && (s = u.get(e, !0, i)), s === t && (s = Dt(e, n)), s === "normal" && n in Vt && (s = Vt[n]), r || i !== t ? (o = parseFloat(s), r || v.isNumeric(o) ? o || 0 : s) : s;
	    }, swap: function swap(e, t, n) {
	      var r,
	          i,
	          s = {};for (i in t) {
	        s[i] = e.style[i], e.style[i] = t[i];
	      }r = n.call(e);for (i in t) {
	        e.style[i] = s[i];
	      }return r;
	    } }), e.getComputedStyle ? Dt = function Dt(t, n) {
	    var r,
	        i,
	        s,
	        o,
	        u = e.getComputedStyle(t, null),
	        a = t.style;return u && (r = u.getPropertyValue(n) || u[n], r === "" && !v.contains(t.ownerDocument, t) && (r = v.style(t, n)), Ut.test(r) && qt.test(n) && (i = a.width, s = a.minWidth, o = a.maxWidth, a.minWidth = a.maxWidth = a.width = r, r = u.width, a.width = i, a.minWidth = s, a.maxWidth = o)), r;
	  } : i.documentElement.currentStyle && (Dt = function Dt(e, t) {
	    var n,
	        r,
	        i = e.currentStyle && e.currentStyle[t],
	        s = e.style;return i == null && s && s[t] && (i = s[t]), Ut.test(i) && !Ft.test(t) && (n = s.left, r = e.runtimeStyle && e.runtimeStyle.left, r && (e.runtimeStyle.left = e.currentStyle.left), s.left = t === "fontSize" ? "1em" : i, i = s.pixelLeft + "px", s.left = n, r && (e.runtimeStyle.left = r)), i === "" ? "auto" : i;
	  }), v.each(["height", "width"], function (e, t) {
	    v.cssHooks[t] = { get: function get(e, n, r) {
	        if (n) return e.offsetWidth === 0 && It.test(Dt(e, "display")) ? v.swap(e, Xt, function () {
	          return tn(e, t, r);
	        }) : tn(e, t, r);
	      }, set: function set(e, n, r) {
	        return Zt(e, n, r ? en(e, t, r, v.support.boxSizing && v.css(e, "boxSizing") === "border-box") : 0);
	      } };
	  }), v.support.opacity || (v.cssHooks.opacity = { get: function get(e, t) {
	      return jt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : "";
	    }, set: function set(e, t) {
	      var n = e.style,
	          r = e.currentStyle,
	          i = v.isNumeric(t) ? "alpha(opacity=" + t * 100 + ")" : "",
	          s = r && r.filter || n.filter || "";n.zoom = 1;if (t >= 1 && v.trim(s.replace(Bt, "")) === "" && n.removeAttribute) {
	        n.removeAttribute("filter");if (r && !r.filter) return;
	      }n.filter = Bt.test(s) ? s.replace(Bt, i) : s + " " + i;
	    } }), v(function () {
	    v.support.reliableMarginRight || (v.cssHooks.marginRight = { get: function get(e, t) {
	        return v.swap(e, { display: "inline-block" }, function () {
	          if (t) return Dt(e, "marginRight");
	        });
	      } }), !v.support.pixelPosition && v.fn.position && v.each(["top", "left"], function (e, t) {
	      v.cssHooks[t] = { get: function get(e, n) {
	          if (n) {
	            var r = Dt(e, t);return Ut.test(r) ? v(e).position()[t] + "px" : r;
	          }
	        } };
	    });
	  }), v.expr && v.expr.filters && (v.expr.filters.hidden = function (e) {
	    return e.offsetWidth === 0 && e.offsetHeight === 0 || !v.support.reliableHiddenOffsets && (e.style && e.style.display || Dt(e, "display")) === "none";
	  }, v.expr.filters.visible = function (e) {
	    return !v.expr.filters.hidden(e);
	  }), v.each({ margin: "", padding: "", border: "Width" }, function (e, t) {
	    v.cssHooks[e + t] = { expand: function expand(n) {
	        var r,
	            i = typeof n == "string" ? n.split(" ") : [n],
	            s = {};for (r = 0; r < 4; r++) {
	          s[e + $t[r] + t] = i[r] || i[r - 2] || i[0];
	        }return s;
	      } }, qt.test(e) || (v.cssHooks[e + t].set = Zt);
	  });var rn = /%20/g,
	      sn = /\[\]$/,
	      on = /\r?\n/g,
	      un = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i,
	      an = /^(?:select|textarea)/i;v.fn.extend({ serialize: function serialize() {
	      return v.param(this.serializeArray());
	    }, serializeArray: function serializeArray() {
	      return this.map(function () {
	        return this.elements ? v.makeArray(this.elements) : this;
	      }).filter(function () {
	        return this.name && !this.disabled && (this.checked || an.test(this.nodeName) || un.test(this.type));
	      }).map(function (e, t) {
	        var n = v(this).val();return n == null ? null : v.isArray(n) ? v.map(n, function (e, n) {
	          return { name: t.name, value: e.replace(on, "\r\n") };
	        }) : { name: t.name, value: n.replace(on, "\r\n") };
	      }).get();
	    } }), v.param = function (e, n) {
	    var r,
	        i = [],
	        s = function s(e, t) {
	      t = v.isFunction(t) ? t() : t == null ? "" : t, i[i.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t);
	    };n === t && (n = v.ajaxSettings && v.ajaxSettings.traditional);if (v.isArray(e) || e.jquery && !v.isPlainObject(e)) v.each(e, function () {
	      s(this.name, this.value);
	    });else for (r in e) {
	      fn(r, e[r], n, s);
	    }return i.join("&").replace(rn, "+");
	  };var ln,
	      cn,
	      hn = /#.*$/,
	      pn = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg,
	      dn = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/,
	      vn = /^(?:GET|HEAD)$/,
	      mn = /^\/\//,
	      gn = /\?/,
	      yn = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
	      bn = /([?&])_=[^&]*/,
	      wn = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+)|)|)/,
	      En = v.fn.load,
	      Sn = {},
	      xn = {},
	      Tn = ["*/"] + ["*"];try {
	    cn = s.href;
	  } catch (Nn) {
	    cn = i.createElement("a"), cn.href = "", cn = cn.href;
	  }ln = wn.exec(cn.toLowerCase()) || [], v.fn.load = function (e, n, r) {
	    if (typeof e != "string" && En) return En.apply(this, arguments);if (!this.length) return this;var i,
	        s,
	        o,
	        u = this,
	        a = e.indexOf(" ");return a >= 0 && (i = e.slice(a, e.length), e = e.slice(0, a)), v.isFunction(n) ? (r = n, n = t) : n && (typeof n === "undefined" ? "undefined" : (0, _typeof3.default)(n)) == "object" && (s = "POST"), v.ajax({ url: e, type: s, dataType: "html", data: n, complete: function complete(e, t) {
	        r && u.each(r, o || [e.responseText, t, e]);
	      } }).done(function (e) {
	      o = arguments, u.html(i ? v("<div>").append(e.replace(yn, "")).find(i) : e);
	    }), this;
	  }, v.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function (e, t) {
	    v.fn[t] = function (e) {
	      return this.on(t, e);
	    };
	  }), v.each(["get", "post"], function (e, n) {
	    v[n] = function (e, r, i, s) {
	      return v.isFunction(r) && (s = s || i, i = r, r = t), v.ajax({ type: n, url: e, data: r, success: i, dataType: s });
	    };
	  }), v.extend({ getScript: function getScript(e, n) {
	      return v.get(e, t, n, "script");
	    }, getJSON: function getJSON(e, t, n) {
	      return v.get(e, t, n, "json");
	    }, ajaxSetup: function ajaxSetup(e, t) {
	      return t ? Ln(e, v.ajaxSettings) : (t = e, e = v.ajaxSettings), Ln(e, t), e;
	    }, ajaxSettings: { url: cn, isLocal: dn.test(ln[1]), global: !0, type: "GET", contentType: "application/x-www-form-urlencoded; charset=UTF-8", processData: !0, async: !0, accepts: { xml: "application/xml, text/xml", html: "text/html", text: "text/plain", json: "application/json, text/javascript", "*": Tn }, contents: { xml: /xml/, html: /html/, json: /json/ }, responseFields: { xml: "responseXML", text: "responseText" }, converters: { "* text": e.String, "text html": !0, "text json": v.parseJSON, "text xml": v.parseXML }, flatOptions: { context: !0, url: !0 } }, ajaxPrefilter: Cn(Sn), ajaxTransport: Cn(xn), ajax: function ajax(e, n) {
	      function T(e, n, s, a) {
	        var l,
	            y,
	            b,
	            w,
	            S,
	            T = n;if (E === 2) return;E = 2, u && clearTimeout(u), o = t, i = a || "", x.readyState = e > 0 ? 4 : 0, s && (w = An(c, x, s));if (e >= 200 && e < 300 || e === 304) c.ifModified && (S = x.getResponseHeader("Last-Modified"), S && (v.lastModified[r] = S), S = x.getResponseHeader("Etag"), S && (v.etag[r] = S)), e === 304 ? (T = "notmodified", l = !0) : (l = On(c, w), T = l.state, y = l.data, b = l.error, l = !b);else {
	          b = T;if (!T || e) T = "error", e < 0 && (e = 0);
	        }x.status = e, x.statusText = (n || T) + "", l ? d.resolveWith(h, [y, T, x]) : d.rejectWith(h, [x, T, b]), x.statusCode(g), g = t, f && p.trigger("ajax" + (l ? "Success" : "Error"), [x, c, l ? y : b]), m.fireWith(h, [x, T]), f && (p.trigger("ajaxComplete", [x, c]), --v.active || v.event.trigger("ajaxStop"));
	      }(typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) == "object" && (n = e, e = t), n = n || {};var r,
	          i,
	          s,
	          o,
	          u,
	          a,
	          f,
	          l,
	          c = v.ajaxSetup({}, n),
	          h = c.context || c,
	          p = h !== c && (h.nodeType || h instanceof v) ? v(h) : v.event,
	          d = v.Deferred(),
	          m = v.Callbacks("once memory"),
	          g = c.statusCode || {},
	          b = {},
	          w = {},
	          E = 0,
	          S = "canceled",
	          x = { readyState: 0, setRequestHeader: function setRequestHeader(e, t) {
	          if (!E) {
	            var n = e.toLowerCase();e = w[n] = w[n] || e, b[e] = t;
	          }return this;
	        }, getAllResponseHeaders: function getAllResponseHeaders() {
	          return E === 2 ? i : null;
	        }, getResponseHeader: function getResponseHeader(e) {
	          var n;if (E === 2) {
	            if (!s) {
	              s = {};while (n = pn.exec(i)) {
	                s[n[1].toLowerCase()] = n[2];
	              }
	            }n = s[e.toLowerCase()];
	          }return n === t ? null : n;
	        }, overrideMimeType: function overrideMimeType(e) {
	          return E || (c.mimeType = e), this;
	        }, abort: function abort(e) {
	          return e = e || S, o && o.abort(e), T(0, e), this;
	        } };d.promise(x), x.success = x.done, x.error = x.fail, x.complete = m.add, x.statusCode = function (e) {
	        if (e) {
	          var t;if (E < 2) for (t in e) {
	            g[t] = [g[t], e[t]];
	          } else t = e[x.status], x.always(t);
	        }return this;
	      }, c.url = ((e || c.url) + "").replace(hn, "").replace(mn, ln[1] + "//"), c.dataTypes = v.trim(c.dataType || "*").toLowerCase().split(y), c.crossDomain == null && (a = wn.exec(c.url.toLowerCase()), c.crossDomain = !(!a || a[1] === ln[1] && a[2] === ln[2] && (a[3] || (a[1] === "http:" ? 80 : 443)) == (ln[3] || (ln[1] === "http:" ? 80 : 443)))), c.data && c.processData && typeof c.data != "string" && (c.data = v.param(c.data, c.traditional)), kn(Sn, c, n, x);if (E === 2) return x;f = c.global, c.type = c.type.toUpperCase(), c.hasContent = !vn.test(c.type), f && v.active++ === 0 && v.event.trigger("ajaxStart");if (!c.hasContent) {
	        c.data && (c.url += (gn.test(c.url) ? "&" : "?") + c.data, delete c.data), r = c.url;if (c.cache === !1) {
	          var N = v.now(),
	              C = c.url.replace(bn, "$1_=" + N);c.url = C + (C === c.url ? (gn.test(c.url) ? "&" : "?") + "_=" + N : "");
	        }
	      }(c.data && c.hasContent && c.contentType !== !1 || n.contentType) && x.setRequestHeader("Content-Type", c.contentType), c.ifModified && (r = r || c.url, v.lastModified[r] && x.setRequestHeader("If-Modified-Since", v.lastModified[r]), v.etag[r] && x.setRequestHeader("If-None-Match", v.etag[r])), x.setRequestHeader("Accept", c.dataTypes[0] && c.accepts[c.dataTypes[0]] ? c.accepts[c.dataTypes[0]] + (c.dataTypes[0] !== "*" ? ", " + Tn + "; q=0.01" : "") : c.accepts["*"]);for (l in c.headers) {
	        x.setRequestHeader(l, c.headers[l]);
	      }if (!c.beforeSend || c.beforeSend.call(h, x, c) !== !1 && E !== 2) {
	        S = "abort";for (l in { success: 1, error: 1, complete: 1 }) {
	          x[l](c[l]);
	        }o = kn(xn, c, n, x);if (!o) T(-1, "No Transport");else {
	          x.readyState = 1, f && p.trigger("ajaxSend", [x, c]), c.async && c.timeout > 0 && (u = setTimeout(function () {
	            x.abort("timeout");
	          }, c.timeout));try {
	            E = 1, o.send(b, T);
	          } catch (k) {
	            if (!(E < 2)) throw k;T(-1, k);
	          }
	        }return x;
	      }return x.abort();
	    }, active: 0, lastModified: {}, etag: {} });var Mn = [],
	      _n = /\?/,
	      Dn = /(=)\?(?=&|$)|\?\?/,
	      Pn = v.now();v.ajaxSetup({ jsonp: "callback", jsonpCallback: function jsonpCallback() {
	      var e = Mn.pop() || v.expando + "_" + Pn++;return this[e] = !0, e;
	    } }), v.ajaxPrefilter("json jsonp", function (n, r, i) {
	    var s,
	        o,
	        u,
	        a = n.data,
	        f = n.url,
	        l = n.jsonp !== !1,
	        c = l && Dn.test(f),
	        h = l && !c && typeof a == "string" && !(n.contentType || "").indexOf("application/x-www-form-urlencoded") && Dn.test(a);if (n.dataTypes[0] === "jsonp" || c || h) return s = n.jsonpCallback = v.isFunction(n.jsonpCallback) ? n.jsonpCallback() : n.jsonpCallback, o = e[s], c ? n.url = f.replace(Dn, "$1" + s) : h ? n.data = a.replace(Dn, "$1" + s) : l && (n.url += (_n.test(f) ? "&" : "?") + n.jsonp + "=" + s), n.converters["script json"] = function () {
	      return u || v.error(s + " was not called"), u[0];
	    }, n.dataTypes[0] = "json", e[s] = function () {
	      u = arguments;
	    }, i.always(function () {
	      e[s] = o, n[s] && (n.jsonpCallback = r.jsonpCallback, Mn.push(s)), u && v.isFunction(o) && o(u[0]), u = o = t;
	    }), "script";
	  }), v.ajaxSetup({ accepts: { script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript" }, contents: { script: /javascript|ecmascript/ }, converters: { "text script": function textScript(e) {
	        return v.globalEval(e), e;
	      } } }), v.ajaxPrefilter("script", function (e) {
	    e.cache === t && (e.cache = !1), e.crossDomain && (e.type = "GET", e.global = !1);
	  }), v.ajaxTransport("script", function (e) {
	    if (e.crossDomain) {
	      var n,
	          r = i.head || i.getElementsByTagName("head")[0] || i.documentElement;return { send: function send(s, o) {
	          n = i.createElement("script"), n.async = "async", e.scriptCharset && (n.charset = e.scriptCharset), n.src = e.url, n.onload = n.onreadystatechange = function (e, i) {
	            if (i || !n.readyState || /loaded|complete/.test(n.readyState)) n.onload = n.onreadystatechange = null, r && n.parentNode && r.removeChild(n), n = t, i || o(200, "success");
	          }, r.insertBefore(n, r.firstChild);
	        }, abort: function abort() {
	          n && n.onload(0, 1);
	        } };
	    }
	  });var Hn,
	      Bn = e.ActiveXObject ? function () {
	    for (var e in Hn) {
	      Hn[e](0, 1);
	    }
	  } : !1,
	      jn = 0;v.ajaxSettings.xhr = e.ActiveXObject ? function () {
	    return !this.isLocal && Fn() || In();
	  } : Fn, function (e) {
	    v.extend(v.support, { ajax: !!e, cors: !!e && "withCredentials" in e });
	  }(v.ajaxSettings.xhr()), v.support.ajax && v.ajaxTransport(function (n) {
	    if (!n.crossDomain || v.support.cors) {
	      var _r;return { send: function send(i, s) {
	          var o,
	              u,
	              a = n.xhr();n.username ? a.open(n.type, n.url, n.async, n.username, n.password) : a.open(n.type, n.url, n.async);if (n.xhrFields) for (u in n.xhrFields) {
	            a[u] = n.xhrFields[u];
	          }n.mimeType && a.overrideMimeType && a.overrideMimeType(n.mimeType), !n.crossDomain && !i["X-Requested-With"] && (i["X-Requested-With"] = "XMLHttpRequest");try {
	            for (u in i) {
	              a.setRequestHeader(u, i[u]);
	            }
	          } catch (f) {}a.send(n.hasContent && n.data || null), _r = function r(e, i) {
	            var u, f, l, c, h;try {
	              if (_r && (i || a.readyState === 4)) {
	                _r = t, o && (a.onreadystatechange = v.noop, Bn && delete Hn[o]);if (i) a.readyState !== 4 && a.abort();else {
	                  u = a.status, l = a.getAllResponseHeaders(), c = {}, h = a.responseXML, h && h.documentElement && (c.xml = h);try {
	                    c.text = a.responseText;
	                  } catch (p) {}try {
	                    f = a.statusText;
	                  } catch (p) {
	                    f = "";
	                  }!u && n.isLocal && !n.crossDomain ? u = c.text ? 200 : 404 : u === 1223 && (u = 204);
	                }
	              }
	            } catch (d) {
	              i || s(-1, d);
	            }c && s(u, f, c, l);
	          }, n.async ? a.readyState === 4 ? setTimeout(_r, 0) : (o = ++jn, Bn && (Hn || (Hn = {}, v(e).unload(Bn)), Hn[o] = _r), a.onreadystatechange = _r) : _r();
	        }, abort: function abort() {
	          _r && _r(0, 1);
	        } };
	    }
	  });var qn,
	      Rn,
	      Un = /^(?:toggle|show|hide)$/,
	      zn = new RegExp("^(?:([-+])=|)(" + m + ")([a-z%]*)$", "i"),
	      Wn = /queueHooks$/,
	      Xn = [Gn],
	      Vn = { "*": [function (e, t) {
	      var n,
	          r,
	          i = this.createTween(e, t),
	          s = zn.exec(t),
	          o = i.cur(),
	          u = +o || 0,
	          a = 1,
	          f = 20;if (s) {
	        n = +s[2], r = s[3] || (v.cssNumber[e] ? "" : "px");if (r !== "px" && u) {
	          u = v.css(i.elem, e, !0) || n || 1;do {
	            a = a || ".5", u /= a, v.style(i.elem, e, u + r);
	          } while (a !== (a = i.cur() / o) && a !== 1 && --f);
	        }i.unit = r, i.start = u, i.end = s[1] ? u + (s[1] + 1) * n : n;
	      }return i;
	    }] };v.Animation = v.extend(Kn, { tweener: function tweener(e, t) {
	      v.isFunction(e) ? (t = e, e = ["*"]) : e = e.split(" ");var n,
	          r = 0,
	          i = e.length;for (; r < i; r++) {
	        n = e[r], Vn[n] = Vn[n] || [], Vn[n].unshift(t);
	      }
	    }, prefilter: function prefilter(e, t) {
	      t ? Xn.unshift(e) : Xn.push(e);
	    } }), v.Tween = Yn, Yn.prototype = { constructor: Yn, init: function init(e, t, n, r, i, s) {
	      this.elem = e, this.prop = n, this.easing = i || "swing", this.options = t, this.start = this.now = this.cur(), this.end = r, this.unit = s || (v.cssNumber[n] ? "" : "px");
	    }, cur: function cur() {
	      var e = Yn.propHooks[this.prop];return e && e.get ? e.get(this) : Yn.propHooks._default.get(this);
	    }, run: function run(e) {
	      var t,
	          n = Yn.propHooks[this.prop];return this.options.duration ? this.pos = t = v.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e, this.now = (this.end - this.start) * t + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), n && n.set ? n.set(this) : Yn.propHooks._default.set(this), this;
	    } }, Yn.prototype.init.prototype = Yn.prototype, Yn.propHooks = { _default: { get: function get(e) {
	        var t;return e.elem[e.prop] == null || !!e.elem.style && e.elem.style[e.prop] != null ? (t = v.css(e.elem, e.prop, !1, ""), !t || t === "auto" ? 0 : t) : e.elem[e.prop];
	      }, set: function set(e) {
	        v.fx.step[e.prop] ? v.fx.step[e.prop](e) : e.elem.style && (e.elem.style[v.cssProps[e.prop]] != null || v.cssHooks[e.prop]) ? v.style(e.elem, e.prop, e.now + e.unit) : e.elem[e.prop] = e.now;
	      } } }, Yn.propHooks.scrollTop = Yn.propHooks.scrollLeft = { set: function set(e) {
	      e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now);
	    } }, v.each(["toggle", "show", "hide"], function (e, t) {
	    var n = v.fn[t];v.fn[t] = function (r, i, s) {
	      return r == null || typeof r == "boolean" || !e && v.isFunction(r) && v.isFunction(i) ? n.apply(this, arguments) : this.animate(Zn(t, !0), r, i, s);
	    };
	  }), v.fn.extend({ fadeTo: function fadeTo(e, t, n, r) {
	      return this.filter(Gt).css("opacity", 0).show().end().animate({ opacity: t }, e, n, r);
	    }, animate: function animate(e, t, n, r) {
	      var i = v.isEmptyObject(e),
	          s = v.speed(t, n, r),
	          o = function o() {
	        var t = Kn(this, v.extend({}, e), s);i && t.stop(!0);
	      };return i || s.queue === !1 ? this.each(o) : this.queue(s.queue, o);
	    }, stop: function stop(e, n, r) {
	      var i = function i(e) {
	        var t = e.stop;delete e.stop, t(r);
	      };return typeof e != "string" && (r = n, n = e, e = t), n && e !== !1 && this.queue(e || "fx", []), this.each(function () {
	        var t = !0,
	            n = e != null && e + "queueHooks",
	            s = v.timers,
	            o = v._data(this);if (n) o[n] && o[n].stop && i(o[n]);else for (n in o) {
	          o[n] && o[n].stop && Wn.test(n) && i(o[n]);
	        }for (n = s.length; n--;) {
	          s[n].elem === this && (e == null || s[n].queue === e) && (s[n].anim.stop(r), t = !1, s.splice(n, 1));
	        }(t || !r) && v.dequeue(this, e);
	      });
	    } }), v.each({ slideDown: Zn("show"), slideUp: Zn("hide"), slideToggle: Zn("toggle"), fadeIn: { opacity: "show" }, fadeOut: { opacity: "hide" }, fadeToggle: { opacity: "toggle" } }, function (e, t) {
	    v.fn[e] = function (e, n, r) {
	      return this.animate(t, e, n, r);
	    };
	  }), v.speed = function (e, t, n) {
	    var r = e && (typeof e === "undefined" ? "undefined" : (0, _typeof3.default)(e)) == "object" ? v.extend({}, e) : { complete: n || !n && t || v.isFunction(e) && e, duration: e, easing: n && t || t && !v.isFunction(t) && t };r.duration = v.fx.off ? 0 : typeof r.duration == "number" ? r.duration : r.duration in v.fx.speeds ? v.fx.speeds[r.duration] : v.fx.speeds._default;if (r.queue == null || r.queue === !0) r.queue = "fx";return r.old = r.complete, r.complete = function () {
	      v.isFunction(r.old) && r.old.call(this), r.queue && v.dequeue(this, r.queue);
	    }, r;
	  }, v.easing = { linear: function linear(e) {
	      return e;
	    }, swing: function swing(e) {
	      return .5 - Math.cos(e * Math.PI) / 2;
	    } }, v.timers = [], v.fx = Yn.prototype.init, v.fx.tick = function () {
	    var e,
	        n = v.timers,
	        r = 0;qn = v.now();for (; r < n.length; r++) {
	      e = n[r], !e() && n[r] === e && n.splice(r--, 1);
	    }n.length || v.fx.stop(), qn = t;
	  }, v.fx.timer = function (e) {
	    e() && v.timers.push(e) && !Rn && (Rn = setInterval(v.fx.tick, v.fx.interval));
	  }, v.fx.interval = 13, v.fx.stop = function () {
	    clearInterval(Rn), Rn = null;
	  }, v.fx.speeds = { slow: 600, fast: 200, _default: 400 }, v.fx.step = {}, v.expr && v.expr.filters && (v.expr.filters.animated = function (e) {
	    return v.grep(v.timers, function (t) {
	      return e === t.elem;
	    }).length;
	  });var er = /^(?:body|html)$/i;v.fn.offset = function (e) {
	    if (arguments.length) return e === t ? this : this.each(function (t) {
	      v.offset.setOffset(this, e, t);
	    });var n,
	        r,
	        i,
	        s,
	        o,
	        u,
	        a,
	        f = { top: 0, left: 0 },
	        l = this[0],
	        c = l && l.ownerDocument;if (!c) return;return (r = c.body) === l ? v.offset.bodyOffset(l) : (n = c.documentElement, v.contains(n, l) ? (typeof l.getBoundingClientRect != "undefined" && (f = l.getBoundingClientRect()), i = tr(c), s = n.clientTop || r.clientTop || 0, o = n.clientLeft || r.clientLeft || 0, u = i.pageYOffset || n.scrollTop, a = i.pageXOffset || n.scrollLeft, { top: f.top + u - s, left: f.left + a - o }) : f);
	  }, v.offset = { bodyOffset: function bodyOffset(e) {
	      var t = e.offsetTop,
	          n = e.offsetLeft;return v.support.doesNotIncludeMarginInBodyOffset && (t += parseFloat(v.css(e, "marginTop")) || 0, n += parseFloat(v.css(e, "marginLeft")) || 0), { top: t, left: n };
	    }, setOffset: function setOffset(e, t, n) {
	      var r = v.css(e, "position");r === "static" && (e.style.position = "relative");var i = v(e),
	          s = i.offset(),
	          o = v.css(e, "top"),
	          u = v.css(e, "left"),
	          a = (r === "absolute" || r === "fixed") && v.inArray("auto", [o, u]) > -1,
	          f = {},
	          l = {},
	          c,
	          h;a ? (l = i.position(), c = l.top, h = l.left) : (c = parseFloat(o) || 0, h = parseFloat(u) || 0), v.isFunction(t) && (t = t.call(e, n, s)), t.top != null && (f.top = t.top - s.top + c), t.left != null && (f.left = t.left - s.left + h), "using" in t ? t.using.call(e, f) : i.css(f);
	    } }, v.fn.extend({ position: function position() {
	      if (!this[0]) return;var e = this[0],
	          t = this.offsetParent(),
	          n = this.offset(),
	          r = er.test(t[0].nodeName) ? { top: 0, left: 0 } : t.offset();return n.top -= parseFloat(v.css(e, "marginTop")) || 0, n.left -= parseFloat(v.css(e, "marginLeft")) || 0, r.top += parseFloat(v.css(t[0], "borderTopWidth")) || 0, r.left += parseFloat(v.css(t[0], "borderLeftWidth")) || 0, { top: n.top - r.top, left: n.left - r.left };
	    }, offsetParent: function offsetParent() {
	      return this.map(function () {
	        var e = this.offsetParent || i.body;while (e && !er.test(e.nodeName) && v.css(e, "position") === "static") {
	          e = e.offsetParent;
	        }return e || i.body;
	      });
	    } }), v.each({ scrollLeft: "pageXOffset", scrollTop: "pageYOffset" }, function (e, n) {
	    var r = /Y/.test(n);v.fn[e] = function (i) {
	      return v.access(this, function (e, i, s) {
	        var o = tr(e);if (s === t) return o ? n in o ? o[n] : o.document.documentElement[i] : e[i];o ? o.scrollTo(r ? v(o).scrollLeft() : s, r ? s : v(o).scrollTop()) : e[i] = s;
	      }, e, i, arguments.length, null);
	    };
	  }), v.each({ Height: "height", Width: "width" }, function (e, n) {
	    v.each({ padding: "inner" + e, content: n, "": "outer" + e }, function (r, i) {
	      v.fn[i] = function (i, s) {
	        var o = arguments.length && (r || typeof i != "boolean"),
	            u = r || (i === !0 || s === !0 ? "margin" : "border");return v.access(this, function (n, r, i) {
	          var s;return v.isWindow(n) ? n.document.documentElement["client" + e] : n.nodeType === 9 ? (s = n.documentElement, Math.max(n.body["scroll" + e], s["scroll" + e], n.body["offset" + e], s["offset" + e], s["client" + e])) : i === t ? v.css(n, r, i, u) : v.style(n, r, i, u);
	        }, n, o ? i : t, o, null);
	      };
	    });
	  }), e.jQuery = e.$ = v, "function" == "function" && __webpack_require__(445) && __webpack_require__(445).ajQuery && !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	    return v;
	  }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	})(window);

/***/ }),

/***/ 445:
/***/ (function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {module.exports = __webpack_amd_options__;

	/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })

/******/ });