import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { PokemonService } from '../../services/pokemon.service';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss'
})
export class PokemonListComponent implements OnInit, OnDestroy {

  pokemons: any = [];
  pokemonInfo: any = [];
  hover = false;       
  private subscriptions: Subscription = new Subscription();

  constructor(private pokemonService: PokemonService) {

  }

  ngOnInit(): void {
    this.subscriptions.add(this.pokemonService.getNext().subscribe( (response: any) => {
      response.results.forEach( (pokemon: any) => {
        this.pokemons.push(pokemon);
      })
    }));

    this.pokemons.forEach( (pokemon: any) => {
      this.subscriptions.add(this.pokemonService.getPokemonInfo(pokemon.url).subscribe( (response: any) => {
        this.pokemonInfo.push(response);
      }))
    })
  }
  
  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
  
  getTypeColor(pokemon: any): any {
    if (pokemon.types.length == 2) {
      return {"background-image": "linear-gradient(var(--" + `${pokemon.types[0].type.name}` + "), var(--" + `${pokemon.types[1].type.name}` + "))"};
    } else {
      return {"background-color": "var(--" + `${pokemon.types[0].type.name}` + ")"};
    }
  }

  getTypeColorHover(pokemon: any): any {
    if (pokemon.types.length == 2) {
      return {"background-image": "linear-gradient(var(--" + `${pokemon.types[0].type.name}` + "-hover), var(--" + `${pokemon.types[1].type.name}` + "-hover))"};
    } else {
      return {"background-color": "var(--" + `${pokemon.types[0].type.name}` + "-hover)"};
    }
  }

  hovered(event: any) {
    const target = event.target.children[1].children[0].innerHTML.toLowerCase();
    const pokemon = this.pokemonInfo.find( (pokemon: any) => pokemon.name == target);

    var hoverColor = null;

    if (pokemon.types.length == 2) {
       hoverColor = "linear-gradient(var(--" + `${pokemon.types[0].type.name}` + "-hover), var(--" + `${pokemon.types[1].type.name}` + "-hover))";
       event.target.style.setProperty("background-image", hoverColor);
    } else {
      hoverColor = "var(--" + `${pokemon.types[0].type.name}` + "-hover)";
      event.target.style.setProperty("background-color", hoverColor);
    }
  }

  mouseLeave(event: any) {
    const target = event.target.children[1].children[0].innerHTML.toLowerCase();
    const pokemon = this.pokemonInfo.find( (pokemon: any) => pokemon.name == target);

    var hoverColor = null;

    if (pokemon.types.length == 2) {
       hoverColor = "linear-gradient(var(--" + `${pokemon.types[0].type.name}` + "), var(--" + `${pokemon.types[1].type.name}` + "))";
       event.target.style.setProperty("background-image", hoverColor);
    } else {
      hoverColor = "var(--" + `${pokemon.types[0].type.name}` + ")";
      event.target.style.setProperty("background-color", hoverColor);
    }
  }
  
    
    
  

}
