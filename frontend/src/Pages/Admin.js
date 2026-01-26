import React, { useState } from 'react';
import { read, utils } from 'xlsx';

export default function Admin() {
	const [fileData, setFile] = useState(null);

	const validateFile = (event) => {
		const file = event.target.files[0];

		const spreadsheet = read(file);
		const json = utils.sheet_to_json(spreadsheet);

		setFile(json);
	};

	const handleFileUpload = async () => {
		console.log(fileData);
	};

	return (
		<>
			<h1>Admin</h1>

			<input
				type="file"
				accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
				onChange={validateFile}
			/>
			<button onClick={handleFileUpload}>Upload</button>
		</>
	);
}
