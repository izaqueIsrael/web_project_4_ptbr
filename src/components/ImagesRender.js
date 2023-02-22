export default class ImagesRender {
  insertInPage({ local, link }) {
    document.querySelectorAll(local).forEach((item) => item.setAttribute('src', `${link}`));
  }
}