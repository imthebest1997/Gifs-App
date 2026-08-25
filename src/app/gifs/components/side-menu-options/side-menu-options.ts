import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { GifService } from '../../services/gifs';
import { MenuOption } from '../../interfaces/menu-option.interface';

@Component({
  selector: 'gifs-side-menu-options',
  imports: [
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './side-menu-options.html',
})
export class SideMenuOptions {
  //Recibir del padre
  gifsService = inject(GifService);

  menuOptions: MenuOption[] = [
    {
      icon: 'fa-solid fa-chart-line',
      label: 'Trending',
      route: "/dashboard/trending",
      subLabel: "Gifs Populares"
    },
    {
      icon: 'fa-solid fa-magnifying-glass',
      label: 'Buscador',
      route: "/dashboard/search",
      subLabel: "Buscar Gifs"
    },
  ];

  // gifsHistory = computed(() => {
  //   return this.gifsService.searchHistory()
  // });

  gifsHistoryKeys = this.gifsService.searchHistoryKeys;
}
