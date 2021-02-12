import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {  map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiRequestService{

    constructor(private httpClient: HttpClient) {
        console.log('CONFIGURATION');
    }
    // omdb
    // API_URL: string = 'https://www.omdbapi.com/?i=tt3896198&apikey=3562cf47&s='; 

    //The Movie Database API TMDA
    API_KEY = 'api_key=07965a14da309795e1724733d32ed7cc';
    API_BASE_URL = 'https://api.themoviedb.org/3/';
    API_SEARCH_URL = this.API_BASE_URL + 'search/movie?' + this.API_KEY + '&query=';
    API_CONFIG_URL = this.API_BASE_URL + 'configuration?' + this.API_KEY;
    // API_URL: string = 'https://api.themoviedb.org/3/search/movie?api_key=07965a14da309795e1724733d32ed7cc&query=';
    IMAGE_BASE_URL = '';

    getMovies(searchTerm): Observable<any> {
        return this.httpClient
            .get(this.API_SEARCH_URL + searchTerm);
    }

    getMovie(id: string): Observable<object> {
        let url = this.API_BASE_URL + 'movie/' + id + '?' + this.API_KEY; 
        return this.httpClient
            .get(url);
    }

    getConfiguration(): void {
        this.httpClient.get(this.API_CONFIG_URL)
            .subscribe((data) => {
                console.log(data);
                this.IMAGE_BASE_URL = data['images'].base_url;
            }); 
    }

    getImage(posterId: string): string {
        return this.IMAGE_BASE_URL + 'w300' + posterId;
    }

}