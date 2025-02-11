# Social Network API

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)

## Description
This is a backend API for a social network application, allowing users to create profiles, add friends, post thoughts, and react to thoughts. The API follows RESTful principles and utilizes MongoDB with Mongoose for data storage.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
Clone the repository: git clone <repository_url> Navigate to the project directory: cd Social-Network-API Install dependencies: npm install Start the server in development mode: npm run dev or start it normally: npm start

## Usage
After running 'npm run start', open Postman. In post man set the url to http://localhost:3001/ and test the express routes.

**User Routes:**  
`GET` | `/api/users` → Retrieve all users  
`GET` | `/api/users/:id` → Retrieve a single user (with thoughts & friends)  
`POST` | `/api/users` → Create a new user  
`PUT` | `/api/users/:id` → Update user information  
`DELETE` | `/api/users/:id` → Delete a user (and their thoughts)  

**Friend Routes:**  
`POST` | `/api/users/:userId/friends/:friendId` → Add a friend  
`DELETE` | `/api/users/:userId/friends/:friendId` → Remove a friend  

**Thought Routes:**  
`GET` | `/api/thoughts` → Retrieve all thoughts  
`GET` | `/api/thoughts/:id` → Retrieve a single thought  
`POST` | `/api/thoughts` → Create a thought (and link it to a user)  
`PUT` | `/api/thoughts/:id` → Update a thought  
`DELETE` | `/api/thoughts/:id` → Delete a thought  

**Reaction Routes:**  
`POST` | `/api/thoughts/:thoughtId/reactions` → Add a reaction to a thought  
`DELETE` | `/api/thoughts/:thoughtId/reactions/:reactionId` → Remove a reaction 

## License
This project is licensed under the MIT license.  
For more details, please refer to the [MIT License](https://opensource.org/licenses/MIT).
  

## Contributing
Contributions are welcome! Fork the repository and clone it to your local machine.

## Tests
You can test the API using Postman or Insomnia.

## Questions
If you have any questions, please feel free to reach out:
- GitHub: [JPMill](https://github.com/JPMill)
- Email: [justinmiller617@gmail.com](mailto:justinmiller617@gmail.com)

