import { Component } from '@angular/core';
import { ConfigService } from '../../../services/config/config.service';
import { Experience } from '../../../models/experience';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-experiences',
  templateUrl: './experiences.component.html',
  styleUrls: ['./experiences.component.css']
})
export class ExperiencesComponent {
  public experiences: Experience[] = [];
  public selectedDescription: string = '';
  public selectedCompany: string = '';
  public modalRef: NgbModalRef | null = null;

  constructor(private configService: ConfigService, private modalService: NgbModal) {}

  async ngOnInit(): Promise<void> {
    this.loadexperiences();
  }

  async loadexperiences(): Promise<void> {
    try {
      this.experiences = await this.configService.getConfigValue("data.experiences");
    } catch (error) {
      console.error("Error loading personal data:", error);
    }
  }

  openModal(description: string, company: string, content: any) {
    this.selectedDescription = description;
    this.selectedCompany = company;
    console.log("selected description: " + this.selectedDescription + " company: " + this.selectedCompany);
    this.modalRef = this.modalService.open(content, { centered: true });
  }

  closeModal() {
    if (this.modalRef) {
      this.modalRef.close();
    }
  }
}
