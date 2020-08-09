import { StyleSheet } from "./stylesheet";
import { ViewRender } from "../view-render";

export abstract class Skin {
    static skinRef = 0;
    private skinRef = Skin.skinRef++;
    protected className: string;
    protected viewElement: HTMLElement | HTMLElement[];
    protected styleElement: HTMLStyleElement;

    constructor(protected view: ViewRender) {
        this.className = '_s' + (this.skinRef).toString(32);
        this.apply(this.viewElement = this.view.rendered());
        this.applySkinInElements();
        this.loadStyle();
        this.loadStyleSheet();
    }
    viewElements(): HTMLElement[] {
        if (Array.isArray(this.viewElement))
            return this.viewElement;
        return new Array(this.viewElement);
    }
    associateViewer(view: ViewRender) {
        throw new Error('Not implemented! So sorry');
    }
    removeViewer(view: ViewRender) {
        throw new Error('Not implemented! So sorry');
    }
    applySkinInElements(elements = this.viewElements()) {
        elements?.forEach(el => {
            if (!el.classList.contains(this.className)) {
                el.classList.add(this.className);
            }
        });
    }
    removeSkinInElements(elements = this.viewElements()) {
        elements?.forEach(el => {
            if (el.classList.contains(this.className)) {
                el.classList.remove(this.className);
            }
        });
    }
    /// css
    appliedSkin(): boolean {
        return (els => {
            let applied = false;
            els.forEach(el => !applied && el.classList.contains(this.className) ? applied = true : null)
            return applied;
        })(this.viewElements());
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
    loadStyleSheet(stylesheet = this.styleSheet()) {
        if (stylesheet) {
            /// if (!this.styleElement)
            ///     this.styleElement = document.createElement('style// ');return

            // this.styleElement.innerHTML =
            return new StyleSheet(stylesheet).prependSelectorInSelectors(this.className);


            // document.head.append(
            //     tis.styleElemenht
            // );
        }
        return '';
    }
    // element and css
    cssStyle(): string { return null };
    styleSheet(): string { return null };
    apply(el: HTMLElement): void { }
    destroy() {
        this.removeSkinInElements();
        if (this.styleElement)
            this.styleElement.remove();
    }
}