/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import {  fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CoordeandorRouter } from './coordenadorRouter.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AuthRouter } from './authRouter.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TecnologiaController } from './../controllers/tecnologiaController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { InventarioController } from './../controllers/inventarioController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DispositivoController } from './../controllers/dispositivoController.js';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AgendamentoController } from './../controllers/agendamentoController.js';
import { expressAuthentication } from './../auth/authentication.js';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (req: ExRequest, securityName: string, scopes?: string[], res?: ExResponse) => Promise<any>;


// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "_36_Enums.TipoUser": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DOCENTE"]},{"dataType":"enum","enums":["TI"]},{"dataType":"enum","enums":["ADM"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TipoUser": {
        "dataType": "refAlias",
        "type": {"ref":"_36_Enums.TipoUser","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateUser": {
        "dataType": "refObject",
        "properties": {
            "email": {"dataType":"string","required":true},
            "tipoUser": {"ref":"TipoUser","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "_36_Enums.StatusConta": {
        "dataType": "refAlias",
        "type": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":["DESATIVADA"]},{"dataType":"enum","enums":["ATIVA"]},{"dataType":"enum","enums":["CONVIDADA"]}],"validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "StatusConta": {
        "dataType": "refAlias",
        "type": {"ref":"_36_Enums.StatusConta","validators":{}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tecnologia": {
        "dataType": "refObject",
        "properties": {
            "idTecnologia": {"dataType":"double","required":true},
            "nomeTecnologia": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "dataCriacao": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateTecnologia": {
        "dataType": "refObject",
        "properties": {
            "nomeTecnologia": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateTecnologia": {
        "dataType": "refObject",
        "properties": {
            "nomeTecnologia": {"dataType":"string"},
            "descricao": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Inventario": {
        "dataType": "refObject",
        "properties": {
            "idInventario": {"dataType":"double","required":true},
            "salaId": {"dataType":"double","required":true},
            "salaNome": {"dataType":"string"},
            "statusInventario": {"dataType":"string","required":true},
            "dispositivos": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"quantidade":{"dataType":"double","required":true},"tipoDispositivo":{"dataType":"string","required":true},"nomeDispositivo":{"dataType":"string","required":true},"idDispositivo":{"dataType":"double","required":true}}},"required":true},
            "tecnologias": {"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"descricao":{"dataType":"string"},"nomeTecnologia":{"dataType":"string","required":true},"idTecnologia":{"dataType":"double","required":true}}},"required":true},
            "criadoEm": {"dataType":"datetime","required":true},
            "atualizadoEm": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateInventario": {
        "dataType": "refObject",
        "properties": {
            "salaId": {"dataType":"double","required":true},
            "dispositivoIds": {"dataType":"array","array":{"dataType":"double"}},
            "tecnologiaIds": {"dataType":"array","array":{"dataType":"double"}},
            "statusInventario": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SalasComInventario": {
        "dataType": "refObject",
        "properties": {
            "idSala": {"dataType":"double","required":true},
            "nomeSala": {"dataType":"string","required":true},
            "tipoSala": {"dataType":"string","required":true},
            "capacidadeAlunos": {"dataType":"double"},
            "fotoSala": {"dataType":"string"},
            "disponibilidadeSala": {"dataType":"boolean","required":true},
            "inventario": {"dataType":"nestedObjectLiteral","nestedProperties":{"tecnologias":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"nomeTecnologia":{"dataType":"string","required":true},"idTecnologia":{"dataType":"double","required":true}}},"required":true},"dispositivos":{"dataType":"array","array":{"dataType":"nestedObjectLiteral","nestedProperties":{"nomes":{"dataType":"array","array":{"dataType":"string"},"required":true},"quantidade":{"dataType":"double","required":true},"tipoDispositivo":{"dataType":"string","required":true}}},"required":true},"idInventario":{"dataType":"double","required":true}},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateInventario": {
        "dataType": "refObject",
        "properties": {
            "statusInventario": {"dataType":"string"},
            "dispositivoIds": {"dataType":"array","array":{"dataType":"double"}},
            "tecnologiaIds": {"dataType":"array","array":{"dataType":"double"}},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Dispositivo": {
        "dataType": "refObject",
        "properties": {
            "idDispositivo": {"dataType":"double","required":true},
            "nomeDispositivo": {"dataType":"string","required":true},
            "tipoDispositivo": {"dataType":"string","required":true},
            "numeroSerie": {"dataType":"string"},
            "statusDispositivo": {"dataType":"string","required":true},
            "dataCriacao": {"dataType":"datetime","required":true},
            "dataAtualizacao": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateDispositivo": {
        "dataType": "refObject",
        "properties": {
            "nomeDispositivo": {"dataType":"string","required":true},
            "tipoDispositivo": {"dataType":"string","required":true},
            "numeroSerie": {"dataType":"string"},
            "statusDispositivo": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateDispositivo": {
        "dataType": "refObject",
        "properties": {
            "nomeDispositivo": {"dataType":"string"},
            "tipoDispositivo": {"dataType":"string"},
            "numeroSerie": {"dataType":"string"},
            "statusDispositivo": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Agendamento": {
        "dataType": "refObject",
        "properties": {
            "idAgendamento": {"dataType":"double","required":true},
            "salaId": {"dataType":"double","required":true},
            "salaNome": {"dataType":"string"},
            "usuarioId": {"dataType":"double"},
            "dataAgendamento": {"dataType":"datetime","required":true},
            "horaInicio": {"dataType":"string","required":true},
            "horaFim": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
            "statusAgendamento": {"dataType":"string","required":true},
            "criadoEm": {"dataType":"datetime","required":true},
            "atualizadoEm": {"dataType":"datetime","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "CreateAgendamento": {
        "dataType": "refObject",
        "properties": {
            "salaId": {"dataType":"double","required":true},
            "usuarioId": {"dataType":"double"},
            "dataAgendamento": {"dataType":"datetime","required":true},
            "horaInicio": {"dataType":"string","required":true},
            "horaFim": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "SolicitarReserva": {
        "dataType": "refObject",
        "properties": {
            "salaId": {"dataType":"double","required":true},
            "dataAgendamento": {"dataType":"datetime","required":true},
            "horaInicio": {"dataType":"string","required":true},
            "horaFim": {"dataType":"string","required":true},
            "descricao": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "UpdateAgendamento": {
        "dataType": "refObject",
        "properties": {
            "dataAgendamento": {"dataType":"datetime"},
            "horaInicio": {"dataType":"string"},
            "horaFim": {"dataType":"string"},
            "descricao": {"dataType":"string"},
            "statusAgendamento": {"dataType":"string"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {"noImplicitAdditionalProperties":"ignore","bodyCoercion":true});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa




export function RegisterRoutes(app: Router) {

    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################


    
        const argsCoordeandorRouter_handleCreateUser: Record<string, TsoaRoute.ParameterSchema> = {
                valuesUser: {"in":"body","name":"valuesUser","required":true,"ref":"CreateUser"},
                badRequest: {"in":"request","name":"badRequest","required":true,"dataType":"object"},
        };
        app.post('/Coordenacao/Criar_Usuario',
            authenticateMiddleware([{"jwt":["ADM"]}]),
            ...(fetchMiddlewares<RequestHandler>(CoordeandorRouter)),
            ...(fetchMiddlewares<RequestHandler>(CoordeandorRouter.prototype.handleCreateUser)),

            async function CoordeandorRouter_handleCreateUser(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCoordeandorRouter_handleCreateUser, request, response });

                const controller = new CoordeandorRouter();

              await templateService.apiHandler({
                methodName: 'handleCreateUser',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 201,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsCoordeandorRouter_handleFindUsers: Record<string, TsoaRoute.ParameterSchema> = {
                errorRes: {"in":"res","name":"400","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"msg":{"dataType":"string","required":true}}},
                tipoUser: {"in":"query","name":"tipoUser","ref":"TipoUser"},
                statusConta: {"in":"query","name":"statusConta","ref":"StatusConta"},
        };
        app.get('/Coordenacao/listar',
            authenticateMiddleware([{"jwt":["ADM"]}]),
            ...(fetchMiddlewares<RequestHandler>(CoordeandorRouter)),
            ...(fetchMiddlewares<RequestHandler>(CoordeandorRouter.prototype.handleFindUsers)),

            async function CoordeandorRouter_handleFindUsers(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsCoordeandorRouter_handleFindUsers, request, response });

                const controller = new CoordeandorRouter();

              await templateService.apiHandler({
                methodName: 'handleFindUsers',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthRouter_login: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
        };
        app.get('/Auth/login',
            ...(fetchMiddlewares<RequestHandler>(AuthRouter)),
            ...(fetchMiddlewares<RequestHandler>(AuthRouter.prototype.login)),

            async function AuthRouter_login(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthRouter_login, request, response });

                const controller = new AuthRouter();

              await templateService.apiHandler({
                methodName: 'login',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthRouter_handleCallback: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                errorRes: {"in":"res","name":"500","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/Auth/callback',
            ...(fetchMiddlewares<RequestHandler>(AuthRouter)),
            ...(fetchMiddlewares<RequestHandler>(AuthRouter.prototype.handleCallback)),

            async function AuthRouter_handleCallback(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthRouter_handleCallback, request, response });

                const controller = new AuthRouter();

              await templateService.apiHandler({
                methodName: 'handleCallback',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAuthRouter_refresh: Record<string, TsoaRoute.ParameterSchema> = {
                req: {"in":"request","name":"req","required":true,"dataType":"object"},
                unauthorizedRes: {"in":"res","name":"401","required":true,"dataType":"nestedObjectLiteral","nestedProperties":{"error":{"dataType":"string","required":true}}},
        };
        app.get('/Auth/refresh',
            ...(fetchMiddlewares<RequestHandler>(AuthRouter)),
            ...(fetchMiddlewares<RequestHandler>(AuthRouter.prototype.refresh)),

            async function AuthRouter_refresh(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAuthRouter_refresh, request, response });

                const controller = new AuthRouter();

              await templateService.apiHandler({
                methodName: 'refresh',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: 200,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTecnologiaController_criarTecnologia: Record<string, TsoaRoute.ParameterSchema> = {
                tecnologia: {"in":"body","name":"tecnologia","required":true,"ref":"CreateTecnologia"},
        };
        app.post('/tecnologias',
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController)),
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController.prototype.criarTecnologia)),

            async function TecnologiaController_criarTecnologia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTecnologiaController_criarTecnologia, request, response });

                const controller = new TecnologiaController();

              await templateService.apiHandler({
                methodName: 'criarTecnologia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTecnologiaController_listarTecnologias: Record<string, TsoaRoute.ParameterSchema> = {
                pagina: {"in":"query","name":"pagina","dataType":"double"},
                limite: {"in":"query","name":"limite","dataType":"double"},
                busca: {"in":"query","name":"busca","dataType":"string"},
        };
        app.get('/tecnologias',
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController)),
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController.prototype.listarTecnologias)),

            async function TecnologiaController_listarTecnologias(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTecnologiaController_listarTecnologias, request, response });

                const controller = new TecnologiaController();

              await templateService.apiHandler({
                methodName: 'listarTecnologias',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTecnologiaController_obterTecnologia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/tecnologias/:id',
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController)),
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController.prototype.obterTecnologia)),

            async function TecnologiaController_obterTecnologia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTecnologiaController_obterTecnologia, request, response });

                const controller = new TecnologiaController();

              await templateService.apiHandler({
                methodName: 'obterTecnologia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTecnologiaController_atualizarTecnologia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                tecnologia: {"in":"body","name":"tecnologia","required":true,"ref":"UpdateTecnologia"},
        };
        app.put('/tecnologias/:id',
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController)),
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController.prototype.atualizarTecnologia)),

            async function TecnologiaController_atualizarTecnologia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTecnologiaController_atualizarTecnologia, request, response });

                const controller = new TecnologiaController();

              await templateService.apiHandler({
                methodName: 'atualizarTecnologia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsTecnologiaController_deletarTecnologia: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/tecnologias/:id',
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController)),
            ...(fetchMiddlewares<RequestHandler>(TecnologiaController.prototype.deletarTecnologia)),

            async function TecnologiaController_deletarTecnologia(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsTecnologiaController_deletarTecnologia, request, response });

                const controller = new TecnologiaController();

              await templateService.apiHandler({
                methodName: 'deletarTecnologia',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_criarInventario: Record<string, TsoaRoute.ParameterSchema> = {
                inventario: {"in":"body","name":"inventario","required":true,"ref":"CreateInventario"},
        };
        app.post('/inventarios',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.criarInventario)),

            async function InventarioController_criarInventario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_criarInventario, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'criarInventario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_listarInventarios: Record<string, TsoaRoute.ParameterSchema> = {
                pagina: {"in":"query","name":"pagina","dataType":"double"},
                limite: {"in":"query","name":"limite","dataType":"double"},
                status: {"in":"query","name":"status","dataType":"string"},
                Search_Sala: {"in":"query","name":"Search_Sala","dataType":"string"},
        };
        app.get('/inventarios',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.listarInventarios)),

            async function InventarioController_listarInventarios(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_listarInventarios, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'listarInventarios',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_buscaPorPalavraChave: Record<string, TsoaRoute.ParameterSchema> = {
                busca: {"in":"query","name":"busca","required":true,"dataType":"string"},
                pagina: {"in":"query","name":"pagina","dataType":"double"},
                limite: {"in":"query","name":"limite","dataType":"double"},
        };
        app.get('/inventarios/busca/palavraChave',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.buscaPorPalavraChave)),

            async function InventarioController_buscaPorPalavraChave(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_buscaPorPalavraChave, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'buscaPorPalavraChave',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_obterInventarioPorSala: Record<string, TsoaRoute.ParameterSchema> = {
                salaId: {"in":"path","name":"salaId","required":true,"dataType":"double"},
        };
        app.get('/inventarios/sala/:salaId',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.obterInventarioPorSala)),

            async function InventarioController_obterInventarioPorSala(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_obterInventarioPorSala, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'obterInventarioPorSala',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_obterInventario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/inventarios/:id',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.obterInventario)),

            async function InventarioController_obterInventario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_obterInventario, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'obterInventario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_atualizarInventario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                inventario: {"in":"body","name":"inventario","required":true,"ref":"UpdateInventario"},
        };
        app.put('/inventarios/:id',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.atualizarInventario)),

            async function InventarioController_atualizarInventario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_atualizarInventario, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'atualizarInventario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsInventarioController_deletarInventario: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/inventarios/:id',
            ...(fetchMiddlewares<RequestHandler>(InventarioController)),
            ...(fetchMiddlewares<RequestHandler>(InventarioController.prototype.deletarInventario)),

            async function InventarioController_deletarInventario(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsInventarioController_deletarInventario, request, response });

                const controller = new InventarioController();

              await templateService.apiHandler({
                methodName: 'deletarInventario',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDispositivoController_criarDispositivo: Record<string, TsoaRoute.ParameterSchema> = {
                dispositivo: {"in":"body","name":"dispositivo","required":true,"ref":"CreateDispositivo"},
        };
        app.post('/dispositivos',
            ...(fetchMiddlewares<RequestHandler>(DispositivoController)),
            ...(fetchMiddlewares<RequestHandler>(DispositivoController.prototype.criarDispositivo)),

            async function DispositivoController_criarDispositivo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDispositivoController_criarDispositivo, request, response });

                const controller = new DispositivoController();

              await templateService.apiHandler({
                methodName: 'criarDispositivo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDispositivoController_listarDispositivos: Record<string, TsoaRoute.ParameterSchema> = {
                pagina: {"in":"query","name":"pagina","dataType":"double"},
                limite: {"in":"query","name":"limite","dataType":"double"},
                tipo: {"in":"query","name":"tipo","dataType":"string"},
                status: {"in":"query","name":"status","dataType":"string"},
                busca: {"in":"query","name":"busca","dataType":"string"},
        };
        app.get('/dispositivos',
            ...(fetchMiddlewares<RequestHandler>(DispositivoController)),
            ...(fetchMiddlewares<RequestHandler>(DispositivoController.prototype.listarDispositivos)),

            async function DispositivoController_listarDispositivos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDispositivoController_listarDispositivos, request, response });

                const controller = new DispositivoController();

              await templateService.apiHandler({
                methodName: 'listarDispositivos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDispositivoController_obterDispositivo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/dispositivos/:id',
            ...(fetchMiddlewares<RequestHandler>(DispositivoController)),
            ...(fetchMiddlewares<RequestHandler>(DispositivoController.prototype.obterDispositivo)),

            async function DispositivoController_obterDispositivo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDispositivoController_obterDispositivo, request, response });

                const controller = new DispositivoController();

              await templateService.apiHandler({
                methodName: 'obterDispositivo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDispositivoController_atualizarDispositivo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                dispositivo: {"in":"body","name":"dispositivo","required":true,"ref":"UpdateDispositivo"},
        };
        app.put('/dispositivos/:id',
            ...(fetchMiddlewares<RequestHandler>(DispositivoController)),
            ...(fetchMiddlewares<RequestHandler>(DispositivoController.prototype.atualizarDispositivo)),

            async function DispositivoController_atualizarDispositivo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDispositivoController_atualizarDispositivo, request, response });

                const controller = new DispositivoController();

              await templateService.apiHandler({
                methodName: 'atualizarDispositivo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsDispositivoController_deletarDispositivo: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/dispositivos/:id',
            ...(fetchMiddlewares<RequestHandler>(DispositivoController)),
            ...(fetchMiddlewares<RequestHandler>(DispositivoController.prototype.deletarDispositivo)),

            async function DispositivoController_deletarDispositivo(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsDispositivoController_deletarDispositivo, request, response });

                const controller = new DispositivoController();

              await templateService.apiHandler({
                methodName: 'deletarDispositivo',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_criarAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                agendamento: {"in":"body","name":"agendamento","required":true,"ref":"CreateAgendamento"},
        };
        app.post('/agendamentos',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.criarAgendamento)),

            async function AgendamentoController_criarAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_criarAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'criarAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_solicitarReserva: Record<string, TsoaRoute.ParameterSchema> = {
                reserva: {"in":"body","name":"reserva","required":true,"ref":"SolicitarReserva"},
        };
        app.post('/agendamentos/solicitar-reserva',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.solicitarReserva)),

            async function AgendamentoController_solicitarReserva(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_solicitarReserva, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'solicitarReserva',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_listarAgendamentos: Record<string, TsoaRoute.ParameterSchema> = {
                pagina: {"in":"query","name":"pagina","dataType":"double"},
                limite: {"in":"query","name":"limite","dataType":"double"},
                salaId: {"in":"query","name":"salaId","dataType":"double"},
                status: {"in":"query","name":"status","dataType":"string"},
                dataInicio: {"in":"query","name":"dataInicio","dataType":"string"},
                dataFim: {"in":"query","name":"dataFim","dataType":"string"},
        };
        app.get('/agendamentos',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.listarAgendamentos)),

            async function AgendamentoController_listarAgendamentos(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_listarAgendamentos, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'listarAgendamentos',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_listarAgendamentosPorSala: Record<string, TsoaRoute.ParameterSchema> = {
                salaId: {"in":"path","name":"salaId","required":true,"dataType":"double"},
                dataInicio: {"in":"query","name":"dataInicio","dataType":"string"},
                dataFim: {"in":"query","name":"dataFim","dataType":"string"},
        };
        app.get('/agendamentos/sala/:salaId',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.listarAgendamentosPorSala)),

            async function AgendamentoController_listarAgendamentosPorSala(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_listarAgendamentosPorSala, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'listarAgendamentosPorSala',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_obterAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.get('/agendamentos/:id',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.obterAgendamento)),

            async function AgendamentoController_obterAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_obterAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'obterAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_atualizarAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
                agendamento: {"in":"body","name":"agendamento","required":true,"ref":"UpdateAgendamento"},
        };
        app.put('/agendamentos/:id',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.atualizarAgendamento)),

            async function AgendamentoController_atualizarAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_atualizarAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'atualizarAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_aprovarAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.post('/agendamentos/:id/aprovar',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.aprovarAgendamento)),

            async function AgendamentoController_aprovarAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_aprovarAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'aprovarAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_cancelarAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.post('/agendamentos/:id/cancelar',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.cancelarAgendamento)),

            async function AgendamentoController_cancelarAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_cancelarAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'cancelarAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        const argsAgendamentoController_deletarAgendamento: Record<string, TsoaRoute.ParameterSchema> = {
                id: {"in":"path","name":"id","required":true,"dataType":"double"},
        };
        app.delete('/agendamentos/:id',
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController)),
            ...(fetchMiddlewares<RequestHandler>(AgendamentoController.prototype.deletarAgendamento)),

            async function AgendamentoController_deletarAgendamento(request: ExRequest, response: ExResponse, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = templateService.getValidatedArgs({ args: argsAgendamentoController_deletarAgendamento, request, response });

                const controller = new AgendamentoController();

              await templateService.apiHandler({
                methodName: 'deletarAgendamento',
                controller,
                response,
                next,
                validatedArgs,
                successStatus: undefined,
              });
            } catch (err) {
                return next(err);
            }
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
        return async function runAuthenticationMiddleware(request: any, response: any, next: any) {

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            // keep track of failed auth attempts so we can hand back the most
            // recent one.  This behavior was previously existing so preserving it
            // here
            const failedAttempts: any[] = [];
            const pushAndRethrow = (error: any) => {
                failedAttempts.push(error);
                throw error;
            };

            const secMethodOrPromises: Promise<any>[] = [];
            for (const secMethod of security) {
                if (Object.keys(secMethod).length > 1) {
                    const secMethodAndPromises: Promise<any>[] = [];

                    for (const name in secMethod) {
                        secMethodAndPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }

                    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                    secMethodOrPromises.push(Promise.all(secMethodAndPromises)
                        .then(users => { return users[0]; }));
                } else {
                    for (const name in secMethod) {
                        secMethodOrPromises.push(
                            expressAuthenticationRecasted(request, name, secMethod[name], response)
                                .catch(pushAndRethrow)
                        );
                    }
                }
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            try {
                request['user'] = await Promise.any(secMethodOrPromises);

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }

                next();
            }
            catch(err) {
                // Show most recent error as response
                const error = failedAttempts.pop();
                error.status = error.status || 401;

                // Response was sent in middleware, abort
                if (response.writableEnded) {
                    return;
                }
                next(error);
            }

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
