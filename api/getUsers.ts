import getDocs from '../database/getDocs';


async function getUsers({ limit = 10, page = 1 } = {}) {
  const options = {
    limit,
    page,
    exclude: ['passwordHash']
  };

  const users = await getDocs('users', options);
  return users
}

export default getUsers;