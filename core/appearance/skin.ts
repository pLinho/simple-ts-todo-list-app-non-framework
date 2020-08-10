import { StyleSheet } from "./stylesheet";
import { ViewRender } from "../view-render";

export abstract class Skin {
  private static skinRef = 0;
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
  private viewElements(): HTMLElement[] {
    if (Array.isArray(this.viewElement)) return this.viewElement;
    return new Array(this.viewElement);
  }
  private applySkinInElements(elements = this.viewElements()) {
    elements.forEach(el => {
      if (!el.classList.contains(this.className)) {
        el.classList.add(this.className);
      }
    });
  }
  private removeSkinInElements(elements = this.viewElements()) {
    elements.forEach(el => {
      if (el.classList.contains(this.className)) {
        el.classList.remove(this.className);
      }
    });
  }
  /// css
  private appliedSkin(): boolean {
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
  private prepareStyle(cssStyle = this.style()) {
    if (cssStyle) {
      return `.${this.className}{${cssStyle}}`;
    }
    return "";
  }
  private prepareStyleSheet(stylesheet = this.styleSheet()) {
    if (stylesheet) {
      return new StyleSheet(stylesheet).prependSelectorInSelectors(
        "." + this.className
      );
    }
    return "";
  }
  private createStyleSheetElement() {
    if (!this.styleElement) {
      return (this.styleElement = document.createElement("style"));
    }
  }
  private replaceStyleSheetElementContent(...content: string[]): string {
    return (this.styleElement.innerHTML = content
      .join("\n")
      .replace(/[ \n]{1,}/g, " "));
  }
  private appendStyleSheetElementOnHead(): void {
    return document.head.append(this.styleElement);
  }

  // element and css
  protected style(): string {
    return null;
  }
  protected styleSheet(): string {
    return null;
  }
  protected apply(el: HTMLElement): void {}
  destroy() {
    this.removeSkinInElements();
    if (this.styleElement) this.styleElement.remove();
  }
}
