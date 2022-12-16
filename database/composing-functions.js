const jsonfile = require('jsonfile');

const canSaveSrc = (state) => (
  // TODO: lock file
  async function saveSrc(src) {
    try {
      await jsonfile.writeFile(state.path, src, {spaces: 2});
    } catch(err) {
      throw new Error(`Unable to write to the source file`);
    }
    return true
  }
)

const canReadSrc = (state) => (
  // TODO: lock file
  async function readSrc() {
    let src;
    try {
      src = await jsonfile.readFile(state.path);
    } catch(err) {
      // if collection does not exist, then create a new one
      if (err.code === 'ENOENT') {
        return state.getEmptyInstance()
      }
      // rethrow error otherwise
      else throw new Error(`Unable to read the source file`);
    }
    return src;
  }
);

module.exports = {
  canReadSrc,
  canSaveSrc
}