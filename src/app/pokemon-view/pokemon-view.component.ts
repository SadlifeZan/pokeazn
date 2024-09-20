import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-pokemon-view',
  templateUrl: './pokemon-view.component.html',
  styleUrl: './pokemon-view.component.scss'
})
export class PokemonViewComponent {

  @Input() selectedPokemon: any;

  getTypePokemon() {
    if (this.selectedPokemon === null) {
      return null;
    } else if (this.selectedPokemon.types.length == 2) {
      return {"background-image": "linear-gradient(var(--" + `${this.selectedPokemon.types[0].type.name}` + "), var(--" + `${this.selectedPokemon.types[1].type.name}` + "))"};
    } else {
      return {"background-color": "var(--" + `${this.selectedPokemon.types[0].type.name}` + ")"};
    }
  }
}
