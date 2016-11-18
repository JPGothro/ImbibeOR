// const chai = require('chai');
// const chaiHttp = require('chai-http');
// const server = require('../../index.js');
// const User = require('../../lib/models/user');
// const Thread = require('../../lib/models/thread');
// const assert = chai.assert;
// chai.use(chaiHttp);

// // load test env variables
// const path = require('path');
// require('dotenv').load({silent: true, path: path.join(__dirname, '../../test/.env.test') });

// const connection = require('../../lib/mongoose-config');
// const app = require('../../lib/app');

// describe('Remarks Tests: ', () => {
//   const request = chai.request(app);

//   before( done => {
//     const drop = () => connection.db.dropDatabase(done);
//     if(connection.readyState === 1) drop();
//     else connection.once('open', drop);
//   });

//   const userAdmin = {
//     username: 'TestAdmin',
//     password: 'AdminPWD',
//     roles: ['admin']
//   };

//   const userModerator = {
//     username: 'TestModerator',
//     password: 'ModeratorPWD',
//     roles: ['moderator']
//   };

//   const userBasic = {
//     username: 'TestBasic',
//     password: 'BasicPWD',
//     roles: ['basic']
//   };

//   let tokenAdmin = '',
//     tokenModerator = '',
//     tokenBasic = '';

//   before( done => {
//     request
//       .post( '/api/auth/signup' )
//       .send( userAdmin )
//       .then( res => {
//         assert.ok(tokenAdmin = res.body.token);
//         assert.ok(userAdmin.userId = res.body.userId);
//         done();
//       })
//       .catch(done);
//   });

//   before( done => {
//     request
//       .post( '/api/auth/signup' )
//       .send( userModerator )
//       .then( res => {
//         assert.ok(tokenModerator = res.body.token);
//         assert.ok(userModerator.userId = res.body.userId);
//         done();
//       })
//       .catch(done);
//   });

//   before( done => {
//     request
//       .post( '/api/auth/signup' )
//       .send( userBasic )
//       .then( res => {
//         assert.ok(tokenBasic = res.body.token);
//         assert.ok(userBasic.userId = res.body.userId);
//         done();
//       })
//       .catch(done);
//   });

//   const testThread = {
//     title: 'THREAD TITLE',
//     text: 'New test thread text',
//     region: 'Central',
//     drinkType: 'Wine',
//     userId: '582b5ac520750021b63b7933'
//   };

//   before( done => {
//     request
//       .post( '/api/threads' )
//       .send( testThread )
//       .then( res => {
//         const thread = res.body;
//         assert.ok(thread._id);
//         testThread._id = thread._id;
//         testThread.__v = 0;
//         testThread.createdAt = thread.createdAt;
//         testThread.updatedAt = thread.updatedAt;
//         testThread.userId = thread.userId;
//         testThread.remarks = [];
//         testThread.isOwner = true;
//         done();
//       })
//       .catch(done);
//   });

//   it('GET all without token', done => {
//     request
//       .get('/api/remarks')
//       .then( res => {
//         assert.deepEqual(res.body, []);
//         done();
//       })
//       .catch(done);
//   });

//   it('GET all with token', done => {
//     request
//       .get('/api/remarks')
//       .set('Authorization', `Bearer ${tokenAdmin}`)
//       .then( res => {
//         assert.deepEqual(res.body, []);
//         done();
//       })
//       .catch(done);
//   });


//   const testRemark = {
//     threadId: testThread._id,
//     text: 'New test Remark text',
//     userId: userBasic.userId,
//     username: userBasic.username
//   };


//   it('POST request valid token', done => {
//     testThread.userId = userBasic.userId;
//     request
//       .post('/api/threads')
//       .set('Authorization', `Bearer ${tokenBasic}`)
//       .send(testThread)
//       .then(res => {
//         const thread = res.body;
//         assert.ok(thread._id);
//         testThread._id = thread._id;
//         testThread.__v = 0;
//         testThread.createdAt = thread.createdAt;
//         testThread.updatedAt = thread.updatedAt;
//         testThread.userId = thread.userId;
//         testThread.remarks = [];
//         testThread.isOwner = true;
//         done();
//       })
//       .catch(done);
//   });





//   .post('/', ensureAuth, bodyParser, (req, res, next) => {
//     console.log('in the remarks post route');
//     new Remark(req.body).save()
//       .then(saved => res.send(saved))
//       .catch(next);
//   })

// });
