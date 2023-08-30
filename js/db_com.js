const mysql = require('mysql2');

const user_access = {
  host: '%',
  user: 'average_user',
  database: 'my_own_website'
};


function get_lang_by_id(id) {
  if(typeof id !== Number) {
    throw new Error(`id must be Number, not ${typeof id}!`);
  }

  let lang = undefined;
  const conn = mysql.createConnection(user_access);

  conn.query(
      'SELECT * FROM `languages` WHERE \'id\' = ?;', [id],
      (err, res) =>
      {
        if(!err) {
          lang = res;
        }
        else {
          console.log(`ERROR ${err.code} (${err.name}) : ${err.message}. (fatal = ${err.fatal})`);
        }
      }
  );

  conn.end();

  return lang;
}

function get_langs_by_name(name) {
  if(typeof name !== String) {
    throw new Error(`name must be String, not ${typeof name}!`);
  }

  let lang = undefined;
  const conn = mysql.createConnection(user_access);

  conn.query(
      'SELECT * FROM `languages` WHERE \'name\' LIKE %' + name + '%;', [id],
      (err, res) =>
      {
        if(!err) {
          lang = res;
        }
        else {
          console.log(`ERROR ${err.code} (${err.name}) : ${err.message}. (fatal = ${err.fatal})`);
        }
      }
  );

  conn.end();

  return lang;
}

function get_all_langs() {
  let lang = undefined;
  const conn = mysql.createConnection(user_access);

  conn.query(
      'SELECT * FROM `languages`;',
      (err, res) =>
      {
        if(!err) {
          lang = res;
        }
        else {
          console.log(`ERROR ${err.code} (${err.name}) : ${err.message}. (fatal = ${err.fatal})`);
        }
      }
  );

  conn.end();

  return lang;
}