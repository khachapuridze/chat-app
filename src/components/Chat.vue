<template>
  <div class="chat">
    <div class="chat-cont" v-chat-scroll>
      <h6>Group joined {{this.name}}</h6>
      <div class="chat-texts" v-for="msg in message" :key="msg.id">

        <div class="chat-name">
          <h2 class="message"><span>{{msg.content}}</span> </h2>
          <h4 class="name">{{msg.name}}</h4>
        </div>
        <h6 class="time">დრო {{msg.time}}</h6>
        <el-button class="delete" type="danger" @click="clearmsg(msg.id)"> <i class="el-icon el-icon-delete"></i> </el-button>
      </div>
    </div>

    <div class="input">
      <new-message :name="name" />
    </div>
    <div >
        <el-button type="danger" @click="clear">გაასუფთავე მესიჯები</el-button>
      <router-link to="/">
        <el-button type="warning">გასვლა</el-button>
      </router-link>
    </div>

  </div>
</template>

<style>
  .chat {
    display: flex;
    flex-direction: column;
    box-shadow: 6px 8px 14px -10px black;
    border: 1px solid #e0e0e0;
    border-radius: 2%;
    padding: 5%;
  }
  .chat-name {
    display: flex;
    flex-direction: column;
    align-items: baseline;
  }
  .time {
    margin-top: 14px;
  }

  .chat-texts {
    display: flex;
    flex-direction: column;
    align-items: baseline;
    border-bottom: 1px solid #aeaeae;
    position: relative;

  }
  .delete {
    position: absolute;
    top: 25px;
    right: 20px;
    padding: 9px 11px !important;
    font-size: 12px !important;
  }

.chat-cont {
  max-height: 500px;
  overflow: auto;
}
  .message span {
    font-size: 40px;

  }
  input {
    margin-top: 5%;
  }
  .new-message {
    display: flex;
    justify-content: center;
    margin: 3% 0;
  }

  .name {
    color: #c0c4cc;
    margin: 0;
  }

  .message {
    color: #606266;
    font-size: 19px;
  }


</style>


<script>
  import NewMessage from "./NewMessage";
  import db from '../firebase/init';
  import moment from 'moment';

  export default {
        name: 'chat',
        props: ['name'],
        components: {
            NewMessage
        },
        data() {
            return {
                message:[],
                names:[]
            }
        },

      methods: {
            clear() {
               console.log(db.collection('messages').get()
                   .then(
                       resp => {
                           resp.forEach(data => {
                               data.ref.delete()
                               this.message = []

                           })
                       }
                   ))
            },
            clearmsg(id) {
                  db.collection('messages').doc(id).delete()
                      .then(() =>{
                          this.message = this.message.filter(find=>{
                              return find.id != id
                          })
                      })
            }
      },
      created() {
            let ref = db.collection('messages').orderBy('time')
            ref.onSnapshot(snapshot =>{
                snapshot.docChanges().forEach(change => {
                    if(change.type == 'added') {
                        let doc = change.doc.data();
                        this.message.push({
                            id:doc.id,
                            name: doc.name,
                            content:doc.content,
                            time: moment(doc.time).format('MMMM Do, h:mm:ss a')
                        });
                        console.log(doc.id)
                    }
                })
            })
        }
    }
</script>
