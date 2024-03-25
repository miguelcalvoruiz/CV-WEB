import { Component, OnInit } from '@angular/core';
import { CacheService } from './services/cache/cache.service';
import { ConfigService } from './services/config/config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  public name: string = '';
  
  constructor(
    private configService: ConfigService, 
    public cacheService: CacheService,
  ){ }

  async ngOnInit() {
    try {
      this.name = await this.configService.getConfigValue('data.name');
    } catch (error) {
      console.error('Error al obtener el nombre de configuración:', error);
    }
  }

  closeDetail(){
    this.cacheService.setElement('showDetail', false);
  }
}
