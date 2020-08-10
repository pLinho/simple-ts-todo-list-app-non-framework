import { Skin } from "../core/appearance/skin";

export class NoteSkin extends Skin {
    color: string;
    style() {
        return `
            background-color:${this.color || (this.color = this.randomRGBColor())};
            color: black;
            padding: 0 8px;
            margin-bottom: 8px;
            display: flex;)
            align-items: center;
            border-radius: 3px;
            box-shadow: 3px 3px 3px rgba(0,0,0,.33);
        `;
    }
    styleSheet() {

        return `
        :root:hover{
            cursor: default;
            background-color: ${this.darken(this.color || (this.color = this.randomRGBColor()), .6)}
        }
        span:hover{
            color: #ffffff;
        }
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

    darken(color: string, pct: number) {
        let r: number = eval('0x' + color.substr(1, 2));
        let g: number = eval('0x' + color.substr(3, 2));
        let b: number = eval('0x' + color.substr(5, 2));

        if (pct <= 1 && pct >= 0) {
            // darkness
            pct = 1 - pct;
            r = Math.floor(r * (pct));
            g = Math.floor(g * (pct));
            b = Math.floor(b * (pct));
        } else if (pct < 0 && pct >= -1) {
            // lightness
            r = Math.floor(((r - 255) * (-pct)) - r);
            g = Math.floor(((g - 255) * (-pct)) - g);
            b = Math.floor(((b - 255) * (-pct)) - b);
        }

        return `#${
            ('00' + r.toString(16)).slice(-2) +
            ('00' + g.toString(16)).slice(-2) +
            ('00' + b.toString(16)).slice(-2)}`;
    }

    randomRGBColor() {
        return `#${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}${
            ('00' + Math.floor(150 + Math.random() * 105.01).toString(16)).slice(-2)}`;
    }
}
