const express = require('express')

const app = express()
const port = process.env.PORT || 5000
const router = express.Router()
app.use(express.static(`${__dirname}/dist`)) // set the static files location for the static html
// app.engine('.html', require('ejs').renderFile);
app.set('views', `${__dirname}/dist`)
// eslint-disable-next-line no-unused-vars
router.get('/*', (req, res, next) => {
  res.sendFile(`${__dirname}/dist/index.html`)
})
app.use('/', router)
app.listen(port)
// eslint-disable-next-line no-console
console.log('App running on port', port)
