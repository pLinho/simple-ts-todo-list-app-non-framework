import { ViewRender } from "../core/view-render";

export class Input extends ViewRender {
    buttonView = document.createElement('input');

    render() {
        return this.buttonView;
    };
}