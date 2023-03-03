import {AfterViewInit, Component, ElementRef, HostListener, ViewChild} from '@angular/core';
import {debounceTime, fromEvent} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'follow-poper-showcase';
  tip: string = "";

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

  // ngAfterViewInit() {
  //   const listRect = this.list.nativeElement.getBoundingClientRect();
  //
  //   const followPoperRect = this.followPoper.nativeElement.getBoundingClientRect();
  //
  //   console.log("List BoundingClientRect: ", listRect);
  //
  //   this.followPoper.nativeElement.style.left = listRect.width + "px";
  //   console.log(this.list.nativeElement.children)
  //
  //   let selectedEle: Element;
  //
  //   // addEventListener to list children, let followPoper follow child
  //   for (const child of this.list.nativeElement.children) {
  //     child.addEventListener("click", () => {
  //       selectedEle = child;
  //       const selectedEleRect = selectedEle.getBoundingClientRect();
  //
  //       // Reset followPoper position style
  //       this.followPoper.nativeElement.style.top = "";
  //       this.followPoper.nativeElement.style.bottom = "";
  //       this.followPoper.nativeElement.style.visibility = "visible";
  //
  //       if (listRect.bottom - selectedEleRect.top < followPoperRect.height) {
  //         this.followPoper.nativeElement.style.bottom = 0 + "px";
  //       } else if (selectedEleRect.bottom - listRect.top < followPoperRect.height) {
  //         this.followPoper.nativeElement.style.top = 0 + "px";
  //       } else {
  //         this.followPoper.nativeElement.style.top = (selectedEleRect.top - listRect.top) + "px";
  //       }
  //
  //     })
  //   }
  //
  //   let lastScroll = 0;
  //   // When scroll the container (or the whole page) to see the followPoper stay within the boundary.
  //   // When the followed element completely out of the container bounds, disappear the followPoper.
  //   // Use debounceTime to reduce scroll event triggering
  //   fromEvent(this.list.nativeElement, "scroll")
  //     .pipe(debounceTime(50))
  //     .subscribe((event) => {
  //       if (!selectedEle) return;
  //
  //       const selectedEleRect = selectedEle.getBoundingClientRect();
  //
  //       const currentScrollTop = this.list.nativeElement.scrollTop;
  //       const moveDir = currentScrollTop > 0 && lastScroll <= currentScrollTop ? "up" : "down";
  //       lastScroll = currentScrollTop;
  //
  //       const upDiffer = selectedEleRect.bottom - listRect.top;
  //       const bottomDiffer = listRect.bottom - selectedEleRect.top;
  //
  //       if (moveDir === "up") {
  //         if (selectedEleRect.bottom > listRect.top) {
  //           this.followPoper.nativeElement.style.visibility = "visible";
  //
  //           if (bottomDiffer < followPoperRect.height) {
  //             this.followPoper.nativeElement.style.top = "";
  //             this.followPoper.nativeElement.style.bottom = 0 + "px";
  //           } else {
  //             if (upDiffer > 0 && upDiffer <= followPoperRect.height) {
  //               this.followPoper.nativeElement.style.top = 0 + "px";
  //               this.followPoper.nativeElement.style.bottom = "";
  //             } else {
  //               this.followPoper.nativeElement.style.top = (selectedEleRect.top - listRect.top) + "px";
  //               this.followPoper.nativeElement.style.bottom = "";
  //             }
  //           }
  //         } else {
  //           this.followPoper.nativeElement.style.visibility = "hidden";
  //         }
  //       } else {
  //         if (selectedEleRect.top < listRect.bottom) {
  //           this.followPoper.nativeElement.style.visibility = "visible";
  //           if (upDiffer < followPoperRect.height) {
  //             this.followPoper.nativeElement.style.top = 0 + "px";
  //             this.followPoper.nativeElement.style.bottom = "";
  //           } else {
  //             if (bottomDiffer > 0 && bottomDiffer <= followPoperRect.height) {
  //               this.followPoper.nativeElement.style.top = "";
  //               this.followPoper.nativeElement.style.bottom = 0 + "px";
  //             } else {
  //               this.followPoper.nativeElement.style.top = (selectedEleRect.top - listRect.top) + "px";
  //               this.followPoper.nativeElement.style.bottom = "";
  //             }
  //           }
  //         } else {
  //           this.followPoper.nativeElement.style.visibility = "hidden";
  //         }
  //       }
  //     })
  // }

  public setTip(content: string) {
    this.tip = content;
  }
}
