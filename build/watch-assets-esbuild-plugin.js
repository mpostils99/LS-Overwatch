const h = require('./fs-helpers')
const buildAssets = require('./build-helpers')

const watchAssetsEsbuildPlugin = {
  name: 'watch-assets-plugin',
  setup (build) {
    build.onLoad({ filter: /.*/ }, async (args) => {
      // find html file paths
      const filesAndPaths = h.getFilesInDirectory('./src')
      const htmlFiles = filesAndPaths.paths.filter(fn => fn.endsWith('.html'))

      // find css file and folders paths
      const css = h.getFilesAndFoldersInDirectoryRecursively('./src/css')

      // find media file paths
      const media = h.getFilesAndFoldersInDirectoryRecursively('./src/media')

      return {
        watchFiles: htmlFiles.concat(media.files).concat(css.files),
        watchDirs: media.dirs.concat(css.dirs)
      }
    })

    build.onEnd(result => {
      buildAssets()
    })
  }
}

module.exports = watchAssetsEsbuildPlugin
