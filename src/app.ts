import express, { type Express } from 'express';
import swaggerui from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import helmet from 'helmet';
import cors from 'cors';
import { authenticate } from './middleare.js';
import cookieParser from 'cookie-parser';
import {
  comment,
  follow,
  login,
  post,
  profile,
  refresh,
  register,
  save,
  me,
  like
} from './route/index.js';

const app: Express = express();
app.use(cookieParser()); 
app.use(express.json());
app.use(helmet());
app.use(cors({
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  origin: [
    "http://localhost:5173",
  ],
}));

app.use('/api/auth', login);
app.use('/api/auth', register);
app.use('/api/auth', me);
app.use('/api/posts', authenticate, post);
app.use('/api/comments', authenticate, comment);
app.use('/api/follow', authenticate, follow);
app.use('/api', authenticate, save);
app.use('/api/profile', authenticate, profile);
app.use('/api/like', authenticate, like);
app.use('/api/refresh', refresh);

const swagger_document = YAML.load(path.join(process.cwd(), 'swagger.yaml'));
app.use('/', swaggerui.serve, swaggerui.setup(swagger_document));

export default app;
