// use the path of your model
const comment = require('../models/commentModel');
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
describe('Comment Schema Testing', () => {
//the code below is for insert testing
 it('New comment testing', () => {
 const commentD = {
    'commentBody': 'This is a test comment' 
 };

 return comment.create(commentD)
 .then((pro_ret) => {
 expect(pro_ret.commentBody).toEqual('This is a test comment');
 });
 });
   })

   // the code below is for delete testing
//  it('delete comment testing', async () => {
//  const status = await comment.deleteMany();
//  expect(status.ok).toBe(1);
// });


// it('comment update testing', async () => {
//     return user.findOneAndUpdate({_id :Object('6218bbb4136b0002f873fd99')},
//    {$set : {commentBody:'updated comment'}}, {new:true})
//     .then((cd)=>{
//     expect(cd.commentBody).toEqual('updated comment')
//     })
//    });