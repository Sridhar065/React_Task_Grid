import storage from './storageHelper';
export default class CommonHelper {
  checkPropertyExist (property, param) {
    if (param.hasOwnProperty (property)) {
      if (param[property] !== undefined) {
        return true;
      }
    }
    return false;
  }
  setName(userData) {
    storage.setValue ('name', userData.name);
    storage.setValue ('last', userData.lastname);
  }

  // setNames(userDatas) {
  //   storage.setValue ('last', userDatas);
  // }
 
 

  logOut() {
    storage.removeValue('token');
  }

  async apiSweetAlert (messageFormat) {
    let messages = '';
    for (var message in messageFormat) {
      messages = messages + '<p>' + messageFormat[message] + '</p>';
    }
    return messages;
  }
}
