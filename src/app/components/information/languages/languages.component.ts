import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { Language } from '../../../models/language';

@Component({
  selector: 'app-languages',
  templateUrl: './languages.component.html',
  styleUrl: './languages.component.css'
})
export class LanguagesComponent {
  public languages: Language[] = [];

  constructor(private configService: ConfigService) {

  }
  async ngOnInit(): Promise<void> {
    this.loadlanguages();
  }

  async loadlanguages(): Promise<void> {
    try {
      this.languages = await this.configService.getConfigValue("data.languages");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }
}
