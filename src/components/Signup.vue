<template>
  <div id="home">
    <div class="register-form" v-if="!verification_sent">
      <h1>Register</h1>
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required>
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="password" required>
        </div>
        <div class="form-group">
          <label for="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" v-model="confirmPassword" required>
        </div>
        <button class="submit-button" type="submit">Register</button>
        <div class="create-account">
          <p>Already Have account?</p>
          <button class="create-btn" @click="requestLogin">Login</button>
        </div>
      </form>
    </div>
    <div class="register-form" v-else>
      <p>Kindly validate your email via the verification link sent to your inbox before logging in. 
        With successful verification, you can continue through email link or you can login through <button class="login-btn" @click="requestLogin()">Login page</button> after verification.</p>
    </div>
  </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { ref, h } from 'vue'
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification, fetchSignInMethodsForEmail} from 'firebase/auth'
import { useMessage, NAlert } from "naive-ui";
import { useRouter } from "vue-router";


const renderMessage = props => {
  const { type } = props;
  return h(
    NAlert,
    {
      closable: props.closable,
      onClose: props.onClose,
      type: type === "loading" ? "default" : type,
      title: props.title,
      style: {
        boxShadow: "var(--n-box-shadow)",
        maxWidth: "calc(100vw - 32px)",
        width: "480px"
      }
    },
    {
      default: () => props.content
    }
  );
};

export default {
  data() {
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const verification_sent = false
    const message = useMessage()
    const router = useRouter()

    return {
      message,
      router,
      email,
      password,
      confirmPassword,
      verification_sent
    }
  },
  methods: {
    requestLogin () {
      const eventName =  "request:login";
      this.$emit(eventName);
    },
    
    async sendEmailVerificationWithHandleCodeInApp(auth, email, url) {

      await sendEmailVerification(auth.currentUser, {
        url: url,
      });
    },
    async register  ()  {
      if (this.password !== this.confirmPassword) {
        this.message.warning("Passwords do not match!! ", {
          render: renderMessage,
          closable: true,
          duration: 5000
        });
        return
      }

      if (this.password.length < 6 || this.confirmPassword.length < 6) {
        this.message.warning("Minimum 6 letters password needed!! ", {
          render: renderMessage,
          closable: true,
          duration: 5000
        });
        return
      }

      try {
        const auth = getAuth();

        // Check if email already exists
        const existingUsers = await fetchSignInMethodsForEmail(auth, this.email);
        if (existingUsers.length > 0) {
          // Email already in use
          this.message.warning("Email already in use.", {
            render: renderMessage,
            closable: true,
            duration: 5000
          });
          return;
        }
        
        // Create user in database with email as unverified
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        
        this.verification_sent = true

        const user = userCredential.user;

        console.log('----------------------')
        console.log(user)
        console.log('----------------------')

        // Send verification email to user
        await this.sendEmailVerificationWithHandleCodeInApp(
          auth,
          this.email,
          "https://kanjiapp.neupanemadan.com.np/"
        );


        this.message.success("Verification email sent! Please check your inbox.", {
          render: renderMessage,
          closable: true,
          duration: 5000,
        });


      } catch (error) {
        console.log(error)
        this.message.error("Got an error on registering the user.", {
          render: renderMessage,
          closable: true,
          duration: 5000
        });
      }
    }
  }
}
</script>
<style>
.register-form {
  max-width: 400px;
  margin: 0 auto;
  padding:1vw 4vw 1vw 2vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: lightblue
}
@media (max-width: 678px) {
    .register-form {
    padding:1vw 7vw 2vw 1vw;
  }
}

h1 {
  text-align: center;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 3px;
}

input[type="username"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 14px;
}

.submit-button {
  display: block;
  margin: 0 auto;
  padding: 8px 16px;
  background-color: #3490dc;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 14px;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #2779bd;
}
</style>