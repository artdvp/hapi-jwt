
exports.seed = function(knex, Promise) {
  
  var tableName = 'users';
  
  var rows = [
    {
      name: 'Ck make',
      username: 'mekik',
      password: 'password',
      email: 'me@mm.com',
      guid: 'f03ede7c-b121-4112-bcc7-130a3e87988c'
    }
    ];
  
  // Deletes ALL existing entries
  return knex( tableName ).del()
    .then(function () {
      // Inserts seed entries
      return knex.insert(rows).into( tableName );
    });
};
