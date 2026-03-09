// src/models/types.ts
// Interfaces que definem a estrutura dos dados do Pingou

export interface Usuario {
  id: number;
  nome: string;
  criado_em: string;
}

export interface Meta {
  id: number;
  usuario_id: number;
  nome: string;
  emoji: string;
  valor_alvo: number;
  valor_atual: number;
  criado_em: string;
}

export interface Reserva {
  id: number;
  meta_id: number;
  valor: number;
  criado_em: string;
}

// Tipos para o corpo das requisições (sem campos gerados automaticamente)
export type CriarUsuarioBody = {
  nome: string;
};

export type CriarMetaBody = {
  usuario_id: number;
  nome: string;
  emoji?: string;
  valor_alvo: number;
};

export type CriarReservaBody = {
  meta_id: number;
  valor: number;
};
