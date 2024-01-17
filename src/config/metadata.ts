import { type PackageInfo } from './types'
import path from 'node:path'
import psf from 'node:fs/promises'
import fs from 'node:fs'

function transform(content: string): PackageInfo {
  const { name, description, version, author, keywords } = JSON.parse(content)
  return { name, description, version, author, keywords }
}

export async function getPackageInfo(): Promise<PackageInfo> {
  try {
    const content = await psf.readFile(path.resolve('./package.json'), 'utf-8')
    return transform(content)
  } catch (error) {
    throw Error('Error reading the package information')
  }
}

export function getPackageInfoSync(): PackageInfo {
  try {
    const content = fs.readFileSync(path.resolve('./package.json'), 'utf-8')
    return transform(content)
  } catch (error) {
    throw Error('Error reading the package information')
  }
}
