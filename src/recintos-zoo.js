import { Animais } from "./animais.js";

const listaDosAnimais = [];

//Animais
const leao = new Animais("LEAO", 3, ["savana"], true);
const leopardo = new Animais("LEOPARDO", 2, ["savana"], true);
const crocodilo = new Animais("CROCODILO", 3, ["rio"], true);
const macaco = new Animais("MACACO", 1, ["savana", "floresta"], false);
const gazela = new Animais("GAZELA", 2, ["savana"], false);
const hipopotamo = new Animais("HIPOPOTAMO", 4, ["savana", "rio"], false);

listaDosAnimais.push(leao, leopardo, crocodilo, macaco, gazela, hipopotamo);

const recintos = [
  {
    id: 1,
    bioma: ["savana"],
    tamanhoTotal: 10,
    animaisExistentes: [macaco, macaco, macaco],
  },
  {
    id: 2,
    bioma: ["floresta"],
    tamanhoTotal: 5,
    animaisExistentes: [null],
  },
  {
    id: 3,
    bioma: ["savana", "rio"],
    tamanhoTotal: 7,
    animaisExistentes: [gazela],
  },
  {
    id: 4,
    bioma: ["rio"],
    tamanhoTotal: 8,
    animaisExistentes: [null],
  },
  {
    id: 5,
    bioma: ["savana"],
    tamanhoTotal: 9,
    animaisExistentes: [leao],
  },
];

class RecintosZoo {
  constructor(id, bioma, tamanhoTotal, animaisExistentes) {
    this.id = id;
    this.bioma = bioma;
    this.tamanhoTotal = tamanhoTotal;
    this.animaisExistentes = animaisExistentes;
  }

  analisaRecintos(animalProps, quantidade) {
    if (quantidade < 1) {
      return { erro: "Quantidade inválida" };
    }

    animalProps = animalProps.toUpperCase(); //passando nome do animal para maiuscula

    const animalEncontrado = listaDosAnimais.find(
      (lAnimal) => lAnimal.especie === animalProps
    );

    if (!animalEncontrado) {
      return { erro: "Animal inválido" };
    }


    const tamanhoDoAnimal = animalEncontrado.tamanho * quantidade;
    const biomaDoAnimal = animalEncontrado.bioma;
    const tipoDoAnimal = animalEncontrado.tipo;

    const biomasHabitaveis = recintos.filter((recinto) => { // filtra o nome dos biomas que o animal pode habitar.
      //separa os recintos que o animal pode habitar
      const biomas = recinto.bioma.some((bioma) =>
        biomaDoAnimal.includes(bioma)
      );

      if (!biomas) {
        return;
      }

      return biomas;
    });

    const recintosHabitaveis = biomasHabitaveis.filter((recinto) => { //filtra só os recintos que realmente podem ser habitáveis por ele.
      const espacoLivreCalc = this.calcularEspacoLivre(recinto);
      if (espacoLivreCalc >= tamanhoDoAnimal) {
        const recintoEViavel = recinto.animaisExistentes.some((animal) => {
          if (!animal) { // verifica se n tem animal
            if (animalEncontrado.especie != "MACACO") {
              return true;
            } else if (quantidade > 1) { // se for uma macaco e quantidade dele for menor que 1 ele volta false, se n true
              return true
            }
            return false
          }
          if (animal) {
            if (animal.tipo === true && animal.especie == animalProps) {//verifica carnivoro
              return true;
            }
            if (animal.tipo === tipoDoAnimal) { // verifica herbivoro

              if (animalEncontrado.especie != "HIPOPOTAMO") { //verifica se o animal é um hipopotamo
                return true;
              } else if (recinto.bioma.includes("savana" && "rio")) { //se for, ele so adiciona só recintos que tiver animais no bioma savana e rio.  não sabia que dava pra usar E dentro de um includes descobri na cagada
                return true
              }
            }
            return false;
          }
        });
        return recintoEViavel;
      }
      return false;
    });

    if (!recintosHabitaveis.length) {
      return { erro: "Não há recinto viável" };
    }

    const falas = recintosHabitaveis.map((rec) => {
      const espacoLivreCalc = this.calcularEspacoLivre(rec); // Calcula o espaço livre
      const maisDUm = rec.animaisExistentes.some(a => {
        if (!a?.especie) return false;
        if (a?.especie != animalEncontrado.especie) return true;
      })
      const espacoLivre = espacoLivreCalc - tamanhoDoAnimal - ((maisDUm) ? 1 : 0);
      return `Recinto ${rec.id} (espaço livre: ${espacoLivre} total: ${rec.tamanhoTotal})`;
    });

    const recintosViaveis = { recintosViaveis: falas } //a coisa mais dificil do mundo foi adaptar os returns para passar nos testes.
    return recintosViaveis
  }

  calcularEspacoLivre(recinto) {
    //função que calcula o espaço que tem livre no recinto
    const espacoOcupado = recinto.animaisExistentes.reduce((total, animal) => {
      // geralmente o reduce é uma mão na roda quando precisamos usar uma variável de apoio né, quebrei a cabeça e no fim era só usar isso.
      return animal ? total + animal.tamanho : total;
    }, 0);

    return recinto.tamanhoTotal - espacoOcupado;
  }
}

export { RecintosZoo as RecintosZoo };
