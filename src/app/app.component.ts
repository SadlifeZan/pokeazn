import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'pokeazn';

  selectedPokemon: any;

  selectPokemon(event: any) {
    this.selectedPokemon = event;
  }

  getTypePokemon() {
    if (this.selectedPokemon.types.length == 2) {
      return {"background-image": "linear-gradient(var(--" + `${this.selectedPokemon.types[0].type.name}` + "), var(--" + `${this.selectedPokemon.types[1].type.name}` + "))"};
    } else {
      return {"background-color": "var(--" + `${this.selectedPokemon.types[0].type.name}` + ")"};
    }
  }
}
