import { ViewRenderWithEvents } from "../core/view-render-with-event";
import { RandomBackgroundColorSkin } from "./random-background-color-skin";

export class Note extends ViewRenderWithEvents<'ARCHIVE' | 'REMOVE', Note> {
    private skin = new RandomBackgroundColorSkin(this);
    internalView: HTMLElement;
    eventHandlers = {
        ARCHIVE: new Array<(note: Note) => void>(),
        REMOVE: new Array<(note: Note) => void>(),
    };


    constructor(private note: String) {
        super();
    }

    delete() {
        this.skin.destroy();
        this.internalView.remove();
    }

    render() {
        if (this.internalView) {
            return this.internalView;
        }
        this.internalView = document.createElement('div');
        const removeButton = document.createElement('button');
        const archiveButton = document.createElement('button');

        this.internalView.innerText = this.note.toString();

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

    toString() {
        return this.note;
    }
}