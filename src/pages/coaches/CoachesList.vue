<template>
  <section>FILTER</section>

  <div class="controls">
    <button>Refresh</button>
    <router-link to="/register">Register as Coach</router-link>
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