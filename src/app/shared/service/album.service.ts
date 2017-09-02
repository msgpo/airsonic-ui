import { Injectable } from '@angular/core';
import { SERVER_URL, User, USER_INFO } from './user.service';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Album, AlbumResponse, Albums, AlbumsResponse } from '../domain/album.domain';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { APPLICATION_NAME } from '../../app.module';

@Injectable()
export class AlbumService {

  constructor(private httpClient: HttpClient) { }

  getAlbums(options: {
    type?: string,
    size?: number,
    offset?: number,
    fromYear?: string,
    toYear?: string,
    genre?: string,
    musicFolderId?: string
  }): Observable<Array<Albums>> {
    const defaultOptions = {
      type: 'alphabeticalByName'
    };
    const sentOptions = Object.assign({}, defaultOptions, options);
    const server = localStorage.getItem(SERVER_URL);
    let params = new HttpParams();
    for (const option in sentOptions) {
      if (sentOptions.hasOwnProperty(option)) {
        params = params.set(option, sentOptions[option]);
      }
    }
    return this.httpClient.get<AlbumsResponse>(`${server}/rest/getAlbumList`, {params: params})
      .map(res => res['subsonic-response'].albumList.album);
  }

  getAlbum(id: string): Observable<Album> {
    const server = localStorage.getItem(SERVER_URL);
    const params = new HttpParams()
      .set('id', id);
    return this.httpClient.get<AlbumResponse>(`${server}/rest/getAlbum`, {params: params})
      .map(res => res['subsonic-response'].album);
  }

  getAlbumImageUrl(id: String) {
    const userInfo: User = JSON.parse(localStorage.getItem(USER_INFO));
    return `${userInfo.server}/rest/getCoverArt?id=${id}&v=1.15.0&
      u=${userInfo.name}&s=${userInfo.salt}&t=${userInfo.token}&c=${APPLICATION_NAME}&size=160`;
  }
}
