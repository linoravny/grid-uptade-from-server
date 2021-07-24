import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MatrixItem } from '../interfaces/matrix-item';

import { io, Socket } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class MatrixService {

  private apiUri: string = environment.apiUri;
  private socket!: Socket;
  private observable:Observable<Array<MatrixItem>> | undefined


  constructor(private http: HttpClient) { }
  //*******  S1: with socket.io-client **********//
  //*********************************************//
  setupSocketConnection(): Observable<Array<MatrixItem>> {

    // this.socket.emit('my message', 'Hello i am Angular play ground page.');
    this.socket = io(this.apiUri);

    this.observable = new Observable(observer => {

        this.socket.on('get-data', (data: Array<MatrixItem>) => {
          console.log(data);
          observer.next(data);
        });

        this.socket.on('complete-all-data', () => {
          console.log('complete-all-data');
          observer.complete();
        });
        

        this.socket.on("connect", ()=>{
          console.log('connect');
        });
        this.socket.on("connect_failed", ()=>{
          observer.error('connect_failed');
        });
        this.socket.on("connect_error", ()=>{
          observer.error('connect_error');
        });
        this.socket.on("disconnect", ()=>{
          observer.error('disconnect');
        });


        return () => {
          this.disconnect();
        }

    });

    return this.observable;
  }

  disconnect() {
    if (this.socket) {
        console.log('socket disconnect');
        this.socket.disconnect();
    }
  }


  //*******  S2: with polling **********//
  //***********************************//


  // fetchMatrix(): Observable<Array<MatrixItem>> {

  //   let url = `${this.apiUri}/matrixData`;

  //   return this.http.get<Array<MatrixItem>>(url,)
  //     .pipe(
  //       map((res: Array<MatrixItem>) => {
  //         if (!res) {
  //           throw new Error('No Data');
  //         }
  //         return res;
  //       }),
  //       catchError(() => of([])),
  //     );
  // }

  // checkForUpdates(timeStemp:any): Observable<Array<MatrixItem>> {
  //   let _timeStemp = timeStemp || '';
  //   let url = `${this.apiUri}/checkForMatrixUpdates`;
  //   const params = new HttpParams().set('timeStemp', _timeStemp);

  //   return this.http.get<Array<MatrixItem>>(url, {params})
  //     .pipe(
  //       map((res: Array<MatrixItem>) => {
  //         if (!res) {
  //           throw new Error('No Data');
  //         }
  //         return res;
  //       }),
  //       catchError(() => of([])),
  //     );
  // }

}

