import { Component } from '@angular/core';
import { Project } from '../../models/project';
import { ConfigService } from '../../services/config/config.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.css'
})
export class ProjectsComponent {
  public projects!: Project[];
  public itemsPerPage!: number;
  public page!: number;

  constructor(private configService: ConfigService) {
  }

  async ngOnInit(): Promise<void> {
    this.loadStudies();
    this.itemsPerPage = 6;
  }

  async loadStudies(): Promise<void> {
    try {
      this.projects = await this.configService.getConfigValue("data.projects");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }
}
