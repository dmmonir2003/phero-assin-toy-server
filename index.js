const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.l0kqykq.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const bennerImgCalaction = client.db('assignToyDB').collection('bannerImg');

        const tabCetagoryCalaction = client.db('assignToyDB').collection('tabCetagory');

        const addToyCollection = client.db('assignToyDB').collection('toysData');

        const allToyCollection = client.db('assignToyDB').collection('toysData');


        app.get('/img', async (req, res) => {
            const cursor = bennerImgCalaction.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/tabCetagory', async (req, res) => {
            const cursor = tabCetagoryCalaction.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get('/alltoys', async (req, res) => {

            let query = {};
            if (req.query?.sellerEmail) {
                query = { sellerEmail: req.query.sellerEmail };
            }

            const result = await allToyCollection.find(query).toArray();

            res.send(result);


        });

        app.get('/alltoys', async (req, res) => {
            const cursor = allToyCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post('/toysData', async (req, res) => {
            const toyData = req.body;
            const result = await addToyCollection.insertOne(toyData);
            res.send(result);
        })

        app.get('/alltoys/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const query = { _id: new ObjectId(id) };
                const result = await allToyCollection.findOne(query); // Use findOne to get a single document
                if (result) {
                    res.send(result);
                } else {
                    res.status(404).send('Document not found');
                }
            } catch (error) {
                console.error(error);
                res.status(500).send('Internal Server Error');
            }
        });

        app.patch('/alltoys/:id', async (req, res) => {
            try {
                const id = req.params.id;
                const data = req.body;
                const filter = { _id: new ObjectId(id) };
                const options = { upsert: true };
                const updateDoc = {
                    $set: {
                        quantity: data.quantity,
                        price: data.price,
                        description: data.description
                    },
                };

                const result = await allToyCollection.updateOne(filter, updateDoc, options);

                if (result.modifiedCount > 0) {
                    res.json({ message: 'Document updated successfully' }); // Send a JSON response
                } else {
                    res.status(404).json({ error: 'Document not found' }); // Send a JSON error response
                }
            } catch (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' }); // Send a JSON error response
            }
        });




        app.delete('/alltoys/:id', async (req, res) => {
            const id = req.params.id; // Access id as a URL parameter
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await allToyCollection.deleteOne(query);
            res.send(result);
        });





        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('toy server is running')
})

app.listen(port, () => {
    console.log(`toy server is running port : ${port}`);
})