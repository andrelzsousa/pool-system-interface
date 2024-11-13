import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   databaseURL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGIN_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAwyI2M5dI3k7HTYe4d19vCqtu7raRRXOc',
  authDomain: 'poolsystem2024.firebaseapp.com',
  databaseURL: 'https://poolsystem2024-default-rtdb.firebaseio.com',
  projectId: 'poolsystem2024',
  storageBucket: 'poolsystem2024.firebasestorage.app',
  messagingSenderId: '440839327567',
  appId: '1:440839327567:web:abc70a06a713a478b23f3a',
  measurementId: 'G-H1XJ91DE5M'
}

const app = initializeApp(firebaseConfig)
getDatabase(app)

export default app
