import { getPayloadClient } from '../src/lib/payload'

async function seed() {
  console.log('Starting seed...')

  const payload = await getPayloadClient()

  console.log('Testing contacts collection...')

  try {
    const result = await payload.create({
      collection: 'contacts',
      data: {
        nombre: 'Test Seed',
        email: 'seed@test.com',
        asunto: 'Test seed contact',
        mensaje: 'This is a test seed contact',
        status: 'new',
      },
    })
    console.log('Contact created successfully:', result.id)
  } catch (error: any) {
    console.error('Error creating contact:', error?.message || error)

    console.log('\nChecking if collection exists...')
    try {
      const findResult = await payload.find({
        collection: 'contacts',
        limit: 1,
      })
      console.log('Collection exists, found:', findResult.totalDocs, 'docs')
    } catch (findError: any) {
      console.error('Collection does NOT exist:', findError?.message || findError)
    }
  }

  process.exit(0)
}

seed()