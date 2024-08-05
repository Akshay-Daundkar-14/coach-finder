<template>
  <base-card>
    <h2>Find Your Coach</h2>

    <span class="filter-option">
      <input type="checkbox" checked id="frontend" @change="changeArea" />
      <label for="frontend">Frontend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" checked id="backend" @change="changeArea" />
      <label for="backend">Backend</label>
    </span>

    <span class="filter-option">
      <input type="checkbox" checked id="career" @change="changeArea" />
      <label for="career">Career</label>
    </span>
  </base-card>
</template>

<script>
export default {
  data() {
    return {
      filteredData: {
        frontend: true,
        backend: true,
        career: true,
      },
    };
  },
  methods: {
    changeArea(event) {
      const isChange = event.target.checked;
      const changedInputArea = event.target.id;

      const updatedFilterData = {
        ...this.filteredData,
        [changedInputArea]: isChange,
      };

        this.filteredData = updatedFilterData;

      this.$emit('change-filter', updatedFilterData);
    },
  },
};
</script>



<style scoped>
h2 {
  margin: 0.5rem 0;
}

.filter-option {
  margin-right: 1rem;
}

.filter-option label,
.filter-option input {
  vertical-align: middle;
}

.filter-option label {
  margin-left: 0.25rem;
}

.filter-option.active label {
  font-weight: bold;
}
</style>