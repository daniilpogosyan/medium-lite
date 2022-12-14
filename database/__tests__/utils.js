const { saveCollection, getCollection } = require('../utils');

describe('getCollection()', () => {
  test('returns parsed object from ./collections/{collection}.json', async () => {
    const collectionName = '__mock-existing-collection';
    const collection = await getCollection(collectionName);

    expect(collection).toEqual({
      "someuserid1": {
        "email": "fake123@gmail.com",
        "passwordHash": "gassr3c23eA",
        "id": "someuserid1"
      },
      "someuserid2": {
        "email": "fake456@gmail.com",
        "passwordHash": "af12xp2fian",
        "id": "someuserid2"
      },
      "someuserid3": {
        "email": "fake789@gmail.com",
        "passwordHash": "asfqwx1k2op",
        "id": "someuserid3"
      }
    })
  });

  test('creates file with {} in it and returns it if collection does not exist', async () => {
    const collectionName = '__mock-not-existing-collection';
    const collection = await getCollection(collectionName);
    expect(collection).toEqual({});

    const fileContent = require('../collections/__mock-not-existing-collection.json');
    expect(fileContent).toEqual({});
    // TODO: remove mocked file after test is done
  });

  describe('throws error', () => {
    test.todo('when {collection}.json cannot be parsed')
  })
});

// it causes restarting jest --watch, because it updates used files
describe.skip('saveCollection()', () => {
  test('rewrites collection with new data', async () => {
    const name = '__mock-saveCollection';

    const data = {
        something: Date()
    }

    expect(await saveCollection(data, name)).toBe(true);
    expect(await getCollection(name)).toEqual(data);
  });
})