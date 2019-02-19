const mongoose = require('mongoose');
const faker = require('faker');
const text2png = require('text2png');
const fs = require('fs');
const path = require('path');

const config = require('./../config');
const Product = require('./../models/product');

const generateImage = (text) => {
  const imageName = faker.random.uuid();
  const imagePath = path.join(__dirname, '..', 'public', 'tmp', 'images', `${imageName}.png`);

  // text2png doesn't support sizing or ratio
  // https://github.com/tkrkt/text2png/issues/22
  // the code will generate 583 x 473px image with text with length of 8
  const image = text2png(text, {
    bgColor: faker.internet.color(),
    textColor: 'white',
    paddingTop: 200,
    paddingRight: 50,
    paddingBottom: 200,
    paddingLeft: 50,
    font: '100px sans-serif'
  });
  fs.writeFileSync(imagePath, image);

  return `http://localhost:${config.port}/tmp/images/${imageName}.png`;
};

const generateImages = (text, count) => (
  [...Array(count)].map((_, i) => (
    generateImage(`${text} ${i + 1}`)
  ))
);

module.exports.run = async () => {
  console.log('Seeding...');

  mongoose.connect(config.db, { useNewUrlParser: true });

  await Product.deleteMany({});

  await Promise.all([...Array(5)].map(async (_, i) => {
    // product name with the same length to make images with the same ratio
    const productName = `Product${i + 1}`;

    await Product.create({
      title: productName,
      price: faker.commerce.price(),
      images: generateImages(productName, faker.random.number({ min: 1, max: 6 })),
      description: faker.lorem.paragraphs()
    });
  }));

  mongoose.disconnect();

  console.log('Finished!');
};
