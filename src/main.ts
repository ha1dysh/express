import { Container } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IUserController } from './users/users.controller.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';

const appContainer = new Container();
appContainer.bind<App>(TYPES.Application).to(App);
appContainer.bind<ILogger>(TYPES.ILogger).to(LoggerService);
appContainer.bind<IUserController>(TYPES.UserController).to(UserController);
appContainer.bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);

const app = appContainer.get<App>(TYPES.Application);
app.init();
