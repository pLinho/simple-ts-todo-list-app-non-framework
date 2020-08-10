import { ViewRender } from "../core/view-render";
import { Note } from "./note";
import { randomText } from "./random-phrase";
import { GenID } from "../core/utils/uuid";

export class TodoView extends ViewRender {
    private notesView: HTMLElement;
    private archivedNotes: String[] = [];
    private notes: String[] = [];
    init() {
        this.loadNotes();
    }
    render() {
        return this.renderView();
    }
    appendNote(noteText: String, saveNote = true) {
        if (!noteText || noteText === '') return;
        const note = new Note(noteText);
        const id = GenID();
        const noteElement =
            (note)
                .addEventListener('REMOVE', (note) => {
                    this.removeNote(note);
                })
                .addEventListener('ARCHIVE', (note) => {
                    throw new Error('Method not implemented.');
                })
                .rendered();
        this.notesView.prepend(noteElement);
        noteElement.id = id;
        if (saveNote)
            this.saveNote(noteText);

        return noteElement;
    }
    removeNote(note: Note) {
        this.notes.splice(
            (this.notes.length - 1) -
            this.indexElementOnParent(note.rendered())
            , 1);
        this.saveNotes();
        note.delete();
    }
    indexElementOnParent(element: HTMLElement) {
        var children = element.parentElement.children;
        for (let i = 0; children.length; i++) {
            if (children.item(i) === element) {
                return i;
            }
        }
    }
    copyInputValueToNotes = (inputElement: HTMLInputElement) => {
        this.appendNote(inputElement.value);
        return inputElement;
    }
    renderView() {
        const globalView = document.createElement('div');
        const annotationInput = document.createElement('input');
        const addButton = document.createElement('button');
        const infiniteButton = document.createElement('button');

        addButton.innerText = '➕';
        infiniteButton.innerText = '🥠';

        annotationInput.addEventListener('keydown', (keyEvent: KeyboardEvent) => {
            if (keyEvent.code === 'Enter')
                this.copyInputValueToNotes(annotationInput).value = '';
        });
        addButton.addEventListener('click', () => {
            this.copyInputValueToNotes(annotationInput).value = '';
        });
        infiniteButton.addEventListener('click', () => {
            let cnt = 0;
            const add = () => {
                setTimeout(() => {
                    this.appendNote(randomText());

                    if (++cnt < 1) add();
                }, 0);
            }
            add();
        });
        globalView.append(annotationInput);
        globalView.append(addButton);
        globalView.append(infiniteButton);
        globalView.append(this.notesView = document.createElement('div'));

        return globalView;
    }

    saveNote(note: String) {
        this.notes.push(note);
        this.saveNotes();
    }

    saveNotes() {
        localStorage.setItem('__notes_', JSON.stringify(this.notes));
    }
    saveArchive() {
        localStorage.setItem('__notes_archive_', JSON.stringify(this.archivedNotes));
    }

    loadNotes() {
        this.notes.reverse().forEach(note => this.appendNote(note, false));
    }

}