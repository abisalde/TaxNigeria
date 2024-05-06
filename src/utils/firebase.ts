// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getAnalytics} from 'firebase/analytics';
import {
	getAuth,
	User,
	onAuthStateChanged,
	signOut,
	updateProfile,
	updatePassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
import {
	getFirestore,
	doc,
	getDoc,
	setDoc,
	addDoc,
	collection as DBCollection,
} from 'firebase/firestore';
import {
	getStorage,
	ref,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
} from 'firebase/storage';

/**
 * ? Local & Shared Imports
 */
import {API_KEY} from '@constants/env';

const firebaseConfig = {
	apiKey: API_KEY,
	authDomain: 'tax-nigeria.firebaseapp.com',
	projectId: 'tax-nigeria',
	storageBucket: 'tax-nigeria.appspot.com',
	messagingSenderId: '525062296808',
	appId: '1:525062296808:web:f180e908c59745f1ff255d',
	measurementId: 'G-CGEP0KN65W',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const appAnalytics = getAnalytics(app);
const TaxNigeriaAuth = getAuth(app);
const database = getFirestore(app);
const storageBucket = getStorage(app);

// const usersRef = doc(database, 'USERS');

export {
	appAnalytics,
	database,
	TaxNigeriaAuth,
	onAuthStateChanged,
	signOut,
	doc,
	addDoc,
	getDoc,
	setDoc,
	DBCollection,
	uploadBytes,
	getDownloadURL,
	uploadBytesResumable,
	updateProfile,
	updatePassword,
	ref,
	storageBucket,
	sendPasswordResetEmail,
};

export type userTypeProps = User;
