import { Skin } from "../core/appearance/skin";

export class NoteSkin extends Skin {
    style() {
        return `
            background-color:${this.randomRGBColor()};
            color: black;
            padding: 0 8px;
            margin-bottom: 8px;
            display: flex;
            align-items: center;
            border-radius: 3px;
            font-weight: bold;
            box-shadow: 3px 3px 3px rgba(0,0,0,.33);
        `;
    }
    styleSheet() {
        return `
        button{
            align-self: start;
            background-color: #fff;
            border: none;
            border-radius: 20px;
            padding: 5px 8px;
            margin: 5px 3px;
        }
        span{
            flex: auto;
            width: 100%;
            color: #333;
            font-family: 'Helvetica', sans;
            font-size: 14px;
        }
        `;
    }

    randomRGBColor() {
        return `#${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}`;
    }

}
