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
    <div class="another-methods">
      <div class="create-account">
        <p>Not Regestired?</p>
        <button class="create-btn" @click="createNewAccount">Create Account</button>
      </div>
      <!-- <div class="google-login">
        <p>Or login/signup with Google:</p>
        <button class="button-btn" @click="signInWithGoogle">Sign in with Google</button>
      </div> -->
    </div>
  </div>
    </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, fetchSignInMethodsForEmail } from 'firebase/auth';
import { h } from "vue";
import { useRouter } from "vue-router";
import { useMessage, NAlert } from "naive-ui";


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
    const message = useMessage()
    const router = useRouter()
    return {
      message,
      router,
      email: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const auth = getAuth();
        // Check if email already exists
        const existingUsers = await fetchSignInMethodsForEmail(auth, this.email);
        if (existingUsers.length === 0) {
          // Email already in use
          this.message.warning("This email has not been regestered yet!! create a new account.", {
            render: renderMessage,
            closable: true,
            duration: 5000
          });
          return;
        }
        await signInWithEmailAndPassword(auth, this.email, this.password)
          .then((userCredential) => {
            const user = userCredential.user;

            if (user && user.emailVerified) {
              this.router.push({ name: "home" });
              this.message.success("Logged in successfully. ", {
                render: renderMessage,
                closable: true,
                duration: 5000
              });
              localStorage.setItem("emailForSignIn", this.email);
            } else if (user && !user.emailVerified) {
              // User is logged in but their email address is not verified
              auth.signOut();
              this.message.warning("Please verify you email first. ", {
                render: renderMessage,
                closable: true,
                duration: 5000
              });
            } else {
              this.message.warning("Something went wrong. please contact at nmadan692@gmail.com.", {
                render: renderMessage,
                closable: true,
                duration: 5000
              });
            }
          })
      } catch (error) {
        this.message.error("Logging error! Check your logins detail.", {
          render: renderMessage,
          closable: true,
          duration: 5000
        });
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
    createNewAccount () {
      const eventName =  "create:account";
      this.$emit(eventName);
    }
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

.create-btn {
  margin: 0 auto;
  padding: 5px 10px;
  background-color: #3b89a1;
  color: #fff;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
}

.create-account {
  margin-top: 20px;
  text-align: center;
}

.create-account p {
  font-size: 14px;
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