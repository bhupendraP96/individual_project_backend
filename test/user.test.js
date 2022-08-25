// use the path of your model
const user = require('../models/userModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/userTestModel';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('User Schema Testing', () => {
// the code below is for insert testing
 it('user registratrion testing', () => {
 const userD = {
     'username' : 'bhupendra96',
     'fullName' : 'Bhupendra Pandey',
     'eMail' : 'bhupendra@gmail.com',
     'phone': '98495526636'
 };

 return user.create(userD)
 .then((pro_ret) => {
 expect(pro_ret.username).toEqual('bhupendra96');
 });
 });


   
//    })

//    // the code below is for delete testing
//  it('delete user testing', async () => {
//  const status = await user.deleteMany();
//  expect(status.ok).toBe(1);
// });


// it('user update testing', async () => {
//     return user.findOneAndUpdate({_id :Object('6218bbb4136b0002f873fd99')},
//    {$set : {fullName:'pandey vupen'}}, {new:true})
//     .then((ud)=>{
//     expect(ud.fullName).toEqual('pandey vupen')
//     })
//    });
})