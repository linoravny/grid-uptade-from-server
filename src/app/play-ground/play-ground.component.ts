import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatrixItem } from './interfaces/matrix-item';
import { MatrixService } from './services/matrix.service';

@Component({
  selector: 'app-play-ground',
  templateUrl: './play-ground.component.html',
  styleUrls: ['./play-ground.component.scss']
})
export class PlayGroundComponent implements OnInit {

  data: Array<MatrixItem> = [];
  cols: number = 9;
  subscription!: Subscription;
  error: string | undefined;

  constructor(private matrixService: MatrixService) { }

  //*******  S1: with socket.io **********//
  //***********************************//

  ngOnInit(): void {

    this.subscription = this.matrixService.setupSocketConnection().subscribe((res) => {

        if((this.data?.length === 0) && res?.length > 0) { //first time
          this.data = res;
          this._setStateToStorage(this.data);
        } else {
          for(const item of res) { //update
            this.data[item.id] = item;
          }
          this._setStateToStorage(this.data);
        }
    }, (err) => {
      console.log(`play ground page -> subscription err: ${err}`);
      this.error = err;
      this.data  = this._getStateFromStorage();
    }, () => {
      console.log(`complete`);
    });

  }

  _setStateToStorage(data:Array<MatrixItem>):void {
    let dataString = JSON.stringify(data);
    localStorage.setItem('data',dataString);
  }

  _getStateFromStorage():Array<MatrixItem> {
    let ret:Array<MatrixItem> = [];
    let dataString = localStorage.getItem('data');
    if(dataString) {
      ret = JSON.parse(dataString);
    }
    return ret;
  }

  ngOnDestroy() {
    this.matrixService.disconnect();
    this.subscription.unsubscribe();

  }


  //*******  S2: with polling **********//
  //***********************************//

  // ngOnInit(): void {


  //   this.matrixService.fetchMatrix().subscribe((res) => {
  //     this.currentTimeStemp = res[0]?.timeStamp || Date.now;
  //     this.data = res;

  //     setTimeout(()=>{
  //       this._polling();
  //     },1000)

  //   });

  //}

  // private _checkForUpdates(timeStemp:any) {
  //   this.matrixService.checkForUpdates(timeStemp).subscribe((res) => {
  //     console.log(res);

  //     if( res && res.length > 0 ) {

  //       for(const item of res) {
  //         this.data[item.id] = item;
  //       }

  //       let maxObj =  res.reduce((prev, current) => (prev.timeStamp > current.timeStamp) ? prev : current);
  //       this.currentTimeStemp = maxObj.timeStamp;
  //       console.log(this.currentTimeStemp)
  //     }
  //   });
  // }

  // private _polling = () => {
  //   let counter = 0;
  //   let timeout = 5000;

  //   const intervalCB = () =>{
  //       counter++;
  //       this._checkForUpdates(this.currentTimeStemp);
  //       console.log('intervalCB counter:' + counter);
  //       if(counter===10) {
  //         console.log('clearInterval');
  //         clearInterval(interval);
  //       }
  //   }
  //   let interval = setInterval(intervalCB, timeout);
  // }

}
