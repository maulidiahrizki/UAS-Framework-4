var express = require('express');
var router = express.Router();
const Model_Users = require('../model/Model_Users');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  try {
    let email = 'Guest'; // Default email for non-logged-in users

    if (req.session.userId) {
      let id = req.session.userId;
      let Data = await Model_Users.getId(id);
      email = Data[0].email; // Update email if user is logged in
    }

    res.render('users/index', {
      title: 'Users Home',
      email: email
    });
  } catch (error) {
    console.log(error);
    res.status(501).json('An error occurred');
  }
});

router.get('/profil/(:id)', async function (req, res, next) {
  try{
      let id_users = req.session.userId;
      let id = req.params.id;
      let Data = await Model_Users.getId(id_users);
      let email = Data[0].email;
      if(Data[0].level_users == "1") {
      res.render('users/profil', {
          id: Data[0].id_users,
          data: Data,
          email: email
      })
      }
  } catch(error) {
    console,log(err);
      req.flash('invalid', 'Anda harus login');
      // res.redirect('/login')
  }
  })

  router.post("/update/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const outletData = req.body;
        await Model_Users.Update(id, outletData);
        req.flash("success", "Berhasil mengupdate data outlet");
        res.redirect("/users");
    } catch (error) {
        req.flash("error", "Gagal mengupdate data outlet");
        res.redirect("/users");
    }
});

router.get('/profil/(:id)', async function (req, res, next) {
  try{
      let id_users = req.session.userId;
      let id = req.params.id;
      let Data = await Model_Users.getId(id_users);
      let email = Data[0].email;
      if(Data[0].level_users == "1") {
      res.render('users/profil', {
          id: Data[0].id_users,
          data: Data,
          email: email
      })
      }
  } catch(error) {
    console,log(err);
      req.flash('invalid', 'Anda harus login');
      // res.redirect('/login')
  }
  })

module.exports = router;
