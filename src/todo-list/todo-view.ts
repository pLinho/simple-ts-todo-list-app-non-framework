import { ViewRender } from "../core/view-render";
import { Note } from "./note";

export class TodoView extends ViewRender {
    private notesView: HTMLElement;
    private archivedNotes: String[] = [];

    appendNote(noteText: String) {

        const noteView = new Note(noteText);
        const noteElement =
            (noteView)
                .addEventListener('REMOVE', (note) => {
                    note.delete();
                })
                .addEventListener('ARCHIVE', (note) => {
                    this.archivedNotes.push(note.toString());
                    note.delete();
                })
                .rendered();
        this.notesView.prepend(noteElement);

        return noteElement;
    }

    copyInputValueToNotes = (inputElement: HTMLInputElement) => {
        this.appendNote(inputElement.value);
        return inputElement;
    }

    renderView() {
        const view = document.createElement('div');
        const input = document.createElement('input');
        const addButton = document.createElement('button');
        const infiniteButton = document.createElement('button');

        addButton.innerText = 'add';
        infiniteButton.innerText = '++';

        input.addEventListener('keydown', (keyEvent: KeyboardEvent) => {
            if (keyEvent.code === 'Enter')
                this.copyInputValueToNotes(input).value = '';
        });
        addButton.addEventListener('click', () => {
            this.copyInputValueToNotes(input).value = '';
        });
        infiniteButton.addEventListener('click', () => {
            let cnt = 0; while (cnt < 1000) {
                cnt++;
                this.copyInputValueToNotes(input).value = 'whoop';
            }  

        });

        view.append(input);
        view.append(addButton);
        view.append(infiniteButton);
        view.append(this.notesView = document.createElement('div'));

        return view;
    }

    render() {
        return this.renderView();
    }
}