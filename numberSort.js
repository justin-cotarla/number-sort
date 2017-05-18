/*
*
*	NumberSort
*      by
* Justin Cotarla
*
*/

var MAX = 99;
var MIN = 1;

var MAX_CELLS = 100;

var SPACER_NODE = 0;
var NUMBER_NODE = 1

var DIR_LEFT = -1;
var DIR_RIGHT = 1;

var CELL_SIZE = 65;

var countBox;
var submitBtn;
var content;
var cursor;

var isGenerated = false;

function generate(count){
	
	content.innerHTML = "";
	
	/*cursor = document.createElement("div");
	cursor.setAttribute("class", "cursor");
	content.appendChild(cursor);*/
	
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
		
		if (i == 0) {
			
			cursor = document.createElement("div");
			cursor.setAttribute("class", "cursor");
			numberContainer.appendChild(cursor);
			
		}
		
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
	
	content.style.padding = "10px " + (getPadding(content.offsetWidth)) + "px";
	
	isGenerated = true;
}

function submitForm() {
	
	if (countBox.value == "" || countBox.value < 1 || isNaN(parseFloat(countBox.value))) {
		
		console.log("Invalid entry");
		return;
		
	}
	
	if (countBox.value > MAX_CELLS) {
		
		generate(MAX_CELLS);
		
	} else {
		
		generate(countBox.value);
		
	}
}

function allowDrop(ev) {
	
	ev.preventDefault();
	
}

function clickListener(ev) {
	
	
	if (ev.target.style["border-color"] == "black") {
		
		ev.target.style["border-color"] = "red";
		
	} else {
		
		ev.target.style["border-color"] = "black";
		
	}
	
}

function dragEnter(ev) {
	
	ev.target.parentNode.childNodes[NUMBER_NODE].style.width = "50px";
	ev.target.parentNode.childNodes[SPACER_NODE].style.width = "100px";
	
}

function dragLeave(ev) {
	
	ev.target.parentNode.childNodes[NUMBER_NODE].style.width = "10px";
	ev.target.parentNode.childNodes[SPACER_NODE].style.width = "59px";
	
}

function dragDrop(ev) {
	
	ev.preventDefault();
	
	//Cursor
	var cursorIndex = Array.prototype.indexOf.call(content.childNodes, cursor.parentNode);
	
	var e = ev.target.parentNode;
	e.childNodes[NUMBER_NODE].style.width = "11px";
	e.childNodes[SPACER_NODE].style.width = "59px";
	e.parentNode.insertBefore(document.getElementById(ev.dataTransfer.getData("id")), e);
	
	content.childNodes[cursorIndex].appendChild(cursor);
	
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

function getPadding(contentSize) {
	
	return (contentSize - (Math.floor(contentSize / CELL_SIZE) - 0.1) * CELL_SIZE) / 2;
	
}

function moveCursor(direction) {
	
	var index = Array.prototype.indexOf.call(content.childNodes, cursor.parentNode);
	
	if (direction + index >= 0 && direction + index < content.childNodes.length) {
		
		content.childNodes[index + direction].appendChild(cursor);
		
	}
	

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
	
	window.addEventListener("resize", function() {
		
		if (isGenerated) {
			
			content.style.padding = "10px " + (getPadding(content.offsetWidth)) + "px";
			
		}
		
	});
	
	countBox.addEventListener("keydown", function(ev) {
		
		ev.which = ev.which || ev.keyCode;
		if(ev.which == 13) {
			submitForm();
		}
		
		
	});
	
	submitBtn.addEventListener("click", function(){
		
		ev.preventDefault();
		submitForm();
		
	});
	
	window.addEventListener("keydown", function(ev) {
		
		if (!isGenerated) {
			return;
		}
			
		
		ev.which = ev.which || ev.keyCode;
		
		//Left
		if(ev.which == 37) {
			
			moveCursor(DIR_LEFT);
			
		//Right	
		} else if (ev.which == 39) {
			
			moveCursor(DIR_RIGHT);
			
		}
	});
	
	countBox.focus();
	
});