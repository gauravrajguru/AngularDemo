import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './heroes';
import {Observable,of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService, private http:HttpClient) {
   }

   private heroesUrl = 'api/heroes';

   getHeroes():Observable< Hero[]>{
    this.log('HeroService: fetched heroes');

     return this.http.get<Hero[]>(this.heroesUrl)
   }
   getHero(id:number):Observable<Hero>{
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(HEROES.find(Hero=>Hero.id==id));
   }
   private log(message:string)
   {
     this.messageService.add(`HeroService: ${message}`);
   }

}
