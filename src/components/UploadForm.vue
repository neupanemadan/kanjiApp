<template>
  <n-form ref="formRef" :model="deck" :rules="rules" size="large">
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card title="Add a new word" embedded :bordered="true">
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi span="16" label="Question" path="question">
              <n-input v-model:value="deck.question" placeholder="Question" size="large" />
            </n-form-item-gi>
            <n-form-item-gi span="16" label="Answer" path="answer">
                <n-input
                    v-model:value="deck.answer"
                    type="textarea"
                    placeholder="Answer"
                />
            </n-form-item-gi>
            <n-gi span="9" :x-gap="5">
              <n-button
                @click="onSubmit"
                :loading="loading"
                type="primary"
                size="large"
                style="margin-top: 20px"
              >Submit</n-button>
            </n-gi>
          </n-grid>
        </n-card>
      </n-gi>
    </n-grid>
  </n-form>
</template>
<script>
import { defineComponent, ref } from "vue"
import { getDatabase, ref as dbRef, push } from 'firebase/database'

export default defineComponent({
  name: "UploadForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const defaultDeck = {
      question: null,
      answer: null
    };
    const deck = ref(defaultDeck);
    const showModalRef = ref(false);
    return {
      showModal: showModalRef,
      deck,
      formref: ref(null),
      rules: {
        question: {
          required: true,
          type: "string",
          trigger: ["blur", "change"],
          message: "Question is required."
        },
        answer: {
          required: true,
          type: "string",
          trigger: ["blur", "change"],
          message: "Answer is required."
        }
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.formRef.validate(errors => {
        if (errors) {
          return;
        }
        const formData = new FormData();
        formData.append("data", JSON.stringify(this.getFormData()));
        // const eventName = "deck:create";
        // this.$emit(eventName, formData);

        // Get a reference to the Firebase Realtime Database
        const db = getDatabase();

        // Create a reference to the "items" node in the database
        const itemsRef = dbRef(db, 'studymate');

        // Define the data to be saved
        const newDeck = {
        name: 'My Item',
        description: 'This is my item'
        };

        // Save the data to the database
        push(itemsRef, this.getFormData())
        .then(() => {
            console.log('Data saved successfully');
        })
        .catch((error) => {
            console.error('Error saving data: ', error);
        });
      });
    },
    getFormData() {
      const data = {
        question: this.deck.question,
        answer: this.deck.answer
      };
      return data;
    }
  }
});
</script>