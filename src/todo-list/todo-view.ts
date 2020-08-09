import { ViewRender } from "../core/view-render";
import { Note } from "./note";

export class TodoView extends ViewRender {
    private view: HTMLElement;
    private notesView: HTMLElement;
    private archivedNotes: String[] = [];

    appendNote(note: String) {
        const noteView =
            (new Note(note))
                .addEventListener('REMOVE', (note) => {
                    note.delete();
                })
                .addEventListener('ARCHIVE', (note) => {
                    this.archivedNotes.push(note.toString());
                    note.delete();
                })
                .render();
        this.notesView.prepend(noteView);
        return noteView;
    }

    copyInputValueToNotes = (inputElement: HTMLInputElement) => {
        this.appendNote(inputElement.value);
        return inputElement;
    }

    renderView() {
        const view = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');

        button.innerText = 'add';

        input.addEventListener('keyup', (keyEvent: KeyboardEvent) => {
            if (keyEvent.code === 'Enter')
                this.copyInputValueToNotes(input).value = '';
        });
        button.addEventListener('click', () => {
            this.copyInputValueToNotes(input).value = '';
        });

        view.append(input);
        view.append(button);
        view.append(this.notesView = document.createElement('div'));

        return view;
    }

    render() {
        return this.view ? this.view : this.view = this.renderView();
    }
}