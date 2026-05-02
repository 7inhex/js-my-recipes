const router = require('express').Router()
const recipes = require('../../../data/recipes.json')

router.get('/', async (request, response) => {
    response.send(recipes)
})

router.get('/recipe/:id', async (request, response) => {
    const { id } = request.params
    const recipe = recipes.find(r => String(r.id) === String(id))
    if (recipe) response.send(recipe)
    else response.send({ error: { message: `no recipe found with id: ${id}` }})
})

router.post('/recipe/add', async (request, response) => {
    const { id, title, image, prepTime, difficulty } = request.body
    const recipe = { id, title, image, prepTime, difficulty }
    recipes.push(recipe)
    response.send({ acknowledged: true, insertedId: recipe.id })
})

module.exports = router;