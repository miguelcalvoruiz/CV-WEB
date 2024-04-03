import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslatePipe } from './pipes/translate.pipe';
import { TranslateService } from './services/translate.service';
import { HttpClientModule } from '@angular/common/http';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MenuComponent } from './components/menu/menu.component';
import { HomeComponent } from './components/home/home.component';
import { InformationComponent } from './components/information/information.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ContactComponent } from './components/contact/contact.component';
import { DetailComponent } from './components/shared/detail/detail.component';
import { ToastComponent } from './components/shared/toast/toast.component';
import { TabsComponent } from './components/shared/tabs/tabs.component';
import { TabItemComponent } from './components/shared/tabs/tab-item/tab-item.component';
import { PersonalDataComponent } from './components/information/personal-data/personal-data.component';
import { TableModule } from 'primeng/table';
import { StudiesComponent } from './components/information/studies/studies.component';
import { CoursesComponent } from './components/information/courses/courses.component';
import { ExperiencesComponent } from './components/information/experiences/experiences.component';
import { LanguagesComponent } from './components/information/languages/languages.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SanitizePipe } from './pipes/sanitize.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

export function translateFactory(provider: TranslateService) {
  return () => provider.getData();
}

@NgModule({
  declarations: [
    AppComponent,
    TranslatePipe,
    SidebarComponent,
    MenuComponent,
    HomeComponent,
    InformationComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    DetailComponent,
    ToastComponent,
    TabsComponent,
    TabItemComponent,
    PersonalDataComponent,
    StudiesComponent,
    CoursesComponent,
    ExperiencesComponent,
    LanguagesComponent,
    SanitizePipe 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    TableModule,
    NgbModule,
    NgxPaginationModule
  ],
  providers: [
    provideClientHydration(),
    TranslateService,
    {
      provide: APP_INITIALIZER,
      useFactory: translateFactory,
      deps: [TranslateService],
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
