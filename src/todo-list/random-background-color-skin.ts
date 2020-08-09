import { Skin } from "../core/skin";

export class RandomBackgroundColorSkin extends Skin {
    cssStyle() {
        return `
                background-color:${this.randomRGBColor()};
        `;
    }

    randomRGBColor(){
        return  `#${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}`;
    }
}
