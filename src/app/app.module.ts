import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import { PeopleComponent } from './people/people.component';
import {MatTableModule} from "@angular/material/table";
import {HttpClientModule} from "@angular/common/http";
import { LoadingComponent } from './utils/loading/loading.component';
import { PeopleDetailsComponent } from './people/people-details/people-details.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCardModule} from "@angular/material/card";
import { PeopleAddDialogComponent } from './people/people-add-dialog/people-add-dialog.component';
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { SearchingComponent } from './utils/searching/searching.component';
import { TableComponent } from './utils/table/table.component';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    PeopleComponent,
    LoadingComponent,
    PeopleDetailsComponent,
    PeopleAddDialogComponent,
    SearchingComponent,
    TableComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatTableModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    FontAwesomeModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
