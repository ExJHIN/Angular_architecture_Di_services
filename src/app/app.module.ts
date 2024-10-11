import { HttpClientModule } from '@angular/common/http';
import { NgModule, Injector } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  TuiRootModule,
  TuiDialogModule,
  TuiAlertModule,
  TuiHintModule,
  TuiTextfieldControllerModule,
  TuiButtonModule,
  TuiScrollbarModule,
  TuiNotificationModule,
} from '@taiga-ui/core';
import {
  TuiInputModule,
  TuiTextareaModule,
  TuiIslandModule,
  TuiToggleModule,
} from '@taiga-ui/kit';
import { AppComponent } from './app.component';

import { ServiceType } from './consts/service-type.enum';
import { LocalStorageNotesService } from './services/local-storage-notes.service';
import { NoteServiceSelectorService } from './services/note-service-selector.service';
import { NoteService } from './services/note.service';
import { NotesApiService } from './services/notes-api.service';
import { TuiLetModule } from '@taiga-ui/cdk';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    TuiRootModule,
    TuiDialogModule,
    TuiAlertModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    TuiButtonModule,
    TuiInputModule,
    TuiTextareaModule,
    TuiIslandModule,
    TuiNotificationModule,
    TuiHintModule,
    TuiTextfieldControllerModule,
    TuiScrollbarModule,
    TuiToggleModule,
    TuiLetModule
  ],
  providers: [
    {
      provide: NoteService,
      useFactory: (
        selector: NoteServiceSelectorService,
        injector: Injector,
      ) => {
        return selector.getServiceType() === ServiceType.Api
          ? injector.get(NotesApiService)
          : injector.get(LocalStorageNotesService);
      },
      deps: [NoteServiceSelectorService, Injector],
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
