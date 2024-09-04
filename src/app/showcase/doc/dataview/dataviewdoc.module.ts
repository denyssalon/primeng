import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DataViewModule } from 'primeng/dataview';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { AppDocModule } from '@layout/doc/app.doc.module';
import { AppCodeModule } from '@layout/doc/app.code.component';
import { AccessibilityDoc } from './accessibilitydoc';
import { BasicDoc } from './basicdoc';
import { ImportDoc } from './importdoc';
import { LayoutDoc } from './layoutdoc';
import { PaginationDoc } from './paginationdoc';
import { SortingDoc } from './sortingdoc';
import { StyleDoc } from './styledoc';
import { LoadingDoc } from './loadingdoc';
import { SkeletonModule } from 'primeng/skeleton';
import { Select } from 'primeng/select';
import { SelectButtonModule } from 'primeng/selectbutton';

@NgModule({
    imports: [
        CommonModule,
        AppCodeModule,
        SelectButtonModule,
        AppDocModule,
        DataViewModule,
        Select,
        ButtonModule,
        RouterModule,
        RatingModule,
        TagModule,
        FormsModule,
        SkeletonModule,
    ],
    exports: [AppDocModule],
    declarations: [ImportDoc, BasicDoc, PaginationDoc, SortingDoc, LayoutDoc, LoadingDoc, StyleDoc, AccessibilityDoc],
})
export class DataViewDocModule {}
