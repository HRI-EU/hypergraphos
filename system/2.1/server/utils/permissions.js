const db = require("../utils/database");

exports.getUserFilePermissions = function (userId) {
  const selectSql = "select * from file_permissions where user_id = ?";
  return new Promise((resolve, reject) => {
    db.all(selectSql, userId, (err, rows) => {
      if (!err) {
        resolve(rows);
      } else {
        reject(err);
      }
    })
  });
}

exports.setPathsOwner = function (paths, userId) {
  const insertSql = db.prepare('INSERT INTO file_permissions (user_id, file_path, read, write, owner, del) VALUES (?,?,?,?,?,?)');

  paths.forEach(path => {
    if (!path.existing) {
      insertSql.run([userId, path.path, 1, 1, 1, 1])
    }
  });
  insertSql.finalize();

}

exports.addPermission = function (path, userId, owner, read, write, del) {
  return new Promise((resolve, reject) => {
    const insertSql = 'INSERT INTO file_permissions (user_id, file_path, read, write, owner, del) VALUES (?,?,?,?,?,?)';
    db.run(insertSql, [userId, path, (read ? 1 : 0), (write ? 1 : 0), (owner ? 1 : 0), (del ? 1 : 0)], function (err, result) {
      if (err) {
        reject(err);
      }
      resolve(result);
    })
  });
}