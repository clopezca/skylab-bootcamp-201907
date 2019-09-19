import logic from '..'
import { database, models } from 'menu-planner-data'
import bcrypt from 'bcryptjs'
import moment from 'momentjs'

const { Recipe, Day, Week, Ingredient, User } = models

// const { env: { DB_URL_TEST }} = process // WARN this destructuring doesn't work in react-app :(
const REACT_APP_DB_URL_TEST = process.env.REACT_APP_DB_URL_TEST

const { random } = Math

describe('logic - retrieve current week', () => {

    beforeAll(() => database.connect(DREACT_APP_DB_URL_TEST))

    let currentWeek, userId

    beforeEach(() => {
        return (async () => {
            let title1, image1, description1, category1, id1
            let title2, image2, description2, category2, id2
            let title3, image3, description3, category3, id3
            let title4, image4, description4, category4, id4

            await Ingredient.deleteMany()

            const ingredientIds = []

            for (let i = 0; i < 10; i++) {
                const ingredient = {
                    title: `title-${Math.random()}`,
                    unit: `units-${Math.random()}`
                }

                const { id } = await Ingredient.create(ingredient)

                ingredientIds.push(id)
            }

            await Recipe.deleteMany()

            // recipe1 - breakfast
            title1 = `title-${Math.random()}`
            image1 = `image-${Math.random()}`
            description1 = `description-${Math.random()}`
            category1 = 'breakfast'

            let ingredient1, quantity1, itemDescription1
            let items1 = []


            for (let i = 0; i < 4; i++) {
                ingredient1 = random.value(...ingredientIds)
                quantity1 = Number((Math.random() * 1000).toFixed())
                itemDescription1 = `description-${Math.random()}`

                items1.push({ ingredient: ingredient1, quantity: quantity1, description: itemDescription1 })
            }

            const recipe1 = await Recipe.create({ title: title1, image: image1, description: description1, category: category1, items: items1 })
            id1 = recipe1._id.toString()

            // recipe2 - lunch
            title2 = `title-${Math.random()}`
            image2 = `image-${Math.random()}`
            description2 = `description-${Math.random()}`
            category2 = 'lunch'

            let ingredient2, quantity2, itemDescription2
            let items2 = []


            for (let i = 0; i < 4; i++) {
                ingredient2 = random.value(...ingredientIds)
                quantity2 = Number((Math.random() * 1000).toFixed())
                itemDescription2 = `description-${Math.random()}`

                items2.push({ ingredient: ingredient2, quantity: quantity2, description: itemDescription2 })
            }

            const recipe2 = await Recipe.create({ title: title2, image: image2, description: description2, category: category2, items: items2 })
            id2 = recipe2._id.toString()

            // recipe3 - snack
            title3 = `title-${Math.random()}`
            image3 = `image-${Math.random()}`
            description3 = `description-${Math.random()}`
            category3 = 'snack'

            let ingredient3, quantity3, itemDescription3
            let items3 = []


            for (let i = 0; i < 4; i++) {
                ingredient3 = random.value(...ingredientIds)
                quantity3 = Number((Math.random() * 1000).toFixed())
                itemDescription3 = `description-${Math.random()}`

                items3.push({ ingredient: ingredient3, quantity: quantity3, description: itemDescription3 })
            }

            const recipe3 = await Recipe.create({ title: title3, image: image3, description: description3, category: category3, items: items3 })
            id3 = recipe3._id.toString()

            // recipe4 - dinner
            title4 = `title-${Math.random()}`
            image4 = `image-${Math.random()}`
            description4 = `description-${Math.random()}`
            category4 = 'dinner'

            let ingredient4, quantity4, itemDescription4
            let items4 = []


            for (let i = 0; i < 4; i++) {
                ingredient4 = random.value(...ingredientIds)
                quantity4 = Number((Math.random() * 1000).toFixed())
                itemDescription4 = `description-${Math.random()}`

                items4.push({ ingredient: ingredient4, quantity: quantity4, description: itemDescription4 })
            }

            const recipe4 = await Recipe.create({ title: title4, image: image4, description: description4, category: category4, items: items4 })
            id4 = recipe4._id.toString()

            // day 
            const monday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const tuesday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const wednesday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const thursday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const friday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const saturday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            const sunday = new Day({ breakfast: id1, lunch: id2, snack: id3, dinner: id4 })

            // calculate current week monday exact date
            const day = moment().date() - moment().day() + 1,
                month = moment().month(),
                year = moment().year()

            // week
            currentWeek = new Week({ date: new Date(year, month, day), monday, tuesday, wednesday, thursday, friday, saturday, saturday, sunday })
            const pastWeek1 = new Week({ date: new Date(year - 1, month, day) })
            const pastWeek2 = new Week({ date: new Date(year - 2, month, day) })
            const pastWeek3 = new Week({ date: new Date(year - 3, month, day) })
            const pastWeek4 = new Week({ date: new Date(year - 4, month, day) })

            const name = `name-${Math.random()}`
            const surname = `surname-${Math.random()}`
            const email = `email-${Math.random()}@mail.com`
            const password = `password-${Math.random()}`

            await User.deleteMany()

            const { id } = await User.create({ name, surname, email, password, weeks: [currentWeek, pastWeek1, pastWeek2, pastWeek3, pastWeek4] })
            userId = id
        })()
    })

    it("should succeed on correct data", async () => {

        const week = await logic.retrieveCurrentWeek(userId)

        expect(week).toBe()
        expect(week.id).toBe('string')
        expect(week.id).toHaveLength(24)
        expect(week.id).toBe(currentWeek.id)
        expect(week._id).not.toBe()
        
        expect(week.monday).toBe()
        expect(week.monday.id).toBe('string')
        expect(week.monday.id).toHaveLength(24)
        expect(week.monday._id).not.toBe()
        expect(week.monday.breakfast).toBe('object')
        expect(week.monday.breakfast.id).toBe('string')
        expect(week.monday.breakfast.id).toHaveLength(24)
        expect(week.monday.breakfast._id).not.toBe()
        expect(week.monday.breakfast.title).toBe('string')
        expect(week.monday.breakfast.id).toHaveLength(24)

        let items = week.monday.breakfast.items
        items.forEach(item => {
            expect(item._id).not.toBe()
            expect(item.id).toBe('string')
            expect(item.id).toHaveLength(24)

            expect(item.ingredient).toBe('string')
            expect(item.ingredient).to.have.lengthOf(24)

            expect(item.quantity).toBe('number')

            expect(item.description).toBe('string')
        })

        expect(week.tuesday).toBe()
        expect(week.tuesday.id).toBe('string')
        expect(week.tuesday.id).toHaveLength(24)
        expect(week.tuesday._id).not.toBe()
        expect(week.tuesday.breakfast).toBe('object')
        expect(week.tuesday.breakfast.id).toBe('string')
        expect(week.tuesday.breakfast.id).to.have.lengthOf(24)
        expect(week.tuesday.breakfast._id).not.toBe()
        expect(week.tuesday.breakfast.title).toBe('string')
        expect(week.tuesday.breakfast.id).toHaveLength(24)

        expect(week.wednesday).toBe()
        expect(week.wednesday.id).toBe('string')
        expect(week.wednesday.id).toHaveLength(24)
        expect(week.wednesday._id).not.toBe()
        expect(week.wednesday.breakfast).toBe('object')
        expect(week.wednesday.breakfast.id).toBe('string')
        expect(week.wednesday.breakfast.id).toHaveLength(24)
        expect(week.wednesday.breakfast._id).not.toBe
        expect(week.wednesday.breakfast.title).toBe('string')
        expect(week.wednesday.breakfast.id).toHaveLength(24)

        expect(week.thursday).toBe()
        expect(week.thursday.id).toBe('string')
        expect(week.thursday.id).toHaveLength(24)
        expect(week.thursday._id).not.toBe()
        expect(week.thursday.breakfast).toBe('object')
        expect(week.thursday.breakfast.id).toBe('string')
        expect(week.thursday.breakfast.id).toHaveLength(24)
        expect(week.thursday.breakfast._id).not.toBe()
        expect(week.thursday.breakfast.title).toBe('string')
        expect(week.thursday.breakfast.id).toHaveLength(24)

        expect(week.friday).toBe()
        expect(week.friday.id).toBe('string')
        expect(week.friday.id).toHaveLength(24)
        expect(week.friday._id).not.toBe()
        expect(week.friday.breakfast).toBe('object')
        expect(week.friday.breakfast.id).toBe('string')
        expect(week.friday.breakfast.id).toHaveLength(24)
        expect(week.friday.breakfast._id).not.toBe()
        expect(week.friday.breakfast.title).toBe('string')
        expect(week.friday.breakfast.id).toHaveLength(24)

        expect(week.saturday).toBe()
        expect(week.saturday.id).toBe('string')
        expect(week.saturday.id).toHaveLength(24)
        expect(week.saturday._id).not.toBe()
        expect(week.saturday.breakfast).toBe('object')
        expect(week.saturday.breakfast.id).toBe('string')
        expect(week.saturday.breakfast.id).toHaveLength(24)
        expect(week.saturday.breakfast._id).not.toBe()
        expect(week.saturday.breakfast.title).toBe('string')
        expect(week.saturday.breakfast.id).toHaveLength(24)

        expect(week.sunday).toBe()
        expect(week.sunday.id).toBe('string')
        expect(week.sunday.id).toHaveLength(24)
        expect(week.sunday._id).not.toBe()
        expect(week.sunday.breakfast).toBe('object')
        expect(week.sunday.breakfast.id).toBe('string')
        expect(week.sunday.breakfast.id).toHaveLength(24)
        expect(week.sunday.breakfast._id).not.toBe()
        expect(week.sunday.breakfast.title).toBe('string')
        expect(week.sunday.breakfast.id).toHaveLength(24)
    })

    it("should fail on non existant id", async () => {
        id = "5d740a810a6041a5ae918901"
        
        try {
            await logic.retrieveCurrentWeek(userId)
        } catch ({ message }) {
            expect(message).toBe()
            expect(message).toBe(`no weeks found with id ${id}`)
        }
    })

    it("should fail if query is not a string", () => {
        expect(() => logic.retrieveCurrentWeek(123)).toThrow(Error, "userId with value 123 is not a string")
    })

    it('should fail on empty id', () =>
        expect(() =>
            logic.retrieveCurrentWeek('')
        ).toThrow('userId is empty or blank')
    )

    it('should fail on undefined id', () =>
        expect(() =>
            logic.retrieveCurrentWeek(undefined)
        ).toThrow(`userId with value undefined is not a string`)
    )

    afterAll(() => database.disconnect())
})
