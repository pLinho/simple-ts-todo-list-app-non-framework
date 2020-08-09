import { ViewRender } from "./view-render";

export abstract class Skin {
    static skinRef = 0;
    protected className: string;
    protected viewElement: HTMLElement | HTMLElement[];
    protected styleElement: HTMLStyleElement;

    skinRef = Skin.skinRef++;

    constructor(protected view: ViewRender) {
        this.className = '_s' + (this.skinRef).toString(32);
        this.apply(this.viewElement = this.view.rendered());
        this.applySkin();
        this.loadStyle();
    }
    // addView(view: ViewRender) {
    //     
    // }
    // removeView(view: ViewRender) {
    // 
    // }
    appliedSkin(): boolean {
        return (els => {
            let applied = false;
            els.forEach(el => !applied && el.classList.contains(this.className) ? applied = true : null)
            return applied;
        })(this.elements());
    }
    unapplySkin() {
        this.elements().forEach(el => {
            if (el.classList.contains(this.className)) {
                el.classList.remove(this.className);
            }
        });
    }
    applySkin() {
        this.elements().forEach(el => {
            if (!el.classList.contains(this.className)) {
                el.classList.add(this.className);
            }
        });
    }

    elements(): HTMLElement[] {
        if (Array.isArray(this.viewElement))
            return this.viewElement;
        return new Array(this.viewElement);
    }
    apply(el: HTMLElement): void { }
    cssStyle(): string { return null };
    destroy() {
        this.unapplySkin();
        if (this.styleElement)
            this.styleElement.remove();
    }
    loadStyle(cssStyle = this.cssStyle()) {
        if (cssStyle) {
            if (!this.styleElement)
                this.styleElement = document.createElement('style');

            this.styleElement.innerHTML = `.${this.className}{${cssStyle}}`;
            document.head.append(
                this.styleElement
            );
        }
    }
}