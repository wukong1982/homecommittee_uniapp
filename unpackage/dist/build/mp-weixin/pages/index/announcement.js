(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/announcement"],{"61fb":function(t,n,e){"use strict";var a=e("6431"),u=e.n(a);u.a},6431:function(t,n,e){},"71af":function(t,n,e){"use strict";e.r(n);var a=e("951d"),u=e("7607");for(var o in u)"default"!==o&&function(t){e.d(n,t,function(){return u[t]})}(o);e("61fb");var r=e("2877"),c=Object(r["a"])(u["default"],a["a"],a["b"],!1,null,null,null);n["default"]=c.exports},7607:function(t,n,e){"use strict";e.r(n);var a=e("a7b3"),u=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);n["default"]=u.a},"83ba":function(t,n,e){"use strict";(function(t){e("9aac"),e("921b");a(e("66fd"));var n=a(e("71af"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},"951d":function(t,n,e){"use strict";var a=function(){var t=this,n=t.$createElement,e=(t._self._c,t.__map(t.announcements,function(n,e){var a=t.getUpdatedDate(n.updatedAt);return{$orig:t.__get_orig(n),m0:a}}));t.$mp.data=Object.assign({},{$root:{l0:e}})},u=[];e.d(n,"a",function(){return a}),e.d(n,"b",function(){return u})},a7b3:function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={data:function(){return{title:"公告",announcements:[]}},onLoad:function(){var n=this,e=t.getStorageSync("classname");t.setNavigationBarTitle({title:e});var a=t.getStorageSync("classid");t.request({url:"https://api2.bmob.cn/1/classes/announcement?order=-updatedAt&limit=50",data:{where:{classid:a}},header:{"X-Bmob-Application-Id":"3bea17a55823d07e2487d6db68a04ba0","X-Bmob-REST-API-Key":"c8069787cb4ff2c10d99dae927667233","Content-Type":"application/json"},success:function(t){console.log(t.data.results),n.announcements=t.data.results}})},methods:{goIndex:function(){t.redirectTo({url:"/pages/index/index"})},getUpdatedDate:function(t){return t?t.substring(0,10):""}}};n.default=e}).call(this,e("543d")["default"])}},[["83ba","common/runtime","common/vendor"]]]);