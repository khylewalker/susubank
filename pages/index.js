import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

function handleLogin(e) {
  e.preventDefault();
  const email = e.target.email.value;
  const password = e.target.password.value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log("Logged in:", userCredential.user);
      // redirect or update state here
    })
    .catch((error) => {
      console.error("Login error:", error.message);
    });
}

