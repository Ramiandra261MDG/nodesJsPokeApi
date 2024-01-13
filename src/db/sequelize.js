/* L’API Rest et la Base de données : Créer un modèle Sequelize */
const { Sequelize, DataTypes } = require('sequelize')
const PokemonModel = require('../models/pokemon')
const UserModel = require('../models/user')
const pokemons = require('./mock-pokemon')
const bcrypt = require('bcrypt')
const config = require('../config/config')

const sequelize = new Sequelize(config.DB_DBNAME, config.DB_USERNAME, config.DB_PASSWORD, {
  host: config.DB_HOST,
  dialect: 'mysql'
})

const Pokemon = PokemonModel(sequelize, DataTypes)
const User = UserModel(sequelize, DataTypes)

const initDb = () => {
  return sequelize.sync().then(_ => {
    console.log("INIT DB")
    pokemons.map(pokemon => {
      Pokemon.create({
        name: pokemon.name,
        hp: pokemon.hp,
        cp: pokemon.cp,
        picture: pokemon.picture,
        types: pokemon.types
      }).then(pokemon => console.log(pokemon.toJSON()))
    })


    bcrypt.hash('pikachu', 10)
      .then(hash => User.create({ username: 'pikachu', password: hash }))
      .then(user => console.log(user.toJSON()))

    console.log('La base de donnée a bien été initialisée !')
  })
}

module.exports = {
  initDb, Pokemon, User
}
