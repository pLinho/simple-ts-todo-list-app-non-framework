import { ViewRenderWithEvents } from "../core/view-render-with-event";

export class Note extends ViewRenderWithEvents<'ARCHIVE' | 'REMOVE', Note> {
    internalView: HTMLElement = document.createElement('div');
    eventHandlers = {
        ARCHIVE: new Array<(note: Note) => void>(),
        REMOVE: new Array<(note: Note) => void>(),
    };

    constructor(private note: String) {
        super();
        this.internalView.innerText = note.toString();
    }

    toString() {
        return this.note;
    }

    delete() {
        this.internalView.remove();
    }

    render() {
        const removeButton = document.createElement('button');
        const archiveButton = document.createElement('button');

        removeButton.innerText = 'REMOVE';
        removeButton.addEventListener('click', () => {
            this.dispatchEvent('REMOVE', this)
        });

        archiveButton.innerText = 'ARCHIVE';
        archiveButton.addEventListener('click', () => {
            this.dispatchEvent('ARCHIVE', this)
        });

        this.internalView.prepend(archiveButton);
        this.internalView.prepend(removeButton);
        return this.internalView;
    }

}