export enum Environment {
  LOCAL = 'local',
  STAGING = 'staging',
  PRODUCTION = 'production',
}

type EnvMapper = Record<string, Environment>

const envMapper: EnvMapper = {
  local: Environment.LOCAL,
  dev: Environment.LOCAL,
  stg: Environment.STAGING,
  staging: Environment.STAGING,
  stage: Environment.STAGING,
  prd: Environment.PRODUCTION,
  prod: Environment.PRODUCTION,
  production: Environment.PRODUCTION,
}

export function getEnvironment(): Environment {
  const envArg = process.env.NODE_ENV ?? 'local'
  const environment = envMapper[envArg]

  if (environment == null) {
    return Environment.LOCAL
  }

  return environment
}
