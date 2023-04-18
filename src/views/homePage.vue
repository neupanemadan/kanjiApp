<template>
  <n-row gutter="12">
    <n-col :span="4"></n-col>
    <n-col :span="18">
      <div class="home-page">
        <div id="app">
          <n-button strong secondary type="info" @click="handleClick">
            Add new Word
          </n-button>
          <FlashcardContainer />
          <n-drawer
            v-model:show="active"
            :close-on-esc="false"
            :mask-closable="false"
            @update:show="onUpdateDrawer"
            width="500px"
            placement="left"
          >
            <n-drawer-content title="Upload Data" closable :native-scrollbar="false">
              <upload-form
                @data:create="onDataCreate"
                :loading="loading"
              ></upload-form>
            </n-drawer-content>
          </n-drawer>
        </div>
      </div>
    </n-col>
    <n-col :span="3"></n-col>
  </n-row>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import FlashcardContainer from "../components/FlashcardContainer.vue";


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
export default {
  components: {
    FlashcardContainer,
  },
  data() {
    return {
      themeOverrides,
      active : false
    };
  },
  methods: {
    handleClick () {
      console.log("Button Clicked");
      this.active = true
    }
  },
  mounted() {
  }
};
</script>
<style>
#app {
  margin: 0;
  padding: 0;
  height: 100%;
  min-width: 320px;
  --header-height: 64px;
  --content-width: 100vw;
  --content-max-width: calc(100vw - 32px);
}

body {
  overflow: auto;
  -webkit-font-smoothing: antialiased;
}

.n-layout-header {
  transition: box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  padding: 1px;
}

.nav {
  height: calc(var(--header-height) - 1px);
  display: flex;
  justify-content: center;
}

.nav-box {
  display: flex;
  justify-content: flex-start;
  margin: auto;
  width: var(--content-width);
  max-width: var(--content-max-width);
}

.nav-menu {
  padding-left: 100px;
  font-size: 15px;
  font-weight: 500;
}

.ui-logo {
  cursor: pointer;
  display: flex;
  align-items: center;
  font-size: 18px;
}

.ui-logo  {
  margin-right: 12px;
  margin-left: 12px;
  height: 70px;
  width: 300px;
}

.content-box {
  margin: auto;
  width: var(--content-width);
  max-width: var(--content-max-width);
}

.content {
  margin-top: 0px;
}
.n-alert:not(:last-child) {
  margin-bottom: 12px;
}
</style>