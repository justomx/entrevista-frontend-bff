import { type Environment } from './env'

export interface PackageInfo {
  name: string
  version: string
  description?: string
  author?: string
  keywords?: string[]
}

export interface AppConfig {
  server: {
    contextPath: string
    port: number | undefined
    environment: Environment
  }
  services?: AppServiceConfig
  databases?: AppDatabaseConfig
  queues?: AppQueueConfig
  topics?: AppTopicConfig
  metrics?: {
    url: string
  }
}

type AppServiceConfig = Record<string, Service>
interface Service {
  basePath: string
  apiKey?: string
}

type AppDatabaseConfig = Record<string, { url: string }>
type AppQueueConfig = Record<string, { name: string }>
type AppTopicConfig = Record<string, { arn: string }>
