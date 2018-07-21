import { Component, OnInit } from '@angular/core';
import {HEROES} from '../heroes'
import {Hero} from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  hero:Hero = {id: 1,name: 'Windstorm'};
  heroes = HEROES;
  selectedHero:Hero;
  onSelected(hero:Hero):void{
    this.selectedHero = hero;
  }

}
