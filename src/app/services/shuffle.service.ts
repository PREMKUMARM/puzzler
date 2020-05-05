import { Injectable } from '@angular/core';

@Injectable()
export class ShuffleService {

  constructor() { }

  array(arr) {
    // http://stackoverflow.com/questions/6274339/how-can-i-shuffle-an-array
    const shuffleArray = (a) => {
      for (let i = a.length; i; i--) {
        let j = Math.floor(Math.random() * i);
        [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
    };
    return shuffleArray(arr);
  }
}
