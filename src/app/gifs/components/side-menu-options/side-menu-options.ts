import { RouterLink, RouterLinkActive } from '@angular/router';

import { Component } from '@angular/core';
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
  // menuOptions = input.required<MenuOption[]>();

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

}
