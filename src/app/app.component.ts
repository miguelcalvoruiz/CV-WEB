import { Component, OnInit } from '@angular/core';
import { ConfigService } from './services/config/config.service';
import { DetailService } from './services/detail/detail.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  public name: string = '';
  public isMenuVisible = false;

  constructor(
    private configService: ConfigService,
    private detailService: DetailService
  ) { }

  ngOnInit() {
    this.configService.getConfigValue('data.name')
      .then((name: string) => {
        this.name = name;
      })
      .catch(error => {
        console.error('Error al obtener el nombre de configuración:', error);
      });

      this.detailService.showDetail$.subscribe(showDetail => {
        this.isMenuVisible = showDetail;
      });
  }

  closeMenu() {
    this.detailService.toggleDetail(false);
  }
}
