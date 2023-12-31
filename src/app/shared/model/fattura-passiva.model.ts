import { FornitoreModel } from "./fornitore.model";

export class FatturaPassivaModel {

    id?: number;
    data!: Date;
    numero!: string;
    descrizione!: string;
    oFornitore!: FornitoreModel | undefined;
}