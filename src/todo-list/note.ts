import { ViewRender } from "../core/view-render";

export class Note extends ViewRender {
    view: HTMLElement = document.createElement('div');
    eventHandlers = {
        ARCHIVE: new Array<(note: Note) => void>(),
        REMOVE: new Array<(note: Note) => void>(),
    };

    constructor(note: String) {
        super();
        this.view.innerText = note.toString();
    }

    delete() {
        this.view.remove();
    }

    render() {
        const removeButton = document.createElement('button');
        const archiveButton = document.createElement('button');

        removeButton.innerText = 'x';
        removeButton.addEventListener('click', () => {
            this.dispatchEvent('REMOVE')
        });

        archiveButton.innerText = '↓';
        archiveButton.addEventListener('click', () => {
            this.dispatchEvent('ARCHIVE')
        });

        this.view.prepend(archiveButton);
        this.view.prepend(removeButton);
        return this.view;
    }

    dispatchEvent(event: 'ARCHIVE' | 'REMOVE') {
        this.eventHandlers[event].forEach((callback => callback(this)));
        return this;
    }

    addEventListener(event: 'ARCHIVE' | 'REMOVE', callback: (note: Note) => void) {
        this.eventHandlers[event].push(callback);
        return this;
    }
}