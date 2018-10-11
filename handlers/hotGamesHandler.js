const fetch = require('node-fetch');
const { parseXml } = require('../utils/xmlUtil');

const hotGameModel = game => ({
  id: game.$.id,
  rank: game.$.rank,
  name: game.name[0].$.value,
  yearpublished: game.yearpublished[0].$.value,
  thumbnail: game.thumbnail[0].$.value,
});

const hotGamesModel = json => json.items.item.map(hotGameModel);

module.exports = function hotGamesHandler(req, res) {
  res.type('application/json');

  fetch('https://boardgamegeek.com/xmlapi2/hot?type=boardgame')
    .then(res => res.text())
    .then(body => parseXml(body))
    .then(json => res.send(hotGamesModel(json)));
};
