export abstract class ViewRender {
    private viewElement: HTMLElement;
    abstract render(): HTMLElement;
    rendered() {
        return this.viewElement ? this.viewElement : this.viewElement = this.render();
    }
} 