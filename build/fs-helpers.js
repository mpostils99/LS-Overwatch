const fs = require('fs')
const path = require('path')

const zip = (arr1, arr2) => arr1.map((k, i) => [k, arr2[i]])
module.exports.zip = zip

/**
 * Traverses recursively (in depth) the directory specified by 'dir' and returns the full path of subdirs and subfiles
 * @param dir
 * @returns {{dirs: *[], files: *[]}}
 */
function getFilesAndFoldersInDirectoryRecursively (dir) {
  const dirs = []
  const files = []

  function _traverseDir (dir) {
    fs.readdirSync(dir).forEach(file => {
      const fullPath = path.join(dir, file)
      if (fs.lstatSync(fullPath).isDirectory()) {
        dirs.push(fullPath)
        _traverseDir(fullPath)
      } else {
        files.push(fullPath)
      }
    })
  }

  _traverseDir(dir)

  return { dirs: dirs, files: files }
}
module.exports.getFilesAndFoldersInDirectoryRecursively = getFilesAndFoldersInDirectoryRecursively

/**
 * Returns the name of the paths and respective files in a directory
 * @param directory
 * @returns {{paths: *, files: *}}
 */
function getFilesInDirectory (directory) {
  const files = fs.readdirSync(directory)
  const paths = files.map(file => {
    return path.join(directory, file)
  })

  return { files: files, paths: paths }
}
module.exports.getFilesInDirectory = getFilesInDirectory
