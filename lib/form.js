const { promisify } = require('util')

module.exports = promisify((form, req, callback) => {
  form.parse(req, (err, fields) => {
    if (err) {
      callback(err)
      return
    }
    callback(null, { fields })
  })
})
