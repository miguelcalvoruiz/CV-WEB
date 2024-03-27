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
    let selectedIndex = parseInt(localStorage.getItem('selectedTabIndex') || '0', 10);
    if (isNaN(selectedIndex) || selectedIndex >= this.tabsItems.length) {
      selectedIndex = 0;
    }

    const selectedTab = this.tabsItems.toArray()[selectedIndex];
    this.open(selectedTab);
    this.cdr.detectChanges();
  }

  open(tab: TabItemComponent): void {
    this.tabsItems.forEach(t => t.selected = false);
    tab.selected = true;
    this.contentTemplate = tab.contentTemplate;

    const selectedIndex = this.tabsItems.toArray().findIndex(t => t.selected);
    localStorage.setItem('selectedTabIndex', selectedIndex.toString());

    this.cdr.detectChanges();
  }
}
