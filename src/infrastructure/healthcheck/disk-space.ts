import os from 'node:os'

// Define a default threshold for free disk space, using an
// environment variable or defaulting to '25mb'
const threshold = normalizeThreshold(process.env.HEALTH_DISK_SPACE_THRESHOLD ?? '25mb')

/**
 * Function to normalize the disk space threshold from a
 * string to a number.
 *
 * @param arg size formatted e.g. (25mb, 1gb and more)
 * @returns {number} number of bytes
 */
function normalizeThreshold(arg: string): number {
  /**
   * Regular expression to match and extract the numerical
   * value and unit (kb, mb, gb)
   */
  const regex = /^(\d+(\.\d+)?)\s*(kb|mb|gb)$/i
  const match = arg.match(regex)

  /** If the argument doesn't match the expected format, throw an error */
  if (match == null) {
    throw Error('Argument format is incorrect')
  }

  /** Extract the size and unit from the matched argument */
  const size = parseFloat(match[1])
  const unit = match[3].toLowerCase()

  /** Convert the size to bytes based on the specified unit */
  switch (unit) {
    case 'kb':
      return size * 1024
    case 'mb':
      return size * 1024 * 1024
    case 'gb':
      return size * 1024 * 1024 * 1024
    default:
      throw Error('Argument format is incorrect')
  }
}

/**
 * Function to get information about the system's disk,
 * returning free and total disk space.
 *
 * @returns {Object} Disk information
 */
function getDiskInfo(): { free: number; total: number } {
  const free = os.freemem()
  const total = os.totalmem()
  return { free, total }
}

/**
 * Export a default async function named DiskSpace that
 * returns a Promise with health information.
 *
 * @returns {Promise<Object>} Promise of Health
 */
export default async function DiskSpace(): Promise<Health> {
  return await new Promise<Health>((resolve) => {
    const diskInfo = getDiskInfo()
    resolve({
      status: diskInfo.free > threshold ? 'Up' : 'Down',
      details: {
        ...diskInfo,
        threshold,
      },
    })
  })
}
