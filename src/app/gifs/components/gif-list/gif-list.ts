import { Component, input } from '@angular/core';

import { Gif } from '../../interfaces/gif.interface';
import { GifListItem } from './gif-list-item/gif-list-item';

@Component({
  selector: 'gif-list',
  imports: [GifListItem],
  templateUrl: './gif-list.html',
})
export class GifList {
  gifs = input.required<Gif[]>();
}
