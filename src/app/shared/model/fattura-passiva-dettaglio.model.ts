import { AliquotaivaModel } from "./aliquotaiva.model";
import { FatturaPassivaModel } from "./fattura-passiva.model";
import { PreventivoModel } from "./preventivo-model";
import { SpesaInvestimentoModel } from "./spesainvestimento.model";

export class FatturaPassivaDettaglioModel {
    id?: number;
    oAliquotaiva!: AliquotaivaModel;
    oFatturapassiva!: FatturaPassivaModel;
    oPreventivo!: PreventivoModel;
    oSpesainvestimento!: SpesaInvestimentoModel;
    dettaglioFattura!: string;
    importo!: number;
}