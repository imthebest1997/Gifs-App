import { AfterViewInit, Component, ElementRef, Inject, computed, inject, viewChild } from '@angular/core';

import { GifService } from '../../services/gifs';
import { ScrollStateService } from '../../../shared/services/scroll-state';

@Component({
  selector: 'app-trending-page',
  templateUrl: './trending-page.html',
})
export class TrendingPage implements AfterViewInit{
  // Inyeccion del servicio
  gifsService = inject(GifService);

  scrollStateService = inject(ScrollStateService);

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv');


  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState();
  }


  // Acceso a la señal de gifs en el servicio
  readonly gifs = computed(() =>
    this.gifsService.trendingGifs()
  );


  onScroll(event: Event) {
    const scrollDiv = this.scrollDivRef()?.nativeElement;
    if (!scrollDiv) return;

    const scrollTop = scrollDiv.scrollTop;
    const clientHeight = scrollDiv.clientHeight;
    const scrollHeight = scrollDiv.scrollHeight;

    const isAtBottom = scrollTop + clientHeight >= scrollHeight;
    this.scrollStateService.trendingScrollState.set(scrollTop);

    if (isAtBottom) {
      this.gifsService.loadTrendingGifs();
    }
  }
}
