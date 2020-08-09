import { ViewRender } from "./view-render";

export class Element extends ViewRender {
    private htmlElement = document.createElement(this.tagName);
    constructor(private tagName = 'div') {
        super();
    }
    render(): HTMLElement {
        return this.htmlElement;
    }
}