function toggleTipsWindow(){var e=document.getElementById("key-tips-window");"flex"===e.style.display?(e.style.opacity=0,setTimeout((function(){e.style.display="none"}),300)):(e.style.display="flex",setTimeout((function(){e.style.opacity=1}),10))}function hideTipsWindow(){var e=document.getElementById("key-tips-window");e.style.opacity=0,setTimeout((function(){e.style.display="none"}),300)}document.addEventListener("keydown",(function(e){"Enter"===e.key?toggleTipsWindow():"Escape"===e.key&&hideTipsWindow()}));