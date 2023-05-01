import { Container, ContainerModule } from 'inversify';
import { App } from './app';
import { ExceptionFilter } from './errors/exception.filter';
import { LoggerService } from './logger/logger.service';
import { UserController } from './users/users.controller';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { IUserController } from './users/users.controller.interface';
import { IExceptionFilter } from './errors/exception.filter.interface';
import { IUserService } from './users/dto/users.service.interface';
import { UserService } from './users/dto/users.service';

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind) => {
	bind<App>(TYPES.Application).to(App);
	bind<ILogger>(TYPES.ILogger).to(LoggerService);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IExceptionFilter>(TYPES.ExceptionFilter).to(ExceptionFilter);
});

function bootstrap(): IBootstrapReturn {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	app.init();

	return { app, appContainer };
}

export const { app, appContainer } = bootstrap();
