import { Component, OnInit } from '@angular/core';
import { ServicesService, Post } from './services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {

  posts: Post[] = [];
  trenutnaStr: number = 1;
  searchText: string = '';
  selectedTag: string = '';
  selectedPost: Post | null = null;
  isLoggedIn: boolean = false; // Provera da li je korisnik ulogovan

  tags: string[] = ["history", "american", "crime", "magical", "french"]; // Lista tagova

  constructor(private servicesService: ServicesService, private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus(); // Provera statusa logovanja
    this.getPosts();
  }

  // Pozivamo servis da dohvatimo postove
  getPosts(): void {
    this.servicesService.getPosts(this.searchText, this.selectedTag, this.trenutnaStr)
      .subscribe(data => {
        this.posts = data.posts;  // Ažuriramo postove u komponenti
      });
  }

  onPageChange(page: number): void {
    this.trenutnaStr = page;
    this.getPosts();  // Ponovno dohvatamo postove sa novom stranicom
  }

  onSearch(): void {
    this.trenutnaStr = 1;
    this.getPosts();  // Ponovno dohvatamo postove sa pretragom
  }

  hasSelectedTag(post: Post): boolean {
    return this.selectedTag ? post.tags?.includes(this.selectedTag) : false;
  }
  
  onPostClick(post: Post): void {
    this.servicesService.setCurrentPost(post);  // Čuvanje izabrane objave u servis
    this.router.navigate(['/post', post.id]);  // Navigacija na detaljnu stranicu sa ID-em objave
  }

  // Provera da li je korisnik ulogovan
  checkLoginStatus(): void {
    const user = localStorage.getItem('user') || sessionStorage.getItem('user');
    this.isLoggedIn = !!user;  // Ako postoji user, postavljamo isLoggedIn na true
    if (!this.isLoggedIn) {
      this.router.navigate(['/login']); // Ako nije ulogovan, preusmeravamo ga na login stranicu
    }
  }

  // Logout funkcionalnost
  onLogout(): void {
    localStorage.removeItem('user'); // Briše sačuvanog korisnika ako je Remember Me bio uključen
    sessionStorage.removeItem('user'); // Briše korisnika iz sesije
    this.isLoggedIn = false; // Ažuriramo status logovanja
    this.router.navigate(['/login']); // Preusmerava korisnika na login
  }
}
