import 'dotenv/config';
import express, { Response as ExResponse, Request as ExRequest } from 'express';
import passport from 'passport';
import session from 'express-session';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import { RegisterRoutes } from './routes/routes.js'; 
import './config/passportConfig.js'; 
import { IMicrosoftProfile } from './interfaces/microsoft/IMicrosoftProfile.js';
import { AuthController } from './controllers/authController.js';


const authController = new AuthController()


const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(session({
    secret: process.env.SESSION_SECRET || 'secret_fatec',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/api-docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  try {
    const swaggerDocument = await import("./docs/swagger.json", { with: { type: "json" } });
    return res.send(swaggerUi.generateHTML(swaggerDocument.default));
  } catch (err) {
    return res.status(500).send("O arquivo swagger.json ainda não foi gerado.");
  }
});

app.get('/Auth/login', passport.authenticate('azuread-openidconnect'));

app.get('/Auth/callback', 
    passport.authenticate('azuread-openidconnect', { session: false }),
    async (req, res) => {
        try {
            const profile = req.user as IMicrosoftProfile;
            await authController.handleCallBack(profile);
            
            res.redirect('/dashboard');
        } catch (error) {
            console.error("Erro ao salvar no banco:", error);
            res.status(500).send("Erro interno ao processar login.");
        }
    }
    // passport.authenticate('azuread-openidconnect', { 
    //     failureRedirect: '/login-error',
    //     successRedirect: '/api-docs'
    // }),
    // (req, res)=>{
    //     res.redirect('/Auth/callback')
    // }
);


RegisterRoutes(app);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(` Servidor de Catalogação FATEC ativo!`);
  console.log(` API: http://localhost:${PORT}`);
  console.log(` LOgin: http://localhost:${PORT}/Auth/login`);
  console.log(` Documentação: http://localhost:${PORT}/api-docs`);
});