import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loadingSub: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  lastStateChange = new Date();
  loadingStartedAt= new  Date();
  tolerateInMilisecond = 1000;

  activeRequest = 0;
  loadingMap: Map<string, boolean> = new Map<string, boolean>();

  constructor() {}

  setLoading(loading: boolean, url: string): void {
    
    if (!url) {
      throw new Error(
        'The request URL must be provided to the LoadingService.setLoading function'
      );
    }
    if (this.loadingSub.getValue() !== loading) {
      this.lastStateChange = new Date();
    }

    if (loading === true) {
      this.activeRequest++;
      //console.log("loading started");
      this.loadingMap.set(url, loading);

      //this.loadingSub.next(true);
    } else if (loading === false) {
      this.activeRequest--;
      this.loadingMap.delete(url);
    }
    if (loading === true && this.loadingSub.getValue() !== loading) {
      setTimeout(() => {
        if (this.activeRequest > 0) {
          this.loadingSub.next(true);
          this.loadingStartedAt = new Date();
        } else {
          if (this.loadingSub.getValue() == true) {
            //console.log("ending", new Date().getTime());
            let timeOutInMilisecond =
              new Date().getTime() - this.loadingStartedAt.getTime();
            //console.log("timeOutInMilisecond", timeOutInMilisecond);

            if (timeOutInMilisecond > this.tolerateInMilisecond)
              timeOutInMilisecond =
                this.tolerateInMilisecond - timeOutInMilisecond;
            if (timeOutInMilisecond < 0) timeOutInMilisecond = 0;
            //Math.abs((new Date().getTime() - new Date(""Fri Jan 15 2021 07:05:56 GMT+0800 (Malaysia Time)").getTime()) / 1000)
            //console.log("final timeout", timeOutInMilisecond);
            setTimeout(() => {
              //console.log("ended", this.activeRequest, new Date().getTime());
              this.loadingSub.next(false);
            }, timeOutInMilisecond);
            //this.loadingSub.next(false);
          } else {
            this.loadingSub.next(false);
            this.activeRequest = 0;
          }
        }
      }, this.tolerateInMilisecond);
    }

    if (this.activeRequest <= 0) {
      if (this.loadingSub.getValue() == true) {
        //console.log("ending", new Date().getTime());
        let timeOutInMilisecond =
          new Date().getTime() - this.loadingStartedAt.getTime();
        //console.log("timeOutInMilisecond", timeOutInMilisecond);

        if (timeOutInMilisecond > this.tolerateInMilisecond)
          timeOutInMilisecond = this.tolerateInMilisecond - timeOutInMilisecond;
        if (timeOutInMilisecond < 0) timeOutInMilisecond = 0;
        //Math.abs((new Date().getTime() - new Date(""Fri Jan 15 2021 07:05:56 GMT+0800 (Malaysia Time)").getTime()) / 1000)
        //console.log("final timeout", timeOutInMilisecond);
        setTimeout(() => {
          //console.log("ended", this.activeRequest, new Date().getTime());
          this.loadingSub.next(false);
        }, timeOutInMilisecond);
        //this.loadingSub.next(false);
      } else {
        this.loadingSub.next(false);
        this.activeRequest = 0;
      }
    }
  }
}
