import chai from 'chai';
import chaiHttp from 'chai-http';
import assert from 'assert';
import app from '../../app';

chai.use(chaiHttp);

chai.should();

describe('get all the users', () => {
    it('Should be able to get all the users', done => {
        chai
            .request(app)
            .get('/api/v1/user')
            .end((err, res) => {
                console.log(res.body);
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);
                done();
            });
    });
});


describe('get a specific user', () => {
    it('Should be able to get a specific user', done => {
        chai
            .request(app)
            .get('/api/v1/user/1')
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(200);

                done();
            });
    });

    it('Should be not able to get a specific user', done => {
        chai
            .request(app)
            .get('/api/v1/user/345324')
            .end((err, res) => {
                res.body.should.be.a('object');
                res.body.should.have.property('status').eql(404);
                done();
            });
    });
});