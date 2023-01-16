import {Component, EventEmitter, Output, ViewChild} from '@angular/core';
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import {NgForm} from "@angular/forms";
import {People} from "../../interfaces/people";

@Component({
  selector: 'app-people-add-dialog',
  templateUrl: './people-add-dialog.component.html',
  styleUrls: ['./people-add-dialog.component.scss']
})
export class PeopleAddDialogComponent {
  faTimes = faTimes;
  @Output() closeEvent: EventEmitter<People | null> = new EventEmitter<People | null>();
  @ViewChild('f') form: NgForm | undefined;

  onSubmit(): void {
    const {name, mass, height, gender, birthYear, species} = this.form?.value;
    const char = {name, mass, height, gender, birthYear, species};
    this.onClose(char);
  }

  onClose(char: People | null): void {
    this.closeEvent.emit(char);
  }
}
