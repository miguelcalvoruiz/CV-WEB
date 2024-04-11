import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID, EventEmitter, Output } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { ResolutionService } from '../../services/resolution/resolution.service';
import { ResolutionConstants } from '../../services/resolution/constants/ResolutionConstants';
import { isPlatformBrowser } from '@angular/common';
import { DetailService } from '../../services/detail/detail.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit, OnDestroy {
  public img_profile: string = '';
  public name: string = '';

  private resizeListener: () => void = () => { };

  constructor(
    private configService: ConfigService,
    public resolutionService: ResolutionService,
    private detailService: DetailService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.name = await this.configService.getConfigValue('data.name');
      this.img_profile = await this.configService.getConfigValue('data.imgProfile');
      this.resolutionService.setSize(window.innerWidth);
      this.resizeListener = this.onWindowResize.bind(this);
      window.addEventListener('resize', this.resizeListener);
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      window.removeEventListener('resize', this.resizeListener);
    }
  }

  private onWindowResize(): void {
    this.resolutionService.setSize(window.innerWidth);
  }

  openMenu() {
    this.detailService.toggleDetail(true);
  }

  closeMenu() {
    this.detailService.toggleDetail(false);
  }

  get ResolutionConstants(): typeof ResolutionConstants {
    return ResolutionConstants;
  }
}
