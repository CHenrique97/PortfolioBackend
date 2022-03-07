import { MongoClient, ServerApiVersion } from 'mongodb';
const PORT = process.env.PORT || 3000;
import express from "express";
import uri from "./password.js";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

const run =  async () =>{
  try{
  await client.connect()
  const collection = client.db("ProjectDatabase").collection("PjtDb");
  const result = await collection.findOne({code:"97"});
  delete result._id;
  delete result.code;
  return result;
}
  finally {
    await client.close();
  }

}


const app = express();
const port = PORT;

app.get('/portfolio', (req, res) => {
  run().then(response =>{
    res.send(response);
  });

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
