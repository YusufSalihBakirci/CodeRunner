var head = document.querySelector("head");
function runProject(){

    console.log("project run");
   var JSData = document.querySelector(".editing-js").value;
   var HTMLData=document.querySelector("#editing").value;
   var CSSData=document.querySelector(".editing-css").value;
   
   var newStyle=document.createElement("style");
   newStyle.innerHTML=CSSData;
   head.append(newStyle);

   document.querySelector("body > div > div > div.outputContainer > div").innerHTML=HTMLData

   var newScript=document.createElement("script");
   newScript.innerHTML=JSData;
   head.append(newScript);

   console.log("" + JSData +" " + HTMLData +" " + CSSData);

}

function changeView(){
    var MaximizedController=document.querySelector(".codeBoxes").style.opacity;
    if(MaximizedController==1 ||MaximizedController==""){
    $(document).find(".codeBoxes").animate({bottom:"-450px",opacity:0}, 1000);
    $(document).find(".outputContainer").animate({height:"100%",opacity:1}, 1000);
    $(document).find(".downCodeBox").animate({bottom:"8px",opacity:1}, 900);
    document.querySelector(".minMax").innerText="Maximized";
}
else{
    $(document).find(".codeBoxes").animate({bottom:"0",opacity:1}, 1000);
    $(document).find(".outputContainer").animate({height:"60%",opacity:1}, 1000);
    $(document).find(".downCodeBox").animate({bottom:"351px",opacity:1}, 1000);
    document.querySelector(".minMax").innerText="Minimized";
}
}

document.querySelector("#ddlHistories").addEventListener("change" , function(){
    var id =document.querySelector("#ddlHistories").value;
    var x =localStorage.getItem(id+"_js");
    var y =localStorage.getItem(id+"_html");
    var z =localStorage.getItem(id+"_css");
    updateJs(x);
    update(y);
    updateCss(z);
})



function update(text) {
    console.log(text);
  let result_element = document.querySelector("#highlighting-content-html");
  // Handle final newlines (see article)
  if(text[text.length-1] == "\n") {
    text += " ";
  }
  // Update code
  result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
  // Syntax Highlight
  Prism.highlightElement(result_element);
}

function updateCss(text) {
    console.log(text);
    let result_element = document.querySelector("#highlighting-content-css");
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
  }

  function updateJs(text) {
    console.log(text);
    let result_element = document.querySelector("#highlighting-content-js");
    // Handle final newlines (see article)
    if(text[text.length-1] == "\n") {
      text += " ";
    }
    // Update code
    result_element.innerHTML = text.replace(new RegExp("&", "g"), "&amp;").replace(new RegExp("<", "g"), "&lt;"); /* Global RegExp */
    // Syntax Highlight
    Prism.highlightElement(result_element);
  }

function sync_scroll(element) {
  /* Scroll result to scroll coords of event - sync with textarea */
  let result_element = document.querySelector(".highlightingHTML");
  // Get and set x and y
  result_element.scrollTop = element.scrollTop;
  result_element.scrollLeft = element.scrollLeft;
}

function sync_scrollCss(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector(".highlightingCss");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }

  function sync_scrollJs(element) {
    /* Scroll result to scroll coords of event - sync with textarea */
    let result_element = document.querySelector(".highlightingJs");
    // Get and set x and y
    result_element.scrollTop = element.scrollTop;
    result_element.scrollLeft = element.scrollLeft;
  }

function check_tab(element, event) {
  let code = element.value;
  if(event.key == "Tab") {
    /* Tab key pressed */
    event.preventDefault(); // stop normal
    let before_tab = code.slice(0, element.selectionStart); // text before tab
    let after_tab = code.slice(element.selectionEnd, element.value.length); // text after tab
    let cursor_pos = element.selectionEnd + 1; // where cursor moves after tab - moving forward by 1 char to after tab
    element.value = before_tab + "\t" + after_tab; // add tab char
    // move cursor
    element.selectionStart = cursor_pos;
    element.selectionEnd = cursor_pos;
    update(element.value); // Update text to include indent
  }
}