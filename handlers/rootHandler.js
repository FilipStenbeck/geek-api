const template = `<html>
  <head>
    <title>geek-api</title>
  </head>
  <body>
    <h1>
      Geek-API
    </h1>
    <p>
      A json wrapper around boardgamegeek XML <a href="https://boardgamegeek.com/wiki/page/BGG_XML_API2">API.</a>
    </p>
  </body>
  `;

module.exports = function rootHandler(req, res) {
  res.type('text/html');
  res.send(template);
};
