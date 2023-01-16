import {AfterViewChecked, Component, Input } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements AfterViewChecked {
  @Input() data: any[] = [''];
  @Input() columnName: string = 'Name';
  @Input() displayedColumns: string[] = ['Name'];
  @Input() link: string = 'people';

  queryParams: object[] = [];

  ngAfterViewChecked(): void {
    if (this.link === 'people') {
      for (let row of this.data) {
        const {id, name, height, mass, gender, species, birthYear} = row;
        this.queryParams[row.id] = ({id, name, height, mass, gender, species, birthYear});
      }
    } else if (this.link === 'vehicles') {

    }
  }

}
