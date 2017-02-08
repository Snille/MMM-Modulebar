/* global Module */

/* Magic Mirror 2
 * Module: MMM-Modulebar
 *
 * By Erik Pettersson
 * Based on the TouchNavigation Module by Brian Janssen
 *
 * MIT Licensed.
 */
Module.register("MMM-Modulebar",{
    defaults: {
        // Allow the module to be forced to should be shown (if hidden by a profile-switcher).
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
        // The default button, add in the config fore more buttons.
		buttons: {
            "clock": {
				// The text to be displayed in the button.
				text:	"Clock",
				// Then symbol from font-awesome!
                symbol: "clock-o",
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

        for (var name in this.config.buttons) {
            menu.appendChild(this.createButton(this, name, this.config.buttons[name], this.config.picturePlacement));
        }

        return menu;
    },
	// Creates the buttons.
    createButton: function (self, name, data, placement) {
		// Creates the span elemet to contain all the buttons.
		var item = document.createElement("span");
        item.id = self.identifier + "_button_" + name;
        item.className = "modulebar-button";
        item.style.minWidth = self.config.minWidth;
        item.style.minHeight = self.config.minHeight;
		// Collects all modules loaded in MagicMirror.
		var modules = MM.getModules();
			// When a button is clicked, the module either gets hidden or shown depending on current module status.
			item.addEventListener("click", function () {
			for (var i = 0; i < modules.length; i++) {
				if (modules[i].name === name) {
					if (modules[i].hidden) {
						modules[i].show(self.config.animationSpeed, {force: self.config.allowForce});
						console.log("Showing "+modules[i].name);
					}else{
						modules[i].hide(self.config.animationSpeed, {force: self.config.allowForce});
						console.log("Hiding "+modules[i].name);
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
            symbol.className = "modulebar-picture fa fa-" + data.symbol;
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

