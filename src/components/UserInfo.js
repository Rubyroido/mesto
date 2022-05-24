export default class UserInfo {
  constructor({ userNameSelector, userDescriptionSelector }) {
    this._userName = userNameSelector;
    this._userDescription = userDescriptionSelector;
  }

  getUserInfo() {
    return {
      name: this._userName.textContent,
      description: this._userDescription.textContent
    }
  }

  setUserInfo(item) {
    this._userName.textContent = item.name;
    this._userDescription.textContent = item.description;
  }
}
