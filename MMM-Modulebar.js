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
        // The default button 1. Add your buttons in the config.
		buttons: {
            "1": {
				// The modules exact name to be affected.
				module: "clock",
				// The text to be displayed in the button.
				text:	"Clock",
				// Then symbol from font-awesome!
                symbol: "clock-o"
            }
		}
    },

    // Define required styles.
	getStyles: function(){
		return ["font-awesome.css", "MMM-Modulebar.css"];
	},

    // Override dom generator.
    getDom: function() {
        var menu = document.createElement("span");
        menu.className = "modulebar-menu";
        menu.id = this.identifier + "_menu";
        menu.style.flexDirection = this.config.direction;
		// Sends each button to the "createButton" function be created.
		for (var num in this.config.buttons) {
			menu.appendChild(this.createButton(this, num, this.config.buttons[num], this.config.picturePlacement));
        }

        return menu;
    },

	// Creates the buttons.
    createButton: function (self, num, data, placement) {
    	var ii = -1;
		// Creates the span element to contain all the buttons.
		var item = document.createElement("span");
        // Builds a unique identity / button.
		item.id = self.identifier + "_button_" + num;
        // Sets a class to all buttons.
		item.className = "modulebar-button";
        // Makes sure the width and height is at least the defined minimum.
		item.style.minWidth = self.config.minWidth;
        item.style.minHeight = self.config.minHeight;
		// Collects all modules loaded in MagicMirror.
		var modules = MM.getModules();
		// When a button is clicked, the module either gets hidden or shown depending on current module status.
		item.addEventListener("click", function () {

			if (data.module === "all") {

				if( ii === -1){
				MM.getModules().exceptWithClass('MMM-Modulebar').enumerate(function(allmodule) {
					allmodule.hide(1000, function() {
					//Module hidden.
					});
				});
				ii = -1 * ii;
				}else{
					MM.getModules().exceptWithClass('MMM-Modulebar').enumerate(function(allmodule) {
					allmodule.show(1000, function() {
					//Module hidden.
					});
				});
				ii = -1 * ii;
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
							// Prints in the console what just happened (adding the ID). 
							console.log("Showing "+modules[i].name+" ID: "+idnr[1]);
						}else{
							// Hides the module.
							modules[i].hide(self.config.animationSpeed, {force: self.config.allowForce});
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
            symbol.className = "modulebar-picture " + data.symbol;
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



