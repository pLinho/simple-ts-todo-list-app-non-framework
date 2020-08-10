import { EventListener } from "./event-listener";
let requireRender: boolean = false
const coda: (() => void)[] = [];

export abstract class ViewRender extends EventListener<any> {
    private viewElement: HTMLElement;
    abstract render(): HTMLElement;
    init() { }
    rendered() {
        const viewRender = this.viewElement !== undefined ?
            this.viewElement : this.viewElement = this.render();
        (async () => this.init())().then();
        return viewRender;
    }
    destroy() {
        this.viewElement.remove();
    }
} 