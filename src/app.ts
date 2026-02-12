import express, { type Express } from 'express';
import login from './route/login.js';
import register from './route/register.js';
import post from './route/post.js';
import comment from './route/comment.js';
import swaggerui from 'swagger-ui-express';
import YAML from "yamljs";
import path from "path";
import helmet from 'helmet';

const app: Express = express();

app.use(express.json());
app.use(helmet());

app.use('/api/auth', login);
app.use('/api/auth', register);
app.use('/api/posts', post);
app.use('/api/comments', comment);

const swagger_document = YAML.load(path.join(process.cwd(), "swagger.yaml"));
app.use('/', swaggerui.serve, swaggerui.setup(swagger_document));

export default app;
