!function(e){function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}var n={};t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{configurable:!1,enumerable:!0,get:r})},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},t.p="",t(t.s=12)}([function(e,t){e.exports=rsdll},function(e,t,n){e.exports=n(0)(0)},function(e,t,n){e.exports=n(0)(182)},function(e,t,n){e.exports=n(0)(1)},function(e,t,n){e.exports=n(0)(17)},function(e,t,n){e.exports=n(0)(11)},function(e,t){},function(e,t,n){"use strict";function r(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:o.a,t=arguments[1],n=void 0;return t.type,n=e,a.reduce(function(e,n){return n(e,t)},n)}t.a=r;var o=n(16),a=[]},function(e,t,n){"use strict";var r=n(9);t.a={path:"plugin-cra",childRoutes:[{path:"/routes/:feature",component:r.a}]}},function(e,t,n){"use strict";var r=(n(17),n(18),n(25),n(26));n.d(t,"a",function(){return r.a})},function(e,t,n){"use strict";t.a={constant:"#BBBBBB",actions:"#FF81C3",action:"#FF81C3",component:"#FFB14A",components:"#FFB14A",misc:"#A1887F",file:"#8d6e63",folder:"#8d6e63",feature:"#00C0FF",featureInner:"#00C0FF",route:"#26a69a",routes:"#26a69a"}},function(e,t,n){e.exports=n(0)(13)},function(e,t,n){n(13),e.exports=n(39)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n(14),o=(n.n(r),n(15)),a=n(8),i=n(7);console.log("rekit react plugin");var c=Object.assign({},o,{route:a.a,reducer:i.a,name:"rekit-react"});window.__REKIT_PLUGINS.push(c)},function(e,t,n){e.exports=n(0)(1164)},function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),n.d(t,"name",function(){return m});var r=n(7);n.d(t,"reducer",function(){return r.a});var o=n(8);n.d(t,"route",function(){return o.a});var a=n(27);n.d(t,"projectExplorer",function(){return a.a});var i=n(28);n.d(t,"form",function(){return i.a});var c=n(29);n.d(t,"tab",function(){return c.a});var u=n(31);n.d(t,"app",function(){return u.a});var s=n(33);n.d(t,"menu",function(){return s.a});var l=n(35);n.d(t,"view",function(){return l.a});var f=n(10);n.d(t,"colors",function(){return f.a});var p=n(36);n.d(t,"icons",function(){return p.a});var d=n(37);n.d(t,"dashboard",function(){return d.a});var m="cra"},function(e,t,n){"use strict";var r={};t.a=r},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return{pluginCra:e.pluginCra}}function c(e){return{actions:Object(p.bindActionCreators)(Object.assign({},m),e)}}var u=n(1),s=n.n(u),l=n(3),f=n.n(l),p=n(4),d=n(5),m=n(6),y=(n.n(m),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),h=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),y(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"plugin-cra-default-page"},"Page Content: plugin-cra/DefaultPage23")}}]),t}(u.Component);h.propTypes={pluginCra:f.a.object.isRequired,actions:f.a.object.isRequired};Object(d.connect)(i,c)(h)},function(e,t,n){"use strict";function r(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function a(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function c(e){return{elementById:e.home.elementById}}function u(e){return{actions:Object(y.bindActionCreators)(Object.assign({},b),e)}}var s=n(19),l=n.n(s),f=n(1),p=n.n(f),d=n(3),m=n.n(d),y=n(4),h=n(5),g=n(20),b=n(6),v=(n.n(b),n(21)),k=n(22),w=n(10),C=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),j=function(e){function t(){var e,n,r,i;o(this,t);for(var c=arguments.length,u=Array(c),s=0;s<c;s++)u[s]=arguments[s];return n=r=a(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),r.handleNodeClick=function(e){var t=function(e){return r.props.elementById[e]},n=t(e.id);n.owner&&(n=t(n.owner)),g.default.push("/element/"+encodeURIComponent(n.id)+"/diagram")},i=n,a(r,i)}return i(t,e),C(t,[{key:"getElementId",value:function(){var e=this.props.element,t=void 0;switch(e.type){case"component":case"action":t=e.parts[0];break;case"file":t=e.id;break;default:throw new Error("Unknown element type: "+e.type)}return t}},{key:"getDiagramData",value:function(){var e=this.props.elementById,t=function(t){return e[t]},n=Object(k.a)(e,this.getElementId()),o=n.nodes,a=n.links;o=o.filter(function(e){return/^src\//.test(e.id)}),a=a.filter(function(e){return/^src\//.test(e.source)&&/^src\//.test(e.target)});var i=this.getElementId(),c=t(i).feature,u=[];return o.forEach(function(e){var n=t(e.id),r=n.owner&&t(n.owner)||null;if(r?(e.name=r.name,e.bgColor=w.a[r.type]):e.bgColor=w.a[n.type],n.feature&&n.feature!==c){var o="v:feature-"+n.feature;l()(u,{id:o})||u.push({id:o,name:n.feature,radius:20,bgColor:w.a.feature,doubleCircle:!0,cursor:"default",noClick:!0}),a.push({source:o,target:e.id,length:100,type:"child"}),a.push({source:o,target:i,length:200,type:"no-line"})}}),o=[].concat(r(o),u),{nodes:o,links:a}}},{key:"render",value:function(){var e=this.getElementId(),t=this.getDiagramData(),n=t.nodes,r=t.links;return p.a.createElement("div",{className:"plugin-cra-element-diagram"},p.a.createElement("div",{className:"diagram-container"},p.a.createElement(v.default,{nodes:n,links:r,targetId:e,handleNodeClick:this.handleNodeClick})))}}]),t}(f.Component);j.propTypes={actions:m.a.object.isRequired,elementById:m.a.object.isRequired,element:m.a.object.isRequired};Object(h.connect)(c,u)(j)},function(e,t,n){e.exports=n(0)(100)},function(e,t,n){e.exports=n(0)(50)},function(e,t,n){e.exports=n(0)(2405)},function(e,t,n){"use strict";n.d(t,"a",function(){return c});var r=n(23),o=n(24),a=function(e){return e},i=function(e,t){return t},c=Object(r.a)(o.getDepsDiagramData,a,i,function(e,t,n){return{nodes:e.nodes,links:e.links}})},function(e,t,n){"use strict";function r(e,t){return e===t}function o(e,t,n){if(null===t||null===n||t.length!==n.length)return!1;for(var r=t.length,o=0;o<r;o++)if(!e(t[o],n[o]))return!1;return!0}function a(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,n=null,a=null;return function(){return o(t,n,arguments)||(a=e.apply(null,arguments)),n=arguments,a}}function i(e){var t=Array.isArray(e[0])?e[0]:e;if(!t.every(function(e){return"function"===typeof e})){var n=t.map(function(e){return typeof e}).join(", ");throw new Error("Selector creators expect all input-selectors to be functions, instead received the following types: ["+n+"]")}return t}n.d(t,"a",function(){return c});var c=function(e){for(var t=arguments.length,n=Array(t>1?t-1:0),r=1;r<t;r++)n[r-1]=arguments[r];return function(){for(var t=arguments.length,r=Array(t),o=0;o<t;o++)r[o]=arguments[o];var a=0,c=r.pop(),u=i(r),s=e.apply(void 0,[function(){return a++,c.apply(null,arguments)}].concat(n)),l=e(function(){for(var e=[],t=u.length,n=0;n<t;n++)e.push(u[n].apply(null,arguments));return s.apply(null,e)});return l.resultFunc=c,l.dependencies=u,l.recomputations=function(){return a},l.resetRecomputations=function(){return a=0},l}}(a)},function(e,t,n){e.exports=n(0)(2407)},function(e,t,n){"use strict"},function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}function i(e){return{pluginCra:e.pluginCra}}function c(e){return{actions:Object(p.bindActionCreators)(Object.assign({},m),e)}}var u=n(1),s=n.n(u),l=n(3),f=n.n(l),p=n(4),d=n(5),m=n(6),y=(n.n(m),function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}()),h=function(e){function t(){return r(this,t),o(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return a(t,e),y(t,[{key:"render",value:function(){return s.a.createElement("div",{className:"plugin-cra-route-rules-view"},"Page Content: plugin-cra/123")}}]),t}(u.Component);h.propTypes={pluginCra:f.a.object.isRequired,actions:f.a.object.isRequired},t.a=Object(d.connect)(i,c)(h)},function(e,t,n){"use strict";t.a={handleSelect:function(e){}}},function(e,t,n){"use strict";var r=n(1),o=n.n(r),a=n(11),i=n(2),c=a.Select.Option,u=function(e){return e.map(function(e){return o.a.createElement(c,{key:e.value||e.name},e.name)})},s=function(e){return i.default.getState().home.elementById[e]},l=function(e){return s(s(e).parent)},f=function(){return s("v:features").children.map(s).filter(function(e){return"feature"===e.type}).map(function(e){return{name:e.name,value:e.name}})},p=function(e){var t=e.context;if(t&&t.targetId&&s(t.targetId)){var n=s(t.targetId);if("feature"===n.type)return n.name;if(/^actions|components$/.test(n.type))return l(n.id).name;if(/^action|component$/.test(n.type))return n.feature}return""},d=function(e){return{key:"feature",label:"Feature",widget:a.Select,required:!0,children:u(f()),initialValue:p(e)}},m=function(){return{key:"name",label:"Name",widget:a.Input,autoFocus:!0,required:!0}},y=function(e){return{key:"name",label:"New Name",widget:a.Input,autoFocus:!0,autoSelect:!0,required:!0,initialValue:e.initialValue}};t.a={fillMeta:function(e){switch(e.formId){case"core.element.add.feature":e.meta.elements.push(m());break;case"core.element.move.feature":e.meta.elements.push(y({initialValue:s(e.context.targetId).name}));break;case"core.element.add.component":e.meta.elements.push(d(e),m(),{key:"connect",label:"Connect to Store",widget:a.Checkbox,initialValue:!1},{key:"urlPath",label:"Url Path",widget:a.Input});break;case"core.element.move.component-action":var t=s(e.context.targetId);e.meta.elements.push(d(e),y({initialValue:t.name}));break;case"core.element.add.action":e.meta.elements.push(d(e),m(),{key:"async",label:"Async",widget:a.Checkbox,initialValue:!1})}},processValues:function(e){var t=e.context,n=e.values;switch(e.formId){case"core.element.add.component":case"core.element.add.action":return Object.assign({},n,{commandName:t.action,type:t.elementType,name:(n.feature+"/"+n.name).replace(/\/+/g,"/")});case"core.element.move.component-action":var r=s(t.targetId);return Object.assign({},n,{commandName:t.action,type:r.type,source:r.feature+"/"+r.name,target:n.feature+"/"+n.name});case"core.element.move.feature":var o=s(t.targetId);return Object.assign({},n,{commandName:"move",type:"feature",source:o.name,target:n.name})}return e}}},function(e,t,n){"use strict";var r=n(30),o=n(2);t.a={getTab:function(e){if(!o.default.getState().home.elementById)return null;var t=void 0;return t=Object(r.matchPath)(e,{path:"/tools/build",exact:!0}),t?{name:"Build",key:"#build"}:null}}},function(e,t,n){e.exports=n(0)(134)},function(e,t,n){"use strict";function r(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var a=n(32),i=n.n(a),c={feature:"#0277bd",action:"#ec407a",actions:"#ec407a","initial-state":"#ec407a",component:"#f08036",components:"#f08036","folder-alias":"#8d6e63",normal:"#888888",routes:"#26a69a",plugin:"#4CAF50"},u={features:"rekit",feature:"book",action:"notification",actions:"notification","initial-state":"database",component:"appstore-o",components:"appstore-o","folder-alias":"folder",routes:"sharealt",plugin:"plugin"},s=function(e){return/^(v:)?src\/features\/[\w-_\d]+(\/|$)/.test(e)?e.split("/")[2]:null};t.a={processProjectData:function(e){var t=function(t){return e.elementById[t]},n=Object.values(e.elementById).filter(function(e){return"feature"===e.type}),a=n.map(function(e){return"src/features/"+e.name+"/route.js"}).reduce(function(e,n){var r=t(n);return r&&r.deps&&r.deps.length&&r.deps.forEach(function(t){e[t.id]=!0}),e},{});Object.values(e.elementById).forEach(function(n){switch(n.feature="feature"===n.type?n.name:s(n.id),n.type&&u[n.type]&&(n.icon=u[n.type],n.iconColor=c[n.type]),n.parts&&n.parts.forEach(function(e){t(e)&&(t(e).owner=n.id)}),n.type){case"component":case"action":case"initial-state":case"file":case"routes":n.navigable=!0}switch(n.type){case"components":n.count=n.children.length;break;case"actions":n.count=n.children.length-1,n.props&&n.props.isAsync&&(n.marks=[{name:"A",description:"Async action",bgColor:"#4fc3f7"}]);break;case"component":n.props&&n.props.connectToStore&&(n.marks=[{name:"C",description:"Connected to Redux Store",bgColor:"#42bd41"}]),n.parts&&n.parts[0]&&a[n.parts[0]]&&(n.isInRoute=!0,n.marks=[].concat(o(n.marks||[]),[{name:"R",description:"Used in route config",bgColor:"#ffb300"}]));break;case"action":n.props&&n.props.isAsync&&(n.marks=[{name:"A",description:"Async action",bgColor:"#4fc3f7"}]);break;case"routes":n.count=n.routes.length}if("components"===n.type&&(n.count=n.children.length),"actions"===n.type&&(n.count=n.children.length-1),"feature"===n.type){var l="src/features/"+n.name+"/core",f="src/features/"+n.name+"/ui";if(t(l)&&t(f)){var p;n.icon=u.plugin,n.iconColor=c.plugin;var d=n.children.pop();i()(t(d).children,l,f);var m="v:"+n.name+"-plugin-core-dir",y="v:"+n.name+"-plugin-ui-dir";n.children.push(m,y,d),Object.assign(e.elementById,(p={},r(p,m,{name:"Core",target:l,type:"folder-alias",icon:"core",children:t(l).children.slice()}),r(p,y,{name:"UI",target:f,type:"folder-alias",icon:"ui",children:t(f).children.slice(),iconColor:"#CDDC39"}),p))}}n.children&&n.children.forEach&&n.children.map(t).forEach(function(e){e&&(e.parent=n.id)})})}}},function(e,t,n){e.exports=n(0)(932)},function(e,t,n){"use strict";var r=n(11),o=n(2),a=n(34),i=function(){return o.default.dispatch(a.showDialog.apply(a,arguments))},c=function(e){return o.default.dispatch(a.execCoreCommand(e))},u=function(e){return o.default.getState().home.elementById[e]},s={addAction:{name:"Add Action",key:"add-action"},addComponent:{name:"Add Component",key:"add-component"},addFeature:{name:"Add Feature",key:"add-feature"},del:{name:"Delete",key:"del-element-action"},rename:{name:"Rename",key:"move-component-action"},renameFeature:{name:"Rename",key:"move-feature"},showTest:{name:"Unit Test",key:"show-test"},runTest:{name:"Run Test",key:"run-test"},runTests:{name:"Run Tests",key:"run-tests"},showStyle:{name:"Style",key:"show-style"},newFile:{name:"New File",key:"new-file"},newFolder:{name:"New Folder",key:"new-folder"}};t.a={contextMenu:{fillMenuItems:function(e,t){var n=t.elementId;console.log("fille menu items: ",n);var r=u(n);if(r)switch(r.type){case"features":e.push(s.addFeature);break;case"feature":e.push(s.addComponent,s.addAction,s.renameFeature,s.del);break;case"components":e.push(s.addComponent);break;case"component":e.push(s.rename,s.del);break;case"actions":e.push(s.addAction);break;case"action":e.push(s.rename,s.del)}},handleMenuClick:function(e){var t=e.elementId;switch(e.key){case"add-feature":i("core.element.add.feature","Add Feature",{action:"add",targetId:t,elementType:"feature"});break;case"add-component":i("core.element.add.component","Add Component",{action:"add",targetId:t,elementType:"component"});break;case"add-action":i("core.element.add.action","Add Action",{action:"add",targetId:t,elementType:"action"});break;case"move-component-action":i("core.element.move.component-action","Rename",{action:"move",targetId:t,elementType:u(t).type});break;case"move-feature":i("core.element.move.feature","Rename",{action:"move",targetId:t,elementType:"feature"});break;case"del-element-action":r.Modal.confirm({title:"Are you sure to delete the element?",onOk:function(){var e=u(t);if(console.log("delete: ",e),!e)return void r.Modal.error({title:"No element to delete",content:"Element not found: "+t});var n=null;switch(e.type){case"feature":n=e.name;break;case"component":case"action":n=e.feature+"/"+e.name;break;default:return void r.Modal.error({title:"Unknown element type to delete.",content:"Element type not supported to delete: "+e.type})}c({commandName:"remove",type:e.type,name:n}).then(function(){r.message.success("Delete element success.")},function(e){r.Modal.error({title:"Failed to delete the element",content:e.toString()})})}})}}}}},function(e,t,n){e.exports=n(0)(292)},function(e,t,n){"use strict";var r=n(9);t.a={getView:function(e,t){return"routes"===e.type&&"rules"===t?r.a:null}}},function(e,t,n){"use strict";t.a={feature:"book","initial-state":"database",component:"appstore-o",components:"appstore-o","folder-alias":"folder",folder:"folder",others:"folder",file:"file",route:"sharealt",routes:"sharealt",action:"notification"}},function(e,t,n){"use strict";var r=n(38),o=n.n(r),a=n(2),i=o()(function(e){return Object.values(e).filter(function(e){return"routes"===e.type}).reduce(function(e,t){return e+t.routes.length},0)});t.a={badges:[{type:"feature",name:"Features"},{type:"route",name:"Routes",count:function(){return i(a.default.getState().home.elementById)}},{type:"component",name:"Components"},{type:"action",name:"Acttions"}],OverviewDiagram:"feature"}},function(e,t,n){e.exports=n(0)(358)},function(e,t,n){var r=n(40);"string"===typeof r&&(r=[[e.i,r,""]]);var o={hmr:!0};o.transform=void 0;n(42)(r,o);r.locals&&(e.exports=r.locals)},function(e,t,n){t=e.exports=n(41)(void 0),t.push([e.i,".plugin-cra-element-diagram {\n  color: #ccc;\n  padding: 30px;\n  height: 100%;\n  width: 100%;\n}\n.plugin-cra-element-diagram .diagram-container {\n  width: 100%;\n  height: 100%;\n}\n.plugin-cra-route-rules-view {\n  color: red;\n}\n",""])},function(e,t,n){e.exports=n(0)(321)},function(e,t,n){e.exports=n(0)(953)}]);