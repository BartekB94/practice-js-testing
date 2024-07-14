import DB from './DB';

describe('insert', () => {
    test('should insert a row with a generated ID', async () => {
        const db = new DB()
        const row = await db.insert({a: 1, b: 2})
        expect(row).toHaveProperty('id')
        const rows = await db.getRows()
        expect(rows).toHaveLength(1)
        expect(rows[0]).toMatchObject({a: 1, b: 2})
    })

    test('should insert a row with a provided ID', async () => {
        const db = new DB()
        const row = await db.insert({id: 1, a: 3, b: 4})
        expect(row).toEqual({id: 1, a: 3, b: 4})
    })

    test('should reject if ID is duplicated', async () => {
        const db = new DB()
        await db.insert({id: 1, a: 1, b: 2})
        await expect(db.insert({id: 1, a: 3, b: 4})).rejects.toBe('ID can\'t be duplicated!')
    })

    test('should reject if ID is not a number', async () => {
        const db = new DB()
        await expect(db.insert({id: 'one', a: 1, b: 2})).rejects.toBe('ID can be only number!')
    })
})

describe('select', () => {
    test('should select a row by ID', async () => {
        const db = new DB()
        const insertedRow = await db.insert({id: 1, a: 1, b: 2})
        const row = await db.select(1)
        expect(row).toEqual(insertedRow)
    })

    test('should reject if ID is not found', async () => {
        const db = new DB()
        await expect(db.select(999)).rejects.toBe('ID not found')
    })
})

describe('remove', () => {
    test('should remove a row by ID', async () => {
        const db = new DB()
        await db.insert({id: 1, a: 1, b: 2})
        const message = await db.remove(1)
        expect(message).toBe('Item was remove!')
        const rows = await db.getRows()
        expect(rows).toHaveLength(0)
    })

    test('should reject if ID is not found', async () => {
        const db = new DB()
        await expect(db.remove(999)).rejects.toBe('Item not exist!')
    })
})

describe('update', () => {
    test('should update a row by ID', async () => {
        const db = new DB()
        await db.insert({id: 1, a: 1, b: 2})
        const updatedRow = await db.update({id: 1, a: 3, b: 4})
        expect(updatedRow).toEqual({id: 1, a: 3, b: 4})
    })

    test('should reject if ID is not provided', async () => {
        const db = new DB()
        await expect(db.update({a: 1, b: 2})).rejects.toBe('ID have to be set!')
    })

    test('should reject if ID is not found', async () => {
        const db = new DB()
        await expect(db.update({id: 999, a: 3, b: 4})).rejects.toBe('ID not found!')
    })
})

describe('truncate', () => {
    test('should truncate the database', async () => {
        const db = new DB()
        await db.insert({a: 1, b: 2})
        await db.truncate()
        const rows = await db.getRows()
        expect(rows).toHaveLength(0)
    })
})

describe('getRows', () => {
    test('should return all rows', async () => {
        const db = new DB()
        await db.insert({a: 1, b: 2})
        await db.insert({a: 3, b: 4})
        const rows = await db.getRows()
        expect(rows).toHaveLength(2)
        expect(rows).toEqual(
            expect.arrayContaining([
                expect.objectContaining({a: 1, b: 2}),
                expect.objectContaining({a: 3, b: 4})
            ])
        )
    })
})