export class UserInfo {
  constructor({nameSelector, aboutSelector, avatarSelector}) {
    this._userName = document.querySelector(nameSelector);
     this._userAbout = document.querySelector(aboutSelector);
     this._avatar = document.querySelector(avatarSelector);
    }
    
    getUserInfo(){
        return {
          name: this._userName.textContent,
          about: this._userAbout.textContent,
          avatar: this._avatar.src,
          }
        }
  
        setUserInfo(data) { 
          this._userName.textContent = data.name;
          this._userAbout.textContent = data.about;
          this._avatar.src = data.avatar;
          this._avatar.alt = data.name;
          this._id = data._id;
        }
      
        getUserId() {
          return this._id;
        }
      }
      