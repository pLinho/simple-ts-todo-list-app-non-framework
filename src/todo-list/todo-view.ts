import { ViewRender } from "../core/view-render";
import { Note } from "./note";

export class TodoView extends ViewRender {
    // private notes: String[] = [];
    private view: HTMLElement;
    private notesView: HTMLElement;

    appendNote(note: String) {
        this.notesView.prepend((new Note(note))
            .addEventListener('REMOVE', (note) => {
                note.delete();
            })
            .render());
    }

    copyInputValueToNotes = (inputElement: HTMLInputElement) => {
        this.appendNote(inputElement.value);
        return inputElement;
    }

    renderView() {
        const view = document.createElement('div');
        const input = document.createElement('input');
        const button = document.createElement('button');

        button.innerText = '+';

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