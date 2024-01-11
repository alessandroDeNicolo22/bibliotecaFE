import { AutoreModel } from "./autore-model";
import { CasaEditriceModel } from "./ce.model";

export class LibroModel{

    id?: number;
    oAutore!: AutoreModel;
    oCasaeditrice!: CasaEditriceModel;
    titolo!:string;
}