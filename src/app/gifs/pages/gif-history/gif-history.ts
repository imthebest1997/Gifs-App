import { Component, computed, inject } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { GifList } from '../../components/gif-list/gif-list';
import { GifService } from '../../services/gifs';
import { map } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'gif-history',
  imports: [GifList],
  templateUrl: './gif-history.html',
})
export class GifHistory {
  gifsService = inject(GifService);

  //! Extraer el query dinamico de la ruta
  query = toSignal(
    inject(ActivatedRoute).params.pipe(
      map((params) => params['query'])
    )
  );

  gifsByKey = computed(() => this.gifsService.getHistoryGifs(this.query()));

}
