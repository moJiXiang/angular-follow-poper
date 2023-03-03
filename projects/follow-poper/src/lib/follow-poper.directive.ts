import {AfterViewInit, Directive, ElementRef, Input, TemplateRef, ViewContainerRef} from "@angular/core";
import {debounceTime, fromEvent} from "rxjs";

@Directive({
  selector: "[followPoper]",
})
export class FollowPoperDirective implements AfterViewInit {
  @Input() tip: string;
  @Input() poperTemplate: TemplateRef<any>;

  constructor(private container: ElementRef, private viewContainerRef: ViewContainerRef) {

  }

  ngAfterViewInit() {
    // create followPoper element and insert to container parentNode
    const followPoper = document.createElement("div");
    followPoper.className = "follow-poper";
    followPoper.style.position = "absolute";
    followPoper.style.border = "1px solid rebeccapurple";
    followPoper.style.borderRadius = "5px";
    followPoper.style.transition = "0.3s";
    followPoper.style.transitionTimingFunction = "ease-out";
    followPoper.style.width = "200px";
    followPoper.style.height = "auto";
    followPoper.style.visibility = "hidden";

    if (this.poperTemplate) {
      const content = this.viewContainerRef.createEmbeddedView(this.poperTemplate);
      console.log(content)
      followPoper.appendChild(content.rootNodes[0]);
    }

    this.container.nativeElement.parentNode.append(followPoper);

    const containerRect = this.container.nativeElement.getBoundingClientRect();

    followPoper.style.left = containerRect.width + "px";

    let selectedEle: Element;

    // addEventListener to list children, let followPoper follow child
    for (const child of this.container.nativeElement.children) {
      child.addEventListener("click", () => {
        selectedEle = child;
        const selectedEleRect = selectedEle.getBoundingClientRect();
        const followPoperRect = followPoper.getBoundingClientRect();

        // Reset followPoper position style
        if (this.tip) {
          followPoper.textContent = this.tip;
        }
        followPoper.style.top = "";
        followPoper.style.bottom = "";
        followPoper.style.visibility = "visible";

        if (containerRect.bottom - selectedEleRect.top < followPoperRect.height) {
          followPoper.style.bottom = 0 + "px";
        } else if (selectedEleRect.bottom - containerRect.top < followPoperRect.height) {
          followPoper.style.top = 0 + "px";
        } else {
          followPoper.style.top = (selectedEleRect.top - containerRect.top) + "px";
        }
      })
    }

    let lastScroll = 0;
    // When scroll the container (or the whole page) to see the followPoper stay within the boundary.
    // When the followed element completely out of the container bounds, disappear the followPoper.
    // Use debounceTime to reduce scroll event triggering
    fromEvent(this.container.nativeElement, "scroll")
      .pipe(debounceTime(50))
      .subscribe((event) => {
        if (!selectedEle) return;

        const selectedEleRect = selectedEle.getBoundingClientRect();
        const followPoperRect = followPoper.getBoundingClientRect();

        const currentScrollTop = this.container.nativeElement.scrollTop;
        const moveDir = currentScrollTop > 0 && lastScroll <= currentScrollTop ? "up" : "down";
        lastScroll = currentScrollTop;

        // top differ used to judge followPoper visible at the top of the container
        const topDiffer = selectedEleRect.bottom - containerRect.top;
        // bottom differ used to judge followPoper visible at the bottom of the container
        const bottomDiffer = containerRect.bottom - selectedEleRect.top;

        if (moveDir === "up") {
          if (selectedEleRect.bottom > containerRect.top) {
            followPoper.style.visibility = "visible";

            if (bottomDiffer < followPoperRect.height) {
              followPoper.style.top = "";
              followPoper.style.bottom = 0 + "px";
            } else {
              if (topDiffer > 0 && topDiffer <= followPoperRect.height) {
                followPoper.style.top = 0 + "px";
                followPoper.style.bottom = "";
              } else {
                followPoper.style.top = (selectedEleRect.top - containerRect.top) + "px";
                followPoper.style.bottom = "";
              }
            }
          } else {
            followPoper.style.visibility = "hidden";
          }
        } else {
          if (selectedEleRect.top < containerRect.bottom) {
            followPoper.style.visibility = "visible";
            if (topDiffer < followPoperRect.height) {
              followPoper.style.top = 0 + "px";
              followPoper.style.bottom = "";
            } else {
              if (bottomDiffer > 0 && bottomDiffer <= followPoperRect.height) {
                followPoper.style.top = "";
                followPoper.style.bottom = 0 + "px";
              } else {
                followPoper.style.top = (selectedEleRect.top - containerRect.top) + "px";
                followPoper.style.bottom = "";
              }
            }
          } else {
            followPoper.style.visibility = "hidden";
          }
        }
      })
  }
}
