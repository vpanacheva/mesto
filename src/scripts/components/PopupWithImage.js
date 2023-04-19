import Popup  from "./Popup.js"

 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.formImgClicked = this.popupSelector.querySelector(".popup__image");
    this.nameImgClicked = this.popupSelector.querySelector(".popup__figcaption");
    }
     open(name, link) {
      super.open();
  };
}
