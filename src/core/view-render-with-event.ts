import { ViewRender } from "./view-render";

export abstract class ViewRenderWithEvents
    <EVENTS_NAMES extends string, CALLBACK_EVENT_CLASS> extends ViewRender {
    eventHandlers: {
        [key: string]: ((callbackEvent: CALLBACK_EVENT_CLASS) => void)[],
    } = {};
    handlerList(eventName: string) {
        if (!this.eventHandlers[eventName])
            this.eventHandlers[eventName] = [];
        return this.eventHandlers[eventName];
    }
    dispatchEvent(eventName: EVENTS_NAMES, event: CALLBACK_EVENT_CLASS) {
        this.handlerList(eventName).forEach((callback => callback(event)));
        return this;
    }
    addEventListener(eventName: EVENTS_NAMES, callback: (callbackEvent: CALLBACK_EVENT_CLASS) => void) {
        this.handlerList(eventName).push(callback);
        return this;
    }
}