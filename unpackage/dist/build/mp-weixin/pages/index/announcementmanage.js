(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/announcementmanage"],{"036d":function(e,n,t){"use strict";var a=function(){var e=this,n=e.$createElement,t=(e._self._c,e.__map(e.announcements,function(n,t){var a=e.getUpdatedDate(n.updatedAt);return{$orig:e.__get_orig(n),m0:a}}));e.$mp.data=Object.assign({},{$root:{l0:t}})},o=[];t.d(n,"a",function(){return a}),t.d(n,"b",function(){return o})},"136f":function(e,n,t){"use strict";t.r(n);var a=t("6493"),o=t.n(a);for(var c in a)"default"!==c&&function(e){t.d(n,e,function(){return a[e]})}(c);n["default"]=o.a},"1f00":function(e,n,t){"use strict";t.r(n);var a=t("036d"),o=t("136f");for(var c in o)"default"!==c&&function(e){t.d(n,e,function(){return o[e]})}(c);t("3992");var u=t("2877"),i=Object(u["a"])(o["default"],a["a"],a["b"],!1,null,null,null);n["default"]=i.exports},3338:function(e,n,t){"use strict";(function(e){t("9aac"),t("921b");a(t("66fd"));var n=a(t("1f00"));function a(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},3992:function(e,n,t){"use strict";var a=t("ef93"),o=t.n(a);o.a},6493:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var t={data:function(){return{title:"公告管理",announcements:[]}},onLoad:function(){var n=e.getStorageSync("classname");e.setNavigationBarTitle({title:n}),this.getData()},methods:{getData:function(){var n=this,t=e.getStorageSync("classid");e.request({url:"https://api2.bmob.cn/1/classes/announcement?order=-updatedDate&limit=50",data:{where:{classid:t}},header:{"X-Bmob-Application-Id":"3bea17a55823d07e2487d6db68a04ba0","X-Bmob-REST-API-Key":"c8069787cb4ff2c10d99dae927667233","Content-Type":"application/json"},success:function(e){console.log(e.data.results),n.announcements=e.data.results}})},goIndex:function(){e.redirectTo({url:"/pages/index/index"})},addAnnouncement:function(){e.redirectTo({url:"/pages/index/announcementedit"})},editAnnouncement:function(n){e.redirectTo({url:"/pages/index/announcementedit?objectId="+n})},deleteAnnouncement:function(n){var t=this;e.request({url:"https://api2.bmob.cn/1/classes/announcement/"+n,method:"DELETE",data:{},header:{"X-Bmob-Application-Id":"3bea17a55823d07e2487d6db68a04ba0","X-Bmob-REST-API-Key":"c8069787cb4ff2c10d99dae927667233","Content-Type":"application/json"},success:function(e){console.log(e.data.results),t.getData()}})},getUpdatedDate:function(e){return e?e.substring(0,10):""}}};n.default=t}).call(this,t("543d")["default"])},ef93:function(e,n,t){}},[["3338","common/runtime","common/vendor"]]]);