import Popup  from "./Popup.js"

 export class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);

    this.formImgClicked = this._popup.querySelector(".popup__image");
    this.nameImgClicked = this._popup.querySelector(".popup__figcaption");
    }
    open({name, link}) {
      this.formImgClicked.src = link;
      this.formImgClicked.alt = name;
      this.nameImgClicked.textContent = name;
      super.open();
  };
}
