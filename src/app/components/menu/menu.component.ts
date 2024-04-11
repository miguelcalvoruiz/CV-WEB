import { Component, EventEmitter, Input, OnInit, Output, ViewEncapsulation, PLATFORM_ID, Inject } from '@angular/core';
import { ConfigService } from '../../services/config/config.service';
import { DataService } from './../../services/data/data.service';
import { ResolutionService } from '../../services/resolution/resolution.service';
import { ResolutionConstants } from '../../services/resolution/constants/ResolutionConstants';
import { SocialNetwork } from '../../models/social-network';
import { saveAs as importedSaveAs } from "file-saver";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MenuComponent implements OnInit {

  @Input() showBorder: boolean = true;

  @Output() clickItemMenu: EventEmitter<boolean> = new EventEmitter;

  public showSkills: boolean = true;
  public showContact: boolean = true;
  public showProjects: boolean = true;
  public socialNetworks: SocialNetwork[];

  constructor(
    private configService: ConfigService,
    private dataService: DataService,
    public resolutionService: ResolutionService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.socialNetworks = [];
    this.clickItemMenu = new EventEmitter<boolean>();
  }

  async ngOnInit(): Promise<void> {
    if (isPlatformBrowser(this.platformId)) {
      this.socialNetworks = await this.configService.getConfigValue("data.socialNetworks");
      this.showSkills = await this.configService.getConfigValue("data.config.showSkills");
      this.showContact = await this.configService.getConfigValue("data.config.showContact");
      this.showProjects = await this.configService.getConfigValue("data.config.showProjects");
      this.resolutionService.setSize(window.innerWidth);
    }
  }

  onClickItemMenu() {
    this.clickItemMenu.emit(true);
  }

  async downloadCV() {
    if (isPlatformBrowser(this.platformId)) {
      const filenameCV = await this.configService.getConfigValue('data.config.filenameCV');
      this.dataService.downloadFile('assets/pdf/cv.pdf').subscribe(blob => {
        importedSaveAs(blob, filenameCV);
      });
    }
  }

  get ResolutionConstants(): typeof ResolutionConstants {
    return ResolutionConstants;
  }

}
