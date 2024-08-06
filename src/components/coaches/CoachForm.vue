<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{invalid : !firstname.isValid}">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="firstname.val" @blur="clearValidity('firstname')" />
    </div>

    <div class="form-control" :class="{invalid : !lastname.isValid}">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="lastname.val" @blur="clearValidity('lastname')"  />
    </div>

    <div class="form-control" :class="{invalid : !description.isValid}">
      <label for="description">Description</label>
      <textarea v-model.trim="description.val" id="description" rows="5" @blur="clearValidity('description')" ></textarea>
    </div>

    <div class="form-control" :class="{invalid : !rate.isValid}">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" @blur="clearValidity('rate')"  v-model.number="rate.val" />
    </div>

    <div :class="{invalid : !areas.isValid}" @blur="clearValidity('areas')">
      <h3>Area of Expertise</h3>
      <div class="form-control"  :class="{invalid : !areas.isValid}">
        <input type="checkbox" id="frontend" value="frontend"    v-model="areas.val" />
        <label for="frontend">Frontend Development</label>
      </div>

      <div class="form-control">
        <input type="checkbox" id="backend" value="backend" v-model="areas.val" />
        <label for="backend">Backend Development</label>
      </div>

      <div class="form-control">
        <input type="checkbox" id="career" value="career" v-model="areas.val" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <div v-if="!isFormValid" :class="{invalid : !isFormValid.isValid}">
      <h4 style="color:red">All fields are mandatory.</h4>
    </div>
    <base-button>Register</base-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      isFormValid:true,
      firstname: {
        val: '',
        isValid: true,
      },
      lastname: {
        val: '',
        isValid: true,
      },
      description: {
        val: '',
        isValid: true,
      },
      rate: {
        val: null,
        isValid: true,
      },
      areas: {
        val: [],
        isValid: true,
      },
    };
  },
  methods: {
    clearValidity(input){
      this[input].isValid = true;
    },
    validateForm(){
       this.isFormValid = true;
      if(this.firstname.val==='')
      {
        this.firstname.isValid = false;
        this.isFormValid = false;
      }
      if(this.lastname.val==='')
      {
        this.lastname.isValid = false;
        this.isFormValid = false;
      }
      if(this.description.val==='')
      {
        this.description.isValid = false;
        this.isFormValid = false;
      }
      if(!this.rate.val || this.rate.val<0)
      {
        this.rate.isValid = false;
        this.isFormValid = false;
      }
      if(this.areas.val.length ===0)
      {
        this.areas.isValid = false;
        this.isFormValid = false;
      }
    },
    submitForm() {
      this.validateForm();
      if(!this.isFormValid){
        return;
      }
      const formData = {
        first: this.firstname.val,
        last: this.lastname.val,
        rate: this.rate.val,
        description: this.description.val,
        areas: this.areas.val,
      };
      this.$emit('save-data', formData);
    },
  },
};
</script>


<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>