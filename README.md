
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
- fill .env file from root directory (this file is read inside django project settings.py)
- docker-compose up -d

``` cascaochii_be > ./scripts/migrations_run.sh ```
``` cascaochii_be > ./scripts/seed_run.sh ```
``` cascaochii_be > ./scripts/server_run.sh ```

``` cascaochii_fe > npm start ```


## Documentation
https://www.youtube.com/watch?v=GieYIzvdt2U
https://github.com/bradtraversy/lead_manager_react_django
https://github.com/shtanko-michael/react-multiple-layouts-example
https://www.youtube.com/watch?v=xjMP0hspNLE   --refresh token
https://stackoverflow.com/questions/51577441/how-to-seed-django-project-insert-a-bunch-of-data-into-the-project-for-initi

## TODO:
- [ ] de lamurit daca am nevoie de un environment pentru backend sau nu(posibil sa nu fie nevoie daca lucrez direct in container, sa verific daca nu cumva pun in requirements.txt mai multe module decat am nevoie)
- [ ] fix the issue with jsconfig.json (absolute path, go to file)

- backend:
  - [ ] validare request
  - [ ] de facut o clasa pentru Response, sa trimit raspunsul in acelasi format mereu
  - [ ] investigate typecheking in Django si de vazut daca este fezabil
  - [ ] de vazut daca pot sa adaug o subclasa care sa mosteneasca created_at, updated_at 
  - [x] ar trebui sa schimb sqlite cu Postgres, poate chiar sa folosesc o platforma ca fly.io
  - [ ] daca opresc backend-ul apare 401 unauthorized
  - [ ] relatie manytomany intre user si roluri(un user poate sa aiba mai multe roluri)
  - [ ] relatie manytomany intre player si joc (un player poate sa participe la mai multe jocuri)

- frontend:
  - [x] sa fac un layout pentru topbar
  - [ ] move to vite
  - [ ] sa prind erorile 401 cumva
  - [ ] de vazut de ce nu merge jsconfig.json partea cu pathurile @...
  - [ ] cand adaug o intrebare si pun timestampul de genul 2:30 sa transform automat in 150 secunde
  - [ ] sa prind si sa afisez raspunsul cand incerc sa adaug un game care exista
  - [ ] sa unific PlayersForm si QuestionForm
  - [ ] sa adaug un pop-up de confirmare la toate actiunile de editare, stergere
  - [ ] sa pun in pagina cu jocul si numele jocului pe care esti
  - [ ] sa pun un buton de back
  - [ ] fix "Can't perform a React state update on an unmounted component." when login
  