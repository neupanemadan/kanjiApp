<template>
      <div id="home">
        <login
          @create:account="onCreateAccount"
          v-if="!account_create"
        />
        <signup 
          @request:login="onRequestLogin"
          v-if="account_create"
        />
      </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";

export default {
  data() {
    return {
      account_create : false
    }
  },
  methods: {
    onCreateAccount () {
      this.account_create = true
    },
    onRequestLogin () {
      this.account_create = false
    }
  },
  mounted() {
  }
};
</script>
<style>
#home {
  padding: 13px;
  background: lightcyan;
}
</style>