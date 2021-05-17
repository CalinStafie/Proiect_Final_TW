#### Frontend

##### HTML si CSS 

- Fisiere separate pentru HTML si CSS: "index.html", "style.css"
- In interiorul documentelor HTML, sa se foloseasca minim 4 taguri semantice
```html
<header>  </header>
<time id = "time" class = "time"></time>
<label for="days" class='formLabel'>Day:</label>
<select id="days" class='add'required>
<option value="monday" >Monday</option>
<input type="text" name="activity" id="formActivity" autocomplete="off"  class="add" required>
<button type="button" id="addButton" class="buttonAdd"> Add </button>
<section class='dayOfWeek1_mic' id='mondaySection'>
```
- Stilurile CSS sa fie definite folosind clase direct pe elementele care trebuie stilizate (minim 80% din selectori) 
- Layout-ul sa fie impartit in minim 2 coloane si sa fie realizat cu Flexbox si/sau CSS grid

"style.css" linia 141
```css   
.formContainer{
    display: grid;
    grid-template-columns: 35% 45%;
    grid-column-gap: 10%;
    grid-row-gap: 5%;
}

```
- Site-ul sa fie responsive, respectand rezolutiile urmatoarelor dispozitive folosind media queries: 
  - telefon mobil - latime mai mica 768px
  - tableta - latime intre 768px si 1280px
  - desktop - latime mai mare de 1280px
 ```css
 @media (min-width: 1280px)
 @media (max-width: 1280px)
 @media (max-width: 768px)
```
##### Javascript 

- Fisier separat JavaScript: "script.js"
- Manipularea DOM-ului (crearea, editarea si stergerea elementelor/nodurilor HTML)
```js
//creare
var container = document.createElement("div");
container.className = 'dayGrid'
container.id = 'div' + cnt;
dayDivs[activity.day].appendChild(container);

//stergere
dayDivs[DaysLower[i]].removeChild(dayDivs[DaysLower[i]].firstChild);

//editare
var p = document.createElement("span")
p.className = "Name";
p.innerText = localStorage.name;
```
- Folosirea evenimentelor JavaScript declansate de mouse/tastatura 
```js
addButton.addEventListener('click', addActivity);
```
- Utilizarea AJAX: GET, POST, PUT, DELETE
```js
// GET
function getActivities(){
 
    fetch('/activities')
    .then(function (response) {
        response.json().then(function (activities) {
            appendToDOM(activities);
            appendStar(activities);
        });
    });
}
// POST
function postActivity(postObject){
    
    fetch('/activities', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        getActivities();
        resetForm();
    }).catch(function(err) {
        console.log('Fetch Error:-S', err);
    });
}
// DELETE
function deleteActivity(id) {
    
    fetch('/activities', {
        method: 'delete',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
        })
      })
        .then(function() {
            getActivities();
    })

}
 // PUT
function updateActivity(containerId, activity){

    fetch('/activities', {
        method: 'put',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            ID: activity.id,
            stare: activity.stare,
            hour: document.getElementById('hour' + containerId).value,
            day: document.getElementById('day' + containerId).value,
            activity: document.getElementById('activity' + containerId).value
        })
      })
        .then(res => {
            getActivities();
        })
}

```
- Folosirea localStorage 
```js
localStorage.name = document.getElementById("Name").value;
p.innerText = localStorage.name;
localStorage.removeItem('name');
```
 #### Backend API 
- Creare server Backend 
```js
const express = require('express')
```
- CRUD API (Create, Read, Update si Delete) pentru a servi Frontend-ului 
```js
//READ
  app.get('/activities', function (req, res) {
      let mySort = { hour : 1};
      const cursor = activitiesCollection.find().sort(mySort).toArray()
      .then(results => {
        res.send(results);
      })
      .catch(error => console.error(error))
  })
  //CREATE
  app.post('/activities', (req, res) => {
    activitiesCollection.insertOne(req.body)
      .then(result => {
        res.status(200);
        res.redirect("/");
      })
      .catch(error => console.error(error))
  })
  ///DELETE
  app.delete('/activities', (req, res) => {
    let ObjectId = require('mongodb').ObjectID
    let id = new ObjectId(req.body.id);
    activitiesCollection.deleteOne(
    )
      .then(result => {
        res.redirect("")
      })
      .catch(error => console.error(error))
  })
  //UPDATE
  app.put('/activities', (req, res) => {
    let ObjectId = require('mongodb').ObjectID
    let id = new ObjectId(req.body.ID);
    activitiesCollection.findOneAndUpdate(
      {},
      {
        $set: {
          stare: req.body.stare,
          hour: req.body.hour,
          day: req.body.day,
          activity: req.body.activity
        }
      },
      {
        upsert: true
      }
    )
      .then(result => { 
        res.redirect("")
      })
      .catch(error => console.error(error))
  })
```
