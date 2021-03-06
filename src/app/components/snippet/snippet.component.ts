import { Component, OnDestroy, OnInit } from '@angular/core';

import { ResourceModel } from 'ngx-resource-factory/resource/resource-model';

import { Snippet } from '../../services/resources/snippet.resource';
import { FileResource } from '../../services/resources/file.resource';
import { Label } from '../../services/resources/label.resource';
import { Observable, Subscription } from "rxjs";
import { Select } from "@ngxs/store";
import { LabelState } from "../../state/label/label.state";


@Component({
  selector: 'app-snippet',
  templateUrl: './snippet.component.html',
  styleUrls: ['./snippet.component.scss']
})
export class SnippetComponent implements OnInit, OnDestroy {

  activeSnippet: Snippet = null;
  files: ResourceModel<File>[] = [];
  labels: Label[] = [];

  availableLabelsSubscription: Subscription;
  snippetLoaderSubscription: Subscription;

  @Select(LabelState) labels$: Observable<Label[]>;
  @Select(state => state.snippet.activeSnippet) activeSnippet$: Observable<Snippet>;

  constructor(private fileResource: FileResource) {
  }

  ngOnInit() {
    this.availableLabelsSubscription = this.activeSnippet$.subscribe((snippet) => {
      if (snippet) {
        this.activeSnippet = snippet;

        this.fileResource.query({snippet: snippet.pk}).$promise
          .then((data) => {
            this.files = data;
          })
          .catch((error) => {
            console.log(error);
          });
        }
    });

    this.snippetLoaderSubscription = this.labels$.subscribe((data) => {
      this.labels = data;
    });
  }

  ngOnDestroy() {
    this.availableLabelsSubscription.unsubscribe();
    this.snippetLoaderSubscription.unsubscribe();
  }
}
