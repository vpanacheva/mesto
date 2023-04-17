import Popup  from "./Popup.js"

 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.formImgClicked = document.querySelector(".popup__image");
    this.nameImgClicked = document.querySelector(".popup__figcaption");
    }
     open(name, link) {
      super.open();
  };
}
