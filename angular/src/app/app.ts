import { Component, signal, inject, OnInit } from '@angular/core';
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
export class App {
  private http = inject(HttpClient);

  protected readonly title = signal('angular');

  users = signal<User[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');
  favorites = signal<Set<number>>(new Set());
}
