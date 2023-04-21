<template>
    <div id="home">
        <div class="register-form">
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
    </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { ref, h } from 'vue'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
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
  setup() {
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const message = useMessage()
    const router = useRouter()

    return {
      message,
      router,
      email,
      password,
      confirmPassword
    }
  },
  methods: {
    requestLogin () {
      const eventName =  "request:login";
      this.$emit(eventName);
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

      try {
        const auth = getAuth()
        await createUserWithEmailAndPassword(auth, this.email, this.password)
        // const user = userCredential.user
        // console.log(user)
        // this.requestLogin()
        this.router.push({ name: "home" });
        this.message.success("User created and logged in with provided details successfully. ", {
          render: renderMessage,
          closable: true,
          duration: 5000
        });
      } catch (error) {
        this.message.error("Got an error on regestering the user.", {
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
  padding:2vw 4vw 2vw 2vw;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: lightblue
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

input[type="username"],
input[type="email"],
input[type="password"] {
  display: block;
  width: 100%;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  font-size: 16px;
}

.submit-button {
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

.submit-button:hover {
  background-color: #2779bd;
}
</style>