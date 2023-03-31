const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 7000;

// Use body-parser middleware to parse incoming requests with JSON payloads
app.use(bodyParser.json());

// Connect to MongoDB database named "Exam" using Mongoose
mongoose.connect('mongodb+srv://tempuser:123@cluster0.f9d6o.gcp.mongodb.net/Exam', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Define a schema for the "quizes" collection
const quizSchema = new mongoose.Schema({
    name: String,
    sid: String,
});

// Define a model for the "quizes" collection using the schema
const Quiz = mongoose.model('Quiz', quizSchema);


const db = mongoose.connection

db.once('open', async () => {
    const quizzes = await Quiz.find();
    console.log(JSON.stringify(quizzes)); // output the quizzes as a JSON string

});

// Define a route handler for the root route that creates a new document in the "quizes" collection
app.get('/', async (req, res) => {
    try {
        // Create a new document using the Quiz model
        const quiz = new Quiz({
            name: 'Tushar',
            sid: '300355492',
        });

        // Save the new document to the "quizes" collection

        try {
            await quiz.save();
            res.status(200).send('Quiz created successfully');
        } catch (error){
            console.log(error)
            res.status(500).send('Failed to create quiz');
        } 
    } catch (error) {
        console.log(error)

        // Return a response indicating failure
        res.status(500).send('Failed to create quiz');
    }
});


// Start the server on port 7000
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});