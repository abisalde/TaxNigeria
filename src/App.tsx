import * as React from 'react';
import {RouterProvider} from 'react-router-dom';

/**
 *
 * ? Local & Shared Imports
 */
import '@styles/global.css';

import {
	TaxNigeriaAuth,
	onAuthStateChanged,
	userTypeProps,
} from '@utils/firebase';

import {resetAppState, updateAppState, useGlobalState} from '@lib/reducer';

import {clearStorage} from '@lib/storage';

import {router} from '@routes';

function App() {
	const {dispatch} = useGlobalState();

	const handleUpdateUser = React.useCallback(
		(user: userTypeProps) => updateAppState(dispatch, user),
		[dispatch]
	);

	React.useEffect(() => {
		onAuthStateChanged(TaxNigeriaAuth, (user) => {
			if (user !== null || user === undefined) {
				handleUpdateUser(user);
			} else {
				resetAppState(dispatch);
				clearStorage();
			}
		});
	}, []);

	return <RouterProvider router={router} />;
}

export default App;
