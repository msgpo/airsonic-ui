import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './album/album.component';
import { SearchResultComponent } from './search-result/search-result.component';

@NgModule({
  imports: [ RouterModule.forRoot([
    { path: '', component: AlbumsComponent },
    { path: '**', component: AlbumsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'album/:id', component: AlbumComponent },
    { path: 'search/:query', component: SearchResultComponent }
  ]) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
