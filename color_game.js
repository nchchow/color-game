// variables
var numSquares = 6;
var colors = [];
var pickedColor;
var hex = false;

// HTML elem
var h1 = document.querySelector("h1");
var squares = document.querySelectorAll(".square");
var targetRbgDisplay = document.querySelector("#target-rgb-display");
var messageDisplay = document.querySelector("#message");
var resetBtn = document.querySelector("#btn-reset");
var modeBtns = document.querySelectorAll(".mode");

setUp();

// set up text, colors and event listeners
function setUp() {
	setUpBtns();
	setUpSquares();
	reset();
}

// helper functions
function setUpBtns() {
	// modeBtns
	modeBtns.forEach((btn) => {
		btn.addEventListener("click", function () {
			modeBtns.forEach((b) => {
				b.classList.remove("selected");
			});
			btn.classList.add("selected");

			this.textContent === "Easy" ? (numSquares = 3) : (numSquares = 6);
			hex = this.textContent === "Hex";

			reset();
		});
	});
	// resetBtn
	resetBtn.addEventListener("click", function () {
		reset();
	});
}

function setUpSquares() {
	for (var i = 0; i < squares.length; ++i) {
		// add click listeners to squares
		squares[i].addEventListener("click", function () {
			// get color of clicked square
			var color = hex
				? rgbToHex(this.style.backgroundColor)
				: this.style.backgroundColor;

			// compare color to pickedColor
			if (color === pickedColor) {
				changeColors(color);
				h1.style.backgroundColor = color;
				messageDisplay.textContent = "Correct!!";
				resetBtn.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}

function reset() {
	// generate all new colors
	colors = generateRandomColors(numSquares);
	// pick a new random color from array
	pickedColor = pickColor();

	// reset text contents
	targetRbgDisplay.textContent = pickedColor;
	resetBtn.textContent = "New Colors";
	messageDisplay.textContent = "";
	// change colors of squares
	for (var i = 0; i < squares.length; ++i) {
		if (colors[i]) {
			squares[i].style.display = "block";
			squares[i].style.backgroundColor = colors[i];
		} else {
			squares[i].style.display = "none";
		}
	}
	h1.style.backgroundColor = "steelblue";
}

function changeColors(color) {
	// loop through all the squares
	squares.forEach((squares) => {
		// change each color to match given color
		squares.style.backgroundColor = color;
	});
}

function pickColor() {
	var rand = Math.floor(Math.random() * colors.length);
	return colors[rand];
}

function generateRandomColors(num) {
	// make an arr
	var arr = [];
	// repeat num times
	for (var i = 0; i < num; ++i) {
		// get random color and push into array
		arr[i] = randomColor();
	}
	// return arr
	return arr;
}

function randomColor() {
	// pick a "red" from 0 - 255
	var r = Math.floor(Math.random() * 256);
	// pick a "green" from 0 - 255
	var g = Math.floor(Math.random() * 256);
	// pick a "blue" from 0 - 255
	var b = Math.floor(Math.random() * 256);

	if (hex) {
		function pad(val) {
			if (val.length < 2) {
				return "0" + val;
			}
			return val;
		}

		let hexR = pad(r.toString(16));
		let hexG = pad(g.toString(16));
		let hexB = pad(b.toString(16));

		return "#" + hexR + hexG + hexB;
	}
	return "rgb(" + r + ", " + g + ", " + b + ")";
}

function rgbToHex(rgbStr) {
	let values = rgbStr.match(/\d+/g);

	let hexR = parseInt(values[0]).toString(16);
	let hexG = parseInt(values[1]).toString(16);
	let hexB = parseInt(values[2]).toString(16);

	return "#" + hexR + hexG + hexB;
}
