import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PicService {
  public picUrl = 'https://picsum.photos/list';
  // public picUrl2 = 'https://api.kwiltapp.com/4.0/index/group/filesystem/777777/88888888?access_token=890912313&fields=id,name,source_url,thumbnail_url';
  constructor(private _http: HttpClient) {
  }
  getPics() {
    return this._http.get(this.picUrl);
  }
}
