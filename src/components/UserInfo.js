export default class UserInfo {
  constructor(userName, userDescription, profileAvatar) {
    this._userName = userName;
    this._userDescription = userDescription;
    this._profileAvatar = profileAvatar;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
  }

  setUserInfo(data) {
    this._userName.textContent = data.name;
    this._userDescription.textContent = data.about;
  }

  changeAvatar(link) {
    this._profileAvatar.src = link;
  }
}
