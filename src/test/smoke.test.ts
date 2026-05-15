describe('Testing infrastructure', () => {
  it('should run tests correctly', () => {
    expect(true).toBe(true)
  })

  it('should support async tests', async () => {
    const result = await Promise.resolve(42)
    expect(result).toBe(42)
  })
})
