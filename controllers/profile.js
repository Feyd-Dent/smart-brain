const handleProfile = (req, res, postgres) => {
    const { id } = req.params;
    postgres
      .select('*')
      .from('users')
      .where({ id })
      .then((user) => {
        if (user.length) {
          res.json(user[0]);
        } else {
          res.status(400).json('Unable to find profile');
        }
      });
    // database.users.forEach((user) => {
    //   if (user.id === id) {
    //     found = true;
    //     return res.json(user);
    //   }
    // });
    // if (!found) {
    //   res.status(400).json('No Such User');
    // }
  }

  module.exports = {
      handleProfile
  }