export default class ImagesRender {
  constructor() {

  }

  insertInPage({ local, link }) {
    document.querySelectorAll(local).forEach((item) => item.setAttribute('src', `${link}`));
  }
}