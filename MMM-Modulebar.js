/* global Module */

/* Magic Mirror 2
 * Module: MMM-Modulebar
 *
 * By Erik Pettersson
 * Based on the TouchNavigation Module by Brian Janssen
 *
 * MIT Licensed.
 */

//var request = require('request');

Module.register("MMM-Modulebar",{

	requiresVersion: "2.1.0",

	defaults: {
		// Allow the module to force modules to be shown (if hidden and locked by another module ex. profile-switcher).
		allowForce: false,
		// Determines if the border around the buttons should be shown.
		showBorder: true,
		// The minimum width for all the buttons.
		minWidth: "0px",
		// The minimum height for all the buttons.
		minHeight: "0px",
		// The location of the symbol relative to the text. Options: left, right, top or bottom
		picturePlacement: "left",
		// The direction of the bar. Options: row, column, row-reverse or column-reverse
		direction: "row",
		// The speed of the hide and show animation.
		animationSpeed: 1000,
		// Z-Index value for the hide all plane.
		zindex: 1000,
		// Visibility of the "unhide all button" when all is hidden (0.0 - 1.0).
		visability: 0.5,
		// The default button 1. Add your buttons in the config.
		buttons: {
			"1": {
				// Hides and show everything (Same as MMM-HideALL).
				module: "all",
				// When everything is shown - Toggle-on symbol from font-awesome.
				symbol: "toggle-on",
				// When everything is hidden - Toggle-off symbol from font-awesome.
				symbol2: "toggle-off",
				},
			"2": {
				// The modules exact name to be affected (clock in this case).
				module: "clock",
				// When module is shown - Bell symbol from font-awesome.
				symbol: "bell",
				// When module is hidden - Bell-Slash symbol from font-awesome.
				symbol2: "bell-slash",
			}
		}
	},
	// Loads the jquery library.
	getScripts: function() {
		return ["modules/MMM-Modulebar/js/jquery.js"];
	},

	// Define required styles.
	getStyles: function(){
		return ["font-awesome.css", "MMM-Modulebar.css"];
	},

	// Override dom generator.
	getDom: function() {
		var overlay = document.createElement("div");
		overlay.className = "paint-it-black";
		var menu = document.createElement("span");
		menu.className = "modulebar-menu";
		menu.id = this.identifier + "_menu";
		menu.style.flexDirection = this.config.direction;
		// Sends each button to the "createButton" function be created.
		for (var num in this.config.buttons) {
			menu.appendChild(this.createButton(this, num, this.config.buttons[num], this.config.picturePlacement, overlay));
		}
		menu.appendChild(overlay);
		return menu;
	},

	// Creates the buttons.
	createButton: function (self, num, data, placement, overlay) {
		var hidden = true;
		// Creates the span element to contain all the buttons.
		var item = document.createElement("span");
		// Builds a unique identity / button.
		item.id = self.identifier + "_button_" + num;
		// Sets a class to all buttons.
		item.className = "modulebar-button";
		
		// Check for fas, far or fab in symbol.
		if (typeof data.symbol !== 'undefined') {
			var isfasthere = data.symbol.includes("fas ");
			var isfabthere = data.symbol.includes("fab ");
			var isfarthere = data.symbol.includes("far ");
		}
		if (typeof data.symbol2 !== 'undefined') {
			var isfasthere2 = data.symbol2.includes("fas ");
			var isfabthere2 = data.symbol2.includes("fab ");
			var isfarthere2 = data.symbol2.includes("far ");
		}
		// If fas, fab or far is defined in the symbol, nothing will be added (assume user had the full symbol name).
		if (isfasthere === true || isfasthere2 === true || isfabthere === true || isfabthere2 === true || isfarthere === true || isfarthere2 === true) {
			var faclassName = "modulebar-picture ";
		// If you just typed the symbol name, fas and fa- will be added (I'll keep this for compatibility).
		} else {
			var faclassName = "modulebar-picture fas fa-";
		}
		// Makes sure the width and height is at least the defined minimum.
		item.style.minWidth = self.config.minWidth;
		item.style.minHeight = self.config.minHeight;
		// Collects all modules loaded in MagicMirror.
		var modules = MM.getModules();
		// When a button is clicked, the module either gets hidden or shown depending on current module status.
		item.addEventListener("click", function () {
			// If "all" is defined in a button, the hide all is triggered.
			if (data.module === "all") {
				// Hiding all modules.
				if (hidden) {
					// Adding the black overlay.
					$(overlay).fadeIn(self.config.animationSpeed);
					// Set black overlay on this specific Z-Index.
					$(item).css("z-index",self.config.zindex);
					// Visability of the "unhide-button".
					$(item).fadeTo(self.config.animationSpeed,self.config.visability);
					// Sets the defined symbol for all hidden.
					if (typeof data.symbol2 !== 'undefined') {
						symbol.className = faclassName + data.symbol2;
					// Set the size if it's set.
					if (data.size) {
						symbol.className += " fa-" + data.size;
						symbol.className += data.size == 1 ? "g" : "x";
					}
					// Sets the defined image for all hidden.
					} else if (typeof data.img2 !== 'undefined') {
						image.className = "modulebar-picture";
						image.src = data.img2;
					}
					// Sets the defined text for all hidden.
					if (typeof data.text2 !== 'undefined') {
						text.innerHTML = data.text2;
					}
					// Prints console.
					console.log("Hiding all!");
					// Sets the "flip flop".
					hidden = false;
				// Showing all modules.
				} else {
					// Removing the black overlay.
					$(overlay).fadeOut(self.config.animationSpeed);
					// Show the button fully again.
					$(item).fadeTo(self.config.animationSpeed, 1);
					// Sets the defined symbol for all shown.
					if (typeof data.symbol !== 'undefined') {
						symbol.className = faclassName + data.symbol;
					// Set the size if it's set.
					if (data.size) {
						symbol.className += " fa-" + data.size;
						symbol.className += data.size == 1 ? "g" : "x";
					}
					// Sets the defined image for all shown.
					} else if (typeof data.img !== 'undefined') {
						image.className = "modulebar-picture";
						image.src = data.img;
					}
					// Sets the defined text for all shown.
					if (typeof data.text !== 'undefined') {
						text.innerHTML = data.text;
					}
					// Prints console.
					console.log("Showing all!");
					// Sets the "flip flop".
					hidden = true;
				}
			} else {
				// Lists through all modules for testing.
				for (var i = 0; i < modules.length; i++) {
				// Check if the current module is the one.
				if (modules[i].name === data.module) {
					// Splits out the module number of the module with the same name.
					var idnr = modules[i].data.identifier.split("_");
					// Check if the idnum is an array or not
					if (Array.isArray(data.idnum)) {
						// If it's an array, check what numbers are in it.
						var idnumber = data.idnum.find(function(element) {
							// Number of the module is found in the array.
							return element == idnr[1]; 
						});
					// If idnum is not an array.
					} else {
						// Set the module id to hide.
						var idnumber = data.idnum;
					}
					// Checks if idnum is set in config.js. If it is, it only hides that modules with those numbers and name, if not hides all modules with the same name.
					if (idnr[1] == idnumber || data.idnum == null) {
						// Check if the module is hidden.
						if (modules[i].hidden) {
							// Check if there is a "showURL" defined.
							if (data.showUrl != null) {
								// Visiting the show URL.
								fetch(data.showUrl);
								// Prints the visited hideURL.
								console.log("Visiting show URL: "+data.showUrl);
							}
							// Shows the module.
							modules[i].show(self.config.animationSpeed, {force: self.config.allowForce});
							// Sets the defined symbol for shown module.
							if (typeof data.symbol !== 'undefined') {
								symbol.className = faclassName + data.symbol;
								// Set the size if it's set.
								if (data.size) {
									symbol.className += " fa-" + data.size;
									symbol.className += data.size == 1 ? "g" : "x";
								}
							// Sets the defined image for shown module.
							} else if (typeof data.img !== 'undefined') {
								image.className = "modulebar-picture";
								image.src = data.img;
							}
							// Sets the defined text for shown module.
							if (typeof data.text !== 'undefined') {
								text.innerHTML = data.text;
							}
							// Prints in the console what just happened (adding the ID). 
							console.log("Showing "+modules[i].name+" ID: "+idnr[1]);
						} else {
							// Hides the module.
							modules[i].hide(self.config.animationSpeed, {force: self.config.allowForce});
							// Sets the defined symbol for hidden module.
							if (typeof data.symbol2 !== 'undefined') {
								symbol.className = faclassName + data.symbol2;
								// Set the size if it's set.
								if (data.size) {
									symbol.className += " fa-" + data.size;
									symbol.className += data.size == 1 ? "g" : "x";
								}
							// Sets the defined image for hidden module.
							} else if (typeof data.img2 !== 'undefined') {
								image.className = "modulebar-picture";
								image.src = data.img2;
							}
							// Sets the defined text for hidden module.
							if (typeof data.text2 !== 'undefined') {
								text.innerHTML = data.text2;
							}
							// Prints in the console what just happened (adding the ID). 
							console.log("Hiding "+modules[i].name+" ID: "+idnr[1]);
							// Check if there is a "hideURL" defined.
							if (data.hideUrl != null) {
								// Visiting the the URL.
								fetch(data.hideUrl);
								// Prints the visited hideURL.
								console.log("Visiting hide URL: "+data.hideUrl);
								}
							}
						}
					}
				}
			}
		});
		// Fixes the aligning.
		item.style.flexDirection = {
			"right"  : "row-reverse",
			"left"   : "row",
			"top"    : "column",
			"bottom" : "column-reverse"
		}[placement];
		// Sets the border around the symbol/picture/text to black.
		if (!self.config.showBorder) {
			item.style.borderColor = "black";
		}
		// Adds the Font-Awesome symbol if specified.
		if (data.symbol) {
			var symbol = document.createElement("span");
			symbol.className = faclassName + data.symbol;
			// Sets the size on the symbol if specified.
			if (data.size) {
				symbol.className += " fa-" + data.size;
				symbol.className += data.size == 1 ? "g" : "x";
			}
			// Align the symbol with a margin.
			if (data.text && placement === "left") {
				symbol.style.marginRight = "4px";
			}
			// Adds the symbol to the item.
			item.appendChild(symbol);
		// Adds a picture if specified.
		} else if (data.img) {
			var image = document.createElement("img");
			image.className = "modulebar-picture";
			image.src = data.img;
			// Sets the size of the picture if specified.
			if (data.width)  image.width  = data.width;
			if (data.height) image.height = data.height;
			// Align the picture with a margin.
			if (data.text && placement === "left") {
				image.style.marginRight = "4px";
			}
			// Adds the picture to the item.
			item.appendChild(image);
		}
		// Adds the text if specified.
		if (data.text) {
			var text = document.createElement("span");
			text.className = "modulebar-text";
			text.innerHTML = data.text;
			// Align the text with a margin.
			if ((data.symbol || data.img) && placement === "right") {
				text.style.marginRight = "4px";
			}
			// Adds the text to the item.
			item.appendChild(text);
		}
		// All done. :)
		return item;
	}
});
