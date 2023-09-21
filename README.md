### My 1st contact with Node.js

The main goal of this project is to recreate the api developed on stage 08 of the Explorer and improve it along the way.

The project is the BackEnd of a user notes aplication organised by tags, using SQLite.

the biggest change that I've made was the single use of KNEX to build the database, making it more flexible.

I also created a couple of functions to help separate responsabilite that I refered as (SR func) on the git commits, some of those turned the user experience better.

the following functions changed the aplication behave:

- createInputValidatio{}
makes sure that the user is providing the input needed to create a new note.

- updatePasswordCheck{}   and   updateEmailCheck{}
allows the user to update each of he's information individualy i.e. now he can update only his name if he wants to, without the need of passing the email.

- notesOneEntryOnly{}   and   tagsOneEntryOnly{}
when making an index search these functions will filter the notes and tags, asuring that'll be returned only one of each.

## Client to connect with this application
https://github.com/tarcisioMateus/rocketnotes

## Tech Stack
**Server:** Node, Express, Knex, SQLite3

## Links
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/tarcisiomateus)
