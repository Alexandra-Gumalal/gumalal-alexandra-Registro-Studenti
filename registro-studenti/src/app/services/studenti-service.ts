import { Injectable, computed, signal } from '@angular/core';
import { Studente } from '../modelli/studente';

@Injectable({ providedIn: 'root' })
export class StudentiService {
  private readonly STORAGE_KEY = 'registro_studenti_dati';

  private readonly dati = signal<Studente[]>(this.caricaDaStorage());

  private caricaDaStorage(): Studente[] {
    if (typeof window === 'undefined') return this.datiIniziali();
    const salvati = localStorage.getItem(this.STORAGE_KEY);
    if (salvati) {
      try {
        return JSON.parse(salvati);
      } catch {
        return this.datiIniziali();
      }
    }
    return this.datiIniziali();
  }

  private salvaSuStorage(lista: Studente[]): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(lista));
    }
  }

  private datiIniziali(): Studente[] {
    return [
      { id: 1, nome: 'Luca Bianchi', classe: '4B', mediaVoti: 7.5 },
      { id: 2, nome: 'Sara Rossi', classe: '4B', mediaVoti: 5.8 },
      { id: 3, nome: 'Marco Verdi', classe: '4A', mediaVoti: 8.2 },
      { id: 4, nome: 'Giulia Neri', classe: '4A', mediaVoti: 6.4 },
      { id: 5, nome: 'Paolo Russo', classe: '4B', mediaVoti: 4.9 },
    ];
  }

  readonly studenti = this.dati.asReadonly();

  readonly numero = computed(() => this.dati().length);
  
  readonly migliore = computed(() => {
    const lista = this.dati();
    if (lista.length === 0) return undefined;
    return lista.reduce((m, s) => (s.mediaVoti > m.mediaVoti ? s : m));
  });

  aggiungi(nome: string, classe: string, mediaVoti: number): Studente {
    const nuovo: Studente = { 
      id: this.prossimoId(), 
      nome: nome, 
      classe: classe, 
      mediaVoti: mediaVoti 
    };
    this.dati.update(lista => {
      const aggiornata = [...lista, nuovo];
      this.salvaSuStorage(aggiornata);
      return aggiornata;
    });
    return nuovo;
  }

  rimuovi(id: number): void {
    this.dati.update(lista => {
      const aggiornata = lista.filter(s => s.id !== id);
      this.salvaSuStorage(aggiornata);
      return aggiornata;
    });
  }

  trova(id: number): Studente | undefined {
    return this.dati().find(s => s.id === id);
  }

  successivo(id: number): Studente | undefined {
    const lista = this.dati();
    const i = lista.findIndex(s => s.id === id);
    if (i === -1) return undefined;
    return lista[(i + 1) % lista.length];
  }

  private prossimoId(): number {
    return Math.max(0, ...this.dati().map(s => s.id)) + 1;
  }
}