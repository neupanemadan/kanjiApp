<template>
    <div id="home">
        <div class="login-form">
    <h1>Login</h1>
    <form @submit.prevent="login">
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" v-model="email" required />
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>
      <div class="form-group">
        <button class="submit-button" type="submit">Login</button>
      </div>
    </form>
    <div class="google-login">
      <p>Or login/signup with Google:</p>
      <button class="button-btn" @click="signInWithGoogle">Sign in with Google</button>
    </div>
  </div>
    </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export default {
data() {
    return {
      email: '',
      password: '',
    };
  },
methods: {
    async login() {
      const auth = getAuth();
      try {
        await signInWithEmailAndPassword(auth, this.email, this.password);
        // Redirect to user dashboard or homepage
      } catch (error) {
        console.error(error);
        // Show error message to user
      }
    },
    async signInWithGoogle() {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      try {
        await signInWithPopup(auth, provider);
        // Redirect to user dashboard or homepage
      } catch (error) {
        console.error(error);
        // Show error message to user
      }
    },
},
mounted() {
}
};
</script>
<style>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding:2vw 4vw 2vw 2vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: lightblue
}

@media (max-width: 678px) {
    .login-form {
    padding:1vw 7vw 2vw 1vw;
  }
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 5px;
}

input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.submit-button,
.button-btn {
  display: block;
  margin: 0 auto;
  padding: 10px 20px;
  background-color: #3490dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.submit-button:hover,
.button-btn:hover {
  background-color: #2779bd;
}

.google-login {
  margin-top: 20px;
  text-align: center;
}

.google-login p {
  font-size: 14px;
}

.google-login button {
  display: inline-block;
  margin-left: 10px;
  padding: 10px 20px;
  background-color: #fff;
  color: #4285f4;
  border: 1px solid #4285f4;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}
</style>