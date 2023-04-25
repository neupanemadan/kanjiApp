<template>
    <div class="home-page">
      <div id="home">
        <flashcard-container
          :questions="selected_questions"
          @level:update="onLevelUpdate"
          @empty:questions="onEmptyQuestions"
          v-if="level_selected"
        />
        <div class="levels" v-else>
          <n-card title="All Level" class="level-card all-level" @click="onAllLevelClick">
            {{  total_question.length  }}
          </n-card>
          <n-card title="Difficult" class="level-card difficult-level" @click="onDifficultLevelClick">
            {{  difficult_question.length }}
          </n-card>
          <n-card title="Moderate" class="level-card moderate-level" @click="onModerateLevelClick">
            {{ moderate_question.length }}
          </n-card>
          <n-card title="Easy" class="level-card easy-level" @click="onEasyLevelClick">
            {{ easy_question.length }}
          </n-card>
        </div>
        <div class="button-container" v-if="!level_selected">
          <n-button v-on:click="onReset()">
            Reset
          </n-button>
        </div>
      </div>
    </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { getDatabase, ref as dbRef, child, onValue, set, orderByChild, equalTo, query, onChildAdded, update } from 'firebase/database';
import { ref } from "vue";
import { NAlert, useMessage, useDialog } from "naive-ui";


export default {
  components: {
    NAlert
  },
  data() {
    const message = useMessage();
    const dialog = useDialog();
    return {
      message,
      dialog,
      questions : [],
      selected_questions : [],
      total_question : [],
      difficult_question : [],
      moderate_question : [],
      easy_question : [],
      level_selected : false
    };
  },
  methods: {
    getQuestionsList () {
      // Get a reference to the Firebase Realtime Database
      const db = getDatabase();

      // Create a reference to the "studymate" node in the database
      const itemsRef = dbRef(db, 'studymate');

      // Set up a listener for changes to the "items" node
      onValue(itemsRef, (snapshot) => {
        const data = Object.values(snapshot.val())
        this.questions = data.filter(({currentUser}) => currentUser === localStorage.getItem('loggedInUser'))
        this.total_question = this.questions 
        this.difficult_question = this.questions .filter(({ level }) => level === 3)
        this.moderate_question = this.questions .filter(({ level }) => level === 2)
        this.easy_question = this.questions .filter(({ level }) => level === 1)
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

    },
    resetLevel () {
      // Get a reference to the Firebase Realtime Database
      const db = getDatabase();

      // Create a reference to the "studymate" node in the database
      const itemsRef = dbRef(db, 'studymate');

      // const dbRef = firebase.database().ref('studymate');
      // Set up a listener for changes to the "items" node
      onValue(itemsRef, (snapshot) => {
        const items = snapshot.val();
        let count = 0
        for (let itemKey in items) {
          const itemToEditRef = child(itemsRef, itemKey);
          console.log(count)
          count = count + 1
          if (count === 320) {
            break
          }
          update(itemToEditRef, { level: 0});
        }
      });
    },
    onAllLevelClick () {
      this.level_selected = true
      this.selected_questions = ref(this.total_question)
    },
    onDifficultLevelClick () {
      this.level_selected = true
      this.selected_questions = ref(this.difficult_question)
    },
    onModerateLevelClick () {
      this.level_selected = true
      this.selected_questions = ref(this.moderate_question)
    },
    onEasyLevelClick () {
      this.level_selected = true
      this.selected_questions = ref(this.easy_question)
    },
    categorizedQuestion () {
      this.total_question = this.questions
      this.difficult_question = this.questions.filter(({ level }) => level === 3)
      this.moderate_question = this.questions.filter(({ level }) => level === 2)
      this.easy_question = this.questions.filter(({ level }) => level === 1)
    },
    onEmptyQuestions () {
      this.level_selected = false
    },
    onReset () {
      this.dialog.warning({
        title: "Are you sure?",
        content: "All the data will be restored to default level.",
        positiveText: "Sure",
        negativeText: "Not Sure",
        onEsc: () => {
          this.message.warning("close by esc");
        },
        onPositiveClick: () => {
          this.resetLevel()
        }
      });

    },
  },
  mounted() {
    this.getQuestionsList()
    this.categorizedQuestion()
  }
};
</script>
<style>
#home {
  padding: 13px;
  background: lightcyan;
}
.levels {
  max-width: 100vw;
}
.level-card {
  margin-top: 1rem;
  /* Set the initial scale to 1 */
  transform: scale(1);
  transition: transform 0.2s ease-out; /* Add a smooth transition */
}
.level-card:hover {
  /* On hover, scale the element up to 1.1 */
  transform: scale(1.1);
}
@media (max-width: 450px) {
  .level-card{
    height: 28vw;
  }
}
.all-level {
  background: gainsboro;
  color: black;
}
.difficult-level {
  background: lightcoral;
  color: black;
}
.moderate-level {
  background: lightblue;
  color: black;
}
.easy-level {
  background: lightgreen;
  color: black;
}
.button-container {
    max-width:100vw;
    position: relative;
    margin-top: 1rem;
    display: flex;
    justify-content: end;
    align-items: center;
  }
</style>