import { AutoreModel } from "./autore-model";
import { CasaEditriceModel } from "./ce.model";
import { GenereModel } from "./genere.model";

export class LibroModel{

    id?: number;
    oAutore!: AutoreModel;
    oCasaeditrice!: CasaEditriceModel;
    oGenere!: GenereModel;
    titolo!:string;
}