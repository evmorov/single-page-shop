/* eslint "no-underscore-dangle": off */

const chai = require('chai');
const request = require('supertest');

const app = require('../index');
const Product = require('../models/product');

const { expect } = chai;

const productKeys = ['id', 'title', 'description', 'price', 'images', 'createdAt', 'updatedAt'];

const checkProduct = (actualProduct, expectedProduct) => {
  expect(actualProduct).to.have.all.keys(productKeys);
  expect(actualProduct.title).to.equal(expectedProduct.title);
  expect(actualProduct.description).to.equal(expectedProduct.description);
  expect(actualProduct.price).to.equal(expectedProduct.price);
  expect(actualProduct.images).to.deep.equal(expectedProduct.images);
};

describe('Products', function() {
  describe('#GET /products', function() {
    context('no products', function() {
      it('returns empty array', async function() {
        const res = await request(app).get('/products');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.be.empty;
      });
    });

    context('products exist', function() {
      before(async function() {
        await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
        await Product.create({ title: 'ccc', description: 'ddd', price: 2, images: [] });
        await Product.create({ title: 'eee', description: 'fff', price: 3, images: [] });
      });

      it('returns products', async function() {
        const res = await request(app).get('/products');

        expect(res.statusCode).to.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body).to.have.lengthOf(3);
        res.body.forEach(product => expect(product).to.have.all.keys(productKeys));
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });

  describe('#POST /products/', function() {
    context('empty request', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).post('/products').send({});

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({});
        expect(await Product.find()).to.be.empty;
      });
    });

    context('empty product in request', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).post('/products').send({ product: {} });

        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors'); // TODO: check validation errors
        expect(await Product.find()).to.be.empty;
      });
    });

    context('product params are valid', function() {
      it('returns 201 and created product', async function() {
        const productParams = { title: 'aaa', description: 'bbb', price: 1, images: [] };
        const res = await request(app).post('/products').send({ product: productParams });

        expect(res.statusCode).to.equal(201);
        const responseProduct = res.body;
        checkProduct(responseProduct, productParams);
        expect(await Product.countDocuments()).to.equal(1);

        const createdProduct = (await Product.findById(responseProduct.id)).toJSON();
        checkProduct(createdProduct, productParams);
      });

      afterEach(async function() { await Product.deleteMany({}); });
    });
  });

  describe('#GET /products/:id', function() {
    context('not valid id', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).get('/products/1');

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({});
      });
    });

    context('valid id but product is not found', function() {
      it('returns 404 and empty body', async function() {
        const res = await request(app).get('/products/5c34fbfd608700dc5f5ef589');

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({});
      });
    });

    context('product is found', function() {
      let product = null;

      before(async function() {
        product = await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
      });

      it('returns the product', async function() {
        const res = await request(app).get(`/products/${product._id}`);

        expect(res.statusCode).to.equal(200);
        const responseProduct = res.body;
        checkProduct(responseProduct, product);
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });

  describe('#PUT /products/:id', function() {
    let product = null;

    beforeEach(async function() {
      product = await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
    });

    context('not valid id', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).get('/products/1');

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({});
      });
    });

    context('valid id but product is not found', function() {
      it('returns 404 and empty body', async function() {
        const res = await request(app).get('/products/5c34fbfd608700dc5f5ef589');

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({});
      });
    });

    context('empty request', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).put(`/products/${product._id}`).send({});

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({});
        expect(await Product.countDocuments()).to.equal(1);
      });
    });

    context('empty product params in request', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).put(`/products/${product._id}`).send({ product: {} });

        expect(res.statusCode).to.equal(422);
        expect(res.body).to.have.property('errors'); // TODO: check validation errors
        expect(await Product.countDocuments()).to.equal(1);
      });
    });

    context('product params are valid', function() {
      it('returns 200 and updated product', async function() {
        const productParams = { title: 'zzz', description: 'xxx', price: 7, images: [] };
        const res = await request(app).put(`/products/${product._id}`).send({ product: productParams });

        expect(res.statusCode).to.equal(200);
        const responseProduct = res.body;
        checkProduct(responseProduct, productParams);
        expect(await Product.countDocuments()).to.equal(1);

        const updatedProduct = (await Product.findById(responseProduct.id)).toJSON();
        checkProduct(updatedProduct, productParams);
      });
    });

    afterEach(async function() { await Product.deleteMany({}); });
  });

  describe('#DELETE /products/:id', function() {
    context('not valid id', function() {
      it('returns 400 and empty body', async function() {
        const res = await request(app).delete('/products/1');

        expect(res.statusCode).to.equal(400);
        expect(res.body).to.deep.equal({});
      });
    });

    context('valid id but product is not found', function() {
      it('returns 404 and empty body', async function() {
        const res = await request(app).delete('/products/5c34fbfd608700dc5f5ef589');

        expect(res.statusCode).to.equal(404);
        expect(res.body).to.deep.equal({});
      });
    });

    context('product is found', function() {
      let product = null;

      before(async function() {
        product = await Product.create({ title: 'aaa', description: 'bbb', price: 1, images: [] });
      });

      it('destroys the product and returns it', async function() {
        expect(await Product.findById(product._id)).to.not.be.null;

        const deleteRes = await request(app).delete(`/products/${product._id}`);

        expect(deleteRes.statusCode).to.equal(200);
        const responseProduct = deleteRes.body;
        checkProduct(responseProduct, product);
        expect(await Product.findById(product._id)).to.be.null;
      });

      after(async function() { await Product.deleteMany({}); });
    });
  });
});
