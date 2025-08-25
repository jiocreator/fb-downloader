async function downloadVideo() {
    const url = document.getElementById('videoUrl').value;
    const resultDiv = document.getElementById('result');
    if (!url) {
        resultDiv.innerHTML = 'দয়া করে একটি ভিডিও লিঙ্ক প্রদান করুন।';
        return;
    }
    resultDiv.innerHTML = 'ভিডিও ডাউনলোড হচ্ছে...';
    try {
        const response = await fetch('/download', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url })
        });
        const data = await response.json();
        if (data.error) {
            resultDiv.innerHTML = `ত্রুটি: ${data.error}`;
        } else {
            resultDiv.innerHTML = `<a href="${data.downloadLink}" download>ডাউনলোড করুন</a>`;
        }
    } catch (error) {
        resultDiv.innerHTML = 'ত্রুটি: সার্ভারের সাথে সংযোগ ব্যর্থ।';
    }
}
