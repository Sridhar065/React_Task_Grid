import SecureLS from 'secure-ls';


 class StorageHelper {
  constructor () {
    this.storageClient = new SecureLS ({encodingType: 'aes'});
  }

  setValue (key, data) {
    const value = this.storageClient.set (key, data);
    return value;
  }

  getValue (key) {
    const value = this.storageClient.get (key);
    // if(value === null || value==="" )
    // {
    //  Swal.fire({text:"Session Expired.", icon : "info"},function(){
    //   window.location='/';
    //  });
    // }
    // else{
    return value;
    //}
  }
  getValueApp (key) {
   try{
    const value = this.storageClient.get (key);
    return value;
   }
   catch(ex)
   {
     return null;
   }
  }

  getAll () {
    const value = this.storageClient.getAllKeys ();
    return value;
  }

  removeAll () {
    const value = this.storageClient.removeAll ();
    return value;
  }

  removeValue (key) {
    const value = this.storageClient.remove (key);
    return value;
  }
}

export default new StorageHelper();
