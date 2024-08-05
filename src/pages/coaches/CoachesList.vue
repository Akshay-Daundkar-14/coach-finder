<template>
  <section>FILTER</section>
  <base-card>
    <div class="controls">
      <base-button mode="outline">Refresh</base-button>
      <base-button :link='true' :to="'/register'">Register as Coach</base-button>
    </div>

    <section v-if="hasCoaches">
      <ul>
        <coach-item
          v-for="coach in filteredCoach"
          :key="coach.id"
          :firstName="coach.firstName"
          :areas="coach.areas"
          :id="coach.id"
          :lastName="coach.lastName"
          :rate="coach.hourlyRate"
        ></coach-item>
      </ul>
    </section>
    <h3 v-else>No Coaches Found</h3>
  </base-card>
</template>

<script>
import CoachItem from '../../components/coaches/CoachItem.vue';

export default {
  components: {
    CoachItem,
  },
  computed: {
    filteredCoach() {
      return this.$store.getters['coaches/coaches'];
    },
    hasCoaches() {
      return this.$store.getters['coaches/hasCoaches'];
    },
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>