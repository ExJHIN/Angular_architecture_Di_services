import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Note } from '../models/note.model';
import { NoteService } from './note.service';

@Injectable({
  providedIn: 'root',
})
export class NotesApiService extends NoteService {
  private apiUrl = 'http://localhost:3000/notes';
  private http = inject(HttpClient);

  getNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl).pipe(
      catchError((error) => {
        console.error('Error fetching notes from API:', error);
        throw new Error(`Invalid Error`);
      }),
    );
  }

  addNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl, note).pipe(
      catchError((error) => {
        console.error('Error adding note via API:', error);
        throw new Error(`Invalid Error`);
      }),
    );
  }
}
