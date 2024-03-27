import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { PersonalData } from '../../../models/personal-data';

@Component({
  selector: 'app-personal-data',
  templateUrl: './personal-data.component.html',
  styleUrl: './personal-data.component.css'
})
export class PersonalDataComponent implements OnInit {

  public personalData: PersonalData[] = [];

  constructor(private configService: ConfigService) {

  }
  async ngOnInit(): Promise<void> {
    this.loadPersonalData();
  }

  async loadPersonalData(): Promise<void> {
    try {
      this.personalData = await this.configService.getConfigValue("data.personalData");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }

}
