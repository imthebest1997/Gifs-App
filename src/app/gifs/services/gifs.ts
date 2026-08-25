import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { Observable, map, tap } from 'rxjs';

import type { Gif } from '../interfaces/gif.interface';
import { GifMapper } from '../mapper/gif.mapper';
import type { GiphyResponse } from '../interfaces/giphy.interfaces';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';

const GIF_KEY = 'searchHistory';

const loadFromLocalStorage = (): Record<string, Gif[]> => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}';
  const gifs = JSON.parse(gifsFromLocalStorage);
  return gifs;
}

@Injectable({providedIn: 'root'})
export class GifService {

  private http = inject(HttpClient);

  trendingGifs = signal<Gif[]>([]);
  trendingGifsLoading = signal(true);

  // searchHistory = signal<Record<string, Gif[]>>({});
  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage());
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()));

  constructor() {
    this.loadTrendingGifs();
  }

  //Efect
  saveGifsToLocalStorage = effect(() => {
    const historyString = JSON.stringify(this.searchHistory());
    localStorage.setItem(GIF_KEY, historyString);
  });

  loadTrendingGifs() {
    console.log(`InitState of ${this.trendingGifsLoading}`);
    this.trendingGifsLoading.set(true);

    this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/trending`, {
      params:{
        api_key: environment.giphyApiKey,
        limit: 20
      }
    }).subscribe((resp) => {

      if (resp && resp.data.length !== 0) {
        const gifs = GifMapper.mapGiphyItemsToGifArray(resp.data);
        this.trendingGifsLoading.set(false);
        this.trendingGifs.set(gifs);
      }

      console.log(`EndState of ${this.trendingGifsLoading}`);
    });
  }

  searchGifs(query: string): Observable<Gif[]> {
    return this.http.get<GiphyResponse>(`${environment.giphyURL}/gifs/search`, {
      params: {
        api_key: environment.giphyApiKey,
        limit: 20,
        q: query
      }
    })
    .pipe(
      map(({ data }) => GifMapper.mapGiphyItemsToGifArray(data)),
      // Historial (Efecto secundario)
      tap(items => {
        this.searchHistory.update(history => ({
          ...history,
          [query.toLowerCase()]: items
        }))
      })
    );
  }

  getHistoryGifs(query: string): Gif[] {
    return this.searchHistory()[query] ?? [];
  }

}
