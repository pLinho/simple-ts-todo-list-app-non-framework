import { StyleSheet } from "./stylesheet";
import { ViewRender } from "../view-render";

export abstract class Skin {
  static skinRef = 0;
  private skinRef = Skin.skinRef++;
  protected className: string;
  protected viewElement: HTMLElement | HTMLElement[];
  protected styleElement: HTMLStyleElement;

  constructor(protected view: ViewRender) {
    this.className = "_s" + this.skinRef.toString(32);
    this.apply((this.viewElement = this.view.rendered()));
    this.applySkinInElements();
    this.createStyleSheetElement();
    this.replaceStyleSheetElementContent(
      this.prepareStyle(),
      this.prepareStyleSheet()
    );
    this.appendStyleSheetElementOnHead();
  }
  viewElements(): HTMLElement[] {
    if (Array.isArray(this.viewElement)) return this.viewElement;
    return new Array(this.viewElement);
  }
  associateViewer(view: ViewRender) {
    throw new Error("Method not implemented.");
  }
  removeViewer(view: ViewRender) {
    throw new Error("Method not implemented.");
  }
  applySkinInElements(elements = this.viewElements()) {
    elements.forEach(el => {
      if (!el.classList.contains(this.className)) {
        el.classList.add(this.className);
      }
    });
  }
  removeSkinInElements(elements = this.viewElements()) {
    elements.forEach(el => {
      if (el.classList.contains(this.className)) {
        el.classList.remove(this.className);
      }
    });
  }
  /// css
  appliedSkin(): boolean {
    return (els => {
      let applied = false;
      els.forEach(el =>
        !applied && el.classList.contains(this.className)
          ? (applied = true)
          : null
      );
      return applied;
    })(this.viewElements());
  }
  prepareStyle(cssStyle = this.style()) {
    if (cssStyle) {
      return `.${this.className}{${cssStyle}}`;
    }
    return "";
  }
  prepareStyleSheet(stylesheet = this.styleSheet()) {
    if (stylesheet) {
      return new StyleSheet(stylesheet).prependSelectorInSelectors(
        "." + this.className
      );
    }
    return "";
  }
  createStyleSheetElement() {
    if (!this.styleElement) {
      return (this.styleElement = document.createElement("style"));
    }
  }
  replaceStyleSheetElementContent(...content: string[]): string {
    return (this.styleElement.innerHTML = content
      .join("\n")
      .replace(/[ \n]{1,}/g, " "));
  }
  appendStyleSheetElementOnHead(): void {
    return document.head.append(this.styleElement);
  }

  // element and css
  style(): string {
    return null;
  }
  styleSheet(): string {
    return null;
  }
  apply(el: HTMLElement): void {}
  destroy() {
    this.removeSkinInElements();
    if (this.styleElement) this.styleElement.remove();
  }
}
