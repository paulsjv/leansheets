import { App.RoutingModule } from './app.routing.module';

describe('App.RoutingModule', () => {
  let appRoutingModule: App.RoutingModule;

  beforeEach(() => {
    appRoutingModule = new App.RoutingModule();
  });

  it('should create an instance', () => {
    expect(appRoutingModule).toBeTruthy();
  });
});
