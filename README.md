
<h1 align="center">
<br>
  "casca ochii"
</h1>

<p align="center">guess it</p>

<hr />
<br />


## 📚 Project Definition

A game to guess scenes from Youtube(for now), originaly developed as a team activity at work.


## 🛠️ Features

Technologies:

- ⚛️ **ReactJs**
- ⚛️ **Material UI**
-    **Django**
- 🌐 **Docker** - Containerization sistem


## 🚀 Instalation


## 💻 Development
- docker-compose up -d

``` cascaochii_be > ./scripts/run_server.sh ```

``` cascaochii_fe > npm start ```


## Documentation
https://www.youtube.com/watch?v=GieYIzvdt2U
https://github.com/bradtraversy/lead_manager_react_django
https://github.com/shtanko-michael/react-multiple-layouts-example


## TODO:
- [ ] de lamurit daca am nevoie de un environment pentru backend sau nu(posibil sa nu fie nevoie daca lucrez direct in container, sa verific daca nu cumva pun in requirements.txt mai multe module decat am nevoie)
- [ ] fix the issue with jsconfig.json (absolute path, go to file)

- backend:
  - [ ] investigate typecheking in Django si de vazut daca este fezabil
  - [ ] de vazut daca pot sa adaug o subclasa care sa mosteneasca created_at, updated_at 
  - [ ] ar trebui sa schimb sqlite cu Postgres, poate chiar sa folosesc o platforma ca fly.io

- frontend:
  - [x] sa fac un layout pentru topbar
  - [ ] de vazut de ce nu merge jsconfig.json partea cu pathurile @...
  - [ ] cand adaug o intrebare si pun timestampul de genul 2:30 sa transform automat in 150 secunde
  - [ ] sa prind si sa afisez raspunsul cand incerc sa adaug un game care exista
  - [ ] sa unific PlayersForm si QuestionForm
  - [ ] sa adaug un pop-up de confirmare la toate actiunile de editare, stergere
  