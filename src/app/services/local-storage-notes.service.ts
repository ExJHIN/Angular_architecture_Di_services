import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Note } from '../models/note.model';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageNotesService extends NoteService {
  private localStorageKey = 'notes';

  getNotes(): Observable<Note[]> {
    try {
      const notesJson = localStorage.getItem(this.localStorageKey);
      const notes = notesJson ? JSON.parse(notesJson) : [];
      return of(notes);
    } catch (error) {
      console.error('Error fetching notes from Local Storage:', error);
      throw new Error(`Invalid Error`);
    }
  }

  addNote(note: Note): Observable<Note> {
    try {
      const notesJson = localStorage.getItem(this.localStorageKey);
      const notes = notesJson ? JSON.parse(notesJson) : [];
      notes.push(note);
      localStorage.setItem(this.localStorageKey, JSON.stringify(notes));
      return of(note);
    } catch (error) {
      console.error('Error adding note to Local Storage:', error);
      throw new Error(`Invalid Error`);
    }
  }
}
