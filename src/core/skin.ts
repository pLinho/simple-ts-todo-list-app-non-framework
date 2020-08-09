import { ViewRender } from "./view-render";

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
    encapsuleStylesheet(stylesheet: string) {

        // `.${this.className}{${cssStylesheet}}`;

        return stylesheet;
    }
    loadStylesheet(cssStylesheet = this.cssStylesheet()) {
        if (cssStylesheet) {
            if (!this.styleElement)
                this.styleElement = document.createElement('style');

            this.styleElement.innerHTML = this.encapsuleStylesheet(cssStylesheet);

            document.head.append(
                this.styleElement
            );
        }
    }
    // element and css
    cssStyle(): string { return null };
    cssStylesheet(): string { return null };
    apply(el: HTMLElement): void { }

    // 
    destroy() {
        this.removeSkinInElements();
        if (this.styleElement)
            this.styleElement.remove();
    }
}