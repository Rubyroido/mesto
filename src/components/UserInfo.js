import { userName, userDescription, profileAvatar } from '../utils/constants.js';

export default class UserInfo {
  getUserInfo() {
    return {
      name: userName.textContent,
      description: userDescription.textContent
    }
  }

  setUserInfo(data) {
    userName.textContent = data.name;
    userDescription.textContent = data.about;
  }

  changeAvatar(link) {
    profileAvatar.src = link;
  }
}
