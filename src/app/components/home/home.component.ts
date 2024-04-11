import { Component } from '@angular/core';
import { DataService } from '../../services/data/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public content!: string;
  public load = false;

  constructor(
    private dataService: DataService
  ) { }

  ngOnInit() {
    this.dataService.getHMTL().subscribe((data: string) => {
      this.content = data;
      this.load = true;
    }, error => {
      console.error(error);
    });
  }
}
