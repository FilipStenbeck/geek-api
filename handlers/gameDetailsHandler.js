const fetch = require('node-fetch');
const { parseXml } = require('../utils/xmlUtil');

const formatDescription = desc => {
  const text = desc.split('&#10;&#10;');
  const formated = {
    intro: text.shift(),
    main: text,
  };
  return formated;
};

const categories = links => links.filter(item => item.$.type === 'boardgamecategory').map(item => item.$.value);
const mechanics = links => links.filter(item => item.$.type === 'boardgamemechanic').map(item => item.$.value);
const families = links => links.filter(item => item.$.type === 'boardgamefamily').map(item => item.$.value);
const implementations = links => links.filter(i => i.$.type === 'boardgameimplementation').map(i => i.$.value);
const designers = links => links.filter(item => item.$.type === 'boardgamedesigner').map(item => item.$.value);
const publishers = links => links.filter(item => item.$.type === 'boardgamepublisher').map(item => item.$.value);

const gameModel = game => ({
  id: game.$.id,
  name: game.name
    .filter(item => item.$.type === 'primary')
    .map(item => item.$.value)
    .reduce(item => item),
  thumbnail: game.thumbnail.reduce(item => item),
  image: game.image.reduce(item => item),
  description: formatDescription(game.description.reduce(item => item)),
  yearpublished: game.yearpublished.reduce(item => item).$.value,
  minage: game.minage.reduce(item => item).$.value,
  minplaytime: game.minplaytime.reduce(item => item).$.value,
  maxplaytime: game.maxplaytime.reduce(item => item).$.value,
  categories: categories(game.link),
  mechanics: mechanics(game.link),
  families: families(game.link),
  implementations: implementations(game.link),
  designers: designers(game.link),
  publishers: publishers(game.link),
});

const gamesModel = json => json.items.item.map(gameModel).reduce(item => item);

module.exports = function gameDetailsHandler(req, res) {
  const id = req.params.id;
  res.type('application/json');

  fetch(`https://boardgamegeek.com/xmlapi2/thing/?id=${id}`)
    .then(res => res.text())
    .then(body => parseXml(body))
    .then(json => res.send(gamesModel(json)));
};
