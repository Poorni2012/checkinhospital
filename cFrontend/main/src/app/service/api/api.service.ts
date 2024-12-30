import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, retry } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { ConfirmationDialogService } from '../Confirm/confirmation-dialog.service';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  token: any;
  REST_API_SERVER: any = environment.apiUrl;
  private addressDetails = new BehaviorSubject<any>({});
  writeStatus: any;
  ipchecking: any;


  constructor(
    private httpClient: HttpClient, public confirmationDialogService: ConfirmationDialogService,
    public toastrService: NbToastrService,
    @Inject(Router) private router: Router
  ) {
    this.token = localStorage.getItem('key');
  }

  extractData(res: Response) {
    let body: any = res;
    if (body.status == false && body.statusCode == 700) {
      setTimeout(() => {
        localStorage.clear();
        window.location.assign(environment.baseUrl + '');
      }, 1000);
    }
    else if (body.status == false && body.statusCode == 721) {
      setTimeout(() => {
        localStorage.clear();
        window.location.assign(environment.baseUrl + '');
      }, 1000);
    }
    else {
      return body || {};
    }
  }


  handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  public upload(url: String, formData: any) {
    return this.httpClient.post<any>(this.REST_API_SERVER + url, formData, {
      reportProgress: true,
      observe: 'events',
    });
  }


  public getRequest(url: String) {
    this.token = localStorage.getItem('key') || '';

    const headers = new HttpHeaders()
      .set('cache-control', 'no-cache')
      .set('content-type', 'application/json');
    headers.append('x-access-token', this.token);

    return this.httpClient
      .get(this.REST_API_SERVER + url, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  public postRequest(url: String, requestData: any) {
    this.token = localStorage.getItem('key') || '';

    const headers = new HttpHeaders()
      .set('cache-control', 'no-cache')
      .set('x-access-token', this.token);

    return this.httpClient
      .post<any>(this.REST_API_SERVER + url, requestData, { headers: headers })
      .pipe(map(this.extractData), catchError(this.handleError));
  }

  public filePostRequest(url: String, requestData: any) {
    this.token = localStorage.getItem('key');

    const headers = new HttpHeaders()
      .set('cache-control', 'no-cache')
      .set('x-access-token', this.token);

    return this.httpClient
      .post(this.REST_API_SERVER + url, requestData, { headers: headers })
      .pipe(catchError(this.handleError));
  }

  // Copy value
  copyText(value: any) {
    let copyText: any = value;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = copyText;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  // Bsc explorer 
  openExplore(address: any) {
    let url = 'https://testnet.bscscan.com/tx/' + address;
    window.open(url, '_blank');
  }

  setAddressInfo(address: any) {
    this.addressDetails.next(address);
  }

  getAddressInfo() {
    return this.addressDetails.asObservable();
  }

  checkaccess(url: any) {
    this.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe(async (suc: any) => {
      if (suc.status && suc.data != null) {
        const item = suc.data.modules.find((element: any) => element.link == url);
        if (item && !item.status) {
          this.router.navigate(['/pages/404'])
        }
        else if (item == 'undefined' || item == undefined) {
          this.router.navigate(['/pages/404'])
        }
      }
    })
  }

  readWriteAccess(url: any) {
    return new Promise(async (resolve, reject) => {
      this.postRequest('admin/getModule', { id: localStorage.getItem('id') }).subscribe(async (suc: any) => {
        if (suc.status && suc.data != null) {
          let modules = suc.data.modules
          const item = modules.find((element: any) => element.link == url);
          this.writeStatus = item.writeStatus
          if (this.writeStatus) {
            resolve(this.writeStatus)
          }
          else if (this.writeStatus == undefined || !this.writeStatus) {
            resolve(false)
          }
        }
        else {
          resolve(true)
        }
      })
    })
  }

  ipCheck() {
    // this.postRequest('admin/getIPchange', { userID: localStorage.getItem('userID') }).subscribe((check: any) => {
    //   if (check.status) {
    //     this.ipchecking = check.data
    //     let ipcheck = this.ipchecking.ip
    //     if (!ipcheck) {
    //       this.logout()
    //     }
    //   }
    // })
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      window.location.href = '/auth/login';
    }, 1000);
  }



}
