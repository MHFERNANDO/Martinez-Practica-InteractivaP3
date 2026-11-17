import { Component, input, output } from '@angular/core';

export interface User {
  id: number;
  name: string;
  email: string;
  addres: {city:string};
}

@Component({
  imports: [],
  standalone: true,
  selector: 'app-user-item',
  styleUrl: './user-item.css',
  templateUrl: './user-item.html',
})
export class UserItem {
  user = input.required<User>();
  isFavorite = input<boolean>(false);
  toggle = output<number>();
}
