<template>
  <div>
    <Flashcard
      v-if="currentCardIndex >= 0 && currentCardIndex < flashcards.length"
      :question="flashcards[currentCardIndex].question"
      :answer="flashcards[currentCardIndex].answer"
      />
    <div class="question-number">{{ currentQuestionNumber }}/{{ totalQuestions }}</div>
    <div class="button-container">
      <button @click="previousCard">Previous</button>
      <button @click="nextCard">Next</button>
    </div>
  </div>
  </template>
  
<script>
import Flashcard from "../components/FlashCard.vue";
  
export default {
  components: {
    Flashcard,
  },
  data() {
    return {
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
      this.showAnswer = false;
      this.flip = false;
      this.currentCardIndex =
        (this.currentCardIndex + 1) % this.flashcards.length;
    },
    previousCard() {
      this.showAnswer = false;
      this.flip = false;
      this.currentCardIndex =
        (this.currentCardIndex - 1 + this.flashcards.length) %
        this.flashcards.length;
    },
  },
  computed: {
    currentQuestionNumber() {
      return this.currentCardIndex + 1;
    },
    totalQuestions() {
      return this.flashcards.length;
    },
  },
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
    background-color: #4caf50;
    color: white;
    cursor: pointer;
  }
  </style>
  