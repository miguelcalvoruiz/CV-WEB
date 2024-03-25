import { CacheService } from './../../services/cache/cache.service';
import { ResolutionService } from '../../services/resolution/resolution.service';
import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { ResolutionConstants } from '../../services/resolution/constants/ResolutionConstants';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  public img_profile: string = '';
  public name: string = '';

  constructor(
    private configService: ConfigService, 
    private cacheService: CacheService,
    public resolutionService: ResolutionService
    ) { }

  async ngOnInit(): Promise<void> {
    this.name = await this.configService.getConfigValue('data.name');
    this.img_profile = await this.configService.getConfigValue('data.imgProfile');
  }

  openMenu(){
    this.cacheService.setElement('showDetail', true);
  }

  get ResolutionConstants(): typeof ResolutionConstants {
    return ResolutionConstants;
  }
}
