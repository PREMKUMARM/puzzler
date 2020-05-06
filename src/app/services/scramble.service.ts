import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { of } from 'rxjs';



/**
 * Make a promise to load image
 * @param src {String}
 */
export function loadImage(src: string) {
  return new Promise((resolve, reject) => {
    let image = new Image();
    image.crossOrigin = 'Anonymous'; // Work only if the server response headers contains [Access-Control-Allow-Origin: *]
    image.onload = () => {
      resolve(image);
    };
    image.src = src;
    image.onerror = (event: Event) => {
      const error = new Error(`Image ${src} is not loaded.`);
      reject(error);
    }
  });
}
@Injectable()
export class ScrambleService {

  tiles = [];
  imagePromiseCache = null;
  maxFontSize = 72;

  constructor(private config: ConfigService) { }

  getImageFromTile(tile) {
    let key = 'blank';
    if (this.config.showNumber) {
      key += 'Number';
    }
    if (this.config.highlightRightPlace) {
      key += 'Border';
      if (tile.position_x === tile.x && tile.position_y === tile.y) {
        key += 'Success';
      } else {
        key += 'Fail';
      }
    }
    return tile.cache[key];
  }

  getTiles() {
   /*  if (this.tiles.length) {
      return new Promise((resolve, reject) => {
        resolve(this.tiles)
      });
    } else  */{
      return this.generate(
        this.config.dimension,
        this.config.showNumber,
        this.config.highlightRightPlace
      ).then(() => {
        return this.tiles;
      });
    }
  }

  getImage = ($q) => {
    const deferred = $q.defer();
    let img = new Image();
    img.onload = function () {
      deferred.resolve(this);
    };
    img.src = 'images/nature.jpg';
    return deferred.promise;
  };

  

/*   imagePromise() {
    if (!this.imagePromiseCache) {
      this.imagePromiseCache = this.getImage(this.$q);
    }
    return this.imagePromiseCache;
  } */

  getTileAsCanvas(img, i, j, tileSize, ratio, margin) {
    let tileCanvas = document.createElement("canvas");
    let tileCtx = tileCanvas.getContext('2d');
    tileCanvas.width = tileSize;
    tileCanvas.height = tileSize;
    tileCtx.clearRect(0, 0, tileCanvas.width, tileCanvas.height);
    tileCtx.drawImage(img,
      i * tileSize * ratio,     // image-x
      j * tileSize * ratio,     // image-y
      tileSize * ratio,         // image-width
      tileSize * ratio,         // image-height
      margin,                   // canvas-x
      margin,                   // canvas-y
      tileSize - (margin * 2),  // canvas-width
      tileSize - (margin * 2),  // canvas-height
    );
    return tileCanvas;
  };
  
  getCachedImageFromTile(tile, cacheName) {
    if (tile.canvas) {
      const margin = 3;
      const w = tile.canvas.width;
      const h = tile.canvas.height;
      const fontSize = (this.maxFontSize / this.config.dimension) * 2;
      const centerX = (w / 2);
      const centerY = (h / 2) + (fontSize / 2);
      const num = ((tile.y * this.config.dimension) + tile.x) + 1;
      
      let canvas = document.createElement("canvas");
      let ctx = canvas.getContext('2d');
      
      canvas.width = w;
      canvas.height = h;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      /**uncomment below line to display image over cards */
      //ctx.drawImage(tile.canvas, 0, 0, w, h, 0, 0, w, h);
      
      switch (cacheName) {
        case 'blank':
          break;
        case 'blankNumber':
          ctx.strokeStyle = 'black';
          this.drawNumber(ctx, fontSize, num, centerX, centerY);
          break;
        case 'blankNumberBorderFail':
          ctx.strokeStyle = 'red';
          ctx.strokeRect(margin, margin, w - (margin * 2), h - (margin * 2));
          this.drawNumber(ctx, fontSize, num, centerX, centerY);
          break;
        case 'blankNumberBorderSuccess':
          ctx.strokeStyle = 'green';
          ctx.strokeRect(margin, margin, w - (margin * 2), h - (margin * 2));
          this.drawNumber(ctx, fontSize, num, centerX, centerY);
          break;
        case 'blankBorderFail':
          ctx.strokeStyle = 'red';
          ctx.strokeRect(margin, margin, w - (margin * 2), h - (margin * 2));
          break;
        case 'blankBorderSuccess':
          ctx.strokeStyle = 'green';
          ctx.strokeRect(margin, margin, w - (margin * 2), h - (margin * 2));
          break;
      }
      
      return canvas.toDataURL();
    } else {
      return null;
    }
  }

  drawImagePart(ctx, img, i, j, tileSize, ratio, margin) {
    ctx.drawImage(img,
      i * tileSize * ratio,     // image-x
      j * tileSize * ratio,     // image-y
      tileSize * ratio,         // image-width
      tileSize * ratio,         // image-height
      i * tileSize + margin,    // canvas-x
      j * tileSize + margin,    // canvas-y
      tileSize - (margin * 2),  // canvas-width
      tileSize - (margin * 2),  // canvas-height
    );
  };
  
  drawHighlight(ctx, i, j, tileSize, margin) {
    ctx.strokeRect(
      i * tileSize + margin,    // canvas-x
      j * tileSize + margin,    // canvas-y
      tileSize - (margin * 2),  // canvas-width
      tileSize - (margin * 2)   // canvas-height
    );
  };
  
  drawNumber(ctx, fontSize, num, centerX, centerY) {
    const strokeStyle = ctx.strokeStyle;
    ctx.font = fontSize + 'px monospace';
    ctx.textAlign = 'center';
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'black';
    ctx.strokeText(num.toString(), centerX + 1, centerY + 1);
    ctx.lineWidth = 1;
    ctx.strokeStyle = strokeStyle;
    ctx.strokeText(num.toString(), centerX, centerY);
  }
  

  generate(dimension = 4, showNumber = true, highlightRightPlace = true) {
    const cacheKeys = [
      'blank',
      'blankNumber',
      'blankNumberBorderFail',
      'blankNumberBorderSuccess',
      'blankBorderFail',
      'blankBorderSuccess'
    ];
    
    return loadImage('assets/images/nature.jpg').then((img) => {
        this.tiles = [];
        
        const previewSize = 320;
        const margin = 5;
        const tileSize = Math.floor(previewSize / dimension);
        const ratio = img['width'] / previewSize;
        
        let canvas = document.createElement("canvas");
        let ctx = canvas.getContext('2d');
        
        canvas.width = previewSize;
        canvas.height = previewSize;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < dimension; i++) {
          for (let j = 0; j < dimension; j++) {
            if (i === dimension - 1 && j === dimension - 1) {
              this.tiles.push({x: i, y: j, canvas: null, cache: cacheKeys.map(() => null)});
              continue;
            }
            
            let tile = {x: i, y: j, canvas: this.getTileAsCanvas(img, i, j, tileSize, ratio, margin), cache: {}};
            cacheKeys.map((key) => {
              tile.cache[key] = this.getCachedImageFromTile(tile, key);
            });
            this.tiles.push(tile);
            
            this.drawImagePart(ctx, img, i, j, tileSize, ratio, margin);
            if (highlightRightPlace) {
              ctx.strokeStyle = (Math.random() > 0.5) ? 'red' : 'green';
              this.drawHighlight(ctx, i, j, tileSize, margin);
            } else {
              ctx.strokeStyle = 'black';
            }
            if (showNumber) {
              const fontSize = (this.maxFontSize / dimension) * 2;
              const centerX = (i * tileSize) + (tileSize / 2);
              const centerY = (j * tileSize) + (tileSize / 2) + (fontSize / 2);
              const num = ((j * dimension) + i) + 1;
              this.drawNumber(ctx, fontSize, num, centerX, centerY);
            }
          }
        }
  
        //return ctx.getImageData(0, 0, canvas.width, canvas.height);
        return canvas;
      }
    );
  }
}
