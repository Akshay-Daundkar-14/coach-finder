<template>
  <base-dialog
    :show="!!error"
    title="An error occurred!"
    @close="handleError"
  >
    <p>{{ error }}</p>
  </base-dialog>
  <section>
    <coach-filter @change-filter="filteredData"></coach-filter>
  </section>
  <base-card>
    <div class="controls">
      <base-button @click="loadCoaches" mode="outline">Refresh</base-button>
      <base-button v-if="!isCoach && !isLoading" :link="true" :to="'/register'"
        >Register as Coach</base-button
      >
    </div>

    <div v-if="isLoading">
      <base-spinner></base-spinner>
    </div>

    <section v-else-if="hasCoaches">
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
import CoachFilter from '../../components/coaches/CoachFilter.vue';

export default {
  data() {
    return {
      error: null,
      isLoading: false,
      filterArea: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  components: {
    CoachItem,
    CoachFilter,
  },
  computed: {
    isCoach() {
      return this.$store.getters['coaches/isCoach'];
    },
    filteredCoach() {
      const coaches = this.$store.getters['coaches/coaches'];
      console.log('Coaches', coaches);
      return coaches.filter((coach) => {
        if (this.filterArea.frontend && coach.areas.includes('frontend')) {
          return true;
        }
        if (this.filterArea.backend && coach.areas.includes('backend')) {
          return true;
        }
        if (this.filterArea.career && coach.areas.includes('career')) {
          return true;
        }
        return false;
      });
    },
    hasCoaches() {
      return !this.isLoading && this.$store.getters['coaches/hasCoaches'];
    },
  },
  created() {
    this.loadCoaches();
  },
  methods: {
    filteredData(updatedFilterData) {
      this.filterArea = updatedFilterData;
    },
    async loadCoaches() {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/loadCoaches');
        this.isLoading = false;
      } catch (error) {
        this.error = error || 'Something Went wrong..!';
      }
    },
    handleError() {
      this.error = null;
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