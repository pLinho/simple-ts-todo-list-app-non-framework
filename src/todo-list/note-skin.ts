import { Skin } from "../core/appearance/skin";

export class NoteSkin extends Skin {
    style() {
        return `
                background-color:${this.randomRGBColor()};
                color: ${this.randomRGBColor()};
        `;
    }
    styleSheet() {
        return `
        button{
            background-color: ${this.randomRGBColor()};
            border: none;
            border-radius: 20px;
        }
        `;
    }

    randomRGBColor() {
        return `#${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}${
            ('00' + Math.floor(50 + Math.random() * 150).toString(16)).slice(-2)}`;
    }

}
