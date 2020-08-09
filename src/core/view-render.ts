import { EventListener } from "./event-listener";
export abstract class ViewRender extends EventListener<any> {
    private viewElement: HTMLElement;
    abstract render(): HTMLElement;
    rendered() {
        return this.viewElement ? this.viewElement : this.viewElement = this.render();
    }
    destroy() {
        this.viewElement.remove();
    }
} 