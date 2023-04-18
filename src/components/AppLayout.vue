<template>
  <n-config-provider
    :locale="config.jaJP"
    :theme-overrides="themeOverrides"
    :date-locale="config.dateJaJP"
  ><n-dialog-provider>
    <n-row class="navbar">
      <n-col :span="6" :offset="6">
        <h2>studyMate</h2>
      </n-col>
      <n-col :span="6" :offset="3" class="menus">
        <n-menu v-model:value="activeKey" mode="horizontal" :options="menuOptions" />
      </n-col>
    </n-row>
    <n-layout-content content-style="padding: 10px;">
      <div class="content-box">
        <div class="content">
          <Router-view />
        </div>
      </div>
    </n-layout-content>
    <n-row class="footer">
      <n-col :span="12" :offset="6">
        <hr>
          <p style="text-align-last: center;">FlashCard app designed for learining Purpose</p>
        <hr>
      </n-col>
    </n-row>
  </n-dialog-provider>
  </n-config-provider>
</template>
<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { NIcon } from "naive-ui";
import { defineComponent, h, ref } from "vue";
import { HomeOutline, EaselOutline} from "@vicons/ionicons5";
import { RouterLink } from "vue-router";
import { useRoute } from "vue-router";
import { computed } from "vue";
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

export default defineComponent({
  setup() {
    const route = useRoute();
    const defaultRoute = computed(() => route.name);
    let menuOptions = menus;
    let config = configuration;

    return {
      page: ref(defaultRoute),
      active: false,
      config,
      menuOptions
    };
  }
});
</script>
<style>
.avatar-container .action-wrapper {
  display: flex;
  align-items: center;
}
.avatar-container .action-wrapper .avatar {
  display: flex;
  align-items: center;
}

.avatar-container .action-wrapper .name {
  margin: 0 5px;
}
.avatar-container .action-wrapper .name .tip {
  transform: rotate(0);
  transition: transform 0.5s;
  margin-left: 2px;
}
.avatar-container:hover {
  cursor: pointer;
  color: #18a058;
}
.avatar-container:hover .name .tip {
  transform: rotate(180deg);
  transition: transform 0.5s;
}
.menus {
  margin-top: 0.8rem;
}
</style>