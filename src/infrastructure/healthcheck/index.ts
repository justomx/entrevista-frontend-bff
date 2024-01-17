import DiskSpace from './disk-space'
import Ping from './ping'

/** Define the health funcion for component */
type HealthFn = () => Promise<Health>

/**
 * Create an object with all components to check
 * in the healthcheck function.
 *
 * Please, add all health functions here.
 */
const components: Record<string, HealthFn> = {
  ping: Ping,
  diskSpace: DiskSpace,
}

/**
 * Evaluate all healthchecks for this project.
 *
 * @returns {Promise<Health>} Promise of health object
 */
export async function healthcheck(): Promise<Health> {
  const promises = Object.keys(components).map(async (key) => {
    const promise = components[key]
    const result = await promise()
    return { ...result, kind: key }
  })

  const checks = await Promise.all(promises)

  return {
    status: checks.every((st) => st.status === 'Up') ? 'Up' : 'Down',
    components: transformToComponentObject(checks),
  }
}
function transformToComponentObject(checks: Array<{ kind: string; status: 'Up' | 'Down' }>): any {
  return checks.reduce((acc: any, obj) => {
    const { kind, ...health } = obj
    acc[kind] = health
    return acc
  }, {})
}
