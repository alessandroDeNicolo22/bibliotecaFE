import { FornitoreModel } from "./fornitore.model";

export class OrdineAcquistoModel {
    id?: number;
    importo!: number;
    ordineacquisto!: string;
    data!: string;
    oFornitore!: FornitoreModel|undefined ;
}