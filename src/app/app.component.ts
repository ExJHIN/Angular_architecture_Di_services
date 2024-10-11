import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TuiAlertService } from '@taiga-ui/core';
import { Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ServiceType } from './consts/service-type.enum';
import { Note } from './models/note.model';
import { LocalStorageNotesService } from './services/local-storage-notes.service';
import { NoteServiceSelectorService } from './services/note-service-selector.service';
import { NotesApiService } from './services/notes-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  private readonly selectorService = inject(NoteServiceSelectorService);
  private readonly alertService = inject(TuiAlertService);
  private readonly notesApiService = inject(NotesApiService);
  private readonly localStorageNotesService = inject(LocalStorageNotesService);

  currentServiceType: ServiceType = this.selectorService.getServiceType();

  readonly noteForm: FormGroup = inject(FormBuilder).group({
    title: ['', [Validators.required, Validators.maxLength(50)]],
    content: ['', [Validators.required, Validators.maxLength(500)]],
  });

  private refreshNotes$ = new Subject<void>();

  readonly notes$: Observable<Note[]> = this.refreshNotes$.pipe(
    startWith([] as Note[]),
    switchMap(() => this.noteService.getNotes()),
    catchError(() => {
      this.alertService.open('Ошибка загрузки заметок', { status: 'error' }).subscribe();
      return of([] as Note[]);
    })
  );

  get isApiService(): boolean {
    return this.currentServiceType === ServiceType.Api;
  }

  get noteService(): NotesApiService | LocalStorageNotesService {
    return this.isApiService ? this.notesApiService : this.localStorageNotesService;
  }

  addNote() {
    if (this.noteForm.invalid) {
      return;
    }

    this.noteService
      .addNote({
        id: Date.now(),
        title: this.noteForm.value.title,
        content: this.noteForm.value.content,
        date: new Date(),
      })
      .subscribe(
        () => {
          this.noteForm.reset({
            title: '',
            content: '',
          });
          this.alertService
            .open('Заметка успешно добавлена', { status: 'success' })
            .subscribe();
          this.refreshNotes$.next();
        },
        () => {
          this.alertService
            .open('Ошибка добавления заметки', { status: 'error' })
            .subscribe();
        },
      );
  }

  switchServiceType(isApi: boolean) {
    this.currentServiceType = isApi ? ServiceType.Api : ServiceType.LocalStorage;
    this.selectorService.setServiceType(this.currentServiceType);
    this.refreshNotes$.next();
  }
}
