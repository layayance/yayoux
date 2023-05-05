import {yearsPerPage} from "@angular/material/datepicker";

export class Post {
  id!: number;
  userID!: number;
  title!: string;
  createdDate!: string;
  imageUrl!: string;
  content!: string;
  comments!: Comment[];
}
yearsPerPage
