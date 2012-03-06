// ==UserScript==
// @name allretweets
// @version 0.1.0
// @description Load Retweets in Twitter lists, see https://dev.twitter.com/docs/api/1/get/lists/statuses
// @match http://twitter.com/*
// @match https://twitter.com/*
// @include http://twitter.com/*
// @include https://twitter.com/*
// ==/UserScript==

var s = document.createElement('script');

s.innerHTML = '\
(function () {\
	\
	var DEBUG = false;\
	\
	var interval = setInterval(function () {\
	\
		DEBUG && console.log("AllRTs: Try");\
		if (!window.$) return;\
		\
		\
		DEBUG && console.log("AllRTs: Loaded", interval);\
		clearInterval(interval);\
		var _f = $.ajax;\
		$.ajax = function () {\
			\
			var o = arguments[0];\
			if (o.url && o.url.indexOf("/1/lists/statuses.json") === 0 && o.data) {\
			\
				o.data.include_rts = 1;\
			}\
			DEBUG && console.log("$.ajax", arguments);\
			_f.apply(null, arguments);\
		};\
	}, 50);\
})();\
'

document.body.appendChild(s);