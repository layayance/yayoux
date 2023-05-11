import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Post } from '../models/post.model';
import { Observable } from 'rxjs';
import { PostsService } from './../services/posts.services';

@Injectable()
export class PostsResolver implements Resolve<Post[]> {
  constructor(private PostsService: PostsService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Post[]> {
    return this.PostsService.getPosts();
  }
}