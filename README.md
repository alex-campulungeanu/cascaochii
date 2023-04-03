
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
  - [] validare request
  - [] de facut o noua aplicatie pentru adminstrare: housekeeping 
  - [] de facut o clasa pentru Response, sa trimit raspunsul in acelasi format mereu
  - [] lista cu playeri disponibil de adaugat pentru un game ar trebui sa ii excluda pe cei care deja sunt adaugati
  - [ ] investigate typecheking in Django si de vazut daca este fezabil
  - [ ] de vazut daca pot sa adaug o subclasa care sa mosteneasca created_at, updated_at 
  - [x] ar trebui sa schimb sqlite cu Postgres, poate chiar sa folosesc o platforma ca fly.io
  - [ ] daca opresc backend-ul apare 401 unauthorized
  - [x] relatie manytomany intre user si roluri(un user poate sa aiba mai multe roluri)
  - [x] relatie manytomany intre player si joc (un player poate sa participe la mai multe jocuri)

- frontend:
  - [ ] sa fac o sectiune pentru admin sa adaug jucatori, cu un meniu in partea stanga(cand adaug un jucator sa il asignez si pe un joc)
  - [ ] in sectiunea de admin sa pun playerii cu un tabel cu cate jocuri a jucat fiecare si un collapsible cu statisitca(jocurile jucate si pe ce loc e la fiecare Collapsible table in material ui)
  - [ ] jucatorii nu mai sunt creati pentru fiecare joc, sunt creati din pagina de admin si adaugti pe jocuri
  - [x] sa fac un layout pentru topbar
  - [x] move to vite
  - [] sa prind erorile 401 cumva
  - [] sa pun un popup dupa  ce creez un  game daca s-a create cu success
  - [] la update questions apare un undefined sub fiecare camp
  - [] de vazut de ce se fac 2 requesturi pentru token/refresh
  - [] de vazut de ce nu merge jsconfig.json partea cu pathurile @...
  - [] cand adaug o intrebare si pun timestampul de genul 2:30 sa transform automat in 150 secunde
  - [] sa prind si sa afisez raspunsul cand incerc sa adaug un game care exista
  - [x] sa unific PlayersForm si QuestionForm
  - [ ] sa adaug un pop-up de confirmare la toate actiunile de editare, stergere
  - [x] sa pun in pagina cu jocul si numele jocului pe care esti
  - [x] sa pun un buton de back
  - [ ] fix "Can't perform a React state update on an unmounted component." when login
  