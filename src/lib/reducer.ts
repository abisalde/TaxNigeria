import * as React from 'react';

/**
 * ? Local & Shared Imports
 */

import {signOut, TaxNigeriaAuth, type userTypeProps} from '@utils/firebase';

export type AppState = {
	isAuthenticated: boolean;
	User: null | userTypeProps;
	last_updated: number;
};

export enum ACTIONS {
	UPDATE_USER = 'UPDATE_APP_USER',
	RESET_STATE = 'RESET_APP_STATE',
	LOGIN_STATE = 'LOGIN_APP_USER',
}

export type Action =
	| {
			type: ACTIONS.UPDATE_USER;
			payload: userTypeProps;
			// eslint-disable-next-line no-mixed-spaces-and-tabs
	  }
	| {type: ACTIONS.RESET_STATE}
	| {type: ACTIONS.LOGIN_STATE; payload: userTypeProps};

export const initialState: AppState = {
	isAuthenticated: false,
	User: null,
	last_updated: Date.now(),
};

export const GlobalStateContext = React.createContext<{
	state: AppState;
	dispatch: React.Dispatch<Action>;
}>({state: initialState, dispatch: () => initialState});

export const AppReducer = (state: AppState, action: Action): AppState => {
	switch (action.type) {
		case ACTIONS.LOGIN_STATE:
			return {
				...state,
				User: action.payload,
				isAuthenticated: true,
				last_updated: Date.now(),
			};

		case ACTIONS.UPDATE_USER:
			return {
				...state,
				User: action.payload,
			};
		case ACTIONS.RESET_STATE:
			return initialState;

		default:
			return state;
	}
};

export const useGlobalState = () => React.useContext(GlobalStateContext);

export const updateAppState = (
	dispatch: React.Dispatch<Action>,
	user: userTypeProps
) => dispatch({type: ACTIONS.UPDATE_USER, payload: user});

export const resetAppState = (dispatch: React.Dispatch<Action>) => {
	dispatch({type: ACTIONS.RESET_STATE});
	signOut(TaxNigeriaAuth);
};

export const loginUser = (
	dispatch: React.Dispatch<Action>,
	user: userTypeProps
) => dispatch({type: ACTIONS.LOGIN_STATE, payload: user});
