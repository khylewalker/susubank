// pages/_app.js
import "../firebaseConfig"; // initialize firebase once
import "../styles/globals.css"; // keep global styles if you have them

export default function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

