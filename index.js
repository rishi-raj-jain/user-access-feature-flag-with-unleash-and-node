require('dotenv').config()

const http = require('http')
const serve = require('./lib/serve')
const assets = require('./lib/assets')
const formParse = require('./lib/form')
const formidable = require('formidable')
const { startUnleash } = require('unleash-client')

// Specify the port and host to listen on
const port = process.env.PORT || 3000
const host = process.env.HOST || '0.0.0.0'

let unleash

async function setupUnleash(callback) {
  try {
    unleash = await startUnleash({
      appName: 'user-access-levels',
      url: process.env.UNLEASH_API_URL,
      customHeaders: {
        Authorization: process.env.UNLEASH_AUTHORIZATION_KEY,
      },
    })
    console.log('Initialize Unleash SDK succesfully.')
  } catch (e) {
    console.log('Could not initialize Unleash SDK.')
    console.log('The following error occured:')
    console.log(e.message || e.toString())
  } finally {
    callback()
  }
}

// Create an HTTP server
const server = http.createServer(async (req, res) => {
  const requestURL = new URL(req.url, 'https://example.com')
  const assetInfo = assets[requestURL.pathname]
  if (assetInfo) {
    return serve(assetInfo, res)
  } else if (req.url.includes('/dashboard/new')) {
    // Get form data
    const form = new formidable.IncomingForm()
    // ...
    // This is just an example, but you might want to persist user data
    // through cookies on the server and not rely on the request body
    // to send it to the server for security reasons
    // ...
    const { fields } = await formParse(form, req)
    if (!fields || !fields.email) {
      res.statusCode = 403
      return res.end('Forbidden')
    }
    // Access the parsed form fields using the 'fields' object
    const userId = fields.email[0]
    // Check if the particular userId should be allowed to
    // view the new dashboard
    const showNewDashboard = unleash.isEnabled('configuration', { userId })
    // If yes, send response with the dashboard layout
    if (showNewDashboard) {
      return serve(assets['/newDashboard'], res)
    }
    // Else, show the user new denied page
    return serve(assets['/deniedDashboard'], res)
  }
  // By default, serve the homepage
  return serve(assets['/'], res)
})

// Perform asynchronous setup of Unleash SDK
setupUnleash(() => {
  // Start the server and listen on the specified host and port
  server.listen(port, host, async () => {
    console.log(`Listening on http://${host}:${port}`)
  })
})
