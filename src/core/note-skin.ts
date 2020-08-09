import { Skin } from "./skin";

export class RandomBackgroundColorSkin extends Skin {
    apply() { }
    css() {
        return `
                background-color: #${Math.floor(Math.random() * 255.1).toString(16)}${Math.floor(Math.random() * 255.1).toString(16)}${Math.floor(Math.random() * 255.1).toString(16)};
        `;
    }
}