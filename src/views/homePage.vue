<template>
  <n-row gutter="12">
    <n-col :span="4"></n-col>
    <n-col :span="18">
      <div class="home-page">
        <div id="app">
          <flashcard-container
              :questions="questions"
              @level:update="onLevelUpdate"
            ></flashcard-container>
        </div>
      </div>
    </n-col>
    <n-col :span="3"></n-col>
  </n-row>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { getDatabase, ref as dbRef, child, onValue, set, orderByChild, equalTo, query, onChildAdded } from 'firebase/database';
import { h, ref } from "vue";


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
      questions : [],
      themeOverrides
    };
  },
  methods: {
    getGuestionsList () {
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
    onLevelUpdate(itemId, data) {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Create a reference to the "studymate" node in the database
        const itemsRef = dbRef(db, 'studymate');

        console.log(itemId)
        console.log(data)

        // Create a Firebase query to search for the record with the given itemId
        const queryRef = query(itemsRef, orderByChild('itemId'), equalTo(itemId));

        // Attach a listener to the query to get the snapshot of the record
        onChildAdded(queryRef, (snapshot) => {
          // Get the reference to the record using the snapshot key
          const itemToEditRef = child(itemsRef, snapshot.key);

          // Update the item in the database
          set(itemToEditRef, data)
            .then(() => {
              console.log('level updated')
            })
            .catch((error) => {
              console.error('Error updating record: ', error);
            });
        });

      }
  },
  mounted() {
    this.getGuestionsList()
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