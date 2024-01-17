import dotenv from 'dotenv'
import { getEnvironment } from './env'
import { type AppConfig } from './types'

dotenv.config()

function normalizePort(portArg: string): number | undefined {
  const parsed = parseInt(portArg, 10)
  return parsed >= 0 ? parsed : undefined
}

export const appConfig: AppConfig = {
  server: {
    contextPath: '/',
    port: normalizePort(process.env.PORT ?? '8080'),
    environment: getEnvironment(),
  },
}
