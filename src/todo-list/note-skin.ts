import { Skin } from "../core/appearance/skin";

export class NoteSkin extends Skin {
    cssStyle() {
        return `
                background-color:${this.randomRGBColor()};
        `;
    }
    styleSheet() {
        return ``;
    }

    randomRGBColor() {
        return `#${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}`;
    }

}
