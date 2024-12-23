import Versions from '@/assets/data/versions.json';
import { AppConfiguratorComponent } from '@/components/layout/configurator/app.configurator.component';
import { AppConfigService } from '@/service/appconfigservice';
import { CommonModule, DOCUMENT } from '@angular/common';
import { afterNextRender, booleanAttribute, Component, computed, ElementRef, Inject, Input, OnDestroy, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import docsearch from '@docsearch/js';
import { DomHandler } from 'primeng/dom';
import { StyleClass } from 'primeng/styleclass';

@Component({
    selector: 'app-topbar',
    standalone: true,
    imports: [CommonModule, FormsModule, StyleClass, RouterModule, AppConfiguratorComponent],
    template: `<div class="layout-topbar">
        <div class="layout-topbar-inner">
            <div class="layout-topbar-logo-container">
                <a [routerLink]="['/']" class="layout-topbar-logo" aria-label="PrimeNG Logo">
                    <svg width="120" height="33" viewBox="0 0 120 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M40.8911 25.8987C41.1585 25.8987 41.28 25.7529 41.28 25.5099V19.3853H44.1965C46.481 19.3853 47.6962 18.1458 47.6962 15.8856V9.95544C47.6962 7.67089 46.481 6.4557 44.1965 6.4557H38.3635C38.1205 6.4557 37.9747 6.60152 37.9747 6.84456V25.5099C37.9747 25.7529 38.1205 25.8987 38.3635 25.8987H40.8911ZM43.4187 16.1772H41.28V9.6638H43.4187C44.0749 9.6638 44.3909 10.0041 44.3909 10.6359V15.2051C44.3909 15.8127 44.0749 16.1772 43.4187 16.1772ZM53.4319 25.5099C53.4319 25.7529 53.2861 25.8987 53.043 25.8987H50.5154C50.2724 25.8987 50.1266 25.7529 50.1266 25.5099V6.84456C50.1266 6.60152 50.2724 6.4557 50.5154 6.4557H56.6157C58.9003 6.4557 60.1154 7.67089 60.1154 9.95544V15.8856C60.1154 17.5139 59.5078 18.5833 58.3413 19.0937L60.0182 25.4613C60.0911 25.7529 59.9453 25.8987 59.678 25.8987H57.1504C56.9073 25.8987 56.7858 25.7772 56.7372 25.5585L55.1089 19.3853H53.4319V25.5099ZM55.838 16.1772H53.4319V9.6638H55.838C56.4699 9.6638 56.8101 10.0041 56.8101 10.6359V15.2051C56.8101 15.837 56.4699 16.1772 55.838 16.1772ZM65.8511 25.5099C65.8511 25.7529 65.7053 25.8987 65.4623 25.8987H62.9347C62.6673 25.8987 62.5458 25.7529 62.5458 25.5099V6.84456C62.5458 6.60152 62.6673 6.4557 62.9347 6.4557H65.4623C65.7053 6.4557 65.8511 6.60152 65.8511 6.84456V25.5099ZM71.0035 25.8987C71.3195 25.8987 71.4896 25.7286 71.4896 25.4127V14.4759H71.6597L74.0658 25.4613C74.1387 25.7529 74.3089 25.8987 74.6005 25.8987H75.7914C76.083 25.8987 76.2532 25.7529 76.3261 25.4613L78.7322 14.4759H78.9023V25.4127C78.9023 25.7286 79.0724 25.8987 79.3884 25.8987H81.6486C81.9646 25.8987 82.1347 25.7286 82.1347 25.4127V6.94177C82.1347 6.62582 81.9646 6.4557 81.6486 6.4557H78.4405C78.1489 6.4557 77.9787 6.60152 77.9058 6.89316L75.2081 18.9965L72.5104 6.89316C72.4375 6.60152 72.2673 6.4557 71.9757 6.4557H68.7676C68.4516 6.4557 68.2815 6.62582 68.2815 6.94177V25.4127C68.2815 25.7286 68.4516 25.8987 68.7676 25.8987H71.0035ZM94.2623 25.5099C94.2623 25.7529 94.1651 25.8987 93.8734 25.8987H84.9296C84.7109 25.8987 84.5651 25.7529 84.5651 25.5099V6.84456C84.5651 6.60152 84.7109 6.4557 84.9296 6.4557H93.8734C94.1651 6.4557 94.2623 6.60152 94.2623 6.84456V9.27494C94.2623 9.51797 94.1651 9.6881 93.8734 9.6881H87.7975V14.5489H92.4395C92.6825 14.5489 92.8284 14.6947 92.8284 14.962V17.3681C92.8284 17.6354 92.6825 17.7813 92.4395 17.7813H87.7975V22.6906H93.8734C94.1651 22.6906 94.2623 22.8122 94.2623 23.0795V25.5099Z"
                            fill="var(--high-contrast-text-color)"
                        />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M99.998 25.5099C99.998 25.7529 99.8765 25.8987 99.6091 25.8987H97.0815C96.8385 25.8987 96.6927 25.7529 96.6927 25.5099V6.84456C96.6927 6.60152 96.8385 6.4557 97.0815 6.4557H99.4876C99.7063 6.4557 99.8521 6.55291 99.9251 6.77165L103.619 17.1008H103.765V6.84456C103.765 6.60152 103.887 6.4557 104.154 6.4557H106.682C106.925 6.4557 107.07 6.60152 107.07 6.84456V25.5099C107.07 25.7529 106.925 25.8987 106.682 25.8987H104.275C104.057 25.8987 103.911 25.8015 103.838 25.5828L100.119 15.2051H99.998V25.5099ZM119.708 22.399C119.708 24.6835 118.469 25.8987 116.209 25.8987H113.001C110.716 25.8987 109.501 24.6835 109.501 22.399V9.95544C109.501 7.67089 110.716 6.4557 113.001 6.4557H116.209C118.469 6.4557 119.708 7.67089 119.708 9.95544V12.483C119.708 12.7261 119.563 12.8719 119.319 12.8719H116.889C116.622 12.8719 116.5 12.7261 116.5 12.483V10.6359C116.5 10.0041 116.16 9.6638 115.528 9.6638H113.778C113.122 9.6638 112.806 10.0041 112.806 10.6359V21.7185C112.806 22.3747 113.146 22.6906 113.778 22.6906H115.528C116.16 22.6906 116.5 22.3747 116.5 21.7185V18.4618H115.236C114.969 18.4618 114.848 18.3159 114.848 18.0729V15.6425C114.848 15.3752 114.969 15.2537 115.236 15.2537H119.319C119.563 15.2537 119.708 15.3752 119.708 15.6425V22.399Z"
                            fill="var(--p-primary-color)"
                        />
                        <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--p-primary-color)" />
                        <mask id="mask0_1_36" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
                            <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--high-contrast-text-color)" />
                        </mask>
                        <g mask="url(#mask0_1_36)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--p-primary-color)" />
                        </g>
                        <path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--ground-background)" />
                        <path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--ground-background)" />
                        <path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--ground-background)" />
                        <path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--ground-background)" />
                        <path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--ground-background)" />
                    </svg>
                </a>
                <a [routerLink]="['/']" class="layout-topbar-icon" aria-label="PrimeNG Logo">
                    <svg width="31" height="33" viewBox="0 0 31 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--p-primary-color)" />
                        <mask id="mask0_1_52" style="mask-type: luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="31" height="33">
                            <path d="M15.1934 0V0V0L0.0391235 5.38288L2.35052 25.3417L15.1934 32.427V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1934 0Z" fill="var(--high-contrast-text-color)" />
                        </mask>
                        <g mask="url(#mask0_1_52)">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.1935 0V3.5994V3.58318V20.0075V20.0075V32.427V32.427L28.0364 25.3417L30.3478 5.38288L15.1935 0Z" fill="var(--p-primary-color)" />
                        </g>
                        <path d="M19.6399 15.3776L18.1861 15.0547L19.3169 16.6695V21.6755L23.1938 18.4458V12.9554L21.4169 13.6013L19.6399 15.3776Z" fill="var(--ground-background)" />
                        <path d="M10.5936 15.3776L12.0474 15.0547L10.9166 16.6695V21.6755L7.03966 18.4458V12.9554L8.81661 13.6013L10.5936 15.3776Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M11.3853 16.9726L12.6739 15.0309L13.4793 15.5163H16.7008L17.5061 15.0309L18.7947 16.9726V24.254L17.8283 25.7103L16.7008 26.843H13.4793L12.3518 25.7103L11.3853 24.254V16.9726Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M19.3168 24.7437L21.4168 22.6444V20.5451L19.3168 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path d="M10.9166 24.7437L8.81662 22.6444V20.5451L10.9166 22.3214V24.7437Z" fill="var(--ground-background)" />
                        <path
                            fill-rule="evenodd"
                            clip-rule="evenodd"
                            d="M13.0167 5.68861L11.7244 8.7568L13.8244 14.8932H14.7936V5.68861H13.0167ZM15.4397 5.68861V14.8932H16.5706L18.5091 8.7568L17.2167 5.68861H15.4397Z"
                            fill="var(--ground-background)"
                        />
                        <path d="M13.8244 14.8932L6.87813 12.3094L5.90888 8.27235L11.8859 8.7568L13.9859 14.8932H13.8244Z" fill="var(--ground-background)" />
                        <path d="M16.5706 14.8932L23.5169 12.3094L24.4861 8.27235L18.3476 8.7568L16.4091 14.8932H16.5706Z" fill="var(--ground-background)" />
                        <path d="M18.8321 8.27235L22.2245 7.94938L19.9629 5.68861H17.7013L18.8321 8.27235Z" fill="var(--ground-background)" />
                        <path d="M11.4013 8.27235L8.00893 7.94938L10.2705 5.68861H12.5321L11.4013 8.27235Z" fill="var(--ground-background)" />
                    </svg>
                </a>
            </div>

            <ul class="topbar-items">
                <li>
                    <div id="docsearch"></div>
                </li>
                <li>
                    <a href="https://github.com/primefaces/primeng" target="_blank" rel="noopener noreferrer" class="topbar-item">
                        <i class="pi pi-github text-surface-700 dark:text-surface-100"></i>
                    </a>
                </li>
                <li>
                    <a href="https://discord.gg/gzKFYnpmCY" target="_blank" rel="noopener noreferrer" class="topbar-item">
                        <i class="pi pi-discord text-surface-700 dark:text-surface-100"></i>
                    </a>
                </li>
                <li>
                    <a href="https://github.com/orgs/primefaces/discussions" target="_blank" rel="noopener noreferrer" class="topbar-item">
                        <i class="pi pi-comments text-surface-700 dark:text-surface-100"></i>
                    </a>
                </li>
                <li>
                    <button type="button" class="topbar-item" (click)="toggleDarkMode()">
                        <i class="pi" [ngClass]="{ 'pi-moon': isDarkMode(), 'pi-sun': !isDarkMode() }"></i>
                    </button>
                </li>
                <li *ngIf="showConfigurator" class="relative">
                    <button type="button" class="topbar-item config-item" enterActiveClass="animate-scalein" enterFromClass="hidden" leaveActiveClass="animate-fadeout" leaveToClass="hidden" pStyleClass="@next" [hideOnOutsideClick]="true">
                        <i class="pi pi-palette"></i>
                    </button>
                    <app-configurator />
                </li>
                <li>
                    <button type="button" class="topbar-item relative group overflow-hidden !border-transparent" (click)="toggleDesigner()">
                        <span
                            style="animation-duration: 2s; background: conic-gradient(from 90deg, #f97316, #f59e0b, #eab308, #84cc16, #22c55e, #10b981, #14b8a6, #06b6d4, #0ea5e9, #3b82f6, #6366f1, #8b5cf6, #a855f7, #d946ef, #ec4899, #f43f5e)"
                            class="absolute -top-5 -left-5 w-20 h-20 animate-spin"
                        ></span>
                        <span style="inset: 1px; border-radius: 4px" class="absolute z-2 bg-surface-0 dark:bg-surface-900 transition-all"></span>
                        <i class="pi pi-cog z-10"></i>
                    </button>
                </li>
                <li>
                    <button pStyleClass="@next" enterFromClass="hidden" enterActiveClass="animate-scalein" leaveToClass="hidden" leaveActiveClass="animate-fadeout" [hideOnOutsideClick]="true" type="button" class="topbar-item version-item">
                        <span class="version-text">{{ versions ? versions[0].name : 'Latest' }}</span>
                        <span class="version-icon pi pi-angle-down"></span>
                    </button>
                    <div class="versions-panel hidden">
                        <ul>
                            <li role="none" *ngFor="let v of versions">
                                <a [href]="v.url">
                                    <span>{{ v.version }}</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </li>
                <li *ngIf="showMenuButton" class="menu-button">
                    <button type="button" class="topbar-item menu-button" (click)="toggleMenu()" aria-label="Menu">
                        <i class="pi pi-bars"></i>
                    </button>
                </li>
            </ul>
        </div>
    </div>`
})
export class AppTopBarComponent implements OnDestroy {
    @Input({ transform: booleanAttribute }) showConfigurator = true;

    @Input({ transform: booleanAttribute }) showMenuButton = true;

    versions: any[] = Versions;

    scrollListener: VoidFunction | null;

    private window: Window;

    constructor(
        @Inject(DOCUMENT) private document: Document,
        private el: ElementRef,
        private renderer: Renderer2,
        private configService: AppConfigService
    ) {
        this.window = this.document.defaultView as Window;

        afterNextRender(() => {
            this.bindScrollListener();
            this.initDocSearch();
        });
    }

    isDarkMode = computed(() => this.configService.appState().darkTheme);

    isMenuActive = computed(() => this.configService.appState().menuActive);

    isDesignerActive = computed(() => this.configService.designerActive());

    toggleMenu() {
        if (this.isMenuActive()) {
            this.configService.hideMenu();
            DomHandler.unblockBodyScroll('blocked-scroll');
        } else {
            this.configService.showMenu();
            DomHandler.blockBodyScroll('blocked-scroll');
        }
    }

    toggleDesigner() {
        if (this.isDesignerActive()) {
            this.configService.hideDesigner();
        } else {
            this.configService.showDesigner();
        }
    }

    toggleDarkMode() {
        this.configService.appState.update((state) => ({ ...state, darkTheme: !state.darkTheme }));
    }

    initDocSearch() {
        docsearch({
            appId: 'XG1L2MUWT9',
            apiKey: '0c7d92ce7c38649263123110162ac181',
            indexName: 'primeng',
            container: '#docsearch'
        });
    }

    bindScrollListener() {
        if (!this.scrollListener) {
            this.scrollListener = this.renderer.listen(this.window, 'scroll', () => {
                if (this.window.scrollY > 0) {
                    this.el.nativeElement.children[0].classList.add('layout-topbar-sticky');
                } else {
                    this.el.nativeElement.children[0].classList.remove('layout-topbar-sticky');
                }
            });
        }
    }

    unbindScrollListener() {
        if (this.scrollListener) {
            this.scrollListener();
            this.scrollListener = null;
        }
    }

    ngOnDestroy() {
        this.unbindScrollListener();
    }
}
