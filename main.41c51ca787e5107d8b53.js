!function(){"use strict";var t={91:function(t){t.exports=function(t,e){return e||(e={}),t?(t=String(t.__esModule?t.default:t),e.hash&&(t+=e.hash),e.maybeNeedQuotes&&/[\t\n\f\r "'=<>`]/.test(t)?'"'.concat(t,'"'):t):t}},588:function(t,e,n){t.exports=n.p+"assets/favicon.png"},213:function(t,e,n){t.exports=n.p+"assets/favicon.svg"}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var a=e[r]={exports:{}};return t[r](a,a.exports,n),a.exports}n.m=t,n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,{a:e}),e},n.d=function(t,e){for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"==typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"==typeof window)return window}}(),n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},function(){var t;n.g.importScripts&&(t=n.g.location+"");var e=n.g.document;if(!t&&e&&(e.currentScript&&(t=e.currentScript.src),!t)){var r=e.getElementsByTagName("script");if(r.length)for(var o=r.length-1;o>-1&&!t;)t=r[o--].src}if(!t)throw new Error("Automatic publicPath is not supported in this browser");t=t.replace(/#.*$/,"").replace(/\?.*$/,"").replace(/\/[^\/]+$/,"/"),n.p=t}(),n.b=document.baseURI||self.location.href,function(){var t=n(91),e=n.n(t),r=new URL(n(213),n.b),o=new URL(n(588),n.b);function a(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=function(t,e){if(t){if("string"==typeof t)return i(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?i(t,e):void 0}}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,o=function(){};return{s:o,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:o}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,c=!0,d=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){d=!0,a=t},f:function(){try{c||null==n.return||n.return()}finally{if(d)throw a}}}}function i(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=new Array(e);n<e;n++)r[n]=t[n];return r}e()(r),e()(o);var c=document.querySelector(".books-grid"),d=document.querySelector(".modal"),s=document.querySelector(".overlay"),l=document.querySelector(".add-form"),u=document.querySelector(".edit-form"),f=document.querySelectorAll(".input-add"),m=document.querySelectorAll(".input-edit"),v=document.getElementById("addBookBtn"),p=document.getElementById("addBookTitle"),h=document.getElementById("addBookAuthor"),g=document.getElementById("addBookPages"),y=document.getElementById("addBookRead"),E=document.getElementById("editBookTitle"),L=document.getElementById("editBookAuthor"),b=document.getElementById("editBookPages"),S=document.getElementById("editBookRead");window.addEventListener("load",(function(){var t=localStorage.getItem("library");if(t){var e,n=a(C=JSON.parse(t));try{for(n.s();!(e=n.n()).done;)k(e.value)}catch(t){n.e(t)}finally{n.f()}}})),v.addEventListener("click",(function(){l.reset(),d.classList.add("opened"),s.classList.add("opened"),l.classList.remove("hide")})),l.addEventListener("submit",(function(t){return N(t)})),u.addEventListener("submit",(function(t){return N(t)})),s.addEventListener("click",I),f.forEach((function(t){return t.addEventListener("focus",(function(t){return q(t)}))})),m.forEach((function(t){return t.addEventListener("focus",(function(t){return q(t)}))})),f.forEach((function(t){return t.addEventListener("blur",(function(t){return A(t)}))})),m.forEach((function(t){return t.addEventListener("blur",(function(t){return A(t)}))}));var x,C=[];function B(t,e,n,r){this.title=t,this.author=e,this.pages=n,this.read=r}var w=function(){return new B(p.value,h.value,g.value,y.value)};function k(t){var e,n,r=document.createElement("div"),o=document.createElement("p"),a=document.createElement("p"),i=document.createElement("p"),l=document.createElement("p");o.classList.add("title"),a.classList.add("author"),i.classList.add("pages"),l.classList.add("read"),o.textContent=t.title,a.textContent=t.author,i.textContent=t.pages,l.textContent=t.read,r.classList.add("book-card"),r.appendChild(o),r.appendChild(a),r.appendChild(i),r.appendChild(l),r.appendChild(((n=document.createElement("button")).addEventListener("click",(function(t){return function(t){var e=t.target.parentNode;d.classList.add("opened"),s.classList.add("opened"),u.classList.remove("hide"),E.value=e.querySelector(".title").textContent,L.value=e.querySelector(".author").textContent,b.value=e.querySelector(".pages").textContent,S.value=e.querySelector(".read").textContent,x=e.querySelector(".title").textContent}(t)})),n.classList.add("btn"),n.classList.add("btn-edit"),n.textContent="Edit",n)),r.appendChild(((e=document.createElement("button")).addEventListener("click",(function(t){return function(t){C=C.filter((function(e){return e.title!==t.target.parentNode.querySelector(".title").textContent})),T(),O()}(t)})),e.classList.add("btn"),e.classList.add("btn-remove"),e.textContent="Remove",e)),c.appendChild(r)}function I(){d.classList.remove("opened"),s.classList.remove("opened"),j(),l.classList.contains("hide")||l.classList.add("hide"),u.classList.contains("hide")||u.classList.add("hide")}function q(t){var e=t.target;"P"===e.nextElementSibling.tagName&&e.nextSibling.remove(),e.classList.contains("invalid")&&e.classList.remove("invalid")}function A(t){var e=t.target,n=e.nextElementSibling.tagName;""==e.value&&(e.classList.add("invalid"),"P"!==n&&P(e,"Empty ".concat(e.name," field")))}function N(t){var e,n,r,o;t.preventDefault(),r=t.target,o=!0,r.classList.contains("add-form")&&(C.find((function(t){return t.title===p.value}))&&("P"!==p.nextElementSibling.tagName&&(p.classList.add("invalid"),P(p,"You already have this book in your library")),o=!1),f.forEach((function(t){""==t.value&&("P"!==t.nextElementSibling.tagName&&(t.classList.add("invalid"),P(t,"Empty ".concat(t.name," field"))),o=!1)}))),r.classList.contains("edit-form")&&m.forEach((function(t){""==t.value&&("P"!==t.nextElementSibling.tagName&&P(t,"Empty ".concat(t.name," field")),o=!1)})),o&&(t.target.classList.contains("add-form")?(n=w(),C.push(n),T(),k(n),I()):t.target.classList.contains("edit-form")&&((e=C.find((function(t){return t.title===x}))).title=E.value,e.author=L.value,e.pages=b.value,e.read=S.value,I(),T(),O()),j())}function P(t,e){var n=document.createElement("p");n.classList.add("error-message"),n.textContent=e,t.after(n)}function j(){var t=document.querySelectorAll(".error-message");f.forEach((function(t){t.classList.contains("invalid")&&t.classList.remove("invalid")})),m.forEach((function(t){t.classList.contains("invalid")&&t.classList.remove("invalid")})),t.forEach((function(t){return t.remove()}))}function O(){c.innerHTML="";var t,e=a(C);try{for(e.s();!(t=e.n()).done;)k(t.value)}catch(t){e.e(t)}finally{e.f()}}function T(){localStorage.setItem("library",JSON.stringify(C))}}()}();