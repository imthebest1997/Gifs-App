import { Component, inject, signal } from '@angular/core';

import { Gif } from '../../interfaces/gif.interface';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs';

@Component({
  selector: 'app-search-page',
  imports: [GifList],
  templateUrl: './search-page.html',
})
export class SearchPage {
  // Inyeccion del servicio
  gifsService = inject(GifService);

  // Signal
  gifs = signal<Gif[]>([]);

  onSearch(query: string) {
    this.gifsService.searchGifs(query)
      .subscribe((resp) => {
        this.gifs.set(resp);
      }
    );
  }
}
