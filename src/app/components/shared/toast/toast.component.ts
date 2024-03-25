import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() title: string = '';
  @Input() message: string = '';
  @Input() type: 'info' | 'warning' | 'error' | 'success' = 'info';
}
