// 1) Um animal se sente confortável se está num bioma adequado e com espaço suficiente para cada indivíduo
// 2) Animais carnívoros devem habitar somente com a própria espécie
// 3) Animais já presentes no recinto devem continuar confortáveis com a inclusão do(s) novo(s)
// 4) Hipopótamo(s) só tolera(m) outras espécies estando num recinto com savana e rio
// 5) Um macaco não se sente confortável sem outro animal no recinto, seja da mesma ou outra espécie
// 6) Quando há mais de uma espécie no mesmo recinto, é preciso considerar 1 espaço extra ocupado
// 7) Não é possível separar os lotes de animais nem trocar os animais que já existem de recinto (eles são muito apegados!).
// Por exemplo, se chegar um lote de 12 macacos, não é possível colocar 6 em 2 recintos.
import { RecintosZoo } from "./recintos-zoo.js";

console.log(new RecintosZoo().analisaRecintos("macaco", 2));
