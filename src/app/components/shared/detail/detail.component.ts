import { Component, EventEmitter, Input, Output, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {
  @Input() showDetail: boolean = false;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  closeDetail() {
    this.close.emit();
  }
}
