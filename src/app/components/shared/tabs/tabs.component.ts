import { AfterViewInit, ChangeDetectorRef, Component, ContentChildren, QueryList, TemplateRef } from '@angular/core';
import { TabItemComponent } from './tab-item/tab-item.component';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements AfterViewInit {

  @ContentChildren(TabItemComponent) tabsItems!: QueryList<TabItemComponent>;
  contentTemplate!: TemplateRef<any>;

  constructor(private cdr: ChangeDetectorRef) { }

  ngAfterViewInit(): void {
    if (typeof localStorage !== 'undefined' && localStorage !== null) {
      let selectedIndex = parseInt(localStorage.getItem('selectedTabIndex') || '0', 10);
      if (isNaN(selectedIndex) || selectedIndex >= this.tabsItems.length) {
        selectedIndex = 0;
      }

      const selectedTab = this.tabsItems.toArray()[selectedIndex];
      if (!selectedTab) {
        this.open(this.tabsItems.first);
      } else {
        this.open(selectedTab);
      }

      this.cdr.detectChanges();
    } else {
      this.openFirstTab();
    }
  }  

  open(tab: TabItemComponent): void {
    if (tab) {
      this.tabsItems.forEach(t => t.selected = false);
      tab.selected = true;
      this.contentTemplate = tab.contentTemplate;

      const selectedIndex = this.tabsItems.toArray().findIndex(t => t.selected);
      if (typeof localStorage !== 'undefined' && localStorage !== null) {
        localStorage.setItem('selectedTabIndex', selectedIndex.toString());
      }

      this.cdr.detectChanges();
    }
  }

  openFirstTab(): void {
    if (this.tabsItems && this.tabsItems.first) {
      this.open(this.tabsItems.first);
    }
  }  
}
