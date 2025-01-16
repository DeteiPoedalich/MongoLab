const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRouter');
const teamRoutes = require('./routes/teamRouter')
const path=require('path')
const itemRoutes = require('./routes/itemRouter')

const app = express();
connectDB();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname,'static')))
app.use('/api/users', userRoutes);
app.use('/api/team', teamRoutes)
app.use('/api/item', itemRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});