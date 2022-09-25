<template>
  <button class="sound-player" @click="toggleSound">
    <img v-if="!isSoundEnabled" src="@/assets/images/playsound.svg" />
    <img v-else src="@/assets/images/stopsound.svg" />
  </button>
</template>

<script>
export default {
  data() {
    return {
      audio: null
    }
  },
  computed: {
    isSoundEnabled() {
      return this.$store.state.isSoundEnabled;
    }
  },
  mounted() {
    this.$store.commit('initializeSound');
    this.playSound();
  },
  methods: {
    toggleSound() {
      this.$store.commit('toggleSound');
      this.playSound()
    },
    playSound() {
      if (this.isSoundEnabled) {
        this.audio = new Audio(require('@/assets/sounds/spaceship-ambience-2.mp3').default);
        this.audio.loop = true;
        this.audio.volume = 1;
        this.audio.play();
      } else if (this.audio) {
        this.audio.pause();
      }
    }
  }
}
</script>

<style>
.sound-player {
  position: fixed;
  bottom: 15px;
  right: 15px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 4px solid white;
  font-family: 'goblin';
  font-size: 10px;
  background-color: black;
}
</style>