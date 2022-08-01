const express = require('express');
const bodyParser = require('body-parser');
const pdf = require('html-pdf');
const cors = require('cors');

const pdfTemplate = require('./documents');

const app = express();
const port = process.env.PORT || 5000;

// 解決CORS問題
app.use(cors());
// 解決取得req.body問題
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// POST - PDF generation and fetching of the data
app.post('/create-pdf', (req, res) => {
	// 建立一個PDF然後將req.body(4個input)的值放進模板並產生，如果沒有問題就將檔案命名為result.pdf
	pdf.create(pdfTemplate(req.body), {}).toFile('result.pdf', err => {
		// 錯誤處理
		if (err) {
			res.send(Promise.reject());
		}

		res.send(Promise.resolve());
	});
});

// GET - Send the generated PDF to the client
app.get('/fetch-pdf', (req, res) => {
	// 將檔案傳給前端
	res.sendFile(`${__dirname}/result.pdf`);
});

// 環境運行在 PORT 5000
app.listen(port, () => {
	console.log(`Listening on port ${port}`);
});
