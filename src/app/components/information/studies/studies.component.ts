import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { Study } from '../../../models/study';

@Component({
  selector: 'app-studies',
  templateUrl: './studies.component.html',
  styleUrl: './studies.component.css'
})
export class StudiesComponent implements OnInit {
  public studies: Study[] = [];

  constructor(private configService: ConfigService) {

  }
  async ngOnInit(): Promise<void> {
    this.loadStudies();
  }

  async loadStudies(): Promise<void> {
    try {
      this.studies = await this.configService.getConfigValue("data.studies");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }
}
