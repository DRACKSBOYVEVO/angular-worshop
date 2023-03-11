import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-detail',
  standalone: true,
  templateUrl: './detail.component.html',
  template: `
  <ul class="cards">
    <li
      class="cards_item"
      *ngFor="let character of characters"
      [style]="{'background-image':'url('+character.image+')'}"
    >
      <h3>{{character.name}}</h3>
      <a [routerLink]="['./detail', character.id]">details</a>
    </li>
  </ul>
`,
  styleUrls: ['./detail.component.css'],
})
export class DetailComponent implements OnInit {
  id: number;
  private sub: any;
  characterURL = 'https://rickandmortyapi.com/api/character/';
  character = {};
  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit() {
    this.sub = this.route.params
      .pipe(
        switchMap((params) => this.http.get(this.characterURL + params['id']))
      )
      .subscribe((characterResponse) => {
        this.character = characterResponse;
        console.log(this.character);
      });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}