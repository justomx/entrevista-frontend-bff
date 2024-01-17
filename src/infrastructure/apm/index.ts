import apm from 'elastic-apm-node'
import { appConfig } from '../../config'
import { Environment } from '../../config/env'
import { getPackageInfoSync } from '../../config/metadata'
import { getLogger } from '../logger'

const logger = getLogger()

export default function initApmService(): void {
  const packageInfo = getPackageInfoSync()
  if (appConfig.server.environment === Environment.LOCAL) {
    logger.info("Elastic APM service not initialized because we're in local environment!")
    return
  }

  if (!apm.isStarted()) {
    apm.start({
      serviceName: packageInfo.name,
      secretToken: process.env.ELASTIC_APM_SECURE_TOKEN,
      serverUrl: 'https://apm.justo.mx',
      environment: appConfig.server.environment,
      logLevel: 'info',
      captureExceptions: true,
    })

    logger.info('Elastic APM service has been initialized!')
  }
}
