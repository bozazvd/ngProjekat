import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Post, ServicesService } from '../home/services.service';

@Component({
  selector: 'app-post-detail',  
  templateUrl: './post-detail.component.html', 
  styleUrls: ['./post-detail.component.css'] 
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;

  constructor(
    private route: ActivatedRoute,
    private servicesService: ServicesService  //moras injectovati srvis!!
  ) {}

  ngOnInit(): void {
    const postId = this.route.snapshot.paramMap.get('id');  // Uzimanje parametra iz URL-a

    // Ako postoji sačuvana objava u servisu, uzimamo je iz servisa
    if (this.servicesService.getCurrentPost()) {
      this.post = this.servicesService.getCurrentPost();  // Postavljamo sačuvanu objavu
    } else if (postId) {
      // Ako nije sačuvana objava, dohvataćemo je sa servera
      this.servicesService.getPostById(Number(postId)).subscribe(data => {
        this.post = data;  // Ažuriramo post sa podacima sa servera
      });
    }
  }
}
