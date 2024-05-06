import React from 'react';
import ReactDOM from 'react-dom/client';
import {ToastContainer} from 'react-toastify';

import 'tailwindcss/tailwind.css';
import 'react-toastify/dist/ReactToastify.css';

/**
 * ? Local & Shared Import
 */
import '@styles/index.css';
import {Provider} from '@lib/Provider';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider>
			<App />
		</Provider>
		<ToastContainer />
	</React.StrictMode>
);
