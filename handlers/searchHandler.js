const fetch = require('node-fetch');
const { parseXml } = require('../utils/xmlUtil');

const gameModel = game => ({
  id: game.$.id,
  name: game.name.reduce(item => item).$.value,
});

const gamesModel = json => ({
  total: json.items.$.total,
  result: json.items.item.map(gameModel),
});

module.exports = function searchHandler(req, res) {
  res.type('application/json');
  fetch(`https://boardgamegeek.com/xmlapi2/search?query=${req.query.query}`)
    .then(res => res.text())
    .then(body => parseXml(body))
    .then(json => res.send(gamesModel(json)));
};
