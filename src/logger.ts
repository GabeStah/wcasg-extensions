import config from 'config';
import pkg from '../package.json';

export class Logger {
  static debug(message: string) {
    if (!config.debug) return;
    console.debug(`[${pkg.name}]: ${message}`);
  }
  static info(message: string) {
    if (!config.debug) return;
    console.info(`[${pkg.name}]: ${message}`);
  }
  static log(message: string) {
    if (!config.debug) return;
    console.log(`[${pkg.name}]: ${message}`);
  }
  static warn(message: string) {
    if (!config.debug) return;
    console.warn(`[${pkg.name}]: ${message}`);
  }
}

export default Logger;
