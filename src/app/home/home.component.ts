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

  tags: string[] = ["history", "american", "crime", "magical", "french"]; // Lista tagova

  constructor(private servicesService: ServicesService ,private router: Router) {}

  ngOnInit(): void {
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
  
  
}
