require('dotenv').config()

const { expect } = require('chai')
const retrieveWeek = require('.')
const { database, models: { Recipe, Day, Week }} = require('menu-planner-data')

const { env: { DB_URL_TEST } } = process

describe('logic - retrieve week', () => {
    
    let title1, image1, description1, category1, id1
    let title2, image2, description2, category2, id2
    let title3, image3, description3, category3, id3
    let title4, image4, description4, category4, id4
    
    before(() => database.connect(DB_URL_TEST))

    beforeEach(() => {
        return (async () => {

            await Recipe.deleteMany()
            await Day.deleteMany()
            await Week.deleteMany()

            // recipe1 - breakfast
            title1 = `title-${Math.random()}`            
            image1 = `image-${Math.random()}`
            description1 = `description-${Math.random()}`
            category1 = 'breakfast'
                    
            let ingredient1, quantity1, itemDescription1
            let items1 = []
                    
    
            for (let i = 0; i < 4; i++) {
                ingredient1 = `322432523645678953748436`
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
                ingredient2 = `322432523645678953748436`
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
                ingredient3 = `322432523645678953748436`
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
                ingredient4 = `322432523645678953748436`
                quantity4 = Number((Math.random() * 1000).toFixed())
                itemDescription4 = `description-${Math.random()}`
    
                items4.push({ ingredient: ingredient4, quantity: quantity4, description: itemDescription4 })
            }

            const recipe4 = await Recipe.create({ title: title4, image: image4, description: description4, category: category4, items: items4 })
            id4 = recipe4._id.toString()
            
            // day 
            const monday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId1 = monday._id.toString()

            const tuesday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId2 = tuesday._id.toString()

            const wednesday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId3 = wednesday._id.toString()

            const thursday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId4 = thursday._id.toString()

            const friday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId5 = friday._id.toString()

            const saturday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId6 = saturday._id.toString()

            const sunday = await Day.create({ breakfast : id1, lunch: id2, snack: id3, dinner: id4 })
            dayId7 = sunday._id.toString()

            // week
            const week = await Week.create({ monday: dayId1, tuesday: dayId2, wednesday: dayId3, thursday: dayId4, friday: dayId5, saturday: dayId5, saturday: dayId6, sunday: dayId7})
            weekId = week._id.toString()

        })()
    })

    it("should succeed on correct data", async () => {

        const week = await retrieveWeek(weekId)
        
        expect(week).to.exist
        expect(week.id).to.equal(weekId)

    })

     
    it("should fail on non existant id", async () => {
        id = "5d740a810a6041a5ae918901"
        try {
        await retrieveWeek(weekId)
      } catch({message}) {
        expect(message).to.exist
        expect(message).to.equal(`No weeks found with id ${weekId}`)
      }
    })

    it("should fail if query is not a string", () => {
         expect(() => retrieveWeek(123)).to.throw(Error, "id with value 123 is not a string")
    })

    it('should fail on empty id', () => 
        expect(() => 
            retrieveWeek('')
        ).to.throw('id is empty or blank')
    )

    it('should fail on undefined id', () => 
        expect(() => 
            retrieveWeek(undefined)
        ).to.throw(`id with value undefined is not a string`)
    )

    after(() => database.disconnect())
})
