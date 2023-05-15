import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from '../../models/post.model'

@Component({
  selector: 'app-post-list-item',
  templateUrl: './post-list-item.component.html',
  styleUrls: ['./post-list-item.component.scss']
})

export class PostListItemComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error('Method not implemented.');
  }

  @Input() post!: Post;
  @Output() postCommented = new EventEmitter<{ comment: string, postId: number }>();

  tempUser = { firstName: 'Yayou', lastName: 'LDX' };



  onNewComment(comment: string) {
    this.postCommented.emit({ comment: comment, postId: this.post.id });
  }
}