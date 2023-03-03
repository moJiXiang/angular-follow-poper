import {AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {debounceTime, fromEvent} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'follow-poper-showcase';
  selectedItem: any;
  tip: string;

  @ViewChild("list") list: ElementRef<HTMLInputElement>;
  @ViewChild("followPoper") followPoper: ElementRef<HTMLInputElement>;

  items = [
    {
      title: "Popup",
      desc: "An element can specify popup content to appear."
    },
    {
      title: "Header",
      desc: "An element can specify popup content with a header."
    },
    {
      title: "Trigger",
      desc: "A trigger can be complex element."
    },
    {
      title: "Disabled",
      desc: "A disabled popup only renders its trigger."
    },
    {
      title: "Basic",
      desc: "A popup can provide more basic formatting."
    },
    {
      title: "Position",
      desc: "A popup can be position around its trigger."
    },
    {
      title: "Flowing",
      desc: "A popup can have no maximum width and continue to flow to fit its content."
    },
    {
      title: "Pre-Existing",
      desc: "An element can display a popup that is already included in the page."
    },
    {
      title: "Tooltip ",
      desc: "An element can specify a simple tooltip that can appear without javascript."
    },
    {
      title: "Dismissable Block",
      desc: "A message that the user can choose to hide."
    },
    {
      title: "Floating",
      desc: "A message can float above content that it is related to."
    },
    {
      title: "Attached",
      desc: "A message can be formatted to attach itself to other content."
    },
    {
      title: "Warning",
      desc: "A message may be formatted to display warning messages."
    }
  ]

  ngOnInit() {
  }

  public selectItem(item: any) {
    this.selectedItem = item;
    this.tip = item.desc;
  }
}
