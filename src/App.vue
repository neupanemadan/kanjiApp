<template>
  <n-config-provider
    :locale="config.jaJP"
    :theme-overrides="themeOverrides"
    :date-locale="config.dateJaJP"
  >    
    <n-message-provider>
      <Router-view />
    </n-message-provider>
  </n-config-provider>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { jaJP, dateJaJP } from "naive-ui";

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
  data() {
    return {
      config: {
        jaJP,
        dateJaJP
      },
      themeOverrides
    };
  }
};
</script>
