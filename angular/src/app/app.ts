import { Component, signal, inject, OnInit, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {firstValueFrom} from 'rxjs';
import { UserItem, User } from './components/user-item/user-item';


@Component({
  imports: [RouterOutlet, CommonModule, FormsModule, UserItem],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App implements OnInit {
  private http = inject(HttpClient);

  protected readonly title = signal('angular');

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  favorites = signal<Set<number>>(new Set());



  filteredUsers = computed(() =>
    this.users().filter(u => u.name.toLowerCase().includes(this.searchTerm().toLowerCase()))
  );


  favoriteCount = computed(() => this.favorites().size);


  ngOnInit() {

    this.loadUsers();

  }

  async loadUsers() {
    this.loading.set(true);
    this.error.set(null);
    try{
      const data = await firstValueFrom(this.http.get<User[]>('https://jsonplaceholder.typicode.com/users'));
      this.users.set(data);
    } catch (err) {
      this.error.set('Error al cargar los usuarios');
    } finally {
      this.loading.set(false);
    }
  }


  toggleFavorite(id: number) {
    const next = new Set(this.favorites());
    next.has(id) ? next.delete(id) : next.add(id);
    this.favorites.set(next);
  }

}
