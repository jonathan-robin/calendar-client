# Calendar
This the client-side of a todo-list app made for portfolio purposes.
You can access the todos with a search either by day, week or month.

![calendar-todo](https://user-images.githubusercontent.com/63792769/138565001-c062e21d-c0bc-43fa-b353-ec8e732b3bd8.gif)

The website allows you to search between 4 filters ;
- Any complete draw from 1968 to 2019.
- Players profile with statistics and every match played. 
- Select a player and add filters (year, round)
- Pet peeve

Link to the [live version](https://api-rgstats.jonathan-robin.com).\
Link to the [client-side](https://github.com/jonathan-robin/rgs-client.git).

### Built with 

[Node.js](https://fr.nodejs.org/)

## Getting started
### Prerequisities & installation
Once the repo clone with

```
git clone https://github.com/jonathan-robin/rgs-api.git
```
if not already installed, install npm 
```
npm install npm@latest -g
```
then install the project packages
```
npm install
```
To run the app locally, run 
```
node index.js
```
## Usage
The server won't connect to the db since the .env variables aren't included. Change the variables
```
mysql.createConnection({ database, host, username, pass})
```
in the ```config/database.js``` file with your own and then feel free to contact me to get a copy of the db to run locally.

## Contributing

Any contributions you make are greatly appreciated.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".

Fork the Project\
Create your Feature Branch (```git checkout -b feature/AmazingFeature```)\
Commit your Changes (```git commit -m 'Add some AmazingFeature'```)\
Push to the Branch (```git push origin feature/AmazingFeature```)\
Open a Pull Request
## Contact
Jonathan ROBIN - contact@jonathan-robin.com\
https://www.jonathan-robin.com \
https://www.github.com/jonathan-robin
