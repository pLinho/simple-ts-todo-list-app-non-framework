export class HorizontalGroup {
  private container = document.createElement("div");
  private els: HTMLElement[];
  constructor(...elements: HTMLElement[]) {
    this.els = elements;
    this.container.style.display = "flex";
    this.els.forEach(el => {
      this.container.append(el);
    });
  }
  margin(top?: number, left?: number, bottom?: number, right?: number) {
    this.container.style.marginTop = top + "px";
    this.container.style.marginLeft = (left || top) + "px";
    this.container.style.marginBottom = (bottom || top) + "px";
    this.container.style.marginRight = (right || left || top) + "px";

    return this;
  }
  rendered() {
    return this.container;
  }
}
