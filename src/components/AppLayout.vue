<template>
  <n-config-provider
    :locale="config.jaJP"
    :theme-overrides="themeOverrides"
    :date-locale="config.dateJaJP"
  >
  <div id="app">
    <n-dialog-provider>
          <div class="row navbar">
            <div class="col-4">
              <h2>studyMate</h2>
            </div>
            <div class="col-8 menus">
              <n-menu v-model:value="activeKey" mode="horizontal" :options="getMenus()" />
            </div>
          </div>
          <p class="logout-form" v-if="currentUser">Logged email : {{ currentUser }}
            <button @click="logout()">Log Out</button>
          </p>
          <n-layout-content>
            <div class="content-box">
              <div class="content">
                <Router-view />
              </div>
            </div>
          </n-layout-content>
          <div class="footer">
              <p style="text-align-last: center;">FlashCard app designed for learining Purpose</p>
          </div>
    </n-dialog-provider>
  </div>
  </n-config-provider>
</template>
<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { NIcon } from "naive-ui";
import { defineComponent, h, ref, computed } from "vue";
import { HomeOutline, ListOutline, LogInOutline, LogOutOutline} from "@vicons/ionicons5";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { jaJP, dateJaJP } from "naive-ui";
import { onAuthStateChanged, signOut, getAuth } from "firebase/auth";
import { useMessage, NAlert } from "naive-ui";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

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

const menus = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "auth"
          }
        },
        { default: () => "Login/SignUp" }
      ),
    key: "auth",
    icon: renderIcon(LogInOutline)
  },
];

const userOnlyMenus = [
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "home"
          }
        },
        { default: () => "Home" }
      ),
    key: "home",
    icon: renderIcon(HomeOutline)
  },
  {
    label: () =>
      h(
        RouterLink,
        {
          to: {
            name: "questions"
          }
        },
        { default: () => "Questions" }
      ),
    key: "questions",
    icon: renderIcon(ListOutline)
  },
];

const actionOptions = [
  {
    label: "Logout",
    key: "logoutUser",
    icon: () =>
      h(NIcon, null, {
        default: () => h(LogOutOutline)
      })
  }
];

const configuration = {
  jaJP,
  dateJaJP
};


const themeOverrides = {
  common: {
    fontSize: "15px",
    fontSizeMedium: "15px",
    fontSizeLarge: "16px"
  },
  Card: {
    titleFontSizeMedium: "20px"
  },
  Form: {
    labelFontSizeTopLarge: "15px"
  }
};

export default defineComponent({
  setup() {
    const route = useRoute();
    const defaultRoute = computed(() => route.name);
    // let menuOptions = menus;
    const router = useRouter()
    const message = useMessage()
    let config = configuration;
    let currentUser = ref(null);
    let activeKey = ref(null);
    // if (currentUser.value) {
    //   menuOptions = [...menus, ...userOnlyMenus];
    // }

    const logoutUser = () => {
      console.log('----------------on logout---------------')
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.currentUser = null;
          console.log("User signed out successfully");
        })
        .catch((error) => {
          console.error(error);
        });
    };

    return {
      router,
      message,
      currentUser,
      activeKey,
      page: ref(defaultRoute),
      active: false,
      config,
      logoutUser,
      // menuOptions,
      themeOverrides
    };
  },
  methods: {
    checkLogin() {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.currentUser = user.email;
        } else {
          this.currentUser = null;
        }
      });
    },
    logout() {
      console.log('----------------on logout---------------')
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          this.router.push({ name: "auth" });
          this.message.success("Logged out successfully. ", {
            render: renderMessage,
            closable: true,
            duration: 5000
          });
        })
        .catch((error) => {
          console.log(error)
          this.message.error("Logout Fails", {
            render: renderMessage,
            closable: true,
            duration: 5000
          });
        });
    },
    getMenus () {
      console.log('-------getMenus---------')
      console.log(menus)
      console.log(userOnlyMenus)
      console.log(this.currentUser)
      let menu = menus;
      if (this.currentUser) {
        menu = userOnlyMenus
      }
      return menu
    }
  },
  mounted() {
    this.checkLogin()
  }
});
</script>
<style>
#app {
  background: lightcyan;
  border-radius: 2rem;
  margin-left: 10vw;
  margin-right: 10vw;
  margin-top: 0.5vw;
  padding: 1rem;
  height: 100%;
  min-width: 320px;
  --header-height: 64px;
  --content-width: 100vw;
  --content-max-width: calc(100vw);
}
@media (max-width: 1200px) {
  #app {
    margin-left: 8vw;
    margin-right: 8vw;
  }
}
@media (max-width: 992px) {
  #app {
    margin-left: 6vw;
    margin-right: 6vw;
  }
}
@media (max-width: 678px) {
  #app {
    margin-left: 3vw;
    margin-right: 3vw;
  }
}
@media (max-width: 576px) {
  #app {
    margin-left: 2px;
    margin-right: 2px;
  }
}
.menus {
  margin-top: 0.8rem;
}
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 6vh;
}

.navbar h2 {
  margin: 0;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    align-items: center;
    margin-bottom: 2vh;
  }

  .menus {
    margin-top: 12px;
  }
}
.logout-form {
    background: lightcyan;
    text-align: right;
  }
</style>