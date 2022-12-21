
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';;
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { HttpEvent, HttpHeaders } from '@angular/common/http';
import {AddAlbumeModel} from './add-albume-model';

@Injectable({
    providedIn: 'root'
})

export class AlbumService{
    public headers: HttpHeaders;
    constructor(public httpClient: HttpClient) { }

    Create(item: AddAlbumeModel, url: string): Observable<any> {
        let tracks=[];
        const Url = `${ url}`;
        const formData: FormData = new FormData();
        for (const key in item) {
            if (item.hasOwnProperty(key)) {
                if (key === 'tracks') {
                    item.tracks.forEach(element => {
                        const trackFormData: FormData = new FormData();
                        for (const keyb in element) {
                            if (element.hasOwnProperty(keyb)) {
                                if (element[keyb] instanceof File) {
                                    formData.append(keyb, element[keyb], element[keyb].name);
                                } else {
                                    formData.append(keyb, element[keyb]);
                                }
                            }
                        }
                    })
                }
                else {
                    if (item[key] instanceof File) {
                        formData.append(key, item[key], item[key].name);
                    } else {
                        formData.append(key, item[key]);
                    }
                }
            }
        }
        return this.httpClient
            .post(Url, formData, {
                headers: this.headers,
                reportProgress: true,
                observe: 'events'
            })
            .pipe(map(response => response || {} as HttpEvent<any>));
    }

} 