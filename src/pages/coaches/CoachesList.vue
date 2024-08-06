<template>
  <div>
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
        <base-button @click="loadCoaches(true)" mode="outline"
          >Refresh</base-button
        >
        <base-button
          v-if="!isCoach && !isLoading"
          :link="true"
          :to="'/register'"
          >Register as Coach</base-button
        >
      </div>

      <div v-if="isLoading">
        <base-spinner></base-spinner>
      </div>

      <section v-else-if="hasCoaches">
        <transition name="coach">
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
        </transition>
      </section>
      <h3 v-else>No Coaches Found</h3>
    </base-card>
  </div>
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
    async loadCoaches(refresh = false) {
      try {
        this.isLoading = true;
        await this.$store.dispatch('coaches/loadCoaches', {
          forceRefresh: refresh,
        });
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


.coach-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}
.coach-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.coach-enter-active {
  transition: all 3s ease-out;
}

.coach-leave-active {
  transition: all 3s ease-in;
}

.coach-enter-to,
.coach-leave-from {
  opacity: 1;
  transform: translateX(0);
}

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