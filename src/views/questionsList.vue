<template>
  <n-row gutter="12">
    <n-col :span="18">
      <div class="home-page">
      <div id="app">
        <n-space justify="start" style="margin-bottom:0.8rem;">
          <n-button :disabled="disabled" @click="onClickCreate" type="primary" size="medium">
              <template #icon>
                <n-icon>
                  <AddCircleOutline />
                </n-icon>
              </template>
              Add New
            </n-button>
        </n-space>
        <questionTable
            :questions="questions"
        />
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
              @question:create="onQuestionCreate"
              :loading="loading"
            ></upload-form>
          </n-drawer-content>
        </n-drawer>
      </div>
    </div>
    </n-col>
  </n-row>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { AddCircleOutline } from "@vicons/ionicons5";
import { useMessage, NAlert } from "naive-ui";
import { h, ref } from "vue";
import { getDatabase, ref as dbRef, get, onValue, set, push } from 'firebase/database';

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
    AddCircleOutline,
  },
  data() {
    const message = useMessage()
    return {
      questions : [],
      themeOverrides,
      active : false,
      message
    };
  },
  methods: {
    onClickCreate () {
      this.active = true
    },
    questionsList () {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Create a reference to the "studymate" node in the database
        const itemsRef = dbRef(db, 'studymate');

        // Set up a listener for changes to the "items" node
        onValue(itemsRef, (snapshot) => {
            this.questions = Object.values(snapshot.val());
        });
        return {
            questions: ref(this.questions)
        };
    },
    onQuestionCreate (data) {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Create a reference to the "studymate" node in the database
        const itemsRef = dbRef(db, 'studymate');


        // Generate a new unique ID for the item
        const newItemRef = push(itemsRef);

        // Save the data to the database
        set(newItemRef, data)
        .then(() => {
          this.active = false
          this.message.success("Question added successfully. ", {
              render: renderMessage,
              closable: true,
              duration: 5000
            });
        })
        .catch((error) => {
            console.error('Error saving data: ', error);
        });
    }
  },
  mounted() {
    this.questionsList()
  },
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