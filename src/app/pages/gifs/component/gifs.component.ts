import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { GifsService } from '../gifs.service';
import { FormsModule } from '@angular/forms';
import { Observable, Subject, take, takeUntil } from 'rxjs';
import { IGif } from '../iterfaces/IGif';

@Component({
  selector: 'app-gifs',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, NgOptimizedImage],
  templateUrl: './gifs.component.html',
  styleUrls: ['./gifs.component.scss'],
})
export class GifsComponent implements OnInit, OnDestroy {
  gifs$: Observable<IGif[]> = this.api.gifs$;
  currentPage: number = this.api.currentPage.value;
  pages: number[] = [];
  value = '';
  destroy$: Subject<void> = new Subject();
  itemsPerPage = this.api.itemsPerPage;

  constructor( private api: GifsService ) {
    this.api.currentPage.pipe(takeUntil(this.destroy$)).subscribe(page => this.currentPage = page);
  }

  ngOnInit() {
    this.getPagesAmount();
  }

  getPagesAmount() {
    this.api.getPagesAmount().pipe(take(1)).subscribe(res => {
      this.pages = Array.from({length: res}, ( _, i ) => i + 1);
    });
  }

  setSearchInput() {
    this.api.currentPage.next(1);
    this.api.searchInput.next(this.value);
  }

  setCurrentPage( page: number ) {
    this.api.currentPage.next(page);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  protected readonly Array = Array;
}
