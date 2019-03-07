const db = require('../models');

module.exports = {
  findAll(req, res) {
    db.relatives.find(req.query)
      .then(dbrelatives => res.json(dbrelatives))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  findById(req, res) {
    db.relatives.findById(req.params.id)
      .then(dbrelatives => res.json(dbrelatives))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  saverelative(req, res) {
    db.relatives.create(req.body)
      .then(dbrelatives => res.json(dbrelatives))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  },
  deleterelative(req, res) {
    db.relatives.findById(req.params.id)
      .then(dbrelative => dbrelative.remove())
      .then(dbrelative => res.json(dbrelative))
      .catch((err) => {
        console.log(err);
        res.json(err);
      });
  }
};
