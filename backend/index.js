const express = require("express");
const app = express();
var cors = require("cors");
const port = 3000;
app.use(cors());
app.use(express.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri =
  "mongodb+srv://asibul2342:RkFttONzDrsflaMZ@cluster0.6tngyrc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
    const database = client.db("booksDB");
    const booksCollection = database.collection("books");
    // create data
    app.post("/books", async (req, res) => {
      const books = req.body;
      const result = await booksCollection.insertOne(books);
      res.send(result);
      console.log(result);
    });

    // read data
    app.get("/books", async (req, res) => {
      const cursor = booksCollection.find();
      const result = await cursor.toArray();
      res.send(result);
      console.log(result);
    });
    // delete data
    app.delete("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await booksCollection.deleteOne(query);
      res.send(result);
    });
    // get a specific data
    app.get("/books/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const books = await booksCollection.findOne(query);
      res.send(books);
    });
    // now update the specific data
    app.put("/books/:id", async (req, res) => {
      const id = req.params.id;
      const updatedBook = req.body;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updateBook = {
        $set: {
          name: updatedBook.name,
          author: updatedBook.author,
        },
      };
      const result = await booksCollection.updateOne(
        filter,
        updateBook,
        options
      );
      res.send(result);
      console.log(result);
    });
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

//
//

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
