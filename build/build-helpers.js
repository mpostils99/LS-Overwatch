const fs = require('fs')
const fsExtra = require('fs-extra')
const h = require('./fs-helpers')

const { minify: htmlMinify } = require('html-minifier')
const CleanCss = require('clean-css')

const config = require('../config')

function buildHtml () {
  // Minify HTML
  const htmlFilesAndPaths = h.getFilesInDirectory('./src')
  const htmlFiles = htmlFilesAndPaths.files.filter(fn => fn.endsWith('.html'))
  const htmlPaths = htmlFilesAndPaths.paths.filter(fn => fn.endsWith('.html'))

  // copy html files
  h.zip(htmlFiles, htmlPaths).forEach(e =>
    fs.readFile(e[1], (err, data) => {
      const fileContents = htmlMinify(data.toString(), config.html.htmlMinifyOptions)
      fs.writeFile(`${config.html.outDir}/${e[0]}`, fileContents, (err) => err !== null ? console.log(err) : null)
    }))
}

function buildCss () {
  require('esbuild').buildSync({
    entryPoints: h.getFilesInDirectory('./src/css/pages').paths.filter(fn => fn.endsWith('.css')),
    bundle: true,
    minify: true,
    outdir: config.css.outDir
  })
}

function buildMedia () {
  fsExtra.copy('./src/media', './dist/media')
}

function buildAssets () {
  // Minify HTML
  buildHtml()

  // Minify CSS
  buildCss()

  // Copy Media directory
  buildMedia()
}

module.exports = buildAssets
