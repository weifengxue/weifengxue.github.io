(function(t){function e(e){for(var n,i,o=e[0],r=e[1],l=e[2],u=0,d=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&d.push(s[i][0]),s[i]=0;for(n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n]);p&&p(e);while(d.length)d.shift()();return a.push.apply(a,l||[]),c()}function c(){for(var t,e=0;e<a.length;e++){for(var c=a[e],n=!0,i=1;i<c.length;i++){var r=c[i];0!==s[r]&&(n=!1)}n&&(a.splice(e--,1),t=o(o.s=c[0]))}return t}var n={},s={app:0},a=[];function i(t){return o.p+"js/"+({about:"about"}[t]||t)+"."+{about:"44010f04"}[t]+".js"}function o(e){if(n[e])return n[e].exports;var c=n[e]={i:e,l:!1,exports:{}};return t[e].call(c.exports,c,c.exports,o),c.l=!0,c.exports}o.e=function(t){var e=[],c=s[t];if(0!==c)if(c)e.push(c[2]);else{var n=new Promise((function(e,n){c=s[t]=[e,n]}));e.push(c[2]=n);var a,r=document.createElement("script");r.charset="utf-8",r.timeout=120,o.nc&&r.setAttribute("nonce",o.nc),r.src=i(t);var l=new Error;a=function(e){r.onerror=r.onload=null,clearTimeout(u);var c=s[t];if(0!==c){if(c){var n=e&&("load"===e.type?"missing":e.type),a=e&&e.target&&e.target.src;l.message="Loading chunk "+t+" failed.\n("+n+": "+a+")",l.name="ChunkLoadError",l.type=n,l.request=a,c[1](l)}s[t]=void 0}};var u=setTimeout((function(){a({type:"timeout",target:r})}),12e4);r.onerror=r.onload=a,document.head.appendChild(r)}return Promise.all(e)},o.m=t,o.c=n,o.d=function(t,e,c){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:c})},o.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var c=Object.create(null);if(o.r(c),Object.defineProperty(c,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)o.d(c,n,function(e){return t[e]}.bind(null,n));return c},o.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o.oe=function(t){throw console.error(t),t};var r=window["webpackJsonp"]=window["webpackJsonp"]||[],l=r.push.bind(r);r.push=e,r=r.slice();for(var u=0;u<r.length;u++)e(r[u]);var p=l;a.push([0,"chunk-vendors"]),c()})({0:function(t,e,c){t.exports=c("56d7")},"0614":function(t,e,c){},"12f4":function(t,e,c){"use strict";c("63de")},"1de5":function(t,e,c){},"1e8f":function(t,e,c){},2461:function(t,e,c){},"27fb":function(t,e,c){},"2eac":function(t,e,c){"use strict";c("4f44")},"447d":function(t,e,c){},"4afa":function(t,e,c){"use strict";c("4dac")},"4dac":function(t,e,c){},"4f44":function(t,e,c){},"56d7":function(t,e,c){"use strict";c.r(e);var n=c("2b0e"),s=function(){var t=this,e=t._self._c;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},a=[],i={name:"app",components:{}},o=i,r=(c("64c1"),c("2877")),l=Object(r["a"])(o,s,a,!1,null,null,null),u=l.exports,p=c("8c4f"),d=function(){var t=this,e=t._self._c;return e("div",[e("el-container",[e("el-aside",{attrs:{width:"240px"}},[e("div",[e("Addaside")],1)]),e("el-main",[e("div",[e("el-backtop",{attrs:{target:".el-main"}}),e("router-view")],1)])],1)],1)},h=[],m=function(){var t=this,e=t._self._c;return e("div",[e("img",{staticClass:"aside-logo",attrs:{src:c("9b19"),alt:""}}),e("router-link",{attrs:{to:"/home/Welcome"}},[e("h4",{staticClass:"aside_box1"},[t._v("站友交流村")])]),t._m(0),e("el-menu",{ref:"elMenu",staticClass:"el-menu-vertical-demo",attrs:{router:"","default-active":t.activeIndex}},[e("el-menu-item",{staticStyle:{"padding-left":"40px"},attrs:{index:"Designcun","default-active":"activeIndex"}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("花里胡哨设计村")])]),e("el-menu-item",{staticStyle:{"padding-left":"40px"},attrs:{index:"Codecun","default-active":"activeIndex"}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("能抗能打码农村")])]),e("el-menu-item",{staticStyle:{"padding-left":"40px"},attrs:{index:"Productcun","default-active":"activeIndex"}},[e("span",{attrs:{slot:"title"},slot:"title"},[t._v("天马行空产品村")])])],1)],1)},f=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"aside_box2"},[e("span",[t._v("我的村落")])])}],v={data(){return{activeIndex:"0"}},watch:{$route(){this.setCyrrentRoute()}},methods:{setCyrrentRoute(){this.activeIndex=this.$route.name}},created(){this.setCyrrentRoute()}},g=v,b=(c("4afa"),Object(r["a"])(g,m,f,!1,null,"122462fc",null)),w=b.exports,_={name:"Home",components:{Addaside:w}},y=_,x=(c("ccf3"),Object(r["a"])(y,d,h,!1,null,"0a8b064c",null)),C=x.exports,k=function(){var t=this,e=t._self._c;return e("div",[e("Topimage"),e("Designone"),e("Designtwo"),e("Designicon"),e("Designsystem"),e("Designtool"),e("Designcolor")],1)},j=[],D=function(){var t=this,e=t._self._c;return e("div",[e("el-row",[e("el-col",{attrs:{span:24}},[e("el-carousel",{attrs:{height:"200px",direction:"vertical",autoplay:t.ture}},t._l(t.imgDatas,(function(c){return e("el-carousel-item",{key:c},[e("el-link",{attrs:{href:c.url,target:"_blank"}},[e("el-image",{staticClass:"topimg",attrs:{src:c.src,fit:t.fill}})],1)],1)})),1)],1)],1)],1)},O=[],S={data(){return{imgDatas:[{url:"https://www.gogoup.com/course/GMTE5MA==?utm_source=zcool&utm_medium=index&utm_campaign=index_focus=&isExpand=1",src:"./img/4.png"},{url:"https://ckad.stu.edu.cn/ktk/landingPage/html/index.html",src:"./img/5.jpeg"},{url:"https://b.ui.cn/",src:"./img/6.jpeg"}]}}},I=S,P=(c("cbed"),Object(r["a"])(I,D,O,!1,null,"39b6a0c8",null)),A=P.exports,z=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("站村推荐")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},T=[],q={data(){return{cardsDatas:[{url:"https://www.zcool.com.cn/",src:"https://favicon.cccyun.cc/https://www.zcool.com.cn/",title:"站酷",content:"站酷ZCOOL,中国设计师互动平台"},{url:"https://www.ui.cn/",src:"https://favicon.cccyun.cc/https://www.ui.cn/",title:"UI中国",content:"UI中国用户体验平台"},{url:"https://dribbble.com/",src:"https://favicon.cccyun.cc/https://dribbble.com/",title:"Dribbble",content:"全球UI设计师作品秀社区"},{url:"https://www.uisdc.com/",src:"./img/ico-img/youshe.ico",title:"优设",content:"设计师交流学习平台 - 看设计文章，学软件教程，找灵感素材，尽在优设网！"},{url:"https://www.iconfont.cn/collections",src:"https://favicon.cccyun.cc/https://www.iconfont.cn/collections",title:"Iconfont",content:"阿里团队图标字体及图标素材下载"},{url:"https://www.baidu.com/",src:"https://favicon.cccyun.cc/https://www.baidu.com/",title:"百度",content:"众里寻她千百度"}]}}},J=q,E=(c("8034"),Object(r["a"])(J,z,T,!1,null,"0cc0f9a8",null)),M=E.exports,L=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("灵感采集村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},U=[],G={data(){return{cardsDatas:[{url:"https://www.behance.net/",src:"./img/ico-img/behance.png",title:"Behance",content:"一个很酷的设计师加油站"},{url:"https://www.pinterest.com/",src:"./img/ico-img/pinterest.png",title:"Pinterest",content:"一个很酷的设计师加油站"},{url:"https://www.shuzixs.com/#/home/",src:"https://favicon.cccyun.cc/https://www.shuzixs.com/#/home/",title:"数字像素",content:"数字像素 -可视化设计、开发、互动综合服务社区"},{url:"https://ello.co/",src:"https://favicon.cccyun.cc/https://ello.co/",title:"Ello",content:"Ello是一个发现、讨论、发布、分享和推广你感兴趣的事物的社区。"},{url:"https://artand.cn/",src:"https://favicon.cccyun.cc/https://artand.cn/",title:"Artand",content:"这是一个很好的网站"},{url:"https://huaban.com/",src:"https://favicon.cccyun.cc/https://huaban.com/",title:"花瓣",content:"花瓣网, 设计师寻找灵感的天堂！"}]}}},N=G,R=(c("f596"),Object(r["a"])(N,L,U,!1,null,"395b8dc8",null)),W=R.exports,F=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("图标设计村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},B=[],H={data(){return{cardsDatas:[{url:"https://www.iconfont.cn/collections",src:"https://favicon.cccyun.cc/https://www.iconfont.cn/collections",title:"Iconfont",content:"阿里妈妈MUX倾力打造的矢量图标管理、交流平台"},{url:"https://icons8.com/",src:"https://favicon.cccyun.cc/https://icons8.com/",title:"Icons8",content:"30多种设计风格的新免费图标 用于移动、网络和图形设计"},{url:"https://icon-icons.com/",src:"https://favicon.cccyun.cc/https://icon-icons.com/",title:"Icon-Iscons",content:"这是一个很好的网站"},{url:"https://iconmonstr.com/",src:"https://favicon.cccyun.cc/https://iconmonstr.com/",title:"Iconmonstr",content:"Free simple icons for your next project"},{url:"https://www.iconfinder.com/",src:"https://favicon.cccyun.cc/https://www.iconfinder.com/",title:"Iconfinder",content:"高质量付费图标下载"},{url:"https://findicons.com/",src:"https://favicon.cccyun.cc/https://findicons.com/",title:"Findicons",content:"这是一个很好的网站"}]}}},Q=H,V=(c("2eac"),Object(r["a"])(Q,F,B,!1,null,"430feec8",null)),$=V.exports,X=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("设计系统村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},Z=[],K={data(){return{cardsDatas:[{url:"https://element.eleme.io/",src:"https://favicon.cccyun.cc/https://element.eleme.io/",title:"Element",content:"一套为开发者、设计师和产品经理准备的基于 Vue 2.0 的桌面端组件库"},{url:"https://ant.design/",src:"https://favicon.cccyun.cc/https://ant.design/",title:"AntDesign",content:"Ant Design - 一套企业级 UI 设计语言和 React 组件库"},{url:"https://primer.style/",src:"https://favicon.cccyun.cc/https://primer.style/",title:"Primer",content:"这是一个很好的网站"},{url:"https://semi.design/zh-CN/",src:"https://favicon.cccyun.cc/https://semi.design/zh-CN/",title:"SemiDesign",content:"由抖音前端与 UED 团队维护，易于定制的现代化设计系统，帮助设计师与开发者打造高质量产品。"},{url:"https://design.youzan.com/index.html",src:"https://favicon.cccyun.cc/https://design.youzan.com/index.html",title:"ZanDesign",content:"有赞设计语言系统 - 服务于 SaaS 产品的产品设计体系"},{url:"https://developer.apple.com/design/",src:"https://favicon.cccyun.cc/https://developer.apple.com/design/",title:"Apple System",content:"这是一个很好的网站"}]}}},Y=K,tt=(c("9d47"),Object(r["a"])(Y,X,Z,!1,null,"81e9dad2",null)),et=tt.exports,ct=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("设计工具村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},nt=[],st={data(){return{cardsDatas:[{url:"https://cli.im/",src:"https://favicon.cccyun.cc/https://cli.im/",title:"草料二维码",content:"二维码制作"},{url:"https://www.jpegmini.com/",src:"https://favicon.cccyun.cc/https://www.jpegmini.com/",title:"Jpegmini",content:"JPG图片在线压缩工具"},{url:"https://www.logaster.cn//",src:"https://favicon.cccyun.cc/https://www.logaster.cn/",title:"Logaster",content:"在线LOGO制作"},{url:"http://waifu2x.udp.jp/",src:"https://favicon.cccyun.cc/http://waifu2x.udp.jp/",title:"Waifu2x",content:"图片无损放大工具"},{url:"https://icons8.com/preloaders/",src:"https://favicon.cccyun.cc/https://icons8.com/preloaders/",title:"Preloaders",content:"Loading加载动画制作"},{url:"https://www.qiuziti.com//",src:"https://favicon.cccyun.cc/https://www.qiuziti.com/",title:"Qiuziti",content:"字体识别与搜索"}]}}},at=st,it=(c("d83a"),Object(r["a"])(at,ct,nt,!1,null,"0484e136",null)),ot=it.exports,rt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("色彩搭配村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},lt=[],ut={data(){return{cardsDatas:[{url:"https://color.adobe.com/zh/create",src:"https://favicon.cccyun.cc/https://color.adobe.com/zh/create",title:"AdobeColor",content:"Adobe配色工具"},{url:"https://webgradients.com/",src:"https://favicon.cccyun.cc/https://webgradients.com/",title:"Webgradients",content:"180个美丽的线性渐变"},{url:"https://colorbox.io/",src:"https://colorbox.io/favicon-light.svg",title:"ColorBox",content:"以超快速度创建惊人的颜色集。"},{url:"https://webkul.github.io/coolhue/",src:"https://webkul.github.io/coolhue/images/coolhue-logo.png",title:"CoolHue 2.0",content:"获取最酷的精选渐变色集合调色板"},{url:"https://www.webdesignrankings.com/resources/lolcolors/",src:"https://www.webdesignrankings.com/resources/lolcolors/assets/apple-touch-icon-180x180-48f1de9e6b550647983c1342e575d663cda7c09831f879cd8eaf99d579da2a98.png",title:"LOLCOLORS",content:"Loading加载动画制作"},{url:"https://coolors.co/",src:"https://favicon.cccyun.cc/https://coolors.co/",title:"Coolors",content:"Coolors - 超快速调色板生成器!"}]}}},pt=ut,dt=(c("ce46"),Object(r["a"])(pt,rt,lt,!1,null,"071d2432",null)),ht=dt.exports,mt={components:{Topimage:A,Designone:M,Designtwo:W,Designicon:$,Designsystem:et,Designtool:ot,Designcolor:ht},data(){return{}}},ft=mt,vt=Object(r["a"])(ft,k,j,!1,null,"7c17241a",null),gt=vt.exports,bt=function(){var t=this,e=t._self._c;return e("div",{staticClass:"bgimg"},[t._m(0),e("div",{staticClass:"box"},[e("div",{staticClass:"box-1"},[e("el-image",{attrs:{src:"./designma.png"}})],1),e("div",{staticClass:"box-2"},[e("el-image",{attrs:{src:"./codema.png"}})],1),e("div",{staticClass:"box-3"},[e("el-image",{attrs:{src:"./productma.png"}})],1)])])},wt=[function(){var t=this,e=t._self._c;return e("div",{staticClass:"box-0"},[e("div",{staticClass:"box-0-text"},[e("span",[t._v("站村导航"),e("br"),t._v("欢迎你的加入 共建和谐多彩家园")])]),e("div",{staticClass:"box-0-two"},[e("span",[t._v("别看村子不咋大呀有山有水有规划 邻里乡亲挺和睦可爱站友更合群")])])])}],_t={setup(){}},yt=_t,xt=(c("764b"),Object(r["a"])(yt,bt,wt,!1,null,"f06fc820",null)),Ct=xt.exports,kt=function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}]},[e("Topimage"),e("Codeone"),e("Codeonefront"),e("Codeforum")],1)},jt=[],Dt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("站村推荐")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},Ot=[],St={data(){return{cardsDatas:[{url:"https://github.com/",src:"https://favicon.cccyun.cc/https://github.com/",title:"Github",content:"全球知名的开源及私有项目托管平台"},{url:"https://gitee.com/",src:"https://favicon.cccyun.cc/https://gitee.com/",title:"Gitee",content:"开源中国代码托管平台"},{url:"https://about.gitlab.com/",src:"https://favicon.cccyun.cc/https://about.gitlab.com/",title:"Gitlab",content:"免费无限制的开源及私有项目托管"},{url:"https://developer.huawei.com/cn/",src:"https://www.huawei.com/Assets/corp/v2/img/img_ent_en_logo_ico.png",title:"华为开发者",content:"与开发者共建万物互联的智能世界 - 华为"},{url:"https://developer.apple.com/",src:"https://favicon.cccyun.cc/https://developer.apple.com/",title:"Developer",content:"AppleUI设计语言"},{url:"https://www.baidu.com/",src:"https://favicon.cccyun.cc/https://www.baidu.com/",title:"百度",content:"众里寻她千百度"}]}}},It=St,Pt=(c("12f4"),Object(r["a"])(It,Dt,Ot,!1,null,"46f8da09",null)),At=Pt.exports,zt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("前端框架村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},Tt=[],qt={data(){return{cardsDatas:[{url:"https://flutter.dev/",src:"https://favicon.cccyun.cc/https://flutter.dev/",title:"Flutter",content:"Google跨平台(iOS和Android)原生"},{url:"https://cn.vuejs.org/",src:"https://favicon.cccyun.cc/https://cn.vuejs.org/",title:"VueJS",content:"小巧精致,渐进式JavaScript 框架"},{url:"https://reactjs.org/",src:"https://favicon.cccyun.cc/https://reactjs.org/",title:"ReactJS",content:"用于构建用户界面的Javscript库"},{url:"https://jquery.com/",src:"https://favicon.cccyun.cc/https://jquery.com/",title:"Jquery",content:"一个快速、简洁的JavaScript框架"},{url:"https://material.io/design",src:"https://favicon.cccyun.cc/https://material.io/design",title:"Material",content:"Google官方MaterialDesign指南"},{url:"https://angularjs.org/",src:"https://favicon.cccyun.cc/https://angularjs.org/",title:"AngularJS",content:"Google开发的前端技术框架"},{url:"https://www.bootcss.com/",src:"https://fastly.jsdelivr.net/npm/@bootcss/www.bootcss.com@0.0.62/dist/ico/favicon.ico",title:"Bootstrap",content:"简洁、直观、强悍的前端开发框架 让web开发更迅速、简单。"},{url:"https://semi.design/zh-CN/start/overview",src:"https://favicon.cccyun.cc/https://semi.design/zh-CN/start/overview",title:"Semi",content:"基于Semi 设计语言开发 能够在线调试的React UI 桌面端组件库，帮助开发者高效构建应用"},{url:"https://reactnative.cn/",src:"https://favicon.cccyun.cc/https://reactnative.cn/",title:"React中文网",content:"使用 React 来创建 Android 和 iOS 的原生应用"},{url:"https://element.eleme.io/",src:"https://favicon.cccyun.cc/https://element.eleme.io/",title:"Eleme",content:"饿了么出品基于Vue2.0前端组件库"},{url:"https://ant.design/",src:"https://favicon.cccyun.cc/https://ant.design/",title:"Ant",content:"蚂蚁金服的UI设计语言"}]}}},Jt=qt,Et=(c("a815"),Object(r["a"])(Jt,zt,Tt,!1,null,"bc459ac8",null)),Mt=Et.exports,Lt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("前端论坛村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},Ut=[],Gt={data(){return{cardsDatas:[{url:"https://juejin.cn/",src:"https://favicon.cccyun.cc/https://juejin.cn/",title:"掘金",content:"掘金是面向全球中文开发者的技术内容分享与交流平台"},{url:"https://codepen.io/",src:"./img/ico-img/codepen.png",title:"Codepen",content:"前端炫酷样式技能效果"},{url:"https://www.oschina.net/",src:"https://favicon.cccyun.cc/https://www.oschina.net/",title:"开源中国",content:"为 IT 开发者提供了一个发现、使用、并交流开源技术的平台"},{url:"https://cnodejs.org/",src:"https://favicon.cccyun.cc/https://cnodejs.org/",title:"CnodeJS",content:"CNode Node.js专业中文社区"},{url:"https://segmentfault.com/",src:"https://favicon.cccyun.cc/https://segmentfault.com/",title:"Segmentfault",content:"SegmentFault 思否是中国领先的开发者技术社区"},{url:"https://stackoverflow.com/",src:"https://favicon.cccyun.cc/https://stackoverflow.com/",title:"Stackoverflow",content:"全球专业的程序员IT技术问答社区"}]}}},Nt=Gt,Rt=(c("87b2"),Object(r["a"])(Nt,Lt,Ut,!1,null,"6b4cfdcd",null)),Wt=Rt.exports,Ft={components:{Topimage:A,Codeone:At,Codeonefront:Mt,Codeforum:Wt},data(){return{}}},Bt=Ft,Ht=Object(r["a"])(Bt,kt,jt,!1,null,"03a3ee07",null),Qt=Ht.exports,Vt=function(){var t=this,e=t._self._c;return e("div",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.load,expression:"load"}]},[e("Topimage"),e("Productlike"),e("Producttool")],1)},$t=[],Xt=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("站村推荐")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},Zt=[],Kt={data(){return{cardsDatas:[{url:"https://sso.lanhuapp.com/",src:"https://favicon.cccyun.cc/https://sso.lanhuapp.com/",title:"蓝湖",content:"产品协作平台"},{url:"https://www.woshipm.com/",src:"https://favicon.cccyun.cc/https://www.woshipm.com/",title:"人人都是产品经理",content:"人人都是产品经理 | 产品经理、产品爱好者学习交流平台"},{url:"https://36kr.com/",src:"https://favicon.cccyun.cc/https://36kr.com/",title:"36kr",content:"36氪_让一部分人先看到未来"},{url:"http://www.geekpark.net/",src:"https://favicon.cccyun.cc/http://www.geekpark.net/",title:"极客公园",content:"极客公园聚焦互联网领域，跟踪新鲜的科技新闻动态，关注极具创新精神的科技产品"},{url:"https://www.notion.so/zh-cn",src:"./img/ico-img/notion.png",title:"Notion",content:"集文档丨wiki丨任务的协同创作平台"},{url:"https://www.baidu.com/",src:"https://favicon.cccyun.cc/https://www.baidu.com/",title:"百度",content:"众里寻她千百度"}]}}},Yt=Kt,te=(c("6847"),Object(r["a"])(Yt,Xt,Zt,!1,null,"95a69322",null)),ee=te.exports,ce=function(){var t=this,e=t._self._c;return e("div",[e("div",{staticClass:"mainbox_one"},[e("div",{staticClass:"mainbox_one_title"},[t._v("原型工具村")]),e("el-row",{staticClass:"list-box",attrs:{gutter:90}},t._l(t.cardsDatas,(function(c){return e("el-col",{key:c.id,attrs:{span:4}},[e("div",{staticClass:"grid-content bg-purple-dark"},[e("el-link",{attrs:{href:c.url,underline:!1,target:"_blank"}},[e("el-card",{attrs:{shadow:"hover","body-style":{padding:"0px"}}},[e("el-image",{staticClass:"webimg",attrs:{src:c.src}})],1)],1),e("div",{staticClass:"card_name"},[e("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:c.content,placement:"bottom-start"}},[e("el-link",{attrs:{target:"_blank",underline:!1,href:c.url}},[e("span",[t._v(t._s(c.title))])])],1)],1)],1)])})),1)],1)])},ne=[],se={data(){return{cardsDatas:[{url:"https://modao.cc/",src:"https://favicon.cccyun.cc/https://modao.cc/",title:"墨刀",content:"在线一体化产品设计协作平台"},{url:"https://www.mockplus.cn/",src:"https://favicon.cccyun.cc/https://www.mockplus.cn/",title:"摹客",content:"我的设计利器，团队的协作平台"},{url:"https://www.sketch.com/",src:"https://favicon.cccyun.cc/https://www.sketch.com/",title:"Sketch",content:"专注于UI设计+原型图工具"},{url:"https://www.axure.com/",src:"https://favicon.cccyun.cc/https://www.axure.com/",title:"Axure",content:"原型设计工具"},{url:"https://www.xmind.net/",src:"https://favicon.cccyun.cc/https://www.xmind.net/",title:"Xmind",content:"一款非常实用的商业思维导图软件"},{url:"https://www.teambition.com/",src:"https://favicon.cccyun.cc/https://www.teambition.com/",title:"Teambition",content:"国内领先的团队协作工具"},{url:"https://shimo.im/",src:"https://favicon.cccyun.cc/https://shimo.im/",title:"石墨文档",content:"全新一代云端 Office 面向未来的办公软件"},{url:"https://docs.qq.com/home/",src:"https://favicon.cccyun.cc/https://docs.qq.com/home",title:"腾讯文档",content:"腾讯文档-官方网站-支持多人在线编辑Word、Excel和PPT文档"},{url:"https://quip.com/",src:"https://favicon.cccyun.cc/https://quip.com/",title:"Quip",content:"Quip 是在 Salesforce 中嵌入的实时协作文档、电子表格和聊天，并且可以转换任何业务流程。"},{url:"https://worktile.com/",src:"https://favicon.cccyun.cc/https://worktile.com/",title:"Worktile",content:"一个工具满足团队所需任务、项目、文档、IM、目标、 日历、甘特图、工时、审批以及更多，让工作更简单"},{url:"https://trello.com/",src:"https://favicon.cccyun.cc/https://trello.com/",title:"Trello",content:"项目进度管理和发布、协同工作平台"},{url:"https://imindmap.com/",src:"https://favicon.cccyun.cc/https://imindmap.com/",title:"Imindmap",content:"可创建3D视角的思维导图"}]}}},ae=se,ie=(c("70bb"),Object(r["a"])(ae,ce,ne,!1,null,"2218b9b9",null)),oe=ie.exports,re={components:{Topimage:A,Productlike:ee,Producttool:oe},data(){return{}}},le=re,ue=Object(r["a"])(le,Vt,$t,!1,null,"755996db",null),pe=ue.exports;n["default"].use(p["a"]);const de=[{path:"/home",name:"Home",component:C,children:[{path:"welcome",component:Ct,name:"Welcome"},{path:"designcun",component:gt,name:"Designcun"},{path:"codecun",component:Qt,name:"Codecun"},{path:"productcun",component:pe,name:"Productcun"}]},{path:"/",redirect:"/home/designcun"},{path:"/about",name:"About",component:()=>c.e("about").then(c.bind(null,"f820"))}],he=new p["a"]({routes:de});var me=he,fe=(c("0fae"),c("9e2f")),ve=c.n(fe);n["default"].use(ve.a);c("aede"),c("8aa1");n["default"].config.productionTip=!1,new n["default"]({router:me,render:t=>t(u)}).$mount("#app")},"5f29":function(t,e,c){},"62b6":function(t,e,c){},"63de":function(t,e,c){},"64c1":function(t,e,c){"use strict";c("950f")},6847:function(t,e,c){"use strict";c("9e45")},"70bb":function(t,e,c){"use strict";c("62b6")},"764b":function(t,e,c){"use strict";c("7deb")},"7deb":function(t,e,c){},8034:function(t,e,c){"use strict";c("5f29")},"87b2":function(t,e,c){"use strict";c("27fb")},"8aa1":function(t,e,c){},"950f":function(t,e,c){},"9b19":function(t,e,c){t.exports=c.p+"img/logo.ce1283d1.svg"},"9d47":function(t,e,c){"use strict";c("1e8f")},"9e45":function(t,e,c){},a815:function(t,e,c){"use strict";c("1de5")},aede:function(t,e,c){},af70:function(t,e,c){},bc8d:function(t,e,c){},cbed:function(t,e,c){"use strict";c("af70")},ccf3:function(t,e,c){"use strict";c("0614")},ce46:function(t,e,c){"use strict";c("2461")},d83a:function(t,e,c){"use strict";c("447d")},f596:function(t,e,c){"use strict";c("bc8d")}});
//# sourceMappingURL=app.91d6d2cd.js.map