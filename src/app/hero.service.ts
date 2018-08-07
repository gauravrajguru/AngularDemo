import { Injectable } from '@angular/core';
import {Hero} from './hero';
import {HEROES} from './heroes';
import {Observable,of} from 'rxjs';
import {MessageService} from './message.service';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import {catchError, map,tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(private messageService:MessageService, private http:HttpClient) {
   }

   private heroesUrl = 'api/heroes';
   httpOptions = {
    headers: new HttpHeaders({'content-type':'application/json'})
  };

   /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
   private handleError<T>(operation ='operation',result?:T)
   {
     //retutn the function which take error of any type as input
     //and return the observable output. error object is send by the catchError function.
     return (error:any):Observable<T>=>{
      
      this.log(`${operation} failed: ${error.message}`);
      console.error(error.message);
      return of<T>(result as T)
     };
   }

   getHeroes():Observable< Hero[]>{
    this.log('HeroService: fetched heroes');

     return this.http.get<Hero[]>(this.heroesUrl).pipe(
       tap(heroes=>this.log('Fetched Heroes')),
       catchError(this.handleError<Hero[]>('getHeroes',[]))
     );
   }
   getHero(id:number):Observable<Hero>{
    //this.messageService.add(`HeroService: fetched hero id=${id}`);
    //return of(HEROES.find(Hero=>Hero.id==id));
    const url=`${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_=>this.log(`fetched hero id =${id}`)),
      catchError(this.handleError<Hero>(`getHero id =${id}`))
    );
   }

   addHero(hero:Hero):Observable<Hero>{
    return this.http.post<Hero>(this.heroesUrl,hero,this.httpOptions).pipe(
      tap((hero:Hero)=>this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addhero'))
    );
   }

   updateHero(hero:Hero):Observable<any>{
    return this.http.put(this.heroesUrl,hero,this.httpOptions).pipe(
      tap(_=>this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('UpdateHero'))
    );
   }
   deleteHero(hero:Hero|number):Observable<any>{
     const id = typeof hero==='number'?hero:hero.id;
     const url=`${this.heroesUrl}/${id}`;

     return this.http.delete<Hero>(url,this.httpOptions).pipe(
       tap(_=>this.log(`deleted the hero with id = ${id}`)),
       catchError(this.handleError<any>('deleteHero'))
     );
    }
    private log(message:string)
    {
      this.messageService.add(`HeroService: ${message}`);
    }
    searchHeroes(term:string):Observable<Hero[]>
    {
      if(!term.trim())
      {
        return of([]);
      }
      return this.http.get<Hero[]>(`${this.heroesUrl}/?name=${term}`).pipe(
        tap(_=>this.log(`found heroes matching "${term}"`)),
        catchError(this.handleError<Hero[]>('searchHeroes',[]))
      );
    }
}
