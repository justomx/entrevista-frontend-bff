import Logger, { type Serializer } from 'bunyan'
import { getPackageInfoSync } from '../config/metadata'

const levelSerializer: Serializer = (level: number): string => {
  return Logger.nameFromLevel[level]
}

export function getLogger(): Logger {
  const { name } = getPackageInfoSync()
  return Logger.createLogger({
    name,
    serializers: {
      level: levelSerializer,
    },
  })
}
