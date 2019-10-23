<template>
  <div class="welcome">
    <div class="container">
      <div class="welcome__title">
        <h2>Group Chat </h2>
      </div>
      <form @submit.prevent = "enterName">
        <label for="name">შეიყვანე შენი სახელი: </label>
        <el-input
          placeholder="Please enter name"
          v-model="name"
          clearable>
        </el-input>

        <el-alert v-if="feedback"
          title="you must enter the name!"
          type="error">
        </el-alert>
        <button type="submit" class="my">
          <el-button type="success">დამაჭირე </el-button>
        </button>
      </form>
    </div>

  </div>
</template>
<style >
  .welcome {
    display: flex;
    flex-direction: column;
    box-shadow: 6px 8px 14px -10px black;
    border: 1px solid #e0e0e0;
    border-radius: 2%;
    padding: 5%;
  }
  h2 {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
  }
  form input{
    margin: 5% 0;
  }
  form {
    max-width: 300px;
  }
  .container {
    margin: auto;
  }
  .my {
    border: none;
    background: none;
  }
</style>
<script>
  export default {
      name: 'welcome',
      data() {
          return {
              name: null,
              feedback:null
          }
      },
      methods: {
          enterName() {
              if(this.name) {
                  console.log(this.name);
                  this.feedback = null;
                  this.$router.push({ name:'Chat',params: {name: this.name }});
              }else {
                  this.feedback = "you must enter the name!";
              }
          }
      }
  }
</script>
