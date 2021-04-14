const handleRegister = (req, res, postgres, bcrypt) => {
    const { email, name, password } = req.body;
    if (!email || !name || !password) {
        return res.status(400).json('incorrect Form Submission');
    }
    const hash = bcrypt.hashSync(password);
    postgres
      .transaction((trx) => {
        trx
          .insert({
            hash: hash,
            email: email,
          })
          .into('login')
          .returning('email')
          .then((loginEmail) => {
            return trx('users')
              .returning('*')
              .insert({
                email: loginEmail[0],
                name: name,
                joined: new Date(),
              })
              .then((user) => {
                res.json(user[0]);
              });
          })
          .then(trx.commit)
          .catch(trx.rollback);
      })
      .catch((err) => res.status(400).json(err, 'Unable to register...'));
    // bcrypt.hash(password, null, null, function (err, hash) {
    //   // Store hash in your password DB.
    //   console.log(hash);
    // });
    // database.users.push({
    //   id: Number(database.users[database.users.length - 1].id) + 1,
    //   name: name,
    //   email: email,
    //   entries: 0,
    //   joined: new Date(),
    // });
  }

  module.exports = {
    handleRegister
  };