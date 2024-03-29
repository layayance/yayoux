import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {combineLatest, delay, map, Observable, startWith, tap} from "rxjs";
import {CandidatesService} from "../../service/candidates.service";
import {Candidate} from "../../models/candidate.model";
import {FormBuilder, FormControl} from "@angular/forms";
import {CandidateSearchType} from "../../enum/candidate-search-type.enum";
@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.scss']
})
export class CandidateListComponent implements OnInit{
  loading$!: Observable<boolean>;
  candidates$!: Observable<Candidate[]>;
  searchCtrl!: FormControl;
  searchTypeCtrl!: FormControl;
  constructor(private candidatesService: CandidatesService, private formBuilder:FormBuilder) { }
  ngOnInit(): void {
    this.initForm();
    this.initObservables();
    this.candidatesService.getCandidatesFromServer();
  }
  private initObservables() {
    this.loading$ = this.candidatesService.loading$;
    const search$ = this.searchCtrl.valueChanges.pipe(
      startWith(this.searchCtrl.value),
      map(value => value.toLowerCase())
    );
    const searchType$: Observable<CandidateSearchType> = this.searchTypeCtrl.valueChanges.pipe(
      startWith(this.searchTypeCtrl.value)
    );
    this.candidates$ = combineLatest([search$,searchType$,this.candidatesService.candidates$]).pipe(
      map(([search, searchType, candidates]) => candidates.filter(candidate => candidate[searchType]
        .toLowerCase()
        .includes(search as string))
      )
    );
  }

  searchTypeOptions!: {
    value: CandidateSearchType,
    label: string
  }[];

  private initForm() {
    this.searchCtrl = this.formBuilder.control('');
    this.searchTypeCtrl = this.formBuilder.control(CandidateSearchType.LASTNAME);
    this.searchTypeOptions = [
      { value: CandidateSearchType.LASTNAME, label: 'Nom' },
      { value: CandidateSearchType.FIRSTNAME, label: 'Prénom' },
      { value: CandidateSearchType.COMPANY, label: 'Entreprise' }
    ];
  }

}
