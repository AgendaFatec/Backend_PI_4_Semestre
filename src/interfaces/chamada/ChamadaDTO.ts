import { ChamadaStatus, TipoProblema } from "@prisma/client";

export interface CreateChamadaRequest {
  salaId: number;
  usuarioId: number;
  dispositivoId?: number;
  tipoProblema: TipoProblema;
  descricao: string;
  anexos?: string;
}

export interface UpdateStatusRequest {
  status: ChamadaStatus;
  tecnicoId: number;
  acoesRealizadas?: string;
}

export interface ChamadaResponse {
  idChamada: number;
  dataChamada: Date;
  status: ChamadaStatus;
  tipoProblema: TipoProblema;
  descricao: string;
  salaNome: string;
  usuarioNome: string;
  dispositivoNome?: string;
}