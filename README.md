# Calendar
This the client-side of a todo-list CRUD app made for portfolio purposes.\
You can access the todos with a search either by day, week or month.

![calendar-todo](https://user-images.githubusercontent.com/63792769/138565001-c062e21d-c0bc-43fa-b353-ec8e732b3bd8.gif)

You can create, update, archive and delete the todos as well as add tags to them and customize tags.

The server-side is in nodejs on heroku.
Link to the [live version](https://api-calendar.jonathan-robin.com).\
Link to the [server-side](https://github.com/jonathan-robin/calendar-server.git).

### Built with 

[React.js](https://fr.reactjs.org/)\
[Sass](https://sass-lang.com/)\
[Axios]('https://axios-http.com/docs/intro')

## Getting started
### Prerequisities & installation
Once the repo clone with

```
git clone https://github.com/jonathan-robin/calendar-client.git
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
npm start
```
## Usage
Once the repo cloned, the request will keep going to the heroku server, change the 
```
const instance = axios.create({ baseURL })
```
variables baseURL in the ```hooks/useAxios.tsx``` file with your own server to run it locally.

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
