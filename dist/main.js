(()=>{"use strict";var t,e=new Uint8Array(16);function n(){if(!t&&!(t="undefined"!=typeof crypto&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto)||"undefined"!=typeof msCrypto&&"function"==typeof msCrypto.getRandomValues&&msCrypto.getRandomValues.bind(msCrypto)))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return t(e)}const r=/^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i,s=function(t){return"string"==typeof t&&r.test(t)};for(var i=[],a=0;a<256;++a)i.push((a+256).toString(16).substr(1));const o=function(t,e,r){var a=(t=t||{}).random||(t.rng||n)();if(a[6]=15&a[6]|64,a[8]=63&a[8]|128,e){r=r||0;for(var o=0;o<16;++o)e[r+o]=a[o];return e}return function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=(i[t[e+0]]+i[t[e+1]]+i[t[e+2]]+i[t[e+3]]+"-"+i[t[e+4]]+i[t[e+5]]+"-"+i[t[e+6]]+i[t[e+7]]+"-"+i[t[e+8]]+i[t[e+9]]+"-"+i[t[e+10]]+i[t[e+11]]+i[t[e+12]]+i[t[e+13]]+i[t[e+14]]+i[t[e+15]]).toLowerCase();if(!s(n))throw TypeError("Stringified UUID is invalid");return n}(a)};function l(t){return[{ą:"a"},{ę:"e"},{ź:"z"},{ż:"z"},{ć:"c"},{ń:"n"},{ł:"l"},{ó:"o"},{ś:"s"},{ä:"ae"},{ö:"oe"},{ü:"ue"},{ß:"ss"},{".":""}].forEach((e=>{const[n,r]=Object.keys(e);t=t.replaceAll(n,r)})),t}class h{constructor(t,e,n=null){this.originalText=t,this.translatedText=e,this.id=n??o().toString().substr(0,5)}checkTranslation(t,e){if(t=l(t=t.toLowerCase().trim()),"to"!==e&&"from"!==e)throw new Error("Wrong direction");let n=this;return n.translatedText=n.translatedText.toLowerCase().trim(),n.translatedText=l(n.translatedText),n.originalText=n.originalText.toLowerCase().trim(),n.originalText=l(n.originalText),function(t,e,n=","){let r=t.split(n),s=e.split(n);r=r.map((t=>t.trim())),s=s.map((t=>t.trim()));let i=!0;for(let t of r)i=s.includes(t);return i}(t,"to"===e?n.originalText:n.translatedText)}static localStorageTag="learner_data";static loadFromStorage(t=!0,e=null){let n=JSON.parse(localStorage.getItem(h.localStorageTag));if(!n||0===n.length)return[];let r=n;if(r instanceof Array==0)throw new Error("Data must be array!");let s=r.map((t=>new h(t.originalText,t.translatedText,t.id)));if(t)return s;if(e)return s.find((t=>t.id===e));const i=s.length;return s[Math.floor(Math.random()*(i-0)+0)]}static saveToStorage(t){if(!(t instanceof h))throw new Error("Instance of Phrase required!");let e=h.loadFromStorage(),n=!1;for(let r=0;r<e.length;r++)e[r].id===t.id&&(e[r].originalText=t.originalText,e[r].translatedText=t.translatedText,n=!0);n||e.push(t);let r=JSON.stringify(e);localStorage.setItem(h.localStorageTag,r)}static removeFromStorage(t){let e=h.loadFromStorage(),n=e.findIndex((e=>e.id===t));if(-1===n)throw new Error("Phrase not found");e.splice(n,1),localStorage.setItem(h.localStorageTag,JSON.stringify(e))}}class c{constructor(){if(this.constructor===c)throw new Error("Cannot instantiate abstract class");this.hiddenClassName="hidden"}hide(...t){if(!(this.container instanceof Element))throw new Error("In order to use hide and show, container property must be Element.");this.container.classList.add(this.hiddenClassName)}show(...t){if(!(this.container instanceof Element))throw new Error("In order to use hide and show, container property must exist.");this.container.classList.remove(this.hiddenClassName)}}class d extends c{#t;#e;constructor(t,e="",n=""){if(super(),this.originalText=e,this.translatedText=n,this.#t=t,this.#e=!1,t){this.container=document.querySelector("#phrase-input-dialog"),this.originalTextInput=document.querySelector("#original-text-input"),this.translatedTextInput=document.querySelector("#translated-text-input"),this.confirmButton=document.querySelector(".dialog-confirm-btn"),this.cancelButton=document.querySelector(".dialog-cancel-btn"),this.closeButton=document.querySelector(".dialog-close-btn"),this.originalTextInput.value=e,this.translatedTextInput.value=n;for(let e in t)this[e]&&(this[e]instanceof HTMLButtonElement?this[e].onclick=t[e]:(this[e].onchange=t[e],console.log(this[e])))}}setOriginalTextValue(t){if(!this.originalTextInput)throw new Error("No text input present");this.originalText=t,this.originalTextInput.value=t}setTranslatedTextValue(t){if(!this.translatedTextInput)throw new Error("No text input present");this.translatedText=t,this.translatedTextInput.value=t}destroy(){for(let t in this){if("container"===t)continue;let e;t.endsWith("Input")?e="change":t.endsWith("Button")&&(e="click"),this[t].removeEventListener(e,this.#t[t])}}set inEdit(t){this.#e=t}get inEdit(){return this.#e}}class u{constructor(t,e,n){this.listElement=t,this.onDelete=e,this.onEdit=n,this.refresh(h.loadFromStorage())}refresh(t){for(this.phrases=t;this.listElement.firstChild;)this.listElement.removeChild(this.listElement.firstChild);this.phrases.forEach(((t,e)=>{let n=document.createElement("li");const r=t.id;n.setAttribute("id","phrase"+r),n.innerHTML=`\n        <div>\n        ${e+1}.${t.originalText}\n\n        </div>\n      `;const s=document.createElement("button");s.classList.add("edit-button"),s.setAttribute("id","edit"+r),s.addEventListener("click",(e=>{e.target.getAttribute("id").slice(4),console.log("Before: ",t),this.onEdit(t)})),s.textContent="Edit";const i=document.createElement("button");i.classList.add("delete-button"),i.setAttribute("id","delete"+r),i.addEventListener("click",(()=>{const e=i.getAttribute("id").slice(6);console.log("Delete id: ",e),this.onDelete(t.id)})),i.textContent="X",i.setAttribute("aria-label","Delete phrase"),n.appendChild(s),n.appendChild(i),this.listElement.appendChild(n)}))}}let g=document.querySelector(".nav-btn:first-child"),p=document.querySelector(".nav-btn:nth-child(2)"),T=document.querySelector("#learn-pane"),m=document.querySelector("#manage-pane"),x="",f="learning",w=(new class{constructor(t=null,e=null){this.form=document.querySelector("#search"),this.input=document.querySelector("#search > input[type='search']"),e&&this.form.addEventListener("submit",e),t&&this.input.addEventListener("input",t)}setInputValue(t){this.input.value=t}}((function(t){x=t.target.value}),(function(t){return E("manage",x),console.log("submit"),t.preventDefault(),!1})),new class extends c{constructor(t){super(),this.container=t,this.currentPhrase=null,this.translationDirection,this.translatedPhrase=document.querySelector("#translated-phrase"),this.learnPhraseInput=document.querySelector("#learn-phrase-input"),this.resultText=document.querySelector("#result-text"),this.checkButton=document.querySelector("#check-btn"),this.checkButton.addEventListener("click",(()=>{this.currentPhrase&&this.checkInput()})),this.checkButton.addEventListener("keyup",(t=>{this.currentPhrase&&13===t.keyCode&&(this.checkInput(),t.preventDefault())})),this.nextButton=document.querySelector("#next-btn"),this.nextButton.addEventListener("click",(()=>{this.processOnePhrase()}))}processOnePhrase(){if(this.learnPhraseInput.value="",this.resultText.textContent="",this.translationDirection=Math.floor(2*Math.random())+0,this.translationDirection=0===this.translationDirection?"to":"from",this.currentPhrase=h.loadFromStorage(!1),this.currentPhrase instanceof Array)return this.translatedPhrase.textContent="At first add phrases!",void(this.currentPhrase=null);"to"===this.translationDirection?this.translatedPhrase.textContent=this.currentPhrase.translatedText:this.translatedPhrase.textContent=this.currentPhrase.originalText}checkInput(){let t=this.learnPhraseInput.value;this.currentPhrase.checkTranslation(t,this.translationDirection)?this.#n():this.#r()}#n(){this.processOnePhrase()}#r(){this.resultText.textContent="Wrong, correct answer: ","to"===this.translationDirection?this.resultText.textContent+=this.currentPhrase.originalText:this.resultText.textContent+=this.currentPhrase.translatedText,this.resultText.classList.add("feedback-incorrect")}}(T)),v=new class extends c{constructor(t){super(),this.newOriginalText="",this.newTranslatedText="",this.phraseEdited=null,this.searchTerm="",this.container=t,this.onNewOriginalTextChange=this.onNewOriginalTextChange.bind(this),this.onNewTranslatedTextChange=this.onNewTranslatedTextChange.bind(this),this.onPhraseEdit=this.onPhraseEdit.bind(this),this.onPhraseDelete=this.onPhraseDelete.bind(this),this.onConfirm=this.onConfirm.bind(this),this.onClose=this.onClose.bind(this);const e={originalTextInput:this.onNewOriginalTextChange,translatedTextInput:this.onNewTranslatedTextChange,closeButton:this.onClose,confirmButton:this.onConfirm,cancelButton:this.onClose};this.phraseList=new u(document.querySelector(".phrases-list"),this.onPhraseDelete,this.onPhraseEdit),this.phraseInputDialog=new d(e),this.newButton=document.querySelector("#new-button"),this.newButton.addEventListener("click",(()=>{this.phraseInputDialog.show(),this.newButton.disabled=!0})),this.clearAllButton=document.querySelector("#clear-all-button"),this.clearAllButton.addEventListener("click",(()=>{const t=h.loadFromStorage(!0);for(let e of t)h.removeFromStorage(e.id);this.phraseList.refresh([])}))}onPhraseDelete(t){h.removeFromStorage(t);const e=h.loadFromStorage();this.phraseList.refresh(e)}onPhraseEdit(t){this.phraseEdited=t,console.log("Phrae in edit: ",t),this.newOriginalText=t.originalText,this.newTranslatedText=t.translatedText,this.phraseInputDialog.show(),this.phraseInputDialog.setOriginalTextValue(t.originalText),this.phraseInputDialog.setTranslatedTextValue(t.translatedText)}onNewOriginalTextChange(t){console.log("Orig:",t.target.value),this.newOriginalText=t.target.value}onNewTranslatedTextChange(t){console.log("trans: ",t.target.value),this.newTranslatedText=t.target.value}onConfirm(){let t;console.log(this.newOriginalText),console.log(this.newOriginalText,this.newTranslatedText),t=this.phraseEdited?new h(this.newOriginalText,this.newTranslatedText,this.phraseEdited.id):new h(this.newOriginalText,this.newTranslatedText),console.log("To save: ",t),h.saveToStorage(t);const e=h.loadFromStorage();this.phraseList.refresh(e),this.phraseInputDialog.setTranslatedTextValue(""),this.phraseInputDialog.setOriginalTextValue(""),this.newOriginalText="",this.newTranslatedText=""}onClose(){this.#s()}#s(){this.phraseInputDialog.hide(),this.phraseInputDialog.setTranslatedTextValue(""),this.phraseInputDialog.setOriginalTextValue(""),this.newOriginalText="",this.newTranslatedText="",this.newButton.disabled=!1,this.phraseEdited=null}show(...t){if(super.show(t),t[0]){this.searchTerm=t[0];const e=h.loadFromStorage();console.log(t[0]),this.phraseList.refresh(function(t,e,n=!1){if(t instanceof Array==0)throw new Error("Array instance must be passed");const r=t.filter((t=>(n&&(t.originalText=t.originalText.toLowerCase(),t.translatedText=t.translatedText.toLowerCase()),!(!t.originalText.startsWith(e)&&!t.translatedText.startsWith(e)))));return console.log(r),r}(e,this.searchTerm))}}}(m);function E(t,...e){switch(t){case"learning":if("learning"===f)return!0;f="learning",w.show(...e),v.hide(),g.classList.add("active-nav-btn"),p.classList.remove("active-nav-btn");break;case"manage":if("manage"===f)return void v.show(...e);f="manage",v.show(...e),w.hide(),g.classList.remove("active-nav-btn"),p.classList.add("active-nav-btn")}return!1}g.addEventListener("click",(()=>{E("learning")||w.processOnePhrase()})),p.addEventListener("click",(()=>{E("manage")})),w.processOnePhrase()})();