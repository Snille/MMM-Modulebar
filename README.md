# MMM-Modulebar

This an extension for the [MagicMirror²](https://magicmirror.builders/).

This Module adds a touch menu to hide / show the defined (in config.js) modules.

### Screen shots

Module with symbols only in row mode:

![Modulebar Row Symbols](https://github.com/Snille/MMM-Modulebar/blob/master/.github/ModuleBar-01.png)

Module with symbols only in column mode:

![Modulebar Column Symbols](https://github.com/Snille/MMM-Modulebar/blob/master/.github/ModuleBar-02.png)

Module with symbols and text in column mode:

![Modulebar Column Symbols Text](https://github.com/Snille/MMM-Modulebar/blob/master/.github/ModuleBar-03.png)

Module with symbols and text in row mode:

![Modulebar Row Symbols Text](https://github.com/Snille/MMM-Modulebar/blob/master/.github/ModuleBar-04.png)

This is my own mirrors view (Bottom Bar) using some addition in the custom.css [see below](#custom-css)

![Modulebar Custom CSS](https://github.com/Snille/MMM-Modulebar/blob/master/.github/ModuleBar-05.png)

### Installation

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/Snille/MMM-Modulebar.git
````

### Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: "MMM-Modulebar",
        position: "bottom_bar", // This can be any of the regions.
		header: "Modules", // Optional
        classes: "default everyone", // Optional
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
````

### Configuration options

The following properties can be configured:

| Option             | Description
| ------------------ | -----------
| `allowForce`       | Allow the module to force modules to be shown (if hidden and locked by ex. profile-switcher). <br><br> **Possible values:** `true` or `false` <br> **Default value:** `false`
| `showBorder`       | Determines if the border around the buttons should be shown. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `minWidth`         | The minimum width for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `minHeight`        | The minimum height for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `picturePlacement` | The location of the symbol or image relative to the text. <br><br> **Possible values:** `left`, `right`, `top` or `bottom` <br> **Default value:** `left`
| `direction`        | The direction of the menu. <br><br> **Possible values:** `row`, `column`, `row-reverse` or `column-reverse`<br> **Default value:** `row`
| `buttons`          | All the different buttons in the menu. <br><br> **Possible values:** a button configuration, see [Configuring Buttons](#configuring-buttons) <br> **Default value:** Clock example button.

### Configuring Buttons

Buttons have to be placed in `buttons` in the `config`. A button contains a uniqe number as a key and a set of options in the object (`{}`).

Each button starts with it's own uniqe number (ex. "1"), then add the options needed.

| Option   | Description
| -------- | -----------
| `text`   | A string to display in the button. <br><br> **Note:** if no value is set no text will be displayed. <br> **Possible values:** `string`
| `symbol` | A symbol to display in the button. <br><br> **Note:** if no value is set no symbol will be displayed. <br> **Possible values:** See [Font Awesome](http://fontawesome.io/icons) website
| `img`    | An image to display in the button. <br><br> **Note:** it will only be displayed if no symbol is set. <br> **Possible values:** A path to an image (an url or local path)
| `size`   | The size of the symbol. <br><br> **Note:** will only have effect on a symbol. <br> **Default value:** `1` <br> **Possible values:** `1`, `2`, `3`, `4` or `5`
| `width`  | The width of the image. <br><br> **Note:** will only have effect on an image. <br> **Possible values:** `number`
| `height` | The height of the image. <br><br> **Note:** will only have effect on an image. <br> **Possible values:** `number`
| `idnum`  | The uniqe module number if you have more then one of the same module (and want to manupilate only one of the modules), you can find the module numbers if you inspect the code and then check the "console" (in a nomal webbrowser) when showing and hiding the module(s) (without setting this number) with the button. <br><br> **Possible values:** `number`
| `showUrl`| If you have something you want to "do" via visiting a link before showing the module, this is where to put the link, it will be visited (ignoring the result) before showing the module.. <br><br> **Possible values:** `url`
| `hideUrl`| If you have something you want to "do" via visiting a link after hiding the module, this is where to put the link, it will be visited (ignoring the result) after hiding the module.. <br><br> **Possible values:** `url`

An example:

````javascript
  buttons: {
    // A number (uniqe for each button).
    "1": {
      // This is a button with text and a symbol
	  // The EXACT module name (case sensitive)
	  module: "currentweather",
      text: "Current Weather",
      symbol: "cloud",
    },
    "2": {
      // A button with only a symbol and an idnum to target a specific weatherforecast module.
	  module: "weatherforecast",
      symbol: "sun-o",
      // The ID-number of the "weatherforecast" module (when you have more then one).
	  idnum: 8,
    },
    "3": {
      // A button with only a symbol and an idnum to target another specific weatherforecast module.
	  module: "weatherforecast",
      symbol: "star-o",
      // The ID-number of the other "weatherforecast" module (when you have more then one).
	  idnum: 6,
    },
    "4": {
      // A button with only text
	  module: "clock",
      text: "Clock",
    },
    "5": {
	  // A button to show and hide for example a [MMM-MotionEye](https://github.com/CatoAntonsen/MMM-MotionEye) module.
      module: "MMM-MotionEye",
      idnum: 7,
      text: "CAM1",
      showUrl: "http://MagicMirrorIP:8080/motioneye/1",
      hideUrl: "http://MagicMirrorIP:8080/motioneye/hide/1"
    },
  }
````

### Custom-CSS

Here is my CSS settings for the module that I have added to my custom.css to give it the extra special look. :)

```
/* MMM-Modulebar ------------------------------------*/
.modulebar-button {
  margin: 1px;
  padding: 1px 1px;
  border: 2px solid #fff; 
  background-color: #fff;
  color: #000;
  border-radius: 0px;
  border-radius: 50%;
  width: 60px;
  height: 60px;
}
.modulebar-picture {
  margin: 0px 0px;
  border-radius: 50%;
}
.modulebar-menu {
  align-items: flex-start;
}
/*****************************************************/
```


### Notes
* **Important:** unfortunatly positioning this module as fullscreen will result in the menu floating top left. I currently do not know how to fix this but will look into it. If you know how don't hesitate to either write me or send me a pull request!
* If the image is an local path and it does not show. Try different ways to write the local path. If this still does not work then try putting the image in a folder in your MagicMirror folder and use as local path `foldername/imagename`.
* If only heigh or width is set for an image the other size will scale to maintain it the image it's original aspect ratio.
* Module name is case sensitive.
* If both the `text` and `symbol` aren't set for a button then the button won't contain anything, but still show the border.
* The symbols are all form the [Font Awesome](http://fontawesome.io/icons) website.
* The text may contain HTML tags and will be displayed as HTML.


### The MIT License (MIT)

Copyright (c) 2017 Erik Pettersson

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**

