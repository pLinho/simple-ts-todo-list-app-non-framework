import { ViewRender } from "./view-render";

export abstract class Skin {
    static skinAmountRendered = 0;
    protected className: string;
    protected styleElement: HTMLStyleElement;
    constructor(protected view: ViewRender) {
        this.className = '_c' + (Skin.skinAmountRendered++).toString(32);
        this.view.render().classList.add(this.className);
        this.apply();
        if (this.css()) {
            this.styleElement = document.createElement('style')
            this.styleElement.innerHTML = `.${this.className}{${this.css()}}`;
            document.head.append(
                this.styleElement
            );
        }
    }
    abstract apply(): void;
    css(): string { return null };
    classContainerName() {

    }
    destroy() {
        this.styleElement.remove();
    }
}