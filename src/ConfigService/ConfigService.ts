export abstract class ConfigService {
  hello = 'world';
}

export class DevelopmentConfigService extends ConfigService {}

export class ProductionConfigService extends ConfigService {}
