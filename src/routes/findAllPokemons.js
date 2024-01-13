const { Pokemon } = require('../db/sequelize')
const { Op } = require('sequelize')
const auth = require('../auth/auth')

module.exports = (app) => {
  app.get('/api/pokemons', auth, (req, res) => {
    if (req.query.name) {
      const name = req.query.name
      let limit
      req.query.limit ? limit = parseInt(req.query.limit) : limit = 5

      if (name.length <= 1) {
        const message = "Le terme de recherche doit contenir au moins 2 caractères."
        return res.status(400).json({ message })
      }

      return Pokemon.findAndCountAll({
        where: {
          name: { //name est la propriété du modèlre pokémon
            [Op.like]: `%${name}%` //name est critère de recherche
          }
        },
        order: ['name'],
        limit: limit
      })
        .then(({ count, rows }) => {
          const message = `Il y a ${count} pokémons qui correespondent au terme de recherche ${name}.`
          res.json({ message, data: rows })
        })
    } else {
      Pokemon.findAll({ order: ['name'] })
        .then(pokemons => {
          const message = 'La liste des pokémons a bien été récupérée.'
          res.json({ message, data: pokemons })
        })
        .catch(error => {
          const message = `La liste des pokemons n'a pas pu être récupérée. Réessayez dans quelques instants.`
          res.status(500).json({ message, data: error })
        })
    }
  })
}