'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();


const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});