const express = require('express');
const { exec } = require('child_process');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.post('/download', (req, res) => {
    const videoUrl = req.body.url;
    if (!videoUrl.includes('facebook.com')) {
        return res.status(400).json({ error: 'অবৈধ ফেসবুক ভিডিও লিঙ্ক' });
    }
    const outputFile = `downloads/video-${Date.now()}.mp4`;
    exec(`yt-dlp -o ${outputFile} ${videoUrl}`, (error, stdout, stderr) => {
        if (error) {
            console.error(stderr);
            return res.status(500).json({ error: 'ভিডিও ডাউনলোড ব্যর্থ' });
        }
        res.json({ downloadLink: `/${outputFile}` });
    });
});

app.listen(3000, () => console.log('সার্ভার চলছে পোর্ট 3000-এ...'));
