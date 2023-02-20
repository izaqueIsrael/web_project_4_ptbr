import { profileName, profileWork, profileImage } from "../utils/utils.js";
export default class UserInfo {
  constructor({ name, work, image }) {
    this._name = name;
    this._work = work
    this._image = image;
  }

  getUserInfo() {
    return {
      name: this._name,
      work: this._work,
      image: this._image
    }
  }

  setUserInfo() {
    profileName(this._name);
    profileWork(this._work);
    profileImage(this._image);
  }

}