const mysqlp = require('mysql2/promise');

const user_access = {
  //host: '',           // Prod
  host: '192.168.1.57', // Dev
  user: 'average_user',
  database: 'my_own_website'
};


async function get_lang_by_id(id) {
  if(typeof id !== 'number') {
    throw new Error(`id must be number, not ${typeof id}!`);
  }

  const conn = await mysqlp.createConnection(user_access);

  const [rows, fields] = await conn.query('SELECT `name`, `content` FROM `languages` WHERE `id` = ' + id + ';');

  conn.end();

  if(!rows){
    throw new Error(`${get_lang_by_id.name}: Nothing was found.`);
  }

  return rows;
}

async function get_langs_by_name(name) {
  if(typeof name !== 'string') {
    throw new Error(`name must be string, not ${typeof name}!`);
  }

  const conn = await mysqlp.createConnection(user_access);

  const [rows, fields] = await conn.query('SELECT `name`, `content` FROM `languages` WHERE `name` LIKE "%' + name + '%";');

  conn.end();

  if(!rows){
    throw new Error(`${get_langs_by_name.name}: Nothing was found.`);
  }

  return rows;
}

async function get_all_langs() {
  const conn = await mysqlp.createConnection(user_access);

  const [rows, fields] = await conn.query('SELECT `name`, `content` FROM `languages`;');

  conn.end();
  
  if(!rows){
    throw new Error(`${get_all_langs.name}: Nothing was found.`);
  }

  return rows;
}