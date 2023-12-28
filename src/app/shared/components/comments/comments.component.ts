import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Comment } from '../../../core/models/comment.model'
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { animate, animateChild, group, query, sequence, stagger, state, style, transition, trigger, useAnimation } from '@angular/animations';
import {flashAnimations} from "../../animations/flash.animations";
import {slideAndFadeAnimation} from "../../animations/slide-and-fade.animation";


@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss'],
  animations: [
    trigger('list',[
      transition(':enter',[
        query('@lisItem',[
          stagger(50, [
            animateChild()
          ])
        ])
      ])
    ]),
    trigger('listItem', [
      state('default', style({
        transform: 'scale(1)',
        'background-color': 'white',
        'z-index': 1
      })),
      state('active', style({
        transform: 'scale(1.05)',
        'background-color': 'rgb(201, 157, 242)',
        'z-index': 2
      })),
      transition('default => active', [
        animate('100ms ease-in-out')
      ]),
      transition('active => default', [
        animate('500ms ease-in-out')
      ]),

      transition(':enter', [
        query('.comment-text, .comment-date', [
          style({
            opacity: 0
          }),
        ]),
        useAnimation(slideAndFadeAnimation, {
          params: {
            time: '1000ms',
            startColor: 'rgb(244,155,100)'
          }
        }),
        group([
          useAnimation(flashAnimations, {
            params: {
              time: '1000ms',
              flashColor: 'rgb(249, 179, 111)'
            }
          }),
          query('.comment-text', [
              animate('500ms', style({
                  opacity: 1
              }))
          ]),
          query('.comment-date', [
              animate('1000ms', style({
                  opacity: 1
              }))
          ]),
      ]),
      ])

    ])
  ]
})
// void => *
export class CommentsComponent implements OnInit {

  @Input() comments!: Comment[];
  @Output() newComment = new EventEmitter<string>();

  commentCtrl!: FormControl;
  animationStates: { [key: number]: 'default' | 'active' } = {};

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentCtrl = this.formBuilder.control('', [Validators.required, Validators.minLength(10)]);
    for (let index in this.comments) {
      this.animationStates[index] = 'default';
    }
  }

  onLeaveComment() {
    if (this.commentCtrl.invalid) {
      return;
    }
    const maxId = Math.max(...this.comments.map(comment => comment.id));
    this.comments.unshift({
      id: maxId + 1,
      comment: this.commentCtrl.value,
      createDate: new Date().toISOString(),
      userId: 1
    });
    this.newComment.emit(this.commentCtrl.value);
    this.commentCtrl.reset();

    // console.log("dddd");
    // this.newComment.emit(this.commentCtrl.value);
    // console.log("dddd2");
    // this.commentCtrl.reset();
    // console.log("dddd3");
  }

  onListItemMouseEnter(index: number) {
    this.animationStates[index] = 'active';
  }

  onListItemMouseLeave(index: number) {
    this.animationStates[index] = 'default';
  }
}
