# Geeks News Backend

Welcome to the backend of the Geeks News application. This project has been created as part of my portfolio to showcase my web development skills.

Want to see the frontend? it's [here](https://github.com/chewbacca234/geeks-news_frontend.git).
Have fun using it!

<!-- TECH STACK -->

## 🛠️ Tech Stack

- [![Node][Node.js]](https://nodejs.org/)
- [![Express][Express.js]](https://expressjs.com/)
- [![MongoDb][MongoDb.com]](https://www.mongodb.com/)
- [![Mongoose][Mongoose.js]](https://mongoosejs.com/) (for interacting with the database)
- [![uid2][Uid2]](https://www.npmjs.com/package/uid2?activeTab=versions) (for token generation)
- [![bcrypt][Bcrypt]](https://www.npmjs.com/package/bcrypt) (for password encryption)

<!-- API ROUTES -->

## :vertical_traffic_light: API Routes

### Get all sources

Get all the sources from News API in category technology.

```http
GET /sources
```

### Get articles

Get top headlines from selected sources from News API.

```http
GET /articles/:selectedSources
```

| Parameter         | Type                     | Description                                               |
| :---------------- | :----------------------- | :-------------------------------------------------------- |
| `selectedSources` | `comma-seperated string` | **Required**. A list of identifiers for the news sources. |

### Register new user

Register a new user so that he can bookmark articles.

```http
POST /users/signup
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. User's username. |
| `password` | `string` | **Required**. User's password. |

### Connect user

Connect the user so that he can bookmark articles, and view past bookmarked articles.

```http
POST /users/signin
```

| Parameter  | Type     | Description                    |
| :--------- | :------- | :----------------------------- |
| `username` | `string` | **Required**. User's username. |
| `password` | `string` | **Required**. User's password. |

### Get user's can bookmark status

Check if the user can bookmark.

```http
GET /users/canBookmark/:token
```

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `token`   | `string` | **Required**. User's token. |

<!-- LICENCE -->

## 📰 License

Distributed under the MIT License. See [LICENSE.txt](./LICENCE.txt) for more information.

<!-- MARKDOWN IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[Node.js]: https://img.shields.io/badge/node.js-%23404d59.svg?style=plastic&logo=node.js&logoColor=white
[Express.js]: https://img.shields.io/badge/express.js-%23404d59.svg?style=plastic&logo=express&logoColor=%2361DAFB
[MongoDb.com]: https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=plastic&logo=mongodb&logoColor=white
[Mongoose.js]: https://img.shields.io/badge/Mongoose-red?style=plastic&logoColor=white
[Uid2]: https://img.shields.io/badge/Uid2-red?style=plastic&logoColor=white
[Bcrypt]: https://img.shields.io/badge/Bcrypt-red?style=plastic&logoColor=white
