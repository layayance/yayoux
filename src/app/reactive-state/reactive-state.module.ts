import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveStateRoutingModule } from './reactive-state-routing.module';
import { CandidateListComponent } from './components/candidate-list/candidate-list.component';
import { SingleCandidateComponent } from './components/single-candidate/single-candidate.component';
import {SharedModule} from "../shared/shared.module";
import {CandidatesService} from "./service/candidates.service";


@NgModule({
  declarations: [
    CandidateListComponent,
    SingleCandidateComponent
  ],
  imports: [
    CommonModule,
    ReactiveStateRoutingModule,
    SharedModule
  ],
  providers:[
    CandidateListComponent,
    CandidatesService
  ]
})
export class ReactiveStateModule { }
