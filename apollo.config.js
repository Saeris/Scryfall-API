module.exports = {
  service: {
    endpoint: {
      name: `scryfall`,
      url: `http://localhost:1337/${
        process.env.NETLIFY ? `.netlify/functions/scryfall-api/` : `dev`
      }`
    }
  }
};
