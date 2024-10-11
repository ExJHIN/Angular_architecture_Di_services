import { Observable } from 'rxjs';
import { Note } from '../models/note.model';

export abstract class NoteService {
  abstract getNotes(): Observable<Note[]>;
  abstract addNote(note: Note): Observable<Note>;
}
