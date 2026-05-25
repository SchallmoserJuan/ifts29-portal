import config from '@payload-config'
import { getPayload, type BasePayload } from 'payload'

let cachedPayload: BasePayload | null = null

export const getPayloadClient = async () => {
  if (cachedPayload) {
    return cachedPayload
  }

  cachedPayload = await getPayload({ config })
  return cachedPayload
}
