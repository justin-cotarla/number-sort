/*
*
*	NumberSort
*      by
* Justin Cotarla
*
*/

var MAX = 99;
var MIN = 1;

var countBox;
var submitBtn;

function generate(count){
	
	content.innerHTML = "";
	
	for (var i = 0; i < count; i++) {
		
		content.innerHTML += "<div class=\"numberContainer\" ondragover=\"allowDrop(event);\" id=" + i + "><div class=\"dropZone\" ondragover=\"allowDrop(event);\" ondrop=\"dragDrop(event);\" ondragleave=\"dragLeave(this);\" ondragenter=\"dragEnter(event);\"></div><div class=\"spacer\"></div><div class=\"number\" draggable=\"true\" ondragstart=\"dragStart(event);\" ondragend=\"dragEnd(event);\" onclick=\"pressListener(this);\">" + getRandom() + "</div></div>";

	}
	
	content.innerHTML += "<div class=\"numberContainer\" id=" + count+ "><div class=\"dropZone\" ondragover=\"allowDrop(event);\" ondrop=\"dragDrop(event);\" ondragleave=\"dragLeave(this);\" ondragenter=\"dragEnter(event);\"></div><div class=\"spacer\"></div></div>";
	
}

function submitListener() {
	
	if (countBox.value == "" || countBox.value < 1 || isNaN(parseFloat(countBox.value))) {
		
		console.log("Invalid entry");
		return;
		
	}
	
	generate(countBox.value);
}

function allowDrop(ev) {
	
	ev.preventDefault();
	
}

function dragEnter(ev) {
	
	ev.target.parentNode.childNodes[1].style.width = "50px";
	ev.target.parentNode.childNodes[0].style.width = "100px";
	
}

function dragLeave(e) {
	
	e.parentNode.childNodes[1].style.width = "7px";
	e.parentNode.childNodes[0].style.width = "59px";
	
}

function dragDrop(ev) {
	
	ev.preventDefault();
	var e = ev.target.parentNode;
	e.childNodes[1].style.width = "7px";
	e.childNodes[0].style.width = "59px";
	console.log(ev.dataTransfer.getData("id"));
	e.parentNode.insertBefore(document.getElementById(ev.dataTransfer.getData("id")), e);
	
}

function dragStart(ev) {

	ev.target.style.opacity = 0.5;
	ev.target.style.cursor = "move";
	ev.dataTransfer.setData("id", ev.target.parentElement.id);
	var zones = document.getElementsByClassName("dropZone");
	for(var i = 0; i < zones.length; i++) {
		
		if (zones[i].parentElement.id == ev.target.parentElement.id) {
			i++;
			continue;
		}
		zones[i].style["display"] = "inline-block";
		
	}
	
}

function dragEnd(ev) {

	ev.target.style.opacity = 1;
	var zones = document.getElementsByClassName("dropZone");
	for(var i = 0; i < zones.length; i++) {
		
		zones[i].style["display"] = "none";
		
	}
	
}

function getRandom() {
	
	return Math.floor(Math.random() * (MAX - MIN  + 1)) + MIN;
	
}

window.addEventListener("load", function(event){
	
	countBox = document.getElementById("count");
	submitBtn = document.getElementById("submit");
	content = document.getElementById("content");
	
	submitBtn.addEventListener("click", function(){
		
		event.preventDefault();
		submitListener();
		
	}, false);
	
	
}, false);