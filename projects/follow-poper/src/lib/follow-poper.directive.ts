import {AfterViewInit, Directive, ElementRef, Input, Optional, TemplateRef, ViewContainerRef} from "@angular/core";
import {debounceTime, fromEvent} from "rxjs";

@Directive({
  selector: "[followPoper]",
})
export class FollowPoperDirective implements AfterViewInit {
  @Input() @Optional() tip: string;
  @Input() @Optional() poperTemplate: TemplateRef<any>;

  constructor(private container: ElementRef, private viewContainerRef: ViewContainerRef) {

  }

  ngAfterViewInit() {
    // create followPoper element and insert to container parentNode
    const followPoper = document.createElement("div");
    followPoper.className = "follow-poper";
    followPoper.style.position = "absolute";
    followPoper.style.left = "10px";
    followPoper.style.background = "#ccc";
    followPoper.style.padding = "5px 10px";
    followPoper.style.border = "1px solid #ccc";
    followPoper.style.transition = "0.3s";
    followPoper.style.transitionTimingFunction = "ease-out";
    followPoper.style.width = "200px";
    followPoper.style.height = "auto";
    followPoper.style.visibility = "hidden";

    const poperArrow = document.createElement("i");
    poperArrow.className = "poper-arrow"
    poperArrow.style.borderTop = "10px solid transparent";
    poperArrow.style.borderRight = "10px solid #ccc";
    poperArrow.style.borderBottom = "10px solid transparent";
    poperArrow.style.position = "absolute";
    poperArrow.style.left = "-11px";
    poperArrow.style.background = "#fff";
    poperArrow.style.transition = "0.3s";
    poperArrow.style.transitionTimingFunction = "ease-out";

    followPoper.appendChild(poperArrow);

    if (this.poperTemplate) {
      const content = this.viewContainerRef.createEmbeddedView(this.poperTemplate);
      content.rootNodes.forEach(node => {
        followPoper.appendChild(node);
      })
    }

    this.container.nativeElement.parentNode.append(followPoper);

    const containerRect = this.container.nativeElement.getBoundingClientRect();

    followPoper.style.left = (containerRect.width + 10) + "px";

    let selectedEle: Element;

    // addEventListener to list children, let followPoper follow child
    for (const child of this.container.nativeElement.children) {
      child.addEventListener("click", () => {
        selectedEle = child;
        const selectedEleRect = selectedEle.getBoundingClientRect();
        const followPoperRect = followPoper.getBoundingClientRect();

        const st = selectedEleRect.top;
        const sb = selectedEleRect.bottom;
        const sh = selectedEleRect.height;
        const ct = containerRect.top;
        const cb = containerRect.bottom;
        const fh = followPoperRect.height;

        // Reset followPoper position style
        if (this.tip) {
          followPoper.textContent = this.tip;
        }
        followPoper.style.top = "";
        followPoper.style.bottom = "";
        poperArrow.style.top = "";
        poperArrow.style.bottom = "";
        followPoper.style.visibility = "visible";
        poperArrow.style.visibility = "visible";

        if (ct - st > sh) {
          // disappear at the top
          followPoper.style.visibility = "hidden";
          poperArrow.style.visibility = "hidden";
        }  else if (sb - ct < sh / 2) {
          // at the top and arrow not move
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = 0 + "px";
          poperArrow.style.top = 0 + "px";
        } else if (sb - ct > sh / 2 && sb - ct < fh) {
          // at the top and arrow move with selected item
          followPoper.style.top = 0 + "px";
          poperArrow.style.top = (sb - ct - sh / 2) + "px";
        } else if (ct < st && cb > sb && (st - ct > fh / 2 - sh / 2 && cb - sb > fh / 2 - sh / 2)) {
          // at the center
          followPoper.style.top = st - ct - (fh - sh) / 2 + "px";
          poperArrow.style.top = (fh / 2 - 5) + "px";
        } else if (cb - st < sh / 2) {
          // at the bottom and arrow not move
          followPoper.style.bottom = 0 + "px";
          poperArrow.style.bottom = 0 + "px";
        } else if (cb - st > sh / 2 && cb - st < fh) {
          // at the bottom and arrow move with selected item
          followPoper.style.bottom = 0 + "px";
          poperArrow.style.bottom = (cb - st - sh / 2) + "px";
        } else if (sb - cb > sh) {
          // disappear at the bottom
          followPoper.style.visibility = "hidden";
          poperArrow.style.visibility = "hidden";
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
        // bottom differ used to judge followPoper visible at the bottom of the container
        const st = selectedEleRect.top;
        const sb = selectedEleRect.bottom;
        const sh = selectedEleRect.height;
        const ct = containerRect.top;
        const cb = containerRect.bottom;
        const fh = followPoperRect.height;


        if (ct - st > sh) {
          // console.log("Disappear at the top");
          // disappear at the top
          followPoper.style.visibility = "hidden";
          poperArrow.style.visibility = "hidden";
        }  else if (sb - ct < sh / 2) {
          // console.log("at the top and arrow not move");
          // at the top and arrow not move
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = 0 + "px";
          followPoper.style.bottom = "";

          poperArrow.style.top = 0 + "px";
          poperArrow.style.bottom = "";
        } else if (sb - ct > sh / 2 && sb - ct < fh) {
          // console.log("at the top and arrow move with selected item");
          // at the top and arrow move with selected item
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = 0 + "px";
          followPoper.style.bottom = "";

          poperArrow.style.top = (sb - ct - sh / 2) + "px";
          poperArrow.style.bottom = "";
        } else if (ct < st && cb > sb && (st - ct > fh / 2 - sh / 2 && cb - sb > fh / 2 - sh / 2)) {
          // console.log("at the center");
          // at the center
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = st - ct - (fh - sh) / 2 + "px";
          followPoper.style.bottom = "";

          poperArrow.style.top = (fh / 2 - 5) + "px";
          poperArrow.style.bottom = "";
        } else if (cb > st && cb - st < sh / 2) {
          // console.log("at the bottom and arrow not move");
          // at the bottom and arrow not move
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = "";
          followPoper.style.bottom = 0 + "px";

          poperArrow.style.top = "";
          poperArrow.style.bottom = 0 + "px";
        } else if (cb - st > sh / 2 && cb - st < fh) {
          // console.log("at the bottom and arrow move with selected item");
          // at the bottom and arrow move with selected item
          followPoper.style.visibility = "visible";
          poperArrow.style.visibility = "visible";
          followPoper.style.top = "";
          followPoper.style.bottom = 0 + "px";

          poperArrow.style.top = "";
          poperArrow.style.bottom = (cb - st - sh / 2) + "px";
        } else if (sb - cb > sh) {
          // console.log("disappear at the bottom");
          // disappear at the bottom
          followPoper.style.visibility = "hidden";
          poperArrow.style.visibility = "hidden";
        }
      })
  }
}
