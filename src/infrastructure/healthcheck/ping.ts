import ping from 'ping'
import { getLogger } from '../logger'

const logger = getLogger()

/**
 * Percentage to accept ping is Ok.
 */
const threshold = normalizeThreshold(process.env.HEALTH_PING_THRESHOLD) ?? 0.8

/**
 * Normalize threshold in percentage between 0.0 and 1.0
 *
 * @param {string | undefined} arg Any argument
 * @returns {number | null} Percentage
 */
function normalizeThreshold(arg?: string): number | null {
  /** If the argument is null or undefined then return null. */
  if (arg == null) {
    return null
  }

  /** Converts a string to a floating-point number. */
  const value = parseFloat(arg)

  /**
   * If the value is not a number or it's out of range 0-100 then
   * we'll returns null.
   */
  if (isNaN(value) || value < 0 || value > 100) {
    return null
  }

  /** If the value is less or equals than 1 then return the value */
  if (value <= 1) {
    return value
  }

  /** Otherwise it returns the result of the division by 100 */
  return value / 100
}

const targets = [
  '8.8.8.8', // Google DNS primary
  '8.8.4.4', // Google DNS secondary
  '1.1.1.1', // Cloudflare DNS primary
  '1.0.0.1', // Cloudflare DNS secondary
  'www.google.com',
  'www.microsoft.com',
  'www.apple.com',
  'www.amazon.com',
  'www.openai.com',
]

interface PingResult {
  target: string
  alive: boolean
}

async function performPings(targets: string[]): Promise<PingResult[]> {
  return await Promise.all(
    targets.map(async (target) => {
      const { alive } = await ping.promise.probe(target)
      return { target, alive }
    }),
  )
}

function calculateSuccessRate(results: PingResult[]): number {
  const successfulPings = results.filter((pr) => pr.alive).length
  return successfulPings / results.length
}

export default async function Ping(): Promise<Health> {
  const results = await performPings(targets)
  const rate = calculateSuccessRate(results)
  logger.debug({ results, rate }, `Pings successful with rate ${rate * 100}% ok`)
  return { status: rate >= threshold ? 'Up' : 'Down' }
}
