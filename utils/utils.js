import Card from "../components/Card.js";
import PopupWithImage from "../components/PopupWithImage.js";
const imageCardPopup = new PopupWithImage();

export const createNewCard = (title, link) => {
  const posts = document.querySelector('.posts');
  const newCard = new Card({ name: title, link: link, cardTemplate: '#post__template', handleCardClick: imageCardPopup.handleCardClick() });
  posts.insertBefore(newCard.setElementsInTemplate(), posts.firstElementChild);
}

export const profileName = (name) => {
  document.querySelector('.profile__title').textContent = `${name}`;
}

export const profileWork = (work) => {
  document.querySelector('.profile__subtitle').textContent = `${work}`;
}

export const profileImage = (image) => {
  document.querySelector('.profile__image').src = `${image}`;
}