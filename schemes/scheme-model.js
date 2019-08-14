const db = require('../data/db-config');

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db('schemes');
}

function findById(id) {
  return db('schemes').where({ id });
}

function findSteps(id) {
  return db
    .select('steps.id', 'scheme_name', 'step_number', 'instructions')
    .from('steps')
    .innerJoin('schemes', 'schemes.id', 'steps.scheme_id')
    .where({ scheme_id: id })
    .orderBy('steps.step_number');
}

async function add(schemeData) {
  const [id] = await db('schemes').insert(schemeData);
  return findById(id);
}

function update(schemeData, id) {
  return db('schemes')
    .where({ id })
    .update(schemeData);
}

function remove(id) {
  return db('schemes')
    .where({ id })
    .delete();
}
