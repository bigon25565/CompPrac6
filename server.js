const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;
const host = '0.0.0.0';


app.use(express.static('public'));
app.use(cors());

const upload = multer({
    fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/png') {
            cb(null, true);
        } else {
            cb(null, false);
        }
    }
});

app.post('/size2json', upload.single('image'), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ result: "invalid filetype" });
    }
    try {
        const metadata = await sharp(req.file.buffer).metadata();
        res.json({ width: metadata.width, height: metadata.height });
    } catch (error) {
        res.status(500).json({ error: "Error processing image" });
    }
});

app.get('/login', (req, res) => {
    res.json({ author: "147329" });
});

app.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});

