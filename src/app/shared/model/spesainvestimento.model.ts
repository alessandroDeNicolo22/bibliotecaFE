import { SottocategoriaModel } from "./sottocategoria.model";

export class SpesaInvestimentoModel {
  id?: number;
  spesainvestimento!: string;
  oSottocategoria!: SottocategoriaModel | undefined;
}