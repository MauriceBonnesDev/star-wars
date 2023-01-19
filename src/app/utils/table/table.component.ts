import {AfterViewChecked, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewChecked {
  @Input() data: any[] = [''];
  @Input() columnNames: string[] = [];
  @Input() displayedColumns: string[] = [];
  @Input() link: string = 'people';
  @Input() disabled: boolean = false;
  queryParams: object[] = [];

  ngAfterViewChecked(): void {
    if (this.link === 'people') {
      for (let row of this.data) {
        const {id, name, height, mass, gender, species, birthYear} = row;
        this.queryParams[row.id] = ({id, name, height, mass, gender, species, birthYear});
      }
    } else if (this.link === 'movies') {
      for (let row of this.data) {
        const {id, Title, Episode, Description } = row;
        this.queryParams[row.id] = ({ id, Title, Episode, Description });
      }
    }
  }

}
