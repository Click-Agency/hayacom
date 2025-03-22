import { resolve } from 'path';
import { existsSync } from 'fs';

abstract class EnvPath {
  private constructor() {}

  static getRootEnv(path = '../../../../../.env'): string | undefined {
    const rootEnv = resolve(__dirname, path);
    return existsSync(rootEnv) ? rootEnv : undefined;
  }
}

export default EnvPath;
