// ==UserScript==
// @name        ed2kMultiCopy
// @namespace   ukeyim
// @version     1
// @grant       none
// @include		http://www.ed2000.com/ShowFile/*
// ==/UserScript==
//downloadurls = document.evaluate(
		//"//table[@class='CommonListArea']",
		//document,
		//null,
		//XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		//null);
//var urls = ''
//for ( var i = 0 ; i< downloadurls.snapshotLength; i++){
	//urls += downloadurls.snapshotItem(i);
	//urls += '\n';
//}
//alert(urls);
// document.onmousedown = function(e) { 
//     if (e.altKey) 
//         { 
//             console.log(e.target.href);
//             window.location.href = e.target.href;
//         } 
//     if (e.ctrlKey){
//         console.log(e.target.href);
//         if(window.clipboardData){
//             window.clipboardData.setData('text',e.target.href);
//             alert('copy success');

//         }
//     }
// };
function addButton(){
	botton = document.evaluate(
			"//input[@class='filebutton']",
			document,
			null,
			XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
			null);
	download = botton.snapshotItem(0);
	if (download){
		url = window.location.href;
		var url = window.location.href;
		url = url.split('/')[url.split('/').length -1].substring(0,6);
		newElement = document.createElement('input');
		newElement.setAttribute("value","download all");
		newElement.setAttribute("class","filebutton");
		newElement.setAttribute("type","button");
		newElement.setAttribute("data-clipboard-target","#download");
		newElement.setAttribute("data-clipboard-action","copy");
		newElement.addEventListener("click",copy1("File" + url));
		download.parentNode.insertBefore(newElement, download.nextSibling);
	}
}
function copy1(str) {
	return function(){
		var a = document.getElementsByName(str);
		var n = a.length;
		var num = 0;
		var ed2kcopy = "";
		for (var i = 0; i < n; i++) {
			if(a[i].checked) {
				ed2kcopy += a[i].value;
				ed2kcopy += "\r\n";
				num += 1;
			}
		}
		// alert(ed2kcopy);
		// console.log(ed2kcopy);
		var dummy = document.createElement("textarea");
		// Add it to the document
		document.body.appendChild(dummy);
		dummy.setAttribute("id", "dummy_id");
		document.getElementById("dummy_id").value=ed2kcopy;
		// Select it
		dummy.select();
		// Copy its contents
		try{
			document.execCommand("copy");
			alert(num + ' url copyed');
		}
		catch(err){
			alert('copy failed');
		}
		// Remove it as its not needed anymore
		document.body.removeChild(dummy);
	}
}
addButton();

