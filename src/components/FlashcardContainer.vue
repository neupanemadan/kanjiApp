<template>
  <div>
    <Flashcard
      v-if="currentCardIndex >= 0 && currentCardIndex < questions.length"
      :question="questions[currentCardIndex].question"
      :answer="questions[currentCardIndex].answer"
      />
    <div class="question-number">{{ currentQuestionNumber }}/{{ totalQuestions }}</div>
    <!-- <div class="button-container">
      <n-button type="success" @click="previousCard"><i class="fa-solid fa-arrow-left"></i></n-button>
      <n-button type="success" @click="nextCard"><i class="fa-solid fa-arrow-right"></i></n-button>
    </div> -->
    {{ difficultyLevel }}
    <div class="level-container">
      <n-button :style="{ backgroundColor: hardButtonColor }" v-on:click="setLevel('hardButtonColor')">
       Hard
      </n-button>    
      <n-button :style="{ backgroundColor: moderateButtonColor }" v-on:click="setLevel('moderateButtonColor')">
        Moderate
      </n-button>    
      <n-button :style="{ backgroundColor: easyButtonColor }" v-on:click="setLevel('easyButtonColor')">
        Easy
      </n-button>
    </div>
  </div>
  </template>
  
<script>
import Flashcard from "../components/FlashCard.vue";
import { NButton } from "naive-ui";
  
export default {
  components: {
    Flashcard,
    NButton
  },
  data() {
    return {
      hardButtonColor: "",
      moderateButtonColor: "",
      easyButtonColor: "",
      currentCardIndex: 0,
      flashcards: [
        {
          question: "順番",
          answer: "じゅんばん/order",
        },
        {
          question: "早見に",
          answer:
              "はやみに/for a quick look",
        },
        {
          question: "直接",
          answer:
              "ちょくせつ/directly",
        },
        {
          question: "休憩",
          answer:
              "きゅうけい/breaks , rest",
        },
        {
          question: "量産",
          answer:
              "りょうさん/mass production",
        },
        {
          question: "受注生産品",
          answer:
              "じゅちゅうせいさんひん/order based production",
        },
        {
          question: "在庫",
          answer:
              "ざいこ/stock",
        },
        {
          question: "適正",
          answer:
              "てきせい/appropriate",
        },
        {
          question: "納期",
          answer:
              "のうき/deadline",
        },
        // Add more flashcards here
      ],
    };
  },
  methods: {
    nextCard() {
      this.hardButtonColor = "";
      this.moderateButtonColor = "";
      this.easyButtonColor = "";
      this.showAnswer = false;
      this.flip = false;
      this.currentCardIndex =
        (this.currentCardIndex + 1) % this.questions.length;
    },
    previousCard() {
      this.showAnswer = false;
      this.flip = false;
      this.currentCardIndex =
        (this.currentCardIndex - 1 + this.questions.length) %
        this.questions.length;
    },
    setLevel(selectedLevel) {
      this.hardButtonColor = "";
      this.moderateButtonColor = "";
      this.easyButtonColor = "";
      this[selectedLevel] = "#a2e9ee";

      const item_id = this.questions[this.currentCardIndex].itemId
      const current_data = {
        itemId : item_id,
        question : this.questions[this.currentCardIndex].question,
        answer : this.questions[this.currentCardIndex].answer,
        level : this.getSelectedLevel(selectedLevel)
      }

      const eventName = "level:update";
      this.$emit(eventName, item_id, current_data);

      this.nextCard()
    },
    getSelectedLevel (selectedLevel) {
      console.log(selectedLevel)
      if (selectedLevel === 'easyButtonColor') {
        return 1
      } else if (selectedLevel === 'moderateButtonColor') {
        return 2
      } else {
        return 3
      }
    }
  },
  computed: {
    currentQuestionNumber() {
      return this.currentCardIndex + 1;
    },
    totalQuestions() {
      return this.questions.length;
    },
    difficultyLevel () {
      if (this.questions.length > 0) {
        if (this.questions[this.currentCardIndex].level === 1) {
          this.easyButtonColor = "#a2e9ee"
        } else if (this.questions[this.currentCardIndex].level === 2) {
          this.moderateButtonColor = "#a2e9ee"
        } else {
          this.hardButtonColor = "#a2e9ee"
        }
      }
    }
  },
  props: {
      questions: {
        type: Array
      }
    }
};
</script>
  
  <style scoped>
  .question-number {
    text-align: left;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .button-container {
    max-width:20vw;
    display: flex;
    justify-content: space-between;
    margin-top: 20px;
  }
  button {
    padding: 10px;
    border: none;
    border-radius: 5px;
    /* background-color: #4caf50; */
    /* color: white; */
    cursor: pointer;
  }
  .level-container {
    max-width:20vw;
    position: relative;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .level-container button {
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  </style>
  