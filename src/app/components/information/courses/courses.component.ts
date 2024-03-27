import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { Course } from '../../../models/course';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css'
})
export class CoursesComponent {
  public courses: Course[] = [];

  constructor(private configService: ConfigService) {

  }
  async ngOnInit(): Promise<void> {
    this.loadcourses();
  }

  async loadcourses(): Promise<void> {
    try {
      this.courses = await this.configService.getConfigValue("data.courses");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }
}
