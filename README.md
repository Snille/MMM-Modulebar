# MMM-Modulebar

Touch buttons for turning modules on and off.
This an extension for the [MagicMirror²](https://magicmirror.builders/).
This Module adds a touch menu to hide / show the defined modules.
In your terminal, go to your MagicMirror's Module folder:

````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/Snille/MMM-Modulebar.git
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: 'MMM-Modulebar',
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
````

## Configuration options

The following properties can be configured:
| Option             | Description
| ------------------ | -----------
| `showBorder`       | Determines if the border around the buttons should be shown. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `minWidth`         | The minimum width for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `minHeight`        | The minimum height for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `picturePlacement` | The location of the symbol or image relative to the text. <br><br> **Possible values:** `left`, `right`, `top` or `bottom` <br> **Default value:** `left`
| `direction`        | The direction of the menu. <br><br> **Possible values:** `row`, `column`, `row-reverse` or `column-reverse`<br> **Default value:** `row`
| `buttons`          | All the different buttons in the menu. <br><br> **Possible values:** a button configuration, see [Configuring Buttons](#configuring-buttons) <br> **Default value:** Clock example button.

## Configuring Buttons

Buttons have to be placed in `buttons` in the `config`. A button contains a profile name as key and a configuration in an object (`{}`).
| Option   | Description
| -------- | -----------
| `text`   | A string to display in the button. <br><br> **Note:** if no value is set no text will be displayed. <br> **Possible values:** `string`
| `symbol` | A symbol to display in the button. <br><br> **Note:** if no value is set no symbol will be displayed. <br> **Possible values:** See [Font Awesome](http://fontawesome.io/icons/ and [Weather Icons]https://erikflowers.github.io/weather-icons/) websites
| `img`    | An image to display in the button. <br><br> **Note:** it will only display if no symbol is set. <br> **Possible values:** A path to an image (an url or local path)
| `width`  | The width of the image. <br><br> **Note:** will only have effect on the image. <br> **Possible values:** `number`
| `height` | The height of the image. <br><br> **Note:** will only have effect on the image. <br> **Possible values:** `number`

An example:

````javascript
  buttons: {
    // The EXACT module name (case sensitive)
    "currentweather": {
      // A button with text and a symbol
      text: "Current Weather",
      symbol: "wi wi-cloud",
    },
    "weatherforecast": {
      // A button with only a symbol
      symbol: "wi wi-day-sunny",
    },
    "clock": {
      // A button with only text
      text: "Clock",
    },
  }
````

## Notes
* **Important:** unfortunatly positioning this module as fullscreen will result in the menu floating top left. I currently do not know how to fix this but will look into it. If you know how don't hesitate to either write me or send me a pull request!
* If the image is an local path and it does not show. Try different ways to write the local path. If this still does not work then try putting the image in a folder in your MagicMirror folder and use as local path `foldername/imagename`.
* If only heigh or width is set for an image the other size will scale to maintain it the image it's original aspect ratio.
* Module name is case sensitive.
* If both the `text` and `symbol` aren't set for a button then the button won't contain anything, but still show the border.
* The symbols are all form the [Font Awesome](http://fontawesome.io/icons/) and [Weather Icons]https://erikflowers.github.io/weather-icons/) websites.
* The text may contain HTML tags and will be displayed as HTML.


## The MIT License (MIT)

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
