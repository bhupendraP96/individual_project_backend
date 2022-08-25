// use the path of your model
const photo = require('../models/photosModel');
const mongoose = require('mongoose');
// use the new name of the database
const url = 'mongodb://localhost:27017/Testing';
beforeAll(async () => {
 await mongoose.connect(url, {
 useNewUrlParser: true,
 useUnifiedTopology: true
 });
});
afterAll(async () => {
 await mongoose.connection.close();
});
describe('Photos Schema Testing', () => {
//the code below is for insert testing
 it('New Photo testing', () => {
 const photoD = {
    'title': 'This is a test photo',
    'description': 'This is test description'
 };

 return photo.create(photoD)
 .then((pro_ret) => {
 expect(pro_ret.title).toEqual('This is a test photo');
 });
 });
   })

// //   the code below is for delete testing
//  it('delete photo testing', async () => {
//  const status = await photo.deleteMany();
//  expect(status.ok).toBe(1);
// });


// it('photo update testing', async () => {
//     return photo.findOneAndUpdate({_id :Object('6218bbb4136b0002f873fd99')},
//    {$set : {description:'updated description'}}, {new:true})
//     .then((pd)=>{
//     expect(pd.commentBody).toEqual('updated description')
//     })
//    });