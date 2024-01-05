const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/captcha', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const captchaSchema = new mongoose.Schema({
  text: String,
  userInput: String,
  timestamp: Date,
 });

const captcha = mongoose.model('captcha', captchaSchema);

app.post('/captcha', async (req, res) => {
  const captchaData = new Captcha(req.body);
  try {
     await captchaData.save();
     res.status(200).json({ message: 'Captcha data saved successfully' });
  } catch (err) {
     res.status(500).json({ message: 'Failed to save captcha data', error: err });
  }
 });

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
