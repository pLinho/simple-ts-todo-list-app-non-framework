import { RandomBackgroundColorSkin } from "./random-background-color-skin";
import { ViewRender } from "../core/view-render";

export class Note extends ViewRender {
    private skin = new RandomBackgroundColorSkin(this);
    eventHandlers = {
        ARCHIVE: new Array<(note: Note) => void>(),
        REMOVE: new Array<(note: Note) => void>(),
    };
    constructor(private note: String) {
        super();
    }
    delete() {
        this.skin.destroy();
        this.destroy();
    }
    render() {

        const view = document.createElement('div');
        const removeButton = document.createElement('button');
        const archiveButton = document.createElement('button');

        view.innerText = this.note.toString();

        removeButton.innerText = 'REMOVE';
        removeButton.addEventListener('click', () => {
            this.dispatchEvent('REMOVE', this)
        });

        archiveButton.innerText = 'ARCHIVE';
        archiveButton.addEventListener('click', () => {
            this.dispatchEvent('ARCHIVE', this)
        });

        view.prepend(archiveButton);
        view.prepend(removeButton);
        return view;
    }
    toString() {
        return this.note;
    }
}