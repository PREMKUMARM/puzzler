import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { FirebaseService } from './firebase.service';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AdsenseModule } from 'ng2-adsense';
import { HomeComponent } from './home/home.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { GameControlsComponent } from './game-controls/game-controls.component';
import { GameGridComponent } from './game-grid/game-grid.component';
import { GameStepsComponent } from './game-steps/game-steps.component';
import { GameTypeComponent } from './game-type/game-type.component';
import { ConfigService } from './services/config.service';
import { ShuffleService } from './services/shuffle.service';
import { ScrambleService } from './services/scramble.service';
import { StatisticsService } from './services/statistics.service';
import { StorageService } from './services/storage.service';
import { AlertDialogComponent } from './alert-dialog/alert-dialog.component';
//import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ToolbarComponent,
    GameControlsComponent,
    GameGridComponent,
    GameStepsComponent,
    GameTypeComponent,
    AlertDialogComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    AppRoutingModule,
    //firebase
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // firestore
    AngularFireAuthModule, // auth
    AngularFireStorageModule, // storage
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    AdsenseModule.forRoot({
     // adClient: 'ca-pub-8657427378750716'
    }),
  ],
  providers: [
    FirebaseService,
    ConfigService,
    ShuffleService,
    ScrambleService,
    StatisticsService,
    StorageService
  ],
  entryComponents: [AlertDialogComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
