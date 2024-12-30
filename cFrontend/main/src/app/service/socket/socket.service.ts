import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private url = environment.apiUrl
  private socket: any;

  constructor() {
    this.socket = io.connect(this.url, {});
  }

  exchange_emit(eventName: String, data: any) {
    this.socket.emit(eventName, data)
  }

  exchange_listen(eventName: String) {
    return Observable.create((observer: any) => {
      this.socket.on(eventName, (message: any) => {
        observer.next(message);
      });
    });
  }

  _emit(eventName: String, data: any) {
    this.socket.emit(eventName, data)
  }

  _listen(eventName: String) {
    return Observable.create((observer: any) => {
      this.socket.on(eventName, (message: any) => {
        observer.next(message);
      });
    });
  }
}
