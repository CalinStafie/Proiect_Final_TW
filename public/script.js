document.getElementById("home-btn").addEventListener("click", goHome);
document.getElementById("log-in-btn").addEventListener("click", goLogIn);
document.getElementById("search-films-btn").addEventListener("click", goSearchfilms);

localStorage.setItem("onSearch", "false");
btn = document.getElementById("modify-list-btn");
localStorage.setItem("loged","false");
// Ar fi mers inlocuita functia setItem cu "localStorage["logged"] = "false";" direct
// la orice comanda de asta in cod

document.addEventListener('click',function(e)
{
    if(e.target && e.target.id == 'modify-list-btn')
    {
        goModifiy();
    }
});

//aici modific lista cu filme (DELETE SAU MODIFY) doar cand suntem logati
function modifyItem(film)
{
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');
    main.innerHTML =`<main class = 'main-div'>
    <div class='add-film'>
        <div class = 'add-poza-titlu'>
            <div class ='desc-produs'>
                <img class = 'img' id ='display-film' alt='film' src=''>
            </div>
            <form>
                <br>
                <label for="film name">Film name</label><br>
                <input class='add-input' type="text" id="film_name" name="film name" placeholder="Film name"><br>
                <label for="Author name">Actors</label><br>
                <input class='add-input' type="text" id="author_name" name="Author name" placeholder="Actors"><br>
                <i class="fa fa-star" aria-hidden="true"></i>
                <label for="Price">Rating IMDB</label><br>
                <input class='add-input' type="text" id="price" name="Price" placeholder="Rating out of 10"><br>
                <label for="Image">Image link</label><br>
                <input class='add-input' type="text" id="Image" name="Image" placeholder="Image link"><br>
                
            </form>
        </div>

        <div class = 'descriere'>
           <h3>
               Add description:
           </h3>
           <form>
            <textarea name="message" id = 'film-desc' class='add-input-desc' rows="20" cols="150"></textarea>
           </form>
           <br>

        </div>

        <button type='button' class='add-film-btn' id = 'modify-film-btn'>
            Modify the film!
        </button>
        
        <button type='button' class='add-film-btn' id = 'delete-film-btn'>
            Delete the film!
        </button>
    </div>
</main>
    `;
    
    document.getElementById("display-film").src = film.img;
    document.getElementById("film_name").value = film.name;
    document.getElementById("author_name").value = film.author;
    document.getElementById("price").value = film.price;
    document.getElementById("Image").value = film.img;
    document.getElementById("film-desc").value = film.description;
    //aici modific elementul
    document.getElementById('modify-film-btn').addEventListener('click',function()
    {
        const Obj = 
        {
            name: document.getElementById("film_name").value,
            author : document.getElementById("author_name").value,
            price: document.getElementById("price").value,
            description:document.getElementById("film-desc").value,
            img:document.getElementById("Image").value,
            id:film.id
        }
        fetch(`http://localhost:3000/films/${film.id}`, {
            method: 'PUT',
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify(Obj)
        }).then(function () {
        goModifiy();
    });


    });
    //aici sterg elementul
    document.getElementById("delete-film-btn").addEventListener('click',function()
    {
        fetch(`http://localhost:3000/films/${film.id}`, {
        method: 'DELETE',
    }).then(function () {

        goModifiy();
    }); 
    });

}

 // functie pentru a modifica lista cu filme 
function goModifiy()
{
    localStorage.setItem("onSearch", "false");

    let mainSection = document.getElementById('main-section');
    while(mainSection.firstChild)
    {
        mainSection.removeChild(mainSection.firstChild);
    }
    let main_div = document.createElement("main");
    main_div.className = "main-div-search";
    main_div.id = "main-div-search";

    //Fetch the films list
    fetch('http://localhost:3000/films')
    .then(function (response) {
        // Trasform server response to get the films
        response.json().then(function (films) {
            for(let i = 0; i < films.length; i++)
            {
                let div_id = document.createElement("div");
                div_id.id = films[i].id;
                div_id.className = 'film';

                let div_poz_titlu = document.createElement("div");
                div_poz_titlu.className = 'poza-titlu';
                
                let div_desc = document.createElement("div");
                div_desc.className = 'desc-produs';
                
                let img = document.createElement("img");
                img.className = 'img';
                img.alt = 'film'
                img.src = films[i].img;
                
                div_desc.appendChild(img);
                
                let div_titlu_pret = document.createElement("div");
                div_titlu_pret.className = "titlu-pret";

                let h3 = document.createElement("p");
                h3.className = 'titlu';
                h3.innerText = films[i].name;

                let h4 = document.createElement("p");
                h4.className = 'pret';
                h4.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>' + ' ' + films[i].price + ' / 10';

                div_titlu_pret.appendChild(h3);
                div_titlu_pret.appendChild(h4);
                div_poz_titlu.appendChild(div_desc);
                div_poz_titlu.appendChild(div_titlu_pret);

                let div_descriere = document.createElement("div");
                div_descriere.className = "descriere";
                div_descriere.innerText = films[i].description;

                let btn = document.createElement("button");
                btn.className = "btn-buy";
                btn.type = "button";
                btn.id = "modify"
                btn.innerText = "Modify it!";
                btn.addEventListener('click', function () {
                    modifyItem(films[i]); // de pus functia de stergere 
                });

                div_id.appendChild(div_poz_titlu);
                div_id.appendChild(div_descriere);
                div_id.appendChild(btn);

                main_div.appendChild(div_id);
            }
            
        });
    });

    mainSection.appendChild(main_div);
}

function getFilmFromServer(id) {
    fetch(`http://localhost:3000/films/${id}`)
        .then(function (response) {
            // Trasform server response to plain object
            response.json().then(function (films) {
                renderFilmsPage(films);
            });
        });
};


 // functia pentru pagina de log-in si sign-up
function goLogIn(){
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');
    main.innerHTML = `
    <main class = 'main-div-sign'>
        <form>
            <h1 class = 'sing-in-header'>Sign in</h1>
            <label for="username">Username</label><br>
            <input class='input' type="text" id="username" name="username" placeholder="username"><br>
            <br>
            <label for="password">Password</label><br>
            <input class='input' type="password" id="password" name="password" placeholder="password"><br>
            <br>
            <input  value="Log in" id='submit-log-in' class="submit-button" disabled>
            
            <h1 class = 'sing-up-header'>Don't have an account? Sign up!</h1>
            <label for="username2">Username</label><br>
            <input class='input' type="text" id="username2"  name="username2" placeholder="username"><br>
            <br>

            <label for="email">Email adress</label><br>
            <input class='input' type="text" id="email"  name="email" placeholder="email"><br>
            <br>

            <label for="password2">Password</label><br>
            <input class='input' type="password" id="password2"  name="password2" placeholder="password"><br>
            <br>

            <input value="Sign up" id='submit-sign-up' class="submit-button" disabled>
            <br>
        </form>
        <br>       
    </main>
    `;
    
}



// display films to the list A.K.A. pagina de "Search reviews"
function goSearchfilms(){
    
    //if we try to reload the list but there is no need to, abort
    if(localStorage.getItem("onSearch") == 'true')
    {
        //console.log(localStorage.getItem("onSearch"));
        return;
    }
    localStorage.setItem("onSearch",'true');
    let mainSection = document.getElementById('main-section');
    while(mainSection.firstChild)
    {
        mainSection.removeChild(mainSection.firstChild);
    }
    let main_div = document.createElement("main");
    main_div.className = "main-div-search";
    main_div.id = "main-div-search";
    

    fetch('http://localhost:3000/films')
    .then(function (response) {
        
        response.json().then(function (films) {
            for(let i = 0; i < films.length; i++)
            {
                let div_id = document.createElement("div");
                div_id.id = films[i].id;
                div_id.className = 'film';

                let div_poz_titlu = document.createElement("div");
                div_poz_titlu.className = 'poza-titlu';
                
                let div_desc = document.createElement("div");
                div_desc.className = 'desc-produs';
                
                let img = document.createElement("img");
                img.className = 'img';
                img.alt = 'film'
                img.src = films[i].img;
                
                div_desc.appendChild(img);
                
                let div_titlu_pret = document.createElement("div");
                div_titlu_pret.className = "titlu-pret";

                let h3 = document.createElement("p");
                h3.className = 'titlu';
                h3.innerText = films[i].name;

                let h4 = document.createElement("p");
                h4.className = 'pret';
                h4.innerHTML = '<i class="fa fa-star" aria-hidden="true"></i>' + ' ' + films[i].price + ' / 10';

                div_titlu_pret.appendChild(h3);
                div_titlu_pret.appendChild(h4);
                div_poz_titlu.appendChild(div_desc);
                div_poz_titlu.appendChild(div_titlu_pret);

                let div_descriere = document.createElement("div");
                div_descriere.className = "descriere";
                div_descriere.innerText = "Actors: " + films[i].author + "\n Description: " + films[i].description;

                let btn = document.createElement("button");
                btn.className = "btn-buy";
                btn.type = "button";
                btn.innerText = "Details";

                div_id.appendChild(div_poz_titlu);
                div_id.appendChild(div_descriere);
                div_id.appendChild(btn);
                
                btn.addEventListener('click', function () {
                    generateSearchFilms(films[i]); // de pus functia de generare
                });

                main_div.appendChild(div_id);

            }
            
        });
    });

    mainSection.appendChild(main_div);
}

 // pagina de Home
function goHome(){
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');
    main.innerHTML = `
    <main class = 'main-div' id = 'main-div'>
            <br>
            <h1 id = 'welcome' class = 'welcome'>Welcome, Movie Fanatic!</h1>
            <br>
            <div class ='welcome-div'>
                <div>
                    <img class = 'img' class = 'welcome-img' alt='film' src='https://previews.123rf.com/images/dariozg/dariozg1703/dariozg170301510/74370574-movies-word-cloud-movies-typography-background-.jpg'>
                    <br>
                    <br>
                    <br>
                </div>
                <div class = 'welcome-3'>
                    This website is dedicated to movie lovers. Whether you want to write or see some reviews, 
                    this is the right place to be! Just sit back and enjoy this journey through different parts of the 
                    movies' world!
                </div>
            </div>
        </main>
    `;
}


/////////////////////////////// FUNCTIA PENTRU FOOTER-UL SPECIAL DE SCHIMBAT NUME /////////////////////////////////

document.getElementById("changeName").onclick = function () {
    var txt;
    var person = prompt("Would you like to enter your name?:", "Darth Vader");
    if (person == null || person == "") {
      txt = "you";}
     else {
      txt = person;
      if (typeof(Storage) !== "undefined") {
        localStorage.setItem("nume", txt);
        document.getElementById("changeName").innerHTML = localStorage.getItem("nume");
      } 
    }
  }
  


//////////////////////////////// FUNCTIILE CARE TIN DE MOMENTUL IN CARE TE-AI LOGAT SAU TI-AI FACUT UN ////////////////////////
            /////////////////////////// CONT NOU, TRIMITANDU-TE PE PAGINA DE HOME (GENERAREA PAGINII)///////////////////////


document.addEventListener('click',function(e)
{
    if(e.target && e.target.id == 'submit-log-in')
    {
        let obj = {
            username : document.getElementById("username").value,
            password: document.getElementById("password").value
        }
        fetch('http://localhost:3000/login', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
        }).then(function (response) {
            fetch('http://localhost:3000/login2')
            .then(function (response) { 
                response.json().then(function (res) {
            if(res == 'loged')
            {
                document.getElementById("navigator").innerHTML = `
                <button type='button' class='nav-button' id='home-btn'> Home </button>
                <button type='button' class='nav-button' id = 'search-films-btn'> Search reviews </button>
                <button type='button' class='nav-button' id = 'add-films-btn'> Add review </button>
                <button type='button' class='nav-button' id = 'modify-list-btn'> Modify List</button>
                <button type='button' onclick="window.location.href='https://linktr.ee/Calin_Stafie';" class='nav-button' id = 'contact-button'> Contact </button>
                `
                document.getElementById("home-btn").addEventListener("click", goHome);
                document.getElementById("search-films-btn").addEventListener("click", goSearchfilms);
                document.getElementById("add-films-btn").addEventListener("click", goAddfilms);
                localStorage.setItem("loged","true"); 
                localStorage.setItem("user", document.getElementById("username").value);
                goHome();  
            }
        });
        });
        
        });
        
    }
});


document.addEventListener('click', function(e)
{
    if(e.target && e.target.id == 'submit-sign-up')
    {
        let obj = 
        {
            username : document.getElementById("username2").value,
            password: document.getElementById("password2").value,
            email: document.getElementById("email").value
        }
        fetch('http://localhost:3000/sign-up', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(obj)
        }).then(function (response) {
            document.getElementById("navigator").innerHTML = `
                <button type='button' class='nav-button' id='home-btn'> Home </button>
                <button type='button' class='nav-button' id = 'search-films-btn'> Search reviews </button>
                <button type='button' class='nav-button' id = 'add-films-btn'> Add review </button>
                <button type='button' class='nav-button' id = 'modify-list-btn'> Modify List</button>
                <button type='button' onclick="window.location.href='https://linktr.ee/Calin_Stafie';" class='nav-button' id = 'contact-button'> Contact </button>
                `
                document.getElementById("home-btn").addEventListener("click", goHome);
                document.getElementById("search-films-btn").addEventListener("click", goSearchfilms);
                document.getElementById("add-films-btn").addEventListener("click", goAddfilms);
                localStorage.setItem("loged","true"); 
                localStorage.setItem("user", document.getElementById("username2").value);
                goHome();  
        });
    }
}
);


function goHome(){
    
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');
    main.innerHTML = `
    <main class = 'main-div' id = 'main-div'>
            <br>
            <h1 id = 'welcome' class = 'welcome'>Welcome, Movie Fanatic!</h1>
            <br>
            <div class ='welcome-div'>
                <div>
                    <img class = 'img' class = 'welcome-img' alt='film' src='https://previews.123rf.com/images/dariozg/dariozg1703/dariozg170301510/74370574-movies-word-cloud-movies-typography-background-.jpg'>
                    <br>
                    <br>
                    <br>
                </div>
                <div class = 'welcome-3'>
                    This website is dedicated to movie lovers. Whether you want to write or see some reviews, 
                    this is the right place to be! Just sit back and enjoy this journey through different parts of the 
                    movies' world!
                </div>
            </div>
        </main>
    `;
    if (localStorage['loged'] == 'true')
    {
        document.getElementById('welcome').innerHTML = "Welcome, " + localStorage['user'] +"!";
    }
}


///////////////////////  FUNCTIILE PENTRU ADAUGARE DE FILM / RECENZIE NOUA (POST-UL IN //////////////////////
//////////////////////////////  BAZA DE DATE SI GENERAREA PAGINII CORESPUNZATOARE ) /////////////////////

function goAddfilms(){
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');
    main.innerHTML =`<main class = 'main-div'>
    <div class='add-film'>
        <div class = 'add-poza-titlu'>
            <div class ='desc-produs'>
                <img class = 'img' id='imagine_add' alt='film' src='https://images.pexels.com/photos/2422588/pexels-photo-2422588.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'>
            </div>
            <form>
                <br>
                <label for="film name">Film name</label><br>
                <input class='add-input' type="text" id="film_name" name="film name" placeholder="Film name"><br>
                
                <label for="Author name">Actors</label><br>
                <input class='add-input' type="text" id="author_name" name="Author name" placeholder="Actors"><br>
    
                <i class="fa fa-star" aria-hidden="true"></i>
                <label for="Price">Rating IMDB</label><br>
                <input class='add-input' type="text" id="price" name="Price" placeholder="Rating out of 10"><br>
                <label for="Image">Image link</label><br>
                <input class='add-input' type="text" id="Image" name="Image" placeholder="Image link"><br>
                
            </form>
        </div>

        <div class = 'descriere'>
           <h3>
               Add description:
           </h3>
           <form>
            <textarea name="message" id = 'film-desc' class='add-input-desc' rows="20" cols="150"></textarea>
           </form>
           <br>

        </div>
        
        <button type='button' class='add-film-btn' id = 'add-film-btn'>
            Add the film!
        </button>
    </div>
</main>
    `;

}

document.addEventListener('click',function(e)
{
    if(e.target && e.target.id == 'add-film-btn')
    {
        filmName = document.getElementById("film_name").value;
        price = document.getElementById("price").value;
        imgLink = document.getElementById("Image").value;
        filmDesc = document.getElementById("film-desc").value;
        author = document.getElementById("author_name").value;
        
        obj = {
            name: filmName,
            price: price,
            description: filmDesc,
            img: imgLink,
            author: author
        }
        postfilm(obj);
    }
});


function postfilm(postObject)
{

    fetch('http://localhost:3000/films', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        localStorage.setItem("onSearch", "false");
        goSearchfilms();
    });

}


////////////////////////////// FUNCTIA DE GENERARE A PAGINII CU REVIEW-URI / FILME, //////////////////////////
/////////////////////////////// ATAT CAND ESTI LOGAT, CAT SI ATUNCI CAND NU ESTI LOGAT ///////////////////////////////

function generateSearchFilms(film)
{
    localStorage.setItem("onSearch", "false");
    main = document.getElementById('main-section');

    if (localStorage['loged'] == 'true'){
    main.innerHTML =`<main class = 'main-div'>
    <div class='add-film'>
        <div class = 'add-poza-titlu'>
            <div class ='desc-produs'>
                <img class = 'img' id ='display-film' alt='film' src='./img/film.jpg'>
            </div>
            <form class="form-inline">
                <br>
                <label for="film name">Film name</label><br>
                <input class='add-input' type="text" id="film_name" name="film name" placeholder="Film name" disabled><br>
                
                <label for="Author name">Actors</label><br>
                <input class='add-input' type="text" id="author_name" name="Author name" placeholder="Actors" disabled><br>
    
                <label for="Price">Rating IMDB</label><br>
                <input class='add-input' type="text" id="price" name="Price" placeholder="Rating" disabled><br>

            </form>
        </div>

        <div class = 'descriere'>
           <h3>
               Add description:
           </h3>
           <form>
            <textarea name="message" id ='film_desc' class='add-input-desc' rows="20" cols="150" disabled></textarea>
           </form>
           <br>

        </div>

    </div>
</main>
    `;
    document.getElementById("display-film").src = film.img;
    document.getElementById("film_name").value = film.name;
    document.getElementById("author_name").value = film.author;
    document.getElementById("price").value = '⭐' + film.price + ' / 10';
    document.getElementById('film_desc').value = film.description;

    }
   else{
        main.innerHTML =`<main class = 'main-div'>
        <div class='add-film'>
            <div class = 'add-poza-titlu'>
                <div class ='desc-produs'>
                    <img class = 'img' id ='display-film' alt='film' src='./img/film.jpg'>
                </div>
                <form class="form-inline">
                    <br>
                    <label for="film name">Film name</label><br>
                    <input class='add-input' type="text" id="film_name" name="film name" placeholder="Film name" disabled><br>
                
                    <label for="Author name">Actors</label><br>
                    <input class='add-input' type="text" id="author_name" name="Author name" placeholder="Actors" disabled><br>
    
                    <label for="Price">Rating IMDB</label><br>
                    <input class='add-input' type="text" id="price" name="Price" placeholder="Rating" disabled><br>
                    
                </form>
            </div>
    
            <div class = 'descriere'>
               <h3>
                   Add description:
               </h3>
               <form>
                <textarea name="message" id ='film_desc' class='add-input-desc' rows="20" cols="150" disabled></textarea>
               </form>
               <br>
    
            </div>
    
        </div>
    </main>
        `;
        document.getElementById("display-film").src = film.img;
        document.getElementById("film_name").value = film.name;
        document.getElementById("author_name").value = film.author;
        document.getElementById("price").value = '⭐' + film.price + ' / 10';
        document.getElementById('film_desc').value = film.description;
    }

}



