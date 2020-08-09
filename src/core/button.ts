import { ViewRender } from "./view-render";
import { ViewRenderWithEvents } from "./view-render-with-event";

export class Button extends ViewRenderWithEvents<'CLICK', Event> {
    buttonView = document.createElement('button');

    render() {
        return this.buttonView;
    };
}