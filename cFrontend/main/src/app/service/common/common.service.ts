import { EventEmitter, Injectable, Output } from '@angular/core';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class CommonService {
  key: any = CryptoJS.enc.Base64.parse("#SIReQLbtRxfidJtwrsURYmmPB#");
  password: any = CryptoJS.enc.Base64.parse("#jwzGMjSyekvUXKxlLKAAntLZd#");
  @Output() public isBytes = new EventEmitter();
  constructor() { }


  dataEncryption(encryptedData: any) {
    return CryptoJS.AES.encrypt(encryptedData, this.key, { iv: this.password }).toString();
  }

  dataDecryption(decryptedData: any) {
    if (decryptedData && decryptedData != '') {
      return CryptoJS.AES.decrypt(decryptedData.trim(), this.key, { iv: this.password }).toString(CryptoJS.enc.Utf8);
    }
    else {
      return '';
    }
  }


  isFile(files: FileList, event: any, type: any): any {
    console.log("🚀 ~ CommonService ~ isFile ~ type:", type)
    console.log("🚀 ~ CommonService ~ isFile ~ event:", event)
    console.log("🚀 ~ CommonService ~ isFile ~ files:", files)
    console.log("dsfsdfdsf")
    if (event.target.files && event.target.files[0]) {
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        let typeFile = file.type;
        let file_size = file.size / 1024 / 1024;
        if (
          typeFile != 'image/png' &&
          typeFile != 'image/jpg' &&
          typeFile != 'image/jpeg' &&
          typeFile != 'image/svg+xml' &&
          typeFile != 'image/gif' &&
          typeFile != 'image/avif'
        ) {
          this.isBytes.emit(true)
          return false;
        } else if (file_size >= 2) {
          this.isBytes.emit(true)
          return true;
        } else {
          return true;
        }
      }
    }
  }

}
