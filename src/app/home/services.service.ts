import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {  // Dodajemo "export" ovde
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: { likes: number, dislikes: number };
  views: number;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  

getPostById(postId: number): Observable<Post> {
  const url = `https://dummyjson.com/posts/${postId}`;  
  return this.http.get<Post>(url);  
}


  private apiUrl = 'https://dummyjson.com/posts/search';  
  currentPost: Post | null = null; 

  constructor(private http: HttpClient) {}

  // Metoda za dohvat postova sa servera
  getPosts(searchText: string, selectedTag: string, page: number): Observable<any> {
    const limit = 10;
    const skip = (page - 1) * limit;

    let url = `${this.apiUrl}?limit=${limit}&skip=${skip}&q=${searchText}`;

    if (selectedTag) {
      url += `&tags=${selectedTag}`;
    }

    return this.http.get<any>(url);
  }
  setCurrentPost(post: Post): void {
    this.currentPost = post;
  }

  // Metoda za dobijanje currentPost
  getCurrentPost(): Post | null {
    return this.currentPost;
  }
}
