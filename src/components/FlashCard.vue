<template>
  <div class="flashcard" :class="{ flipped: isFlipped }" @click="flipCard">
    <div class="front">
      <h1>{{ question }}</h1>
    </div>
    <div class="back" @mouseover="isHovering = true" @mouseleave="isHovering = false">
      <p>{{ answer }}</p>
    </div>
    <div class="flip-text">
      <h4><i class="fas fa-sync"></i> Flip</h4>
    </div>
  </div>
</template>

<script>
import "@fortawesome/fontawesome-free/css/all.css";

export default {
  name: "FlashCard",
  props: {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      isFlipped: false,
      isHovering: false,
    };
  },
  watch: {
    question(newValue, oldValue) {
      if (newValue !== oldValue) {
        this.isFlipped = false;
      }
    },
  },
  methods: {
    flipCard() {
      this.isFlipped = !this.isFlipped;
    },
  },
};
</script>

<style scoped>
.flashcard {
  height: 58vh;
  perspective: 1000px;
  border-radius: 2%;
  margin-bottom: 7%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.front,
.back {
  position: absolute;
  width: 100%;
  height: 100%;
  font-size: 2.5rem;
  backface-visibility: hidden;
}

.front {
  background-color: rgb(216, 241, 243);
  display: flex;
  justify-content: center;
  border-radius: 2%;
  align-items: center;
  font-size: 3rem;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.front:hover {
  background-color: rgb(216, 241, 243);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2%;
  transform: scale(1.1);
}

.back {
  transform: rotateY(180deg);
  background-color: rgb(162, 233, 238);
  border-radius: 2%;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}

.back:hover {
  background-color: rgb(162, 233, 238);
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 2%;
  transform: rotateY(180deg) scale(1.1);
}

.flip-text {
  position: relative;
  top: 75%;
  opacity: 0.5;
  font-size: 1.5rem;
  left: 43%;
}

.flipped .front {
  transform: rotateY(180deg);
}

.flipped .back {
  transform: rotateY(0);
}
</style>
