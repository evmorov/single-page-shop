/* eslint "no-underscore-dangle": off */

const chai = require('chai');
const request = require('supertest');

const app = require('../index');
const Product = require('../models/product');

const { expect } = chai;

const productKeys = ['id', 'title', 'description', 'price', 'images', 'createdAt'];

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
        await Product.create({ title: 'ccc', description: 'ddd', price: 2, images: [] });
        await Product.create({ title: 'eee', description: 'fff', price: 3, images: [] });
      });

      it('returns products', function(done) {
        request(app).get('/products')
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('array');
            expect(res.body).to.have.lengthOf(3);
            res.body.forEach(product => expect(product).to.have.all.keys(productKeys));
            done();
          });
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });

  describe('#GET /product/:id', function() {
    describe('not valid id', function() {
      it('returns 400 and empty body', function(done) {
        request(app).get('/products/1')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.deep.equal({});
            done();
          });
      });
    });

    describe('valid id but product is not found', function() {
      it('returns 404 and empty body', function(done) {
        request(app).get('/products/5c34fbfd608700dc5f5ef589')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.deep.equal({});
            done();
          });
      });
    });

    describe('valid id and product is found', function() {
      let product = null;

      before(async function() {
        product = await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
      });

      it('returns the product', function(done) {
        request(app).get(`/products/${product._id}`)
          .end((err, res) => {
            expect(res.statusCode).to.equal(200);
            const actualProduct = res.body;
            expect(actualProduct).to.have.all.keys(productKeys);
            expect(actualProduct.title).to.equal(product.title);
            expect(actualProduct.description).to.equal(product.description);
            expect(actualProduct.price).to.equal(product.price);
            expect(actualProduct.images).to.deep.equal(product.images);
            done();
          });
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });

  describe('#DELETE /product/:id', function() {
    describe('not valid id', function() {
      it('returns 400 and empty body', function(done) {
        request(app).delete('/products/1')
          .end((err, res) => {
            expect(res.statusCode).to.equal(400);
            expect(res.body).to.deep.equal({});
            done();
          });
      });
    });

    describe('valid id but product is not found', function() {
      it('returns 404 and empty body', function(done) {
        request(app).delete('/products/5c34fbfd608700dc5f5ef589')
          .end((err, res) => {
            expect(res.statusCode).to.equal(404);
            expect(res.body).to.deep.equal({});
            done();
          });
      });
    });

    describe('valid id and product is found', function() {
      let product = null;

      before(async function() {
        product = await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
      });

      it('destroys the product and returns it', async function() {
        const deleteRes = await request(app).delete(`/products/${product._id}`);

        expect(deleteRes.statusCode).to.equal(200);
        const actualProduct = deleteRes.body;
        expect(actualProduct).to.have.all.keys(productKeys);
        expect(actualProduct.title).to.equal(product.title);
        expect(actualProduct.description).to.equal(product.description);
        expect(actualProduct.price).to.equal(product.price);
        expect(actualProduct.images).to.deep.equal(product.images);

        const getRes = await request(app).get(`/products/${product._id}`);

        expect(getRes.statusCode).to.equal(404);
        expect(getRes.body).to.deep.equal({});
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });
});
