import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  shareReplay,
  switchMap,
} from 'rxjs';
import { IGif } from './iterfaces/IGif';
import { environment } from '@/environment/environment';
import { TransformResponse } from '@/app/core/Transforms/Transform';

const API = {
  trending: '/gifs/trending',
  search: '/gifs/search',
};

@Injectable({
  providedIn: 'root',
})
export class GifsService {
  currentPage = new BehaviorSubject(1);
  searchInput = new BehaviorSubject<string>('');
  itemsPerPage: number = 12;

  constructor( private http: HttpClient ) {
  }

  gifs$: Observable<IGif[]> = combineLatest([
    this.currentPage.pipe(
      distinctUntilChanged(),
    ),
    this.searchInput.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ),
  ]).pipe(
    switchMap(( [page, query] ) =>
      this.getGifs(page, this.itemsPerPage, query),
    ),
    map(res => res['data']),
    shareReplay(1),
  );

  @TransformResponse()
  getGifs( page: number, limit: number, query: string ): Observable<any> {
    let params = new HttpParams()
      .set('limit', limit.toString())
      .set('offset', ((page - 1) * limit).toString());
    if (query.length) {
      params = params.set('q', query);
      return this.http.get(environment.baseUrl + API.search, {params});
    } else {
      return this.http.get(environment.baseUrl + API.trending, {params});
    }
  }

  @TransformResponse()
  getPagesAmount() {
    return this.http.get(environment.baseUrl + API.trending).pipe(
      map(( res: any ) => {
        return Math.ceil(res.data.length / this.itemsPerPage)
      })
    );
  }
}
