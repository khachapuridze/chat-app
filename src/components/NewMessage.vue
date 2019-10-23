<template>
  <div class="new-message">
    <form @submit.prevent="addmsg">
      <el-input type="text" placeholder="Please input message" v-model="newmsg">

      </el-input>
      <button type="submit" class="my">
        <el-button type="success"> <i class="el-icon el-icon-message"></i></el-button>
      </button>
    </form>
  </div>
</template>

<style scoped>
.my {
  border: none;
  background: none;
}
  form {
    max-width: 420px;
    display: flex;
  }
</style>

<script>
  import db from '../firebase/init';
export default {
    name:'NewMessage',
    props:['name'],
    data() {
        return {
            newmsg: null
        }
    },
    methods: {
        addmsg() {
            if(this.newmsg) {
                db.collection('messages').add({
                    id : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
                    content: this.newmsg,
                    name: this.name,
                    time: Date.now()
                }).catch(err=>{
                    console.log(err);
                })
                this.newmsg = null;
            }
        }
    }
}
</script>
