import { ViewRender } from "./view-render";

export abstract class Skin {
    static skinRef = 0;
    skinRef = Skin.skinRef++;
    protected className: string;
    protected viewElement: HTMLElement;
    protected styleElement: HTMLStyleElement;


    constructor(protected view: ViewRender) {
        this.className = '_s' + (this.skinRef).toString(32);
        this.viewElement = this.view.render();
        this.addSkinElement();

        this.apply(this.viewElement);

        if (this.cssStyle()) {
            this.styleElement = document.createElement('style');
            this.styleElement.innerHTML = `.${this.className}{${this.cssStyle()}}`;
            document.head.append(
                this.styleElement
            );
        }
    }
    removeSkinElement() {
        this.viewElement.classList.remove(this.className);
    }
    addSkinElement() {
        this.viewElement.classList.add(this.className);
    }
    apply(el: HTMLElement): void { }
    cssStyle(): string { return null };
    destroy() {
        this.removeSkinElement();
        this.styleElement.remove();
    }
}