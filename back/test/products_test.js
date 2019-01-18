const chai = require('chai');
const request = require('supertest');

const app = require('../index');

const { expect } = chai;

describe('Products', function() {
  describe('#GET / products', function() {
    it('returns empty array when no products', function() {
      request(app).get('/products')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.empty;
        });
    });
  });
});
