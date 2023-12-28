const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://shrurose73:rose@ecommerce.yvbj27l.mongodb.net/?retryWrites=true&w=majority')
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

const User = mongoose.model('User', {
    username: String,
    email: String,
    password: String
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(cors({
    origin: 'https://shoppers-paradise.onrender.com',
    credentials: true,
}));


app.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        
        const user = new User({ username, email, password:hashedPassword });
        await user.save();

        res.status(201).send('Signup successful');
    } catch (error) {
        res.status(500).send('Error signing up');
    }
});

app.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).send('User not found');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).send('Invalid credentials');
        }

        res.status(200).json({ username: user.username, email: user.email });
    } catch (error) {
        res.status(500).send('Error signing in');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
