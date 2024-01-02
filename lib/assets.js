const { join } = require('path')

const currentDir = process.cwd()

module.exports = {
  '/beams.jpg': { path: join(currentDir, 'public', 'beams.jpg'), type: 'image/jpeg' },
  '/': { path: join(currentDir, 'pages', 'index.html'), type: 'text/html', encoding: 'utf-8' },
  '/styles.css': { path: join(currentDir, 'public', 'styles.css'), type: 'text/css', encoding: 'utf-8' },
  '/img/grid.svg': { path: join(currentDir, 'public', 'grid.svg'), type: 'image/svg+xml', encoding: 'utf-8' },
  '/newDashboard': { path: join(currentDir, 'pages', 'dashboard.html'), type: 'text/html', encoding: 'utf-8' },
  '/deniedDashboard': { path: join(currentDir, 'pages', 'denied.html'), type: 'text/html', encoding: 'utf-8' },
}
