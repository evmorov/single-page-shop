const mongoose = require('mongoose');

const config = require('./../config');
const Product = require('./../models/product');

module.exports.run = async () => {
  console.log('Seeding...');

  mongoose.connect(config.db, { useNewUrlParser: true });

  await Product.deleteMany({});

  await Product.create({
    title: 'Bread',
    price: 10,
    images: [
      `http://localhost:${config.port}/images/seeds/bread1.jpg`,
      `http://localhost:${config.port}/images/seeds/bread2.jpg`,
      `http://localhost:${config.port}/images/seeds/bread3.jpg`,
      `http://localhost:${config.port}/images/seeds/bread4.jpg`,
      `http://localhost:${config.port}/images/seeds/bread5.jpg`
    ],
    description: 'Nulla gravida pharetra ornare. Sed fermentum urna a lorem sagittis, vel viverra nulla cursus. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec lobortis maximus eros, non pharetra orci consequat in. In feugiat, ex quis accumsan consequat, urna mauris congue mi, in pharetra diam erat vitae odio. Pellentesque ultricies ipsum dolor, nec tempus magna dictum laoreet. Curabitur vel ex non orci eleifend tincidunt egestas vitae metus. Curabitur quis purus nunc. Aliquam rutrum nec risus lacinia viverra. Aenean in libero ligula. Vestibulum arcu justo, eleifend vel ligula nec, lobortis dictum elit. Cras feugiat suscipit nisi quis suscipit. Quisque nulla tortor, sagittis at libero egestas, imperdiet consectetur dui. Nulla dapibus eros non est cursus pretium. Sed quis arcu imperdiet, egestas urna et, pharetra tellus. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
  });

  await Product.create({
    title: 'Cheese',
    price: 25,
    images: [
      `http://localhost:${config.port}/images/seeds/cheese1.jpg`,
      `http://localhost:${config.port}/images/seeds/cheese2.jpg`,
      `http://localhost:${config.port}/images/seeds/cheese3.jpg`
    ],
    description: 'Maecenas vitae ipsum sollicitudin, dapibus est porttitor, ultricies augue. Donec ac molestie dolor. Etiam gravida pellentesque diam eu consectetur. Sed pulvinar ante vel sodales pretium. Donec tempus tempus maximus. In dapibus leo sit amet urna dignissim, sit amet interdum sem hendrerit. Quisque tempus egestas ipsum, vitae iaculis augue faucibus non. Vestibulum lobortis fringilla semper. Praesent molestie, erat nec rutrum maximus, orci nunc fringilla nisl, in volutpat justo ex egestas est. Mauris lobortis urna at gravida fringilla. Morbi massa nibh, condimentum sit amet nisl a, maximus malesuada tortor. Morbi lobortis nulla a massa rhoncus consectetur. Vestibulum convallis purus at risus scelerisque, a sodales elit iaculis. Proin sit amet pulvinar lacus, mollis ultrices diam. Curabitur scelerisque pretium ex, nec tempor urna venenatis ut. Nullam porta mauris nec mi imperdiet, in tincidunt elit condimentum.'
  });

  await Product.create({
    title: 'Meat',
    price: 40,
    images: [
      `http://localhost:${config.port}/images/seeds/meat1.jpg`
    ],
    description: 'Nam a dui pulvinar libero semper accumsan. Cras condimentum in ligula eu volutpat. Aliquam vel libero non justo ultricies volutpat eget in ex. Aliquam eget ex tellus. Pellentesque molestie nunc sit amet nisl dictum bibendum. Sed ac porta metus. Suspendisse sagittis erat iaculis libero pulvinar efficitur. Curabitur ultricies feugiat leo, ac vehicula nisl ultricies et.'
  });

  mongoose.disconnect();

  console.log('Finished!');
};
