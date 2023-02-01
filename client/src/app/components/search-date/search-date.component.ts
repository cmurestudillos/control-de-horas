import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-date',
  templateUrl: './search-date.component.html',
  styleUrls: ['./search-date.component.css']
})
export class SearchDateComponent {
  @Output() searchDate: EventEmitter<string> = new EventEmitter();

  changeSearchDate(event: any) {
    const search = event.target as HTMLInputElement;
    this.searchDate.emit( search.value );
	}

}
