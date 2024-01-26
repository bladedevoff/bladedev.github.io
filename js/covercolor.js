const ColorMode=coverColorConfig.mode;function coverColor(){const e=document.getElementById("post-cover")?.src;if(e)switch(ColorMode){case"local":localColor(e);break;case"api":handleApiColor(e);break;case"api_redis":img2color(e)}else setThemeColors()}function handleApiColor(e){const t=saveToLocal.get("Solitude")||{};if(t.postcolor&&t.postcolor[e]){const o=t.postcolor[e].value,[n,r,c]=o.match(/\w\w/g).map((e=>parseInt(e,16)));setThemeColors(o,n,r,c)}else img2color(e)}function localColor(e){const t=new Image;t.crossOrigin="Anonymous",t.onload=function(){const e=document.createElement("canvas");e.width=this.width,e.height=this.height;const t=e.getContext("2d");t.drawImage(this,0,0);const o=t.getImageData(0,0,this.width,this.height).data,{r:n,g:r,b:c}=calculateRGB(o);let l=rgbToHex(n,r,c);"light"===getContrastYIQ(l)&&(l=LightenDarkenColor(l,-50)),setThemeColors(l,n,r,c)},t.src=e}function calculateRGB(e){let t=0,o=0,n=0;for(let r=0;r<e.length;r+=20)t+=e[r],o+=e[r+1],n+=e[r+2];return t=Math.floor(t/(e.length/4/5)),o=Math.floor(o/(e.length/4/5)),n=Math.floor(n/(e.length/4/5)),{r:t,g:o,b:n}}function rgbToHex(e,t,o){return"#"+[e,t,o].map((e=>e.toString(16).padStart(2,"0"))).join("")}function getContrastYIQ(e){var t=colorRgb(e).match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/),o=299*t[1]+587*t[2]+114*t[3];return(o/=255e3)>=.5?"light":"dark"}function LightenDarkenColor(e,t){let o=!1;"#"===e[0]&&(e=e.slice(1),o=!0);const n=parseInt(e,16),r=Math.min(255,Math.max(0,(n>>16)+t)),c=Math.min(255,Math.max(0,(n>>8&255)+t));return`${o?"#":""}${(Math.min(255,Math.max(0,(255&n)+t))|c<<8|r<<16).toString(16).padStart(6,"0")}`}function colorHex(e){let t=e;if(/^(rgb|RGB)/.test(t)){return"#"+t.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",").map((e=>{const t=Number(e).toString(16);return 1===t.length?"0"+t:t})).join("")}if(/^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/.test(t)){const e=t.replace(/#/,"").split("");if(6===e.length)return t;if(3===e.length){return"#"+e.map((e=>e+e)).join("")}}return t}function colorRgb(e){if(!e||"string"!=typeof e)return e;const t=e.toLowerCase();let o="";if(t&&(/^#([0-9a-fA-f]{3})$/.test(t)||/^#([0-9a-fA-f]{6})$/.test(t))){o=4===t.length?t.replace(/^#(.)/g,"#$1$1"):t;const e=o.slice(1).match(/.{2}/g).map((e=>parseInt(e,16)));return`rgb(${e[0]}, ${e[1]}, ${e[2]})`}return t}function img2color(e){if(e.startsWith("http://localhost"))localColor(e);else{const t=coverColorConfig.api+encodeURIComponent(e);fetch(t).then((e=>e.json())).then((t=>{const o=t.RGB,[n,r,c]=o.match(/\w\w/g).map((e=>parseInt(e,16)));if(setThemeColors(o,n,r,c),"api"===ColorMode){const t=Date.now()+coverColorConfig.time,n=saveToLocal.get("Solitude")||{};n.postcolor=n.postcolor||{},n.postcolor[e]={value:o,expiration:t},saveToLocal.set("Solitude",n)}})).catch((e=>{console.error("请检查API是否正常！\n"+e),setThemeColors()}))}}function setThemeColors(e,t=null,o=null,n=null){if(e){if(document.documentElement.style.setProperty("--sco-main",e),document.documentElement.style.setProperty("--sco-main-op",e+"23"),document.documentElement.style.setProperty("--sco-main-op-deep",e+"dd"),document.documentElement.style.setProperty("--sco-main-none",e+"00"),t&&o&&n)if(Math.round((299*parseInt(t)+587*parseInt(o)+114*parseInt(n))/1e3)<125){for(var r=document.getElementsByClassName("card-content"),c=0;c<r.length;c++)r[c].style.setProperty("--sco-card-bg","var(--sco-white)");var l=document.getElementsByClassName("author-info__sayhi");for(c=0;c<l.length;c++)l[c].style.setProperty("background","var(--sco-white-op)"),l[c].style.setProperty("color","var(--sco-white)")}document.getElementById("coverdiv").classList.add("loaded"),initThemeColor()}else document.documentElement.style.setProperty("--sco-main","var(--sco-theme)"),document.documentElement.style.setProperty("--sco-main-op","var(--sco-theme-op)"),document.documentElement.style.setProperty("--sco-main-op-deep","var(--sco-theme-op-deep)"),document.documentElement.style.setProperty("--sco-main-none","var(--sco-theme-none)"),initThemeColor()}function initThemeColor(){let e;e=(window.scrollY||document.documentElement.scrollTop)>0?getComputedStyle(document.documentElement).getPropertyValue("--sco-card-bg"):PAGE_CONFIG.is_post?getComputedStyle(document.documentElement).getPropertyValue("--sco-main"):getComputedStyle(document.documentElement).getPropertyValue("--sco-background"),changeThemeColor(e)}function changeThemeColor(e){const t=document.querySelector('meta[name="theme-color"]');t&&t.setAttribute("content",e)}