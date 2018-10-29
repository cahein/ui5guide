var oui5lib={namespace:function(e){let t=this;const n=e.split(".");for(let e=0,i=n.length;e<i;e++)"undefined"==typeof t[n[e]]&&(t[n[e]]={}),t=t[n[e]];return t}};const xhr=new XMLHttpRequest;xhr.open("GET","oui5lib.json",!1),xhr.onload=function(){if(4===xhr.readyState&&(200===xhr.status||0===xhr.status))try{const t=JSON.parse(xhr.responseText);oui5lib.config=t}catch(e){throw new Error("Not valid JSON")}},xhr.send(),function(){function e(e,t,n){if(!r(e)||0===e.length)return null;let i=null;for(var o=0,u=e.length;o<u;o++)if(e[o][t]==n){i=e.splice(o,1);break}return i}function t(e,t,n){if(!r(e))return null;let i=null;for(var o=0,u=e.length;o<u;o++)if(e[o][t]==n){i=e[o];break}return i}function n(e,t,n){if(!r(e))return!1;let i;for(var o=0,u=e.length;o<u;o++)if((i=e[o])[t]==n[t])return e[o]=n,!0;return!1}function i(e,t,n){const i=[];let o;for(var r=0,u=e.length;r<u;r++)(o=e[r])[t]===n&&i.push(o);return i}function o(e,t){return e.sort(function(e,n){var i=e[t],o=n[t];return i<o?-1:i>o?1:0})}function r(e){return null!=e&&e instanceof Array}const u=oui5lib.namespace("lib.listHelper");u.removeByKey=e,u.getItemByKey=t,u.updateItemByKey=n,u.filterBy=i,u.sortBy=o}(),function(){"use strict";function e(){return b().componentId}function t(){const t=e();return"string"==typeof t?sap.ui.getCore().getComponent(t):null}function n(){return b().availableLanguages}function i(){const e=b();return null===e||"undefined"==typeof e.logLevel?"WARN":e.logLevel}function o(){return b().defaultLanguage}function r(){const e=b();return"undefined"==typeof e.currentLanguage?e.defaultLanguage:e.currentLanguage}function u(e){const t=b();-1===t.availableLanguages.indexOf(e)&&(e=t.defaultLanguage),a(e),sap.ui.getCore().getConfiguration().setLanguage(e),t.currentLanguage=e}function a(e){const n=new sap.ui.model.resource.ResourceModel({bundleUrl:"oui5lib/i18n/i18n.properties",bundleLocale:e});n.enhance({bundleUrl:"i18n/i18n.properties",bundleLocale:e});const i=t();"function"==typeof i.setModel&&i.setModel(n,"i18n")}function s(){return b().mappingDirectory}function l(){const e=b();return e.environment===undefined?"production":e.environment}function f(){const e=b("userProfileUrl");return"undefined"===e?null:e}function c(e){if(D.hasOwnProperty(e)){const t=b();return"object"==typeof t.defaultFormats&&"string"==typeof t.defaultFormats[e]?t.defaultFormats[e]:D[e]}return undefined}function g(e,t){const n=new sap.ui.core.Locale(r()),i=new sap.ui.core.LocaleData(n);switch(e){case"dateTime":{let e=i.getDateTimePattern(t);return e=(e=e.replace("{1}",i.getDatePattern(t))).replace("{0}",i.getTimePattern(t))}case"date":return i.getDatePattern(t);case"time":return i.getTimePattern(t);default:return undefined}}function d(e){const t=b();return"undefined"==typeof t.validation?null:"string"==typeof t.validation[e+"Regex"]?new RegExp(t.validation[e+"Regex"]):null}function p(){const e=d("date");return null!==e&&e instanceof RegExp?e:v}function m(){const e=d("time");return null!==e&&e instanceof RegExp?e:E}function y(){const e=d("phone");return null!==e&&e instanceof RegExp?e:T}function h(){const e=d("email");return null!==e&&e instanceof RegExp?e:x}function b(){if("undefined"==typeof oui5lib.config)throw new Error("oui5lib needs configuration");return oui5lib.config}const w=oui5lib.namespace("configuration"),D={dateTime:"yyyy-MM-dd HH:mm:ss",date:"yyyy-MM-dd",time:"HH:mm:ss"},v=/^\d{4}-\d{2}-\d{2}$/,E=/^\d{2}:\d{2}:\d{2}$/,T=/^0{2}[1-9][\d]*$/,x=/[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;w.getAvailableLanguages=n,w.getDefaultLanguage=o,w.getCurrentLanguage=r,w.setCurrentLanguage=u,w.getLogLevel=i,w.getMappingDir=s,w.getEnvironment=l,w.getDateRegex=p,w.getTimeRegex=m,w.getPhoneRegex=y,w.getEmailRegex=h,w.getDateTimeValuePattern=c,w.getDateTimeDisplayPattern=g,w.getComponent=t,w.getUserProfileUrl=f}(),function(e){const t=oui5lib.namespace("logger");if(!window.console)return t.debug=function(){},t.info=function(){},t.warn=function(){},void(t.error=function(){});const n="oui5lib - ";switch(t.debug=function(e){console.log(n+"DEBUG "+e)},t.info=function(e){console.info(n+"INFO "+e)},t.warn=function(e){console.warn(n+"WARN "+e)},t.error=function(e){console.error(n+"ERROR "+e)},e.getLogLevel()){case"ERROR":t.warn=function(){};case"WARN":t.info=function(){};case"INFO":t.debug=function(){}}}(oui5lib.configuration),function(e){"use strict";function t(){return"object"==typeof sap&&"object"==typeof sap.ui}function n(){const t=e.getComponent();return null!==t?t.getRouter():null}function i(){const t=e.getComponent();return null!==t?t.getEventBus():null}function o(){return e.getComponent().getModel("i18n")}function r(e,t){return o().getResourceBundle().getText(e,t)}function u(e){const t=new sap.ui.model.json.JSONModel;return e.length>100&&t.setSizeLimit(e.length),t.setData(e),t}function a(e,t,n){let i=[];if(f(e))return i;if(!(t instanceof Array))return i;if(void 0===n&&(n="Contains"),-1===["Contains","EndsWith","EQ","NE","StartsWith"].indexOf(n))return i;const o=[];return t.forEach(function(t){o.push(new sap.ui.model.Filter(t,n,e))}),o.length>0&&(i=new sap.ui.model.Filter({filters:o,and:!1})),i}function s(e){let t,n;for(n in Object.freeze(e),e)t=e[n],e.hasOwnProperty(n)&&"object"==typeof t&&!Object.isFrozen(t)&&this.deepFreeze(t)}function l(){for(let e=1;e<arguments.length;e++)for(let t in arguments[e])arguments[e].hasOwnProperty(t)&&("object"==typeof arguments[0][t]&&"object"==typeof arguments[e][t]?l(arguments[0][t],arguments[e][t]):arguments[0][t]=arguments[e][t]);return arguments[0]}function f(e){if(null==e)return!0;if("object"==typeof e)throw new TypeError("The given value is not a string");if("string"==typeof e)for(let t=0;t<e.length;t++){let n=e.charAt(t);if(" "!=n&&"\n"!=n&&"\t"!=n)return!1}return!0}function c(e){return jQuery.extend(!0,{},e)}const g=oui5lib.namespace("util");g.isUI5Env=t,g.getComponentRouter=n,g.getComponentEventBus=i,g.getI18nModel=o,g.getI18nText=r,g.getJsonModelForData=u,g.getFilterArray=a,g.isBlank=f,g.deepFreeze=s,g.extend=l,g.cloneData=c}(oui5lib.configuration),jQuery.sap.require("sap.ui.core.format.DateFormat"),function(e){"use strict";function t(t,n){if(null===d)return t;return n===undefined&&(n=e.getDateTimeValuePattern("date")),d.getDateTimeInstance({pattern:n,UTC:!0}).parse(t,!1,!0)}function n(t,n,i){return i===undefined&&(i=e.getDateTimeValuePattern("dateTime")),d.getDateTimeInstance({pattern:i}).parse(t+" "+n,!1,!0)}function i(t,n){return t instanceof Date?(void 0===n&&(n=e.getDateTimeDisplayPattern("date","medium")),u(t,n)):null}function o(t,n){return t instanceof Date?(void 0===n&&(n=e.getDateTimeDisplayPattern("dateTime","medium")),u(t,n)):null}function r(t,n){return t instanceof Date?(void 0===n&&(n=e.getDateTimeDisplayPattern("time","medium")),u(t,n)):null}function u(e,t){if(t===undefined)throw new Error("required date pattern is undefined");return d.getDateTimeInstance({pattern:t}).format(e)}function a(t,n,i){"string"!=typeof n&&(n=e.getDateTimeValuePattern("medium","date")),"string"!=typeof i&&(i=e.getDateTimeValuePattern("date"));const o=d.getDateTimeInstance({pattern:i}),r=d.getDateTimeInstance({pattern:n}),u=o.parse(t,!1,!0);return u instanceof Date?r.format(u):""}function s(e){if(void 0===e||""===e)return"00:00";"number"==typeof e&&(e=""+e);const t=e.split(".")[0];let n=Math.floor(t/60),i=t%60;return n<=9&&(n="0"+n),i<=9&&(i="0"+i),n+":"+i}function l(e){if(void 0===e)return null;let t=0;const n=e.match(/^(\d+):(\d+):?(\d*)$/);if(null===n)return null;if(4===n.length){t=60*parseInt(n[1])+parseInt(n[2])}return t}function f(e){return null===e?null:btoa(e)}function c(e){return null===e?null:atob(e)}const g=oui5lib.namespace("formatter");let d=null;oui5lib.util.isUI5Env()&&(d=sap.ui.core.format.DateFormat),g.base64Encode=f,g.base64Decode=c,g.getDateFromStrings=n,g.getDateFromString=t,g.getDateString=i,g.getDateTimeString=o,g.getTimeString=r,g.convertIndustrialMinutes=s,g.convertToIndustrialMinutes=l,g.convertDateString=a}(oui5lib.configuration),function(e,t){"use strict";function n(e,t){"number"!=typeof t&&(t=3e3),sap.m.MessageToast.show(e,{duration:t})}function i(e,n){"function"!=typeof n&&(n=o);const i=t.getI18nText("messagebox.error.title");jQuery.sap.require("sap.m.MessageBox"),sap.m.MessageBox.error(e,{title:i,onClose:n})}function o(t){e.info("ErrorMessage closed: "+t)}function r(e,n){if("function"!=typeof e)throw TypeError("need a function to handle the onClose event");jQuery.sap.require("sap.m.MessageBox"),sap.m.MessageBox.confirm(t.getI18nText("unsavedChanges.text"),{initialFocus:"CANCEL",onClose:function(t){e(t,n)}})}function u(e,n){if("function"!=typeof n)throw TypeError("need a function to handle the onClose event");jQuery.sap.require("sap.m.MessageBox"),sap.m.MessageBox.show(e,{icon:"WARNING",title:t.getI18nText("confirmDelete.title"),actions:["DELETE","CANCEL"],initialFocus:"CANCEL",onClose:n})}const a=oui5lib.namespace("messages");a.showNotification=n,a.showErrorMessage=i,a.confirmUnsavedChanges=r,a.confirmDelete=u}(oui5lib.logger,oui5lib.util),function(e,t){"use strict";function n(e,t,n){null==n&&(n={}),n.xhrObj=t,o("xhr",e,n,!0)}function i(e,t){o("loading","ready",e,t)}function o(n,i,o,r){if(!t.isUI5Env())return void e.warn("Couldn't publish event: no UI5 loaded");let u;"boolean"!=typeof r&&(r=!1),(u=r?t.getComponentEventBus():sap.ui.getCore().getEventBus()).publish(n,i,o)}const r=oui5lib.namespace("event");r.publishRequestFailureEvent=n,r.publishReadyEvent=i}(oui5lib.logger,oui5lib.util),function(e,t,n){"use strict";function i(t,n,i,o,u,a){if("boolean"!=typeof o&&(o=!0),"string"!=typeof u&&(u="GET"),"string"==typeof a&&"GET"===u){/^https?.*/.test(t)&&(t+="?"+a)}const s=new XMLHttpRequest;s.overrideMimeType("application/json");try{s.open(u,t,o)}catch(l){e.error(l.message)}r(s,n,i,o),"POST"===u?(s.setRequestHeader("Content-type","application/x-www-form-urlencoded"),s.send(a)):s.send()}function o(t,n,o,r,s){if("object"!=typeof oui5lib.mapping)throw new Error("oui5lib.mapping namespace not loaded");"boolean"!=typeof s&&(s="testing"!==oui5lib.configuration.getEnvironment());const f=oui5lib.mapping.getRequestConfiguration(t,n),c=a(o,f),g=l(c);e.info("request parameter string: "+g);const d=f.method,p=u(f);e.info("request url: "+p),i(p,r,{entity:t,request:n,requestParameters:c},s,d,g)}function r(e,n,i,o){return e.onload=function(){const o=e.status+"";if(o.match(/^20\d$/)||0===o){let t=null;try{t=JSON.parse(e.responseText)}catch(r){throw new Error("JSON is invalid: "+e.responseText)}"function"==typeof n&&n(t,i)}else t.publishRequestFailureEvent("status",e,i)},e.onerror=function(){t.publishRequestFailureEvent("error",e,i)},o&&(e.timeout=500,e.ontimeout=function(){t.publishRequestFailureEvent("timeout",e,i)}),e}function u(e){const t=e.pathname;switch(oui5lib.configuration.getEnvironment()){case"development":if("function"==typeof oui5lib.request.getDevelopmentUrl)return oui5lib.request.getDevelopmentUrl(t);break;case"testing":if("function"==typeof oui5lib.request.getTestingUrl)return oui5lib.request.getTestingUrl(t);break;case"staging":if("function"==typeof oui5lib.request.getStagingUrl)return oui5lib.request.getStagingUrl(t)}return e.protocol+"://"+e.host+"/"+t}function a(e,t){const n=t.parameters;if(n===undefined||0===n.length)return{};e!==undefined&&null!==e||(e={});let i,o,r={};return n.forEach(function(t){if(i=t.name,o=null,e[i]===undefined?"string"==typeof t["default"]&&(o=t["default"]):(o=e[i],"string"!==t.type&&(o=s(o,t))),t.required&&null===o)throw new Error("required parameter missing: "+i);null!==o&&(r[i]=o)}),r}function s(e,t){switch(t.type){case"Date":e instanceof Date&&"string"==typeof t.dateFormat&&(e=n.getDateString(e,t.dateFormat));break;case"Time":e instanceof Date&&"string"==typeof t.timeFormat&&(e=n.getTimeString(e,t.timeFormat));break;case"Array":e instanceof Array&&(e=e.toString());break;case"boolean":if("boolean"==typeof e)return e?"t":"f";break;case"int":case"float":"number"==typeof e&&(e+="")}return e}function l(e){let t="";for(let n in e)e.hasOwnProperty(n)&&(t.length>0&&(t+="&"),t+=encodeURI(n+"="+e[n]));return t}const f=oui5lib.namespace("request");f.fetchJson=i,f.sendMappingRequest=o}(oui5lib.logger,oui5lib.event,oui5lib.formatter),function(e,t){"use strict";function n(){return d}function i(){return p}function o(e){if(null===h)return!1;if("undefined"!=typeof h.views[e]){return r(h.views[e].roles)}return!0}function r(e){if(void 0===e||!(e instanceof Array))return!1;let t,n,i=!1;for(t=0,n=e.length;t<n;t++)if(u(e[t])){i=!0;break}return i}function u(e){return y.indexOf(e)>-1}function a(){const n=e.getUserProfileUrl();null!==n&&s(n),t.fetchJson("permissions.json",f,{},!1)}function s(e){t.loadJson(e,l,{},!1)}function l(e){null!==e&&(d=e.firstname+" "+e.lastname,p=e.userId,m=e.token,e.roles instanceof Array&&(y=e.roles))}function f(e){h=e}function c(){return m}let g=oui5lib.namespace("currentuser"),d=null,p=null,m=null,y=[],h=null;g.init=a,g.getName=n,g.getUserId=i,g.getToken=c,g.hasRole=u,g.hasPermissionForView=o}(oui5lib.configuration,oui5lib.request),function(e,t,n,i){"use strict";function o(e){try{return s(e).primaryKey}catch(n){t.error(n.message)}return undefined}function r(e){try{return s(e).entity}catch(n){t.error(n.message)}return undefined}function u(e,t){let i=r(e);const o=t.split("/");if(o.length>1){let e,r;for(let t=0,u=o.length;t<u-1;t++){if(e=o[t],null===(r=n.getItemByKey(i,"name",e)))return null;switch(r.type){case"object":i=r.objectItem;break;case"array":i=r.arrayItem}}t=o[o.length-1]}return n.getItemByKey(i,"name",t)}function a(e,t){return s(e).request[t]}function s(e){if("undefined"==typeof y[e]&&l(e),"undefined"==typeof y[e])throw new Error("couldn't load mapping for entity "+e);return y[e]}function l(n){const o=e.getMappingDir()+"/"+n+".json";t.info("load mapping: "+o),i.fetchJson(o,f,{entity:n},!1)}function f(e,t){const n=t.entity;if("object"==typeof e){if(e.entity!==undefined&&e.entity instanceof Array&&c(e.entity,!0),e.request!==undefined){const t=e.request.defaults;for(let n in e.request){if("defaults"===n)continue;const i=e.request[n];t!==undefined&&p(i,t),i.parameters!==undefined&&i.parameters instanceof Array&&c(i.parameters)}}y[n]=e}}function c(e,t){e!==undefined&&("boolean"!=typeof t&&(t=!1),e.forEach(function(e){switch(g(e),t&&d(e),e.type){case"array":c(e.arrayItem);break;case"object":c(e.objectItem)}}))}function g(e){"undefined"==typeof e.type&&(e.type="string"),"boolean"!=typeof e.required&&(e.required=!1)}function d(e){let t=[];"undefined"!=typeof e.validate&&e.validate instanceof Array&&(t=e.validate),e.required&&t.push("required"),t.length>0&&(e.validate=t),"undefined"==typeof e.i18n&&(e.i18n={}),"undefined"==typeof e.ui5&&(e.ui5={})}function p(e,t){["protocol","host"].forEach(function(n){e[n]===undefined&&t[n]!==undefined&&(e[n]=t[n])}),"string"==typeof e.method&&["GET","POST"].indexOf(e.method)>-1||(e.method="GET")}const m=oui5lib.namespace("mapping"),y={};m.getPrimaryKey=o,m.getEntityAttributeSpecs=r,m.getEntityAttributeSpec=u,m.getRequestConfiguration=a}(oui5lib.configuration,oui5lib.logger,oui5lib.lib.listHelper,oui5lib.request),function(e,t){"use strict";function n(e,s,l){"boolean"!=typeof l&&(l=!0),l&&(T=[]);for(let l=0,f=s.length;l<f;l++){const f=s[l],c=f.name;switch(f.type){case"array":u(e[c],f,T);continue;case"object":"object"==typeof e[c]?n(e[c],f.objectItem,!1):f.required&&T.push("missing:"+c);continue}const g=i(e,f);if(f.required&&(null===g||"string"==typeof g&&t.isBlank(g)))T.push("missing:"+c);else if(!f.required&&null===g||!r(f.type,g)){if(f.validate!==undefined&&f.validate instanceof Array&&!a(g,f.validate))T.push("invalid:"+c);else if("undefined"!=typeof f.allowedValues){if(!o(f.allowedValues,g)){T.push("notAllowed:"+c);continue}}}else T.push("wrongType:"+c)}return T}function i(e,t){const n=t.name;let i=null;return"undefined"!=typeof e[n]?i=e[n]:"undefined"!=typeof t["default"]&&(i=t["default"]),i}function o(e,t){return-1!==e.indexOf(t)}function r(e,t){switch(e){case"string":case"email":case"phone":if("string"!=typeof t)return!0;break;case"int":if("string"==typeof t&&parseInt(t)&&(t=parseInt(t)),"number"!=typeof t)return!0;break;case"boolean":if("boolean"!=typeof t&&!(t instanceof Boolean))return!0;break;case"Date":if(!(t instanceof Date))return!0}return!1}function u(e,t,i){if(e instanceof Array&&e.length>0){if("undefined"!=typeof t.arrayItem){const i=t.arrayItem;e.forEach(function(e){n(e,i,!1)})}else if("undefined"!=typeof t.allowedValues){const n=t.allowedValues;e.forEach(function(e){o(n,e)||i.push("notAllowed:"+t.name+":"+e)})}}else t.required&&i.push("missing:"+t.name)}function a(e,n){if(n.indexOf("required")>-1&&"string"==typeof e&&t.isBlank(e))return!1;let i=!0;return n instanceof Array&&n.length>0&&n.forEach(function(n){const o=n.match(/([a-zA-Z]+)_(\d+)/);let r=null;if(null!==o&&3===o.length&&(n=o[1],r=parseInt(o[2])),e instanceof Date){switch(n){case"future":l(e)||(i=!1);break;case"past":f(e)||(i=!1)}return i}switch(n){case"minimum":c(e,r)||(i=!1);break;case"maximum":g(e,r)||(i=!1);break;case"length":h(e,r)||(i=!1);break;case"minLength":b(e,r)||(i=!1);break;case"maxLength":w(e,r)||(i=!1);break;case"numbersOnly":t.isBlank(e)||p(e)||(i=!1);break;case"noNumbers":t.isBlank(e)||m(e)||(i=!1);break;case"containsLetters":t.isBlank(e)||y(e)||(i=!1);break;case"email":case"phone":t.isBlank(e)||s(n,e)||(i=!1)}}),i}function s(t,n){let i;switch(t){case"email":i=e.getEmailRegex();break;case"phone":i=e.getPhoneRegex()}return i.test(n)}function l(e){return(new Date).getTime()<e.getTime()}function f(e){return(new Date).getTime()>e.getTime()}function c(e,t){return!!((e=d(e))&&e>=t)}function g(e,t){return!!((e=d(e))&&e<=t)}function d(e){return!isNaN(e)&&("string"==typeof e&&(e=parseFloat(e)),e)}function p(e){return/^[\d]+$/.test(e)}function m(e){return/^[^\d]+$/.test(e)}function y(e){return/[A-Za-z]+/.test(e)}function h(e,t){return e.length===t}function b(e,t){return!(e.length<t)}function w(e,t){return!(e.length>t)}function D(t,n){return n instanceof RegExp||(n=e.getDateRegex()),n.test(t)}function v(t,n){return n instanceof RegExp||(n=e.getTimeRegex()),n.test(t)}const E=oui5lib.namespace("validation");let T;E.validateData=n,E.isValid=a,E.isValidDate=D,E.isValidTime=v,E.numbersOnly=p,E.hasLetters=y,E.verifyLength=h,E.minLength=b,E.maxLength=w,E.min=c,E.max=g,E.custom=s}(oui5lib.configuration,oui5lib.util),function(e,t,n,i){"use strict";function o(t,n,i,o){let a,s,l;"boolean"!=typeof o&&(o=!1);for(let o=0,r=i.length;o<r;o++)a=i[o].split(":"),e.debug("error: "+a[0]+" : "+a[1]),s=a[1],u(l=t.byId(n+"_"+s),!1);o&&r(i)}function r(e){let t,o=[];e.forEach(function(e){t=e.split(":"),o.push(n.getI18nText("validation."+t[0])+": "+t[1])});let r=n.getI18nText("validation.fix-errors")+"\n\n";for(let e=0,t=o.length;e<t;e++)r+=o[e]+"\n";i.showErrorMessage(r)}function u(e,t){void 0!==e&&"function"==typeof e.setValueState&&(t?e.setValueState("None"):e.setValueState("Error"))}function a(e){if("function"==typeof e.getContent){e.getContent().forEach(function(e){"function"==typeof e.setValueState&&e.setValueState("None")})}else if("function"==typeof e.getFormContainers){e.getFormContainers().forEach(function(e){e.getFormElements().forEach(function(e){e.getFields().forEach(function(e){"function"==typeof e.setValueState&&e.setValueState("None")})})})}}function s(e){const t=e.getValue();if(null!==e.getSelectedItem()||n.isBlank(t))e.setValueState("None");else{e.setValueState("Warning");const t=n.getI18nText("combobox.noItemSelected");e.setValueStateText(t)}}function l(e){const t=e.getDateValue(),i=e.getValue(),o=new Date(i);return"Invalid Date"==o?(e.setValueStateText(n.getI18nText("date.invalid")),e.setValueState("Error"),e.focus(),!1):o.getFullYear()!==t.getFullYear()||o.getMonth()!==t.getMonth()||o.getDate()!==t.getDate()?(e.setValueStateText(n.getI18nText("date.unequal")+" "+t.toString()),e.setValueState("Warning"),!1):(e.setValueState("None"),!0)}function f(e){e.setSelectedItem(null),e.removeAllItems()}function c(e,n){"number"!=typeof n&&(n=100);const i=t.getComponent().getRootControl();e?i.setBusyIndicatorDelay(n).setBusy(!0):i.setBusy(!1)}const g=oui5lib.namespace("ui");g.handleValidationErrors=o,g.showValidationErrors=r,g.resetValueStates=a,g.setControlValueState=u,g.clearComboBox=f,g.setBusy=c,g.checkComboBox=s,g.checkDatePicker=l}(oui5lib.logger,oui5lib.configuration,oui5lib.util,oui5lib.messages),function(e){"use strict";function t(t){function n(e){return"undefined"!=typeof s[e]&&s[e]}function i(e){null!==u&&u.setData(e,!1)}function o(e,t,n){let i,o;for(let r=0,u=e.length;r<u;r++)i=e[r][0],o=e[r][1],i===t&&o===n&&e.splice(r,1)}if(t===undefined||"string"!=typeof t)throw new Error("cannot create listBase object without primary key");let r=t,u=null,a=[],s={},l=null,f=[],c=[];return{registerProcFunction:function(e){"function"==typeof e&&(l=e)},addDataChangedListener:function(e,t){"function"==typeof e&&f.push([e,t])},removeDataChangedListener:function(e,t){"function"==typeof e&&o(f,e,t)},addItemDataChangedListener:function(e,t){"function"==typeof e&&c.push([e,t])},removeItemDataChangedListener:function(e,t){"function"==typeof e&&o(c,e,t)},addData:function(t,o){"boolean"==typeof o&&o&&this.resetData();let u,g=null;if(t instanceof Array?g=t:t instanceof Object&&(g=[t]),null===g)throw new TypeError("listBase.addData requires an Array");null===a&&(a=[]),g.forEach(function(t){n(u=t[r])?e.updateItemByKey(a,r,t):(a.push(t),s[u]=new Date),c.length>0&&c.forEach(function(e){e[0].call(e[1],u)})}),null!==l&&l(g),i(a),f.length>0&&f.forEach(function(e){e[0].call(e[1])})},resetData:function(){s={},a=null},getData:function(){return a},getItemCount:function(){return a.length},isItemLoaded:function(e){return n(e)},getItem:function(t){return e.getItemByKey(a,r,t)},addItem:function(e){return null===this.getItem(e[r])&&(a.push(e),s[e[r]]=new Date,!0)},updateItem:function(t){return e.updateItemByKey(a,r,t)},removeItem:function(t){return delete s[t],e.removeByKey(a,r,t)},filterBy:function(t,n){return e.filterBy(a,t,n)},sortBy:function(t){return e.sortBy(a,t)},getModel:function(){if("undefined"==typeof sap||"undefined"==typeof sap.ui)throw Error("openui5 is not loaded");return null===a?null:(null===u&&(u=new sap.ui.model.json.JSONModel),a.length>100&&u.setSizeLimit(a.length),u.setData(a),u)}}}oui5lib.namespace("listBase").getObject=t}(oui5lib.lib.listHelper),function(){function e(){if(this._model!==undefined){const e=this.getData();null!==e&&this._model.setData(e)}}function t(){if(this._model===undefined){if("undefined"==typeof sap||"undefined"==typeof sap.ui)return null;this._model=new sap.ui.model.json.JSONModel(this.getData())}return this._model}function n(){return this._data}function i(t){this._data=t,e()}function o(e){const t=this.getData();if(null===t)return null;const n=e.split("/");if(n.length>1){let e=t;for(let t=0,i=n.length;t<i;t++){let i=n[t];if("undefined"==typeof e[i])return null;e=e[i]}return e}return t[e]}function r(e,t){const n=this.getData();if(null===n)return!1;const i=e.split("/");if(i.length>1){let e=n;for(let t=0,n=i.length;t<n-1;t++){let n=i[t];if("undefined"==typeof e[n])return!1;e=e[n]}return e[i[i.length-1]]=t,this.setModified(),!0}return n[e]=t,this.setModified(),!0}function u(){this._modified=!0}function a(){return this._modified}function s(){return this._new}function l(e){this._new=e}function f(){return this._isLoading}function c(e){this._isLoading=e}function g(){return this._isClone}function d(e){this._isClone=e}const p=oui5lib.namespace("itemBase");p._model=undefined,p._data=null,p._new=!1,p._modified=!1,p._isLoading=!1,p._isClone=!1,p.getModel=t,p.setData=i,p.getData=n,p.setProperty=r,p.getProperty=o,p.setNew=l,p.isNew=s,p.setModified=u,p.wasModified=a,p.setLoading=c,p.isLoading=f,p.setIsClone=d,p.isClone=g}();