import { PrismaService } from "@/database/database.js";
import {
  Inventario,
  CreateInventario,
  UpdateInventario,
  ListarInventarioQuery,
  ListarInventarioComBusca,
  SalasComInventario,
  AtualizarInventarioPayload,
} from "@/interfaces/inventario/InventarioDTO.js";

export class InventarioService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateInventario): Promise<Inventario> {
    const sala = await this.prisma.sala.findUnique({
      where: { idSala: data.salaId },
    });

    if (!sala) {
      throw new Error("Sala não encontrada");
    }

    const existingInventario = await this.prisma.inventario.findUnique({
      where: { salaId: data.salaId },
    });

    if (existingInventario) {
      throw new Error("Já existe um inventário para esta sala");
    }

    const inventario = await this.prisma.inventario.create({
      data: {
        salaId: data.salaId,
        statusInventario: (data.statusInventario as any) || "ATIVO",
      },
      include: {
        dispositivos: { include: { dispositivo: true } },
        tecnologias: { include: { tecnologia: true } },
      },
    });

    if (data.dispositivoIds && data.dispositivoIds.length > 0) {
      for (const dispositivoId of data.dispositivoIds) {
        await this.prisma.inventarioDispositivo.create({
          data: {
            inventarioId: inventario.idInventario,
            dispositivoId,
            quantidade: 1,
          },
        });
      }
    }

    if (data.tecnologiaIds && data.tecnologiaIds.length > 0) {
      for (const tecnologiaId of data.tecnologiaIds) {
        await this.prisma.inventarioTecnologia.create({
          data: {
            inventarioId: inventario.idInventario,
            tecnologiaId,
          },
        });
      }
    }

    await this.prisma.historicoInventario.create({
      data: {
        inventarioId: inventario.idInventario,
        salaId: data.salaId,
        tipoAlteracao: "CRIACAO" as any,
        descricaoAlteracao: "Inventário criado",
      },
    });

    return this.findById(inventario.idInventario) as Promise<Inventario>;
  }

  async findAll(
    query?: ListarInventarioQuery,
  ): Promise<{ data: Inventario[]; total: number }> {
    const { pagina = 1, limite = 10, status, Search_Sala } = query || {};
    const skip = (pagina - 1) * limite;

    const where: any = {};

    if (status) where.statusInventario = status;
    if (Search_Sala) {
      where.sala = {
        nomeSala: { contains: Search_Sala, mode: "insensitive" },
      };
    }

    const [inventarios, total] = await Promise.all([
      this.prisma.inventario.findMany({
        where,
        skip,
        take: limite,
        include: {
          sala: true,
          dispositivos: { include: { dispositivo: true } },
          tecnologias: { include: { tecnologia: true } },
        },
        orderBy: { criadoEm: "desc" as any },
      }),
      this.prisma.inventario.count({ where }),
    ]);

    return {
      data: inventarios.map((inv: any) => this.mapToDTO(inv)),
      total,
    };
  }

  async findById(id: number): Promise<Inventario | null> {
    const inventario = await this.prisma.inventario.findUnique({
      where: { idInventario: id },
      include: {
        sala: true,
        dispositivos: { include: { dispositivo: true } },
        tecnologias: { include: { tecnologia: true } },
      },
    });

    return inventario ? this.mapToDTO(inventario) : null;
  }

  async findBySalaId(salaId: number): Promise<Inventario | null> {
    const inventario = await this.prisma.inventario.findUnique({
      where: { salaId },
      include: {
        sala: true,
        dispositivos: { include: { dispositivo: true } },
        tecnologias: { include: { tecnologia: true } },
      },
    });

    return inventario ? this.mapToDTO(inventario) : null;
  }

  async update(id: number, data: UpdateInventario): Promise<Inventario> {
    const inventario = await this.prisma.inventario.findUnique({
      where: { idInventario: id },
    });

    if (!inventario) {
      throw new Error("Inventário não encontrado");
    }

    if (data.capacidadeAlunos !== undefined || data.fotoSala !== undefined) {
      const updateData: any = {};

      if (data.capacidadeAlunos !== undefined) {
        updateData.capacidadeAlunos = data.capacidadeAlunos;
      }

      if (data.fotoSala !== undefined) {
        if (data.fotoSala.length === 0) {
          updateData.fotoSala = null;
        } else {
          updateData.fotoSala = data.fotoSala.join(",");
        }
      }

      await this.prisma.sala.update({
        where: { idSala: inventario.salaId },
        data: updateData,
      });
    }

    if (data.statusInventario) {
      await this.prisma.inventario.update({
        where: { idInventario: id },
        data: { statusInventario: data.statusInventario as any },
      });
    }

    if (data.dispositivos) {
      await this.prisma.inventarioDispositivo.deleteMany({
        where: { inventarioId: id },
      });

      for (const disp of data.dispositivos) {
        let dispId = disp.id;

        if (!dispId || dispId > 1000000) {
          if (disp.nome) {
            let tipoEnum = "DESKTOP";
            if (disp.nome === "Notebook") tipoEnum = "NOTEBOOK";
            if (disp.nome === "Projetor") tipoEnum = "PROJETOR";
            if (disp.nome === "Televisão" || disp.nome === "TV")
              tipoEnum = "TV";

            const newDisp = await this.prisma.dispositivo.create({
              data: {
                nomeDispositivo: disp.nome,
                tipoDispositivo: tipoEnum as any,
              },
            });
            dispId = newDisp.idDispositivo;
          }
        }

        if (dispId) {
          await this.prisma.inventarioDispositivo.create({
            data: {
              inventarioId: id,
              dispositivoId: dispId,
              quantidade: disp.quantidade,
            },
          });
        }
      }

      await this.prisma.historicoInventario.create({
        data: {
          inventarioId: id,
          salaId: inventario.salaId,
          tipoAlteracao: "EDICAO" as any,
          descricaoAlteracao: "Dispositivos do inventário atualizados/criados",
        },
      });
    }

    if (data.tecnologias) {
      await this.prisma.inventarioTecnologia.deleteMany({
        where: { inventarioId: id },
      });

      for (const tec of data.tecnologias) {
        let tecId = tec.id;

        if (!tecId || tecId > 1000000) {
          if (tec.nome) {
            const existingTec = await this.prisma.tecnologia.findUnique({
              where: { nomeTecnologia: tec.nome },
            });

            if (existingTec) {
              tecId = existingTec.idTecnologia;
            } else {
              const newTec = await this.prisma.tecnologia.create({
                data: { nomeTecnologia: tec.nome },
              });
              tecId = newTec.idTecnologia;
            }
          }
        }

        if (tecId) {
          await this.prisma.inventarioTecnologia.create({
            data: {
              inventarioId: id,
              tecnologiaId: tecId,
            },
          });
        }
      }

      await this.prisma.historicoInventario.create({
        data: {
          inventarioId: id,
          salaId: inventario.salaId,
          tipoAlteracao: "EDICAO" as any,
          descricaoAlteracao: "Tecnologias do inventário atualizadas/criadas",
        },
      });
    }

    return this.findById(id) as Promise<Inventario>;
  }

  async delete(id: number): Promise<void> {
    const inventario = await this.prisma.inventario.findUnique({
      where: { idInventario: id },
    });

    if (!inventario) {
      throw new Error("Inventário não encontrado");
    }

    await this.prisma.inventario.delete({
      where: { idInventario: id },
    });
  }

  async buscarPorPalavraChave(
    busca: string,
    query?: ListarInventarioComBusca,
  ): Promise<{ data: SalasComInventario[]; total: number }> {
    const { pagina = 1, limite = 10 } = query || {};
    const skip = (pagina - 1) * limite;

    const salasPorNome = await this.prisma.sala.findMany({
      where: { nomeSala: { contains: busca, mode: "insensitive" } },
      include: {
        inventario: {
          include: {
            dispositivos: { include: { dispositivo: true } },
            tecnologias: { include: { tecnologia: true } },
          },
        },
      },
    });

    const dispositivosPorNome = await this.prisma.dispositivo.findMany({
      where: { nomeDispositivo: { contains: busca, mode: "insensitive" } },
      include: {
        inventarios: {
          include: {
            inventario: {
              include: {
                sala: true,
                dispositivos: { include: { dispositivo: true } },
                tecnologias: { include: { tecnologia: true } },
              },
            },
          },
        },
      },
    });

    const tecnologiasPorNome = await this.prisma.tecnologia.findMany({
      where: { nomeTecnologia: { contains: busca, mode: "insensitive" } },
      include: {
        inventarios: {
          include: {
            inventario: {
              include: {
                sala: true,
                dispositivos: { include: { dispositivo: true } },
                tecnologias: { include: { tecnologia: true } },
              },
            },
          },
        },
      },
    });

    const salasMap = new Map<number, any>();

    salasPorNome.forEach((sala: any) => {
      if (!salasMap.has(sala.idSala)) salasMap.set(sala.idSala, sala);
    });

    dispositivosPorNome.forEach((dispositivo: any) => {
      dispositivo.inventarios.forEach((inv: any) => {
        if (!salasMap.has(inv.inventario.sala.idSala)) {
          salasMap.set(inv.inventario.sala.idSala, inv.inventario.sala);
        }
      });
    });

    tecnologiasPorNome.forEach((tecnologia: any) => {
      tecnologia.inventarios.forEach((inv: any) => {
        if (!salasMap.has(inv.inventario.sala.idSala)) {
          salasMap.set(inv.inventario.sala.idSala, inv.inventario.sala);
        }
      });
    });

    const salasUniqueasArray = Array.from(salasMap.values()).slice(
      skip,
      skip + limite,
    );

    const result = salasUniqueasArray.map((sala: any) => ({
      idSala: sala.idSala,
      nomeSala: sala.nomeSala,
      tipoSala: sala.tipoSala,
      capacidadeAlunos: sala.capacidadeAlunos,
      fotoSala: sala.fotoSala,
      disponibilidadeSala: sala.disponibilidadeSala,
      inventario: this.formatarInventarioParaBusca(sala.inventario),
    }));

    return {
      data: result,
      total: salasMap.size,
    };
  }

  private mapToDTO(inventario: any): Inventario {
    return {
      idInventario: inventario.idInventario,
      salaId: inventario.salaId,
      salaNome: inventario.sala?.nomeSala,
      capacidadeAlunos: inventario.sala?.capacidadeAlunos,
      fotoSala: inventario.sala?.fotoSala,
      statusInventario: inventario.statusInventario,
      dispositivos: inventario.dispositivos.map((d: any) => ({
        idDispositivo: d.dispositivo.idDispositivo,
        nomeDispositivo: d.dispositivo.nomeDispositivo,
        tipoDispositivo: d.dispositivo.tipoDispositivo,
        quantidade: d.quantidade,
      })),
      tecnologias: inventario.tecnologias.map((t: any) => ({
        idTecnologia: t.tecnologia.idTecnologia,
        nomeTecnologia: t.tecnologia.nomeTecnologia,
        descricao: t.tecnologia.descricao,
      })),
      criadoEm: inventario.criadoEm,
      atualizadoEm: inventario.atualizadoEm,
    };
  }

  async atualizarInventarioCompleto(
    payload: AtualizarInventarioPayload,
  ): Promise<Inventario> {
    // Validações iniciais
    if (!payload.inventario?.type) {
      throw new Error(
        "Tipo de operação de inventário obrigatório (create ou update)",
      );
    }

    if (payload.inventario.type === "create") {
      const createData = payload.inventario.data as CreateInventario;
      if (!createData.salaId) {
        throw new Error("salaId é obrigatório para criar um novo inventário");
      }
    } else if (payload.inventario.type === "update") {
      const updateData = payload.inventario.data as any;
      if (!updateData.id && !updateData.salaId) {
        throw new Error(
          "id ou salaId é obrigatório para atualizar um inventário",
        );
      }
    }

    return await this.prisma.$transaction(async (tx: any) => {
      // 1. Criar novo dispositivo
      const novoDispositivo = await tx.dispositivo.create({
        data: {
          nomeDispositivo: payload.dispositivo.nomeDispositivo,
          tipoDispositivo: payload.dispositivo.tipoDispositivo as any,
          patrimonio: payload.dispositivo.patrimonio,
          statusDispositivo:
            (payload.dispositivo.statusDispositivo as any) || "ATIVO",
        },
      });

      let inventarioId: number;

      if (payload.inventario.type === "create") {
        // CREATE: Criar novo inventário com o dispositivo
        const createData = payload.inventario.data as CreateInventario;

        const sala = await tx.sala.findUnique({
          where: { idSala: createData.salaId },
        });

        if (!sala) {
          throw new Error("Sala não encontrada");
        }

        const existingInventario = await tx.inventario.findUnique({
          where: { salaId: createData.salaId },
        });

        if (existingInventario) {
          throw new Error("Já existe um inventário para esta sala");
        }

        const inventario = await tx.inventario.create({
          data: {
            salaId: createData.salaId,
            statusInventario: (createData.statusInventario as any) || "ATIVO",
          },
        });

        inventarioId = inventario.idInventario;

        // Associar dispositivo ao inventário
        await tx.inventarioDispositivo.create({
          data: {
            inventarioId: inventarioId,
            dispositivoId: novoDispositivo.idDispositivo,
            quantidade: 1,
          },
        });

        // Associar tecnologias se houver
        if (createData.tecnologiaIds && createData.tecnologiaIds.length > 0) {
          for (const tecnologiaId of createData.tecnologiaIds) {
            await tx.inventarioTecnologia.create({
              data: {
                inventarioId: inventarioId,
                tecnologiaId,
              },
            });
          }
        }

        // Registrar no histórico
        await tx.historicoInventario.create({
          data: {
            inventarioId: inventarioId,
            salaId: createData.salaId,
            tipoAlteracao: "CRIACAO" as any,
            descricaoAlteracao: "Inventário criado com dispositivo",
          },
        });
      } else {
        // Buscar inventário existente e adicionar dispositivo
        const updateData = payload.inventario.data as any;
        let inventario;

        if (updateData.id) {
          inventario = await tx.inventario.findUnique({
            where: { idInventario: updateData.id },
            include: { dispositivos: true },
          });
        } else if (updateData.salaId) {
          inventario = await tx.inventario.findUnique({
            where: { salaId: updateData.salaId },
            include: { dispositivos: true },
          });
        }

        if (!inventario) {
          throw new Error("Inventário não encontrado");
        }

        inventarioId = inventario.idInventario;

        // Verificar se o dispositivo já existe no inventário
        const dispositivoExiste = await tx.inventarioDispositivo.findFirst({
          where: {
            inventarioId: inventarioId,
            dispositivoId: novoDispositivo.idDispositivo,
          },
        });

        if (!dispositivoExiste) {
          // Associar novo dispositivo ao inventário
          await tx.inventarioDispositivo.create({
            data: {
              inventarioId: inventarioId,
              dispositivoId: novoDispositivo.idDispositivo,
              quantidade: 1,
            },
          });

          // Registrar no histórico
          await tx.historicoInventario.create({
            data: {
              inventarioId: inventarioId,
              salaId: inventario.salaId,
              tipoAlteracao: "EDICAO" as any,
              descricaoAlteracao: `Dispositivo ${novoDispositivo.nomeDispositivo} adicionado ao inventário`,
            },
          });
        }
      }

      // Retornar inventário atualizado
      const inventarioCompleto = await tx.inventario.findUnique({
        where: { idInventario: inventarioId },
        include: {
          sala: true,
          dispositivos: { include: { dispositivo: true } },
          tecnologias: { include: { tecnologia: true } },
        },
      });

      return this.mapToDTO(inventarioCompleto);
    });
  }

  private formatarInventarioParaBusca(inventario: any) {
    const dispositivosPorTipo = new Map<string, any>();

    if (inventario?.dispositivos) {
      inventario.dispositivos.forEach((d: any) => {
        const tipo = d.dispositivo.tipoDispositivo;
        if (!dispositivosPorTipo.has(tipo)) {
          dispositivosPorTipo.set(tipo, {
            tipoDispositivo: tipo,
            quantidade: 0,
            nomes: [],
          });
        }
        const entry = dispositivosPorTipo.get(tipo)!;
        entry.quantidade += d.quantidade;
        entry.nomes.push(d.dispositivo.nomeDispositivo);
      });
    }

    return {
      idInventario: inventario?.idInventario,
      dispositivos: Array.from(dispositivosPorTipo.values()),
      tecnologias:
        inventario?.tecnologias.map((t: any) => ({
          idTecnologia: t.tecnologia.idTecnologia,
          nomeTecnologia: t.tecnologia.nomeTecnologia,
        })) || [],
    };
  }
}
