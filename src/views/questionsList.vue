<template>
      <div id="home">
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
            @question:delete="onQuestionDelete"
            @question:update="onUpdateRequest"
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
              @question:update="onQuestionUpdate"
              :selected-question="selectedQuestion"
              :loading="loading"
            ></upload-form>
          </n-drawer-content>
        </n-drawer>
      </div>
</template>

<script>
import "vfonts/Lato.css";
import "vfonts/FiraCode.css";
import { AddCircleOutline } from "@vicons/ionicons5";
import { useMessage, NAlert } from "naive-ui";
import { h, ref } from "vue";
import { getDatabase, ref as dbRef, child, onValue, set, push, remove, orderByChild, equalTo, query, onChildAdded } from 'firebase/database';

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
  components: {
    AddCircleOutline,
  },
  data() {
    const message = useMessage()
    return {
      questions : [],
      active : false,
      selectedQuestion : null,
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
    },
    onQuestionDelete (itemId) {
      // Get a reference to the Firebase Realtime Database
      const db = getDatabase();

      // Create a reference to the "studymate" node in the database
      const itemsRef = dbRef(db, 'studymate');

      // Create a Firebase query to search for the record with the given itemId
      const queryRef = query(itemsRef, orderByChild('itemId'), equalTo(itemId));

      console.log('itemRef', itemId)
      console.log('itemRef', queryRef)

      // Attach a listener to the query to get the snapshot of the record
      onChildAdded(queryRef, (snapshot) => {
        // Get the reference to the record using the snapshot key
        const itemToDeleteRef = child(itemsRef, snapshot.key);

        // Remove the item from the database
        remove(itemToDeleteRef)
          .then(() => {
              this.message.success("Question deleted successfully. ", {
                render: renderMessage,
                closable: true,
                duration: 5000
              });
            })
          .catch((error) => {
            console.error('Error deleting record: ', error);
          });
      });
    },
    onUpdateRequest (data) {
      this.active = true
      this.selectedQuestion = data
    },
    onQuestionUpdate(itemId, data) {
        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Create a reference to the "studymate" node in the database
        const itemsRef = dbRef(db, 'studymate');

        // Create a Firebase query to search for the record with the given itemId
        const queryRef = query(itemsRef, orderByChild('itemId'), equalTo(itemId));

        console.log(queryRef)
        // Attach a listener to the query to get the snapshot of the record
        onChildAdded(queryRef, (snapshot) => {
          // Get the reference to the record using the snapshot key
          const itemToEditRef = child(itemsRef, snapshot.key);

          console.log(itemToEditRef)
          // Update the item in the database
          set(itemToEditRef, data)
            .then(() => {
              this.active = false
              this.selectedQuestion = null
              this.message.success("Question Updated successfully. ", {
                render: renderMessage,
                closable: true,
                duration: 5000
              });
            })
            .catch((error) => {
              console.error('Error updating record: ', error);
            });
        });

      }

  },
  mounted() {
    this.questionsList()
  },
};
</script>
<style scoped>
#home {
  padding: 5px;
  background: lightcyan;
}
</style>
