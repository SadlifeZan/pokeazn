import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { lastValueFrom, Observable, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private url: string = environment.pokeApiUrl + 'pokemon/';
  private _pokemons: any[] = [];
  private _next: string = '';

  constructor(private http: HttpClient) { }

  get pokemons(): any[] {
    return this._pokemons;
  }
  
  get next(): string {
    return this._next;
  }

  set next(next: string) {
    this._next = next;
  }

  getType(pokemon: any): string {
    return pokemon && pokemon.types.length > 0 ? pokemon.types[0].type.name : '';
  }

  getPokemon(name: string): Observable<any> {
    const url = `${this.url}${name}`;
    return this.http.get(url);
  }

  getPokemonInfo(url: string): Observable<any> {
    return this.http.get(url);
  }

  getNext(): Observable<any> {
    const url = this.next === '' ? `${this.url}?limit=151` : this.next;
    return this.http.get(url);
  }

  getEvolution(id: number): Observable<any> {
    const url = `${environment.pokeApiUrl}evolution-chain/${id}`;
    return this.http.get(url);
  }

  getSpecies(name: string): Observable<any> {
    const url = `${environment.pokeApiUrl}pokemon-species/${name}`;
    return this.http.get(url);
  }
}
