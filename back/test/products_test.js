const chai = require('chai');
const request = require('supertest');

const app = require('../index');
const Product = require('../models/product');

const { expect } = chai;

describe('Products', function() {
  describe('#GET /products', function() {
    describe('no products', function() {
      it('returns empty array', function(done) {
        request(app).get('/products')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.be.empty;
            done();
          });
      });
    });

    describe('products exist', function() {
      before(async function() {
        await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
        await Product.create({ title: 'bbb', description: 'ccc', price: 2, images: [] });
        await Product.create({ title: 'ddd', description: 'eee', price: 3, images: [] });
      });

      it('returns products', function(done) {
        request(app).get('/products')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(3);
            const keys = ['_id', '__v', 'title', 'description', 'price', 'images', 'createdAt'];
            res.body.forEach(product => expect(product).to.have.all.keys(keys));
            done();
          });
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });
});
