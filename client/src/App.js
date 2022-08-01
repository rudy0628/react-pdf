import { useState, useEffect } from 'react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import './App.css';

function App() {
	// 利用 useState 管理四個 input 狀態
	const [name, setName] = useState('');
	const [receiptId, setReceiptId] = useState(0);
	const [price1, setPrice1] = useState(0);
	const [price2, setPrice2] = useState(0);

	const createAndDownloadPdf = async () => {
		// 呼叫後端API建立一個PDF檔，內容包含四個input的值
		await axios.post('http://localhost:5000/create-pdf', {
			name,
			receiptId,
			price1,
			price2,
		});

		// 將後端建立好的PDF利用API拿回來
		// responseType blob 參考 https://developer.mozilla.org/zh-TW/docs/Web/API/Blob
		const res = await axios.get('http://localhost:5000/fetch-pdf', {
			responseType: 'blob',
		});

		// 將後端給的PDF建立成一個Blob
		const pdfBlob = new Blob([res.data], { type: 'application/pdf' });

		// 呼叫SaveAS function開啟和下載Pdf檔，並取名為newPdf.pdf
		saveAs(pdfBlob, 'newPdf.pdf');
	};

	return (
		<div className="App">
			<input
				type="text"
				placeholder="name"
				onChange={e => setName(e.target.value)}
			/>
			<input
				type="number"
				placeholder="Receipt ID"
				name="receiptId"
				onChange={e => setReceiptId(e.target.value)}
			/>
			<input
				type="price 1"
				placeholder="price1"
				name="price1"
				onChange={e => setPrice1(e.target.value)}
			/>
			<input
				type="price 2"
				placeholder="price2"
				name="price2"
				onChange={e => setPrice2(e.target.value)}
			/>
			<button type="button" onClick={createAndDownloadPdf}>
				Download PDF
			</button>
		</div>
	);
}

export default App;
