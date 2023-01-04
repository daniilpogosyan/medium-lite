# medium-lite
API for Medium-lite

## Endpoints
* ```/account/login``` 
  * POST - sign up with user credentials in request body (email and password) and receive jwt
* ```/account/login``` 
  * POST - log in with user credentials in request body (email and password) and receive jwt
* ```/posts/:postId```
  * GET - get single post data. It always includes content
* ```/posts```
  * GET - get list of posts. Available query params: 
    * &page={number} - page number
    * &limit={number} - number of post per page
    * &excludeContent={boolean} - if `true`, then response will not include posts content
  * POST - create a post from data in requst body. Client must include value jwt in Authorization header to be able to create posts
* ```/users```
  * GET - get list of users. Available query params: 
    * &page={number} - page number
    * &limit={number} - number of post per page
    
## Notes
* Requsts for post creating must contain fields: `content` and `title`.
* Authorization header must follow the structure: `Bearer {jwt}`

## Dev notes
Plan:
  1. Query every fields (SELECT *) at first just to make that shit work
  2. Optional include post for user queries
  3. Optional include passwordHash for user queries
  4. Share options between service functions (getPost, getUser, ...)
