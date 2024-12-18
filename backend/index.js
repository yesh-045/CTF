const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan')
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();



// Connect to the database
connectDB();

const corsOptions = {
  origin: ['https://ctf.cseatheeye.com','https://hidden-x.onrender.com', 'https://hidden-x.vercel.app', 'http://localhost:5173'], // Exact frontend URLs
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
  credentials: true // Allow cookies and credentials
};

app.use(cors(corsOptions));


// Middleware setup
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// Session configuration
app.use(session({
  secret: 'your-secret-key', // Replace with your secret key
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // Set to true if using HTTPS
}));

app.use(morgan('dev'));



// Routes
const homeRoutes = require('./routers/homeRoutes');
const authRoutes = require('./routers/authRoutes');
const adminRoutes = require('./routers/adminRoutes');
const ctfRoutes = require('./routers/ctfRoutes');
const teamRoutes = require('./routers/teamRoutes');


app.use('/auth', authRoutes);
app.use('/Admin', adminRoutes);
app.use('/ctf', ctfRoutes);
app.use('/home', homeRoutes);
app.use('/team', teamRoutes);

// Serve the main HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


