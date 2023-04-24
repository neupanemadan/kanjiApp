<template>
  <n-form ref="formRef" :model="deck" :rules="rules" size="large">
    <n-grid x-gap="12" :cols="1">
      <n-gi>
        <n-card title="Add a new word" embedded :bordered="true">
          <n-grid :span="24" :x-gap="24">
            <n-form-item-gi span="16" label="Question" path="question">
              <n-input v-model:value="deck.question" placeholder="Question" size="large" />
            </n-form-item-gi>
            <n-form-item-gi span="16" label="level" path="level">
              <n-select
                filterable
                placeholder="Select level"
                :options="levels"
                v-model:value="deck.level"
                size="large"
              />
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

export default defineComponent({
  name: "UploadForm",
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    selectedQuestion: {
      required: false
    },
  },
  setup(props) {
    const defaultQuestion = {
      question: null,
      answer: null,
      level: 0
    };
    const deck = ref(props.selectedQuestion|| defaultQuestion);
    const showModalRef = ref(false);
    const levels = [
      {label:'Not assigned', value:0},
      {label:'Easy', value:1},
      {label:'Moderate', value:2},
      {label:'Difficult', value:3}
    ]
    return {
      showModal: showModalRef,
      deck,
      levels,
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
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.formRef.validate(errors => {
        if (errors) {
          return;
        }
        if (this.deck.itemId) {
          const eventName = "question:update";
          this.$emit(eventName, this.deck.itemId, this.getFormData());
        } else {
          const eventName = "question:create";
          this.$emit(eventName, this.getFormData());
        }
      });
    },
    getFormData() {
      console.log(this.currentUser)
      const data = {
        itemId: this.deck.itemId?this.deck.itemId:this.generateItemId(), // generate a unique ID for the item
        question: this.deck.question,
        answer: this.deck.answer,
        currentUser:localStorage.getItem("loggedInUser"),
        level: this.deck.level
      };
      return data;
    },
    generateItemId() {
      // generate a unique ID using the current timestamp
      return Date.now().toString();
    },
  },
})
</script>