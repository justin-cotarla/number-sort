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
var content;

function generate(count){
	
	content.innerHTML = "";
	
	content.innerHTML += "<div class=\"separator\"></div>";
	
	for (var i = 0; i < count; i++) {
		
		var numberContainer = document.createElement("div");
		numberContainer.setAttribute("class", "numberContainer");
		numberContainer.setAttribute("id", i);
		
		var dropZone = document.createElement("div");
		dropZone.setAttribute("class", "dropZone");
		numberContainer.appendChild(dropZone);
		
		var spacer = document.createElement("div");
		spacer.setAttribute("class", "spacer");
		numberContainer.appendChild(spacer);
		
		var number = document.createElement("div");
		number.setAttribute("class", "number");
		number.setAttribute("draggable", true);
		number.style["border-color"] = "black";
		
		var numberValue = document.createTextNode(getRandom());
		number.appendChild(numberValue);
		numberContainer.appendChild(number);
		
		content.appendChild(numberContainer);
	}

	var numberContainer = document.createElement("div");
	numberContainer.setAttribute("class", "numberContainer");
	numberContainer.setAttribute("id", count);
	
	var dropZone = document.createElement("div");
	dropZone.setAttribute("class", "dropZone");
	numberContainer.appendChild(dropZone);
	
	var spacer = document.createElement("div");
	spacer.setAttribute("class", "spacer");
	numberContainer.appendChild(spacer);
	
	content.appendChild(numberContainer);
	
	
}

function submitForm() {
	
	if (countBox.value == "" || countBox.value < 1 || isNaN(parseFloat(countBox.value))) {
		
		console.log("Invalid entry");
		return;
		
	}
	
	generate(countBox.value);
}

function allowDrop(ev) {
	
	ev.preventDefault();
	
}

function clickListener(ev) {
	
	console.log(ev.target.style["border-color"]);
	
	if (ev.target.style["border-color"] == "black") {
		
		ev.target.style["border-color"] = "red";
		
	} else {
		
		ev.target.style["border-color"] = "black";
		
	}
	
}

function dragEnter(ev) {
	
	ev.target.parentNode.childNodes[1].style.width = "50px";
	ev.target.parentNode.childNodes[0].style.width = "100px";
	
}

function dragLeave(ev) {
	
	ev.target.parentNode.childNodes[1].style.width = "10px";
	ev.target.parentNode.childNodes[0].style.width = "59px";
	
}

function dragDrop(ev) {
	
	ev.preventDefault();
	var e = ev.target.parentNode;
	e.childNodes[1].style.width = "10px";
	e.childNodes[0].style.width = "59px";
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

window.addEventListener("load", function(ev){
	
	countBox = document.getElementById("count");
	submitBtn = document.getElementById("submit");
	content = document.getElementById("content");
	
	//Event delegation
	content.addEventListener("dragover", function(e) {
		
		if (e.target && (e.target.className == "dropZone" || e.target.className == "numberContainer")) {
			
			allowDrop(e);
			
		}
		
	});
	
	content.addEventListener("drop", function(e) {
		
		if (e.target && (e.target.className == "dropZone")) {
			
			dragDrop(e);
			
		}
		
	});
	content.addEventListener("dragenter", function(e) {
		
		if (e.target && (e.target.className == "dropZone")) {
			
			dragEnter(e);
			
		}
		
	});
	content.addEventListener("dragleave", function(e) {
		
		if (e.target && (e.target.className == "dropZone")) {
			
			dragLeave(e);
			
		}
		
	});
	content.addEventListener("dragstart", function(e) {
		
		console.log(e.target);
		
		if (e.target && (e.target.className == "number")) {
			
			dragStart(e);
			
		}
		
	});
	content.addEventListener("dragend", function(e) {
		
		if (e.target && (e.target.className == "number")) {
			
			dragEnd(e);
			
		}
		
	});
		content.addEventListener("click", function(e) {
		
		if (e.target && (e.target.className == "number")) {
			
			clickListener(e);
			
		}
		
	});
	
	submitBtn.addEventListener("click", function(){
		
		ev.preventDefault();
		submitForm();
		
	}, false);
	
	countBox.addEventListener("keyup", function(ev) {
		
		ev.which = ev.which || ev.keyCode;
		if(ev.which == 13) {
			submitForm();
		}
		
	}, false);
	
	countBox.focus();
	
}, false);