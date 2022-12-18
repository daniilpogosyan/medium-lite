const jsonfile = require('jsonfile');
const lockfile = require('proper-lockfile');


// `retry` object used to retry lock file
// Since multiple function can try to lock the same file, it's
// to postpone locking if the file is already locked and being used
const retries = {
  retries: 10,
  factor: 1
}

const canSaveSrc = (state) => (
  // TODO: lock file
  async function saveSrc(src) {
    const release = await lockfile.lock(state.path, { retries });
    console.log('lock\twrite', src)
    try {
      await jsonfile.writeFile(state.path, src, {spaces: 2});
    } catch(err) {
      throw new Error(`Unable to write to the source file`);
    } finally {
      release();
      console.log('release\twrite', src)
    }
    return true
  }
)

const canReadSrc = (state) => (
  // TODO: lock file
  async function readSrc() {
    let src;
    const release = await lockfile.lock(state.path, { retries });
    console.log('lock\tread')
    try {
      src = await jsonfile.readFile(state.path);
      console.log('from read', src)
    } catch(err) {
      // if collection does not exist, then create a new one
      if (err.code === 'ENOENT') {
        return state.getEmptyInstance()
      }
      // rethrow error otherwise
      else throw new Error(`Unable to read the source file`);
    } finally {
      release();
      console.log('release\tread')
    }
    return src;
  }
);

module.exports = {
  canReadSrc,
  canSaveSrc
}