import { FornitoreModel } from "./fornitore.model";

export class PreventivoModel{

    id?: number;
    codice!: string;
    preventivo!: string;
    oFornitore!: FornitoreModel | undefined;
    importo!: number;
    data!: Date;
}