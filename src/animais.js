export class Animais {
  constructor(especie, tamanho, bioma, tipo) {
    this.especie = especie;
    this.tamanho = tamanho;
    this.bioma = bioma;
    this.tipo = tipo;

  }
  mostrarAnimais() {
    return ("Especie: " + this.especie + " Tamanho: " + this.tamanho + " Bioma: " + this.bioma + " Tipo: " + (this.bioma) ? "Carnivoro" : "Herbivoro");
  }
}
