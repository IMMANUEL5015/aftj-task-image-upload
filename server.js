require('dotenv').config();
const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Success',
        message: 'Your API is running smoothly.'
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}.`);
});