import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {delay, Observable, tap} from "rxjs";
import {CandidatesService} from "../../service/candidates.service";
import {Candidate} from "../../models/candidate.model";
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit{
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  constructor(private candidatesService: CandidatesService) { }
  ngOnInit(): void {
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }
  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    this.candidates$ = this.candidatesService.candidates$;
  }

}
