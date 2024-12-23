import { Code } from '@/domain/code';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

interface LazyEvent {
    first: number;
    last: number;
}
@Component({
    selector: 'lazy-load-doc',
    standalone: false,
    template: `
        <app-docsectiontext>
            <p>
                Lazy mode is handy to deal with large datasets where instead of loading the entire data, small chunks of data are loaded on demand by invoking onLazyLoad callback everytime scrolling requires a new chunk. To implement lazy loading,
                enable
                <i>lazy</i> attribute, initialize your data as a placeholder with a length and finally implement a method callback using <i>onLazyLoad</i> that actually loads a chunk from a datasource. onLazyLoad gets an event object that contains
                information about the chunk of data to load such as the index and number of items to load. Notice that a new template called loadingItem is also required to display as a placeholder while the new items are being loaded.
            </p>
        </app-docsectiontext>
        <div class="card flex justify-center">
            <p-virtualscroller [items]="items" [itemSize]="50" [showLoader]="true" [delay]="250" [loading]="lazyLoading" [lazy]="true" (onLazyLoad)="onLazyLoad($event)" styleClass="border border-surface" [style]="{ width: '200px', height: '200px' }">
                <ng-template #item let-item let-options="options">
                    <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                        {{ item }}
                    </div>
                </ng-template>
            </p-virtualscroller>
        </div>
        <app-code [code]="code" selector="scroller-lazy-load-demo"></app-code>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class LazyLoadDoc {
    items!: string[];

    lazyLoading: boolean = true;

    loadLazyTimeout: any;

    constructor(private cd: ChangeDetectorRef) {}

    ngOnInit() {
        this.items = Array.from({ length: 1000 });
    }

    onLazyLoad(event: LazyEvent) {
        this.lazyLoading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(
            () => {
                const { first, last } = event;
                const lazyItems = [...this.items];

                for (let i = first; i < last; i++) {
                    lazyItems[i] = `Item #${i}`;
                }

                this.items = lazyItems;
                this.lazyLoading = false;
                this.cd.markForCheck();
            },
            Math.random() * 1000 + 250
        );
    }

    code: Code = {
        basic: `<p-virtualscroller
    [items]="items"
    [itemSize]="50"
    [showLoader]="true"
    [delay]="250"
    [loading]="lazyLoading"
    [lazy]="true"
    (onLazyLoad)="onLazyLoad($event)"
    styleClass="border border-surface"
    [style]="{'width': '200px', 'height': '200px'}">
        <ng-template #item let-item let-options="options">
            <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                {{ item }}
            </div>
        </ng-template>
</p-virtualscroller>`,

        html: `<div class="card flex justify-center">
    <p-virtualscroller
        [items]="items"
        [itemSize]="50"
        [showLoader]="true"
        [delay]="250"
        [loading]="lazyLoading"
        [lazy]="true"
        (onLazyLoad)="onLazyLoad($event)"
        styleClass="border border-surface"
        [style]="{'width': '200px', 'height': '200px'}">
            <ng-template #item let-item let-options="options">
                <div class="flex items-center p-2" [ngClass]="{ 'bg-surface-100 dark:bg-surface-700': options.odd }" style="height: 50px;">
                    {{ item }}
                </div>
            </ng-template>
    </p-virtualscroller>
</div>`,

        typescript: `import { Component, OnInit } from '@angular/core';
import { ScrollerModule } from 'primeng/scroller';

interface LazyEvent {
    first: number;
    last: number;
}

@Component({
    selector: 'scroller-lazy-load-demo',
    templateUrl: './scroller-lazy-load-demo.html',
    styles: [
        \`:host ::ng-deep {
            .p-scroller-viewport {
                flex: none;
            }
        }\`
    ],
    standalone: true,
    imports: [ScrollerModule]
})
export class ScrollerLazyLoadDemo implements OnInit {
    items!: string[];

    lazyLoading: boolean = true;

    loadLazyTimeout: any;

    ngOnInit() {
        this.items = Array.from({ length: 1000 });
    }

    onLazyLoad(event: LazyEvent) {
        this.lazyLoading = true;

        if (this.loadLazyTimeout) {
            clearTimeout(this.loadLazyTimeout);
        }

        //imitate delay of a backend call
        this.loadLazyTimeout = setTimeout(() => {
            const { first, last } = event;
            const lazyItems = [...this.items];

            for (let i = first; i < last; i++) {
                lazyItems[i] = \`Item #\${i}\`;
            }

            this.items = lazyItems;
            this.lazyLoading = false;
        }, Math.random() * 1000 + 250);
    }
}`,
        scss: `
:host ::ng-deep {
    .p-scroller-viewport {
        flex: none;
    }
}`
    };
}
