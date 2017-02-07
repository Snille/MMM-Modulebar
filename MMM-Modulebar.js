/* global Module */

/* Magic Mirror
 * Module: MMM-Modulebar
 *
 * By by Erik Pettersson
 * Based on the TouchNavigation Module from Brian Janssen
 *
 * MIT Licensed.
 */
Module.register("MMM-Modulebar",{
    defaults: {
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
				// Then symbol from either font-awesome or weather-icons. OBS: Full icon class name!
                symbol: "fa fa-clock-o",
            }
		}
    },

    // Define required styles.
	getStyles: function(){
		return ["weather-icons.css", "font-awesome.css", "MMM-Modulebar.css"];
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

    createButton: function (self, name, data, placement) {
        var item = document.createElement("span");
        item.id = self.identifier + "_button_" + name;
        item.className = "modulebar-button";
        item.style.minWidth = self.config.minWidth;
        item.style.minHeight = self.config.minHeight;
        
		var modules = MM.getModules();
           item.addEventListener("click", function () {
			for (var i = 0; i < modules.length; i++) {
				if (modules[i].name === name) {
					console.log(modules[i].name);
					if (modules[i].hidden) {
						modules[i].show(self.config.animationSpeed);
					}else{
						modules[i].hide(self.config.animationSpeed);
					}
				}
			}
		});

        item.style.flexDirection = {
            "right"  : "row-reverse",
            "left"   : "row",
            "top"    : "column",
            "bottom" : "column-reverse"
        }[placement];

        if (!self.config.showBorder) {
            item.style.borderColor = "black";
        }

        if (data.symbol) {
            var symbol = document.createElement("span");
            symbol.className = "modulebar-picture " + data.symbol;

            if (data.text && placement === "left") {
                symbol.style.marginRight = "4px";
            }

            item.appendChild(symbol);
        } else if (data.img) {
            var image = document.createElement("img");
            image.className = "modulebar-picture";
            image.src = data.img;

            if (data.width)  image.width  = data.width;
            if (data.height) image.height = data.height;
            
            if (data.text && placement === "left") {
                image.style.marginRight = "4px";
            }

            item.appendChild(image);
        }

        if (data.text) {
            var text = document.createElement("span");
            text.className = "modulebar-text";
            text.innerHTML = data.text;

            if ((data.symbol || data.img) && placement === "right") {
                text.style.marginRight = "4px";
            }

            item.appendChild(text);
        }

        return item;
    }
});	


