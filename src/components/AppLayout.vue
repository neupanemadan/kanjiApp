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
              <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
            </div>
          </div>
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
import { HomeOutline, EaselOutline} from "@vicons/ionicons5";
import { RouterLink, useRoute } from "vue-router";
import { jaJP, dateJaJP } from "naive-ui";

function renderIcon(icon) {
  return () => h(NIcon, null, { default: () => h(icon) });
}

const menus = [
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
    icon: renderIcon(EaselOutline)
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
    let menuOptions = menus;
    let config = configuration;
    let activeKey = ref(null);

    return {
      activeKey,
      page: ref(defaultRoute),
      active: false,
      config,
      menuOptions,
      themeOverrides
    };
  }
});
</script>
<style>
#app {
  margin-left: 10vw;
  margin-right: 10vw;
  padding: 0;
  height: 100%;
  min-width: 320px;
  --header-height: 64px;
  --content-width: 92vw;
  --content-max-width: calc(100vw - 20vw);
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
  height: 10vh;
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

</style>