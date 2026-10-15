import { Component, computed, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { StudentiService } from '../services/studenti-service';
import { Studente } from '../modelli/studente';

@Component({
  selector: 'app-elenco',
  imports: [FormsModule, RouterLink],
  templateUrl: './elenco.html',
  styleUrl: './elenco.css'
})
export class Elenco {
  private readonly studentiService = inject(StudentiService);
  
  readonly filtroClasse = signal('');
  readonly criterioOrdinamento = signal<'nome' | 'media'>('nome');

  // Elenco filtrato e ordinato
  readonly filtrati = computed(() => {
    const filtro = this.filtroClasse().trim().toUpperCase();
    const tutti = this.studentiService.studenti();
    
    // Prima filtriamo
    let lista = tutti;
    if (filtro !== '') {
      lista = tutti.filter(s => s.classe.toUpperCase() === filtro);
    }

    // Poi ordiniamo in base al criterio selezionato
    const criterio = this.criterioOrdinamento();
    return [...lista].sort((a, b) => {
      if (criterio === 'nome') {
        return a.nome.localeCompare(b.nome);
      } else {
        // Ordinamento per media decrescente (dal voto più alto)
        return b.mediaVoti - a.mediaVoti;
      }
    });
  });

  readonly mediaClasse = computed(() => {
    const lista = this.filtrati();
    if (lista.length === 0) return 0;
    const somma = lista.reduce((acc, s) => acc + s.mediaVoti, 0);
    return somma / lista.length;
  });

  ordina(criterio: 'nome' | 'media'): void {
    this.criterioOrdinamento.set(criterio);
  }

  rimuovi(id: number): void {
    this.studentiService.rimuovi(id);
  }
}