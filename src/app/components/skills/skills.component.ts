import { Component, OnInit, ViewChild } from '@angular/core';
import { Skill } from '../../models/skill';
import { ConfigService } from '../../services/config/config.service';
import { groupBy, chunk } from 'lodash';
import { TabsComponent } from '../shared/tabs/tabs.component';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent implements OnInit {
  @ViewChild(TabsComponent) tabsComponent!: TabsComponent;
  public skills: { [key: string]: Skill[][] } = {};
  public skillsAll: Skill[] = [];
  public currentPage: { [key: string]: number } = {};
  public itemsPerPage: number = 6;

  constructor(private configService: ConfigService) { }

  async ngOnInit(): Promise<void> {
    await this.loadSkills();
  }

  async loadSkills(): Promise<void> {
    try {
      this.skillsAll = await this.configService.getConfigValue("data.skills");
      const groupedSkills = groupBy(this.skillsAll, 'group');

      for (const key in groupedSkills) {
        if (Object.prototype.hasOwnProperty.call(groupedSkills, key)) {
          const skillsChunked = chunk(groupedSkills[key], this.itemsPerPage);
          this.skills[key] = skillsChunked;
          this.currentPage[key] = 0;
        }
      }

      const allSkillsChunked = chunk(this.skillsAll, this.itemsPerPage);
      this.skills['all'] = allSkillsChunked;
      this.currentPage['all'] = 0;

      // Retrasar la llamada a openFirstTab() para asegurarse de que ngAfterViewInit() haya terminado
      setTimeout(() => {
        if (this.tabsComponent) {
          this.tabsComponent.openFirstTab();
        }
      });

    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }

  nextPage(groupKey: string): void {
    const totalPages = this.skills[groupKey].length;
    if (this.currentPage[groupKey] < totalPages - 1) {
      this.currentPage[groupKey]++;
    }
  }

  prevPage(groupKey: string): void {
    if (this.currentPage[groupKey] > 0) {
      this.currentPage[groupKey]--;
    }
  }

  paginatedSkills(groupKey: string): Skill[] {
    return this.skills[groupKey][this.currentPage[groupKey]] || [];
  }

  nextPageAll(): void {
    const totalPages = Math.ceil(this.skillsAll.length / this.itemsPerPage);
    if (this.currentPage['all'] < totalPages - 1) {
      this.currentPage['all']++;
    }
  }

  prevPageAll(): void {
    if (this.currentPage['all'] > 0) {
      this.currentPage['all']--;
    }
  }

  paginatedSkillsAll(): Skill[] {
    return this.skills['all'][this.currentPage['all']] || [];
  }

  isFirstPage(groupKey: string): boolean {
    return this.currentPage[groupKey] === 0;
  }

  isLastPage(groupKey: string): boolean {
    const totalPages = this.skills[groupKey].length;
    return this.currentPage[groupKey] === totalPages - 1;
  }

  isFirstPageAll(): boolean {
    return this.currentPage['all'] === 0;
  }

  isLastPageAll(): boolean {
    const totalPages = Math.ceil(this.skillsAll.length / this.itemsPerPage);
    return this.currentPage['all'] === totalPages - 1;
  }

  isSinglePage(groupKey: string): boolean {
    return this.skills[groupKey].length <= 1;
  }
}
