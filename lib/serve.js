const fs = require('fs')

module.exports = async function serve(assetInfo, res) {
  const asset = await fs.promises.readFile(assetInfo['path'], assetInfo['encoding'])
  res.setHeader('Content-Type', assetInfo['type'])
  return res.end(asset)
}
