export abstract class EventListener<E> {
    eventHandlers: {
        [key: string]: ((callbackEvent: E) => void)[],
    } = {};
    handlerList(eventName: string) {
        if (!this.eventHandlers[eventName])
            this.eventHandlers[eventName] = [];
        return this.eventHandlers[eventName];
    }
    dispatchEvent(eventName: string, event: E) {
        this.handlerList(eventName).forEach((callback => callback(event)));
        return this;
    }
    addEventListener(eventName: string, callback: (callbackEvent: E) => void) {
        this.handlerList(eventName).push(callback);
        return this;
    }
} 