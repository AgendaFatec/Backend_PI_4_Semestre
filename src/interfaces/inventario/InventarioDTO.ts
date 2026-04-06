export interface Inventario {
  idInventario: number;
  salaId: number;
  salaNome?: string;
  statusInventario: string;
  dispositivos: {
    idDispositivo: number;
    nomeDispositivo: string;
    tipoDispositivo: string;
    quantidade: number;
  }[];
  tecnologias: {
    idTecnologia: number;
    nomeTecnologia: string;
    descricao?: string;
  }[];
  criadoEm: Date;
  atualizadoEm: Date;
}

export interface CreateInventario {
  salaId: number;
  dispositivoIds?: number[];
  tecnologiaIds?: number[];
  statusInventario?: string;
}

export interface UpdateInventario {
  statusInventario?: string;
  dispositivoIds?: number[];
  tecnologiaIds?: number[];
}

export interface ListarInventarioQuery {
  pagina?: number;
  limite?: number;
  status?: string;
  Search_Sala?: string; // busca por nome de sala
}

export interface ListarInventarioComBusca {
  pagina?: number;
  limite?: number;
  busca?: string; // busca por palavra-chave (dispositivos ou tecnologias)
}

export interface SalasComInventario {
  idSala: number;
  nomeSala: string;
  tipoSala: string;
  capacidadeAlunos?: number;
  fotoSala?: string;
  disponibilidadeSala: boolean;
  inventario: {
    idInventario: number;
    dispositivos: {
      tipoDispositivo: string;
      quantidade: number;
      nomes: string[];
    }[];
    tecnologias: {
      idTecnologia: number;
      nomeTecnologia: string;
    }[];
  };
}
