import { AreaModel } from "./area.model";

export class SottocategoriaModel{
    id?:number;
    codice!: string;
    sottocategoria!:string;
    budget!: number;
    budgetSpeso!: number;
    oArea!:AreaModel|undefined;
}