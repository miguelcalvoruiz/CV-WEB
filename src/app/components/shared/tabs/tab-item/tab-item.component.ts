import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.component.html',
  styleUrl: './tab-item.component.css'
})
export class TabItemComponent {
  @Input() title!: string;
  @ViewChild('contentTemplate', { static: false }) contentTemplate!: TemplateRef<any>;
  selected: boolean = false;

  constructor() { }
}
