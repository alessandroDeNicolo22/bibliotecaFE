import { OrdineAcquistoModel } from "./ordineacquisto.model";
import { ProgettoModel } from "./progetto-model";
import { SpesaInvestimentoModel } from "./spesainvestimento.model";

export class OrdineAcquistoDettaglioModel {
    id?: number;
    oProgetto!: ProgettoModel;
    oSpesaInvestimento!: SpesaInvestimentoModel;
    oOrdineAcquisto!: OrdineAcquistoModel;
    importo!: number;
    quantita!: number;
}