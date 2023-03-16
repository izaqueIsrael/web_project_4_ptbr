import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor() {
    super()
  }

  deletePostEvent(templateCorpe, { owner, data, id, user }) {
    const deleteButton = templateCorpe.querySelector('.post__delete__image');
    deleteButton.addEventListener('click', (e) => this._openDeletePopup(e, { owner, data, id, user }));
  }

  _openDeletePopup(e, { owner, data, id, user }) {
    super.open('.popup_modal-delete');
    this._closeDeletePopup(e, { owner, data, id, user });
  }

  _closeDeletePopup(e, { owner, data, id, user }) {
    document.querySelector('.modal__button_delete').addEventListener('click', (event) => {
      event.preventDefault();
      super.close('.popup_modal-delete');
      this._deletePostInPage(e);
      this._deletePostInServer(user, id);
    });
    if (JSON.stringify(owner._id) !== JSON.stringify(data.owner._id)) {
      console.log('Você não tem permissão para excluir esse cartão');
    }
  }

  _deletePostInPage(e) {
    e.target.parentElement.parentElement.remove()
  }

  _deletePostInServer(user, id) {
    user.deleteCard(id);
  }
}