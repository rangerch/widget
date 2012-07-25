define("#widget/0.9.16/daparser",["$"],function(e,t){function s(e){var t=[];for(var n=0,r=e.length;n<r;n++){var i=e[n];i.nodeType===1&&t.push(i)}return t}function o(e){var t=e.outerHTML;if(t)return t.indexOf(" data-")!==-1;var n=e.innerHTML;if(n&&n.indexOf(" data-")!==-1)return!0;var r=i.parseElement(e);for(var s in r)return!0;return!1}function a(e){return e.toLowerCase().replace(u,function(e,t){return(t+"").toUpperCase()})}function l(){return"daparser-"+f++}var n=e("$"),r="data-daparser-cid",i=t;i.parseBlock=function(e){e=n(e)[0];var t={};if(!o(e))return t;var u=s(e.getElementsByTagName("*"));u.unshift(e);for(var a=0,f=u.length;a<f;a++){var l=u[a],c=i.parseElement(l),h=l.getAttribute(r);for(var p in c){h||(h=i.stamp(l));var d=c[p],v=t[p]||(t[p]={});v[d]||(v[d]=""),v[d]+=(v[d]?",":"")+"."+h}}return t},i.parseElement=function(e){e=n(e)[0];if(e.dataset)return n.extend({},e.dataset);var t={},r=e.attributes;for(var i=0,s=r.length;i<s;i++){var o=r[i],u=o.name;u.indexOf("data-")===0&&(u=a(u.substring(5)),t[u]=o.value)}return t},i.stamp=function(e){e=n(e)[0];var t=e.getAttribute(r);return t||(t=l(),e.setAttribute(r,t),e.className+=" "+t),t};var u=/-([a-z])/g,f=0}),define("#widget/0.9.16/auto-render",["$"],function(e,t){var n=e("$");t.autoRender=function(e){(new this(e)).render()},t.autoRenderAll=function(r){r=n(r||document.body);var i=[],s=[];r.find("[data-widget]").each(function(e,n){t.isDataApiOff(n)||(i.push(n.getAttribute("data-widget").toLowerCase()),s.push(n))}),i.length&&e.async(i,function(){for(var e=0;e<arguments.length;e++){var t=arguments[e],n=s[e];t.autoRender&&t.autoRender({element:n,renderType:"auto"})}})};var r=n(document.body).attr("data-api")==="off";t.isDataApiOff=function(e){var t=n(e).attr("data-api");return t==="off"||t!=="on"&&r}}),define("#widget/0.9.16/widget",["./daparser","./auto-render","$","#base/0.9.16/base","#base/0.9.16/aspect","#base/0.9.16/attribute","#events/0.9.1/events","#class/0.9.2/class"],function(e,t,n){function h(){return"widget-"+c++}function p(e){return l.call(e)==="[object String]"}function d(e){return l.call(e)==="[object Function]"}function v(e){for(var t in e)if(e.hasOwnProperty(t))return!1;return!0}function m(e){return e.replace(/^\s*/,"").replace(/\s*$/,"")}function y(e){return g(document.documentElement,e)}function b(e){return e.charAt(0).toUpperCase()+e.substring(1)}function S(e){for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];if(!p(n))continue;w.test(n)?(n=n.replace(/'/g,'"'),e[t]=S(E(n))):e[t]=x(n)}return e}function x(e){if(e.toLowerCase()==="false")e=!1;else if(e.toLowerCase()==="true")e=!0;else if(/\d/.test(e)&&/[^a-z]/i.test(e)){var t=parseFloat(e);t+""===e&&(e=t)}return e}function T(e,t){for(var n in e){if(!e.hasOwnProperty(n))continue;var r=m(n).split(/\s*,\s*/),i=e[n];while(n=r.shift()){var s=n.split(/\s+/),o=s[0],u=s[1];u||(u=o,o="click"),t[o+" "+i]=u}}}function N(e){return e==null||(p(e)||i.isArray(e))&&e.length===0||i.isPlainObject(e)&&v(e)}function A(e){return d(e.events)&&(e.events=e.events()),e.events}function O(e,t){var n=e.match(C),r=n[1]+u+t.cid,i=n[2]||undefined;return i&&i.indexOf("{{")>-1&&(i=M(i,t)),{type:r,selector:i}}function M(e,t){return e.replace(k,function(e,n){var r=n.split("."),o=t,u;while(u=r.shift())o===t.attrs?o=t.get(u):o=o[u];if(p(o))return o;var a=i(o)[0];return a&&a.nodeType===1?"."+s.stamp(a):L})}var r=e("#base/0.9.16/base"),i=e("$"),s=e("./daparser"),o=e("./auto-render"),u=".delegate-events-",a="_onRender",f=r.extend({propsInAttrs:["element","template","model","events"],element:null,template:"<div></div>",model:null,events:null,attrs:{id:"",className:"",style:{},parentNode:document.body},initialize:function(e){this.cid=h();var t=this._parseDataAttrsConfig(e);this.initAttrs(e,t),this.parseElement(),this._parseDataset(),this.initProps(),this.delegateEvents(),this.setup()},_parseDataAttrsConfig:function(e){var t;if(e)var n=i(e.element);return n&&n[0]&&!o.isDataApiOff(n)&&(t=s.parseElement(n),S(t)),t},parseElement:function(){var e=this.element;e?this.element=i(e):this.get("template")&&this.parseElementFromTemplate();if(!this.element||!this.element[0])throw new Error("element is invalid")},parseElementFromTemplate:function(){this.element=i(this.get("template"))},_parseDataset:function(){if(o.isDataApiOff(this.element))return;this.dataset=s.parseBlock(this.element);var e=this.dataset.action;if(e){var t=A(this)||(this.events={});T(e,t)}},initProps:function(){},delegateEvents:function(e,t){e||(e=A(this));if(!e)return;if(p(e)&&d(t)){var n={};n[e]=t,e=n}for(var r in e){if(!e.hasOwnProperty(r))continue;var i=O(r,this),s=i.type,o=i.selector;(function(e,t){var n=function(n){d(e)?e.call(t,n):t[e](n)};o?t.element.on(s,o,n):t.element.on(s,n)})(e[r],this)}return this},undelegateEvents:function(e){var t={};return arguments.length===0?t.type=u+this.cid:t=O(e,this),this.element.off(t.type,t.selector),this},setup:function(){},render:function(){this.rendered||(this._renderAndBindAttrs(),this.rendered=!0);var e=this.get("parentNode");return e&&!y(this.element[0])&&this.element.appendTo(e),this},_renderAndBindAttrs:function(){var e=this,t=e.attrs;for(var n in t){if(!t.hasOwnProperty(n))continue;var r=a+b(n);if(this[r]){var i=this.get(n);N(i)||this[r](this.get(n),undefined,n),function(t){e.on("change:"+n,function(n,r,i){e[t](n,r,i)})}(r)}}},_onRenderId:function(e){this.element.attr("id",e)},_onRenderClassName:function(e){this.element.addClass(e)},_onRenderStyle:function(e){this.element.css(e)},$:function(e){return this.element.find(e)},destroy:function(){this.undelegateEvents(),f.superclass.destroy.call(this)}});f.autoRender=o.autoRender,f.autoRenderAll=o.autoRenderAll,f.StaticsWhiteList=["autoRender"],n.exports=f;var l=Object.prototype.toString,c=0,g=i.contains||function(e,t){return!!(e.compareDocumentPosition(t)&16)},w=/^\s*[\[{].*[\]}]\s*$/,E=this.JSON?JSON.parse:i.parseJSON,C=/^(\S+)\s*(.*)$/,k=/{{([^}]+)}}/g,L="INVALID_SELECTOR"});