process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
chai.use(chaiHttp);


describe('URL Shortener', () => {
  let app, server;
  before('staring server', function() {
    app = require('../index');
    server = chai.request(app).keepOpen();
  });

  it('should load default page', (done) => {
    server
      .get('/')
      .end((err, res) => {
        expect(res).to.have.status(200);
        done();
      });
  });

  it('should display page not found if a wrong URL is entered', (done) => {
    server
      .get('/workng_path/wrong_url')
      .end((err, res) => {
        expect(res).to.have.status(404);
        done();
      });
  });

  after('closing server', function() {
    server.close();
  });
});
