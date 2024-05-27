const functions = require('firebase-functions')

let sveltekitServer
exports.sveltekit = functions
  .region('us-central1')
  .https.onRequest(async (request, response) => {
    if (!sveltekitServer) {
      functions.logger.info('Initialising SvelteKit SSR entry')
      sveltekitServer = require('./sveltekit/index').default
      functions.logger.info('SvelteKit SSR entry initialised!')
    }
    functions.logger.info('Requested resource: ' + request.originalUrl)
    return sveltekitServer(request, response)
  })
