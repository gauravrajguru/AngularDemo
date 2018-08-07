import { Component, OnInit, Input } from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  constructor(private heroService:HeroService,
              private location:Location,
            private route:ActivatedRoute) { }

  ngOnInit() {
    this.getHero()
  }
  getHero():void{
      const id:number = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id).subscribe(hero=>this.hero = hero);
  }
  save():void{
      this.heroService.updateHero(this.hero).
      subscribe(()=>this.goBack());
  }
  hero:Hero;  
  goBack():void{
    this.location.back();
  }
}
