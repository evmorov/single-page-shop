const chai = require('chai');
const request = require('supertest');

const app = require('../index');

const { expect } = chai;

describe('Products', () => {
  describe('#GET / products', () => {
    it('returns empty array when no products', (done) => {
      request(app).get('/products')
        .end((err, res) => {
          expect(res.statusCode).to.equal(200);
          expect(res.body).to.be.an('array');
          expect(res.body).to.be.empty;
          done();
        });
    });
  });
});
