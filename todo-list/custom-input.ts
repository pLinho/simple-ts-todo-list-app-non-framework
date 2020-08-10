import { ViewRender } from "../core/view-render";
import { MaterialInputSkinClone } from "./material-input-skin";

export class CustomInput extends ViewRender {
  init() {}
  render() {
    setTimeout(() => {
      new MaterialInputSkinClone(this);
    }, 0);
    return document.createElement("input");
  }
}
