const path = require("path"),
  body_parser = require("body-parser"),
  prompt = require("prompt-sync")({sigint: true}),
  express = require("express"),
  session = require("express-session"),
  back = require("express-back");
  translate = import("translate");


// ----------- MySQL2 -----------
const mysql = require("mysql2");

const host_addr = prompt("Host address : "); // "192.168.1.116"
const db_name = "my_own_website";

const user_access = {
  host: host_addr,
  database: db_name,

  user: "average_user"
};
// ------------------------------

const port = 8080;


const app = express();

app.use(body_parser.urlencoded({extended: true}));
app.use(body_parser.json());

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.use(session({
  cookie: {secure: false, httpOnly: false},
  secret: "2secret4u",
  resave: true,
  saveUninitialized: true
}));
app.use(back());

app.use(express.Router());


app.listen(port, () => {
  console.log(`Now listening to port ${port}.`);
});



app.get("/", (request, response) => {
  let website_data = {lang_data:{}};

  if(!request.session.selected_lang) {
    request.session.selected_lang = 1;
    request.session.save();
  }

  let db_conn = mysql.createConnection(user_access);
  db_conn.query(
    "select `id`, `name` from Languages;",
    (error, result, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }

      website_data.lang_data.all_langs = JSON.stringify(result);
    }
  );

  db_conn.query(
    "select * from Languages where `id` = " + request.session.selected_lang + ";",
    (error, results, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }

      website_data.lang_data.curr_lang = JSON.stringify(results[0]);

      response.render(path.join("pages/index"),
          {
            root: __dirname,
            data: JSON.stringify(website_data)
          }
      );
    }
  );

  db_conn.end();
});


app.get("/about", (request, response) => {
  let website_data = {
    lang_data:{},
    cv_data:{}
  };

  if(!request.session.selected_lang) {
    request.session.selected_lang = 1;
    request.session.save();
  }

  let db_conn = mysql.createConnection(user_access);
  db_conn.query(
    "select `id`, `name` from Languages;",
    (error, result, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }

      website_data.lang_data.all_langs = JSON.stringify(result);
    }
  );

  db_conn.query(
    "select * from Languages where `id` = " + request.session.selected_lang + ";",
    (error, results, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }

      website_data.lang_data.curr_lang = JSON.stringify(results[0]);
      
      // TODO : À mettre dans le callback de la dernière query();
      response.render(path.join("pages/about"),
        {
          root: __dirname,
          data: JSON.stringify(website_data)
        }
      );
    }
  );

  /*
  db_conn.query(
    "select * from SoftSkills;",
    (error, results, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }
      
      const curr_lang_name = JSON.parse(website_data.lang_data.curr_lang).name;

      for(const res of results) {
        translate(
          res, {to: String(curr_lang_name).substring(0, 1).toLocaleLowerCase()}
        )
        .then((value) => {
          website_data.cv_data.soft_skills += value;
        });
      }
      console.log(website_data.cv_data.soft_skills);
    }
  );

  db_conn.query(
    "select * from ;",
    (error, results, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }
      
      const curr_lang_name = JSON.parse(website_data.lang_data.curr_lang).name;

      for(const res of results) {
        translate(
          res, {to: String(curr_lang_name).substring(0, 1).toLocaleLowerCase()}
        )
        .then((value) => {
          //website_data.cv_data. += value;
        });
      }
      //console.log(website_data.cv_data.);
    }
  );
  */
  
  db_conn.end();
});


app.get("/contact", (request, response) => {
  let website_data = {lang_data:{}};

  if(!request.session.selected_lang) {
    request.session.selected_lang = 1;
    request.session.save();
  }

  let db_conn = mysql.createConnection(user_access);
  db_conn.query(
    "select `id`, `name` from Languages;",
    (error, result, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }
      
      website_data.lang_data.all_langs = JSON.stringify(result);
    }
  );

  db_conn.query(
    "select * from Languages where `id` = " + request.session.selected_lang + ";",
    (error, results, fields) => {
      if(error) {
        if(error.code === "ETIMEDOUT") throw error;
        else console.error(error.code + " : " + error.message);
      }
      
      website_data.lang_data.curr_lang = JSON.stringify(results[0]);

      response.render(path.join("pages/contact"),
          {
            root: __dirname,
            data: JSON.stringify(website_data)
          }
      );
    }
  );

  db_conn.end();
});



app.post("/setLang", (request, response) => {
  request.session.selected_lang = request.body.val;
  request.session.save();
  response.end();
  back();
});



app.use((request, response, next) => {
  response.status(404);

  if(request.accepts("html")) {
    response.render(path.join("pages/404"), {root: __dirname});
    return;
  }

  if(request.accepts("json")) {
    response.render({error: "Not found"});
    return;
  }

  response.type("txt").send("Not found");
});