const fetch = require('node-fetch');
const { parseXml } = require('../utils/xmlUtil');

const hotGameModel = game => ({
  id: game.$.id,
  rank: game.$.rank,
  name: game.name.reduce(item => item).$.value,
  yearpublished: game.yearpublished.reduce(item => item).$.value,
  thumbnail: game.thumbnail.reduce(item => item).$.value,
});

const hotGamesModel = json => json.items.item.map(hotGameModel);

module.exports = function hotGamesHandler(req, res) {
  res.type('application/json');

  fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then(res => res.text())
    .then(body => parseXml(body))
    .then(json => res.send(hotGamesModel(json)));
};
