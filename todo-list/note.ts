import { NoteSkin } from "./note-skin";
import { ViewRender } from "../core/view-render";

export class Note extends ViewRender {
    private skin = new NoteSkin(this);
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
        const textInfo = document.createElement('span');
        const removeButton = document.createElement('button');
        const archiveButton = document.createElement('button');

        view.append(textInfo);
        view.append(archiveButton);
        view.append(removeButton);
        
        textInfo.innerText = this.note.toString();

        removeButton.innerText = '❌';
        removeButton.addEventListener('click', () => {
            this.dispatchEvent('REMOVE', this)
        });

        archiveButton.innerText = '📁';
        archiveButton.addEventListener('click', () => {
            this.dispatchEvent('ARCHIVE', this)
        });

        return view;
    }
    toString() {
        return this.note;
    }
}