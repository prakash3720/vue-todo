<template>
    <div class="home" v-if="user">
        <div class="scene">
            <div class="inner">
                <PulseLoader />
            </div>
        </div>
        <button id="logout" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="left" title="Logout" @click="logout"><i class="fa fa-sign-out editsym"></i></button>
        <div class="container">
            <h2 class="head">ToDo</h2>
            <p class="head2">Welcome <strong>{{user.name}}</strong>,<span>Your ToDo's List</span></p>
            <div class="todolist">
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item,index) in user.todos" :key=index>
                        <span v-if="item.todo.length>25">{{item.todo.slice(0,18)}}...</span>
                        <span v-else>{{item.todo}}</span>
                    <i @click="edittodo(index)" data-toggle="modal" data-target="#todomodal" class="fa fa-pencil"></i>
                    </li>
                    <li class="add list-group-item">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="newtodo" v-on:keyup.enter="addItem">
                            <div class="input-group-append" @click="addItem">
                                <span class="input-group-text"><i id="plus" class="fa fa-plus"></i></span>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>

            <div class="modal fade" id="todomodal" tabindex="-1" role="dialog">
                <div class="modal-dialog" role="document">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title">Edit</h5>
                            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div class="modal-body">
                            <input type="text" class="form-control" v-model="todoed">
                        </div>
                        <div class="modal-footer">
                            <!-- <button type="button" class="btn btn-alert" data-dismiss="modal">Delete</button> -->
                            <button type="button" class="btn btn-danger" @click="deletetodo" data-dismiss="modal"><i class="fa fa-trash editsym"></i></button>
                            <button type="button" class="btn btn-primary" @click="todoedit" data-dismiss="modal"><i class="fa fa-check editsym"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import PulseLoader from 'vue-spinner/src/BeatLoader.vue'
export default {
    name:'Home',
    components:{
        PulseLoader
    },
    data(){
        return{
            user:{},
            newtodo:'',
            index:0,
            todoed:''
        }
    },
    methods:{
        addItem(){
            if(this.newtodo){
                document.getElementById('plus').classList.remove("fa-plus")
                document.getElementById('plus').classList.add("fa-spinner")
                document.getElementById('plus').classList.add("fa-spin")
                this.$store.dispatch('add',{todo:this.newtodo}).then(res=>{
                    this.user.todos=res
                    this.newtodo=''
                    document.getElementById('plus').classList.add("fa-plus")
                    document.getElementById('plus').classList.remove("fa-spinner")
                    document.getElementById('plus').classList.remove("fa-spin")
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        realTodos(){
            document.querySelector('.scene').style.display="none"
            this.user.todos=this.user.todos
        },
        edittodo(index){
            this.index=index
            this.todoed=this.user.todos[index].todo
        },
        deletetodo(){
            document.getElementById('plus').classList.remove("fa-plus")
            document.getElementById('plus').classList.add("fa-spinner")
            document.getElementById('plus').classList.add("fa-spin")
            this.$store.dispatch('delete',{index:this.user.todos[this.index].id}).then((res)=>{
                this.user.todos=res
                this.index=0
                this.todoed=''
                document.getElementById('plus').classList.add("fa-plus")
                document.getElementById('plus').classList.remove("fa-spinner")
                document.getElementById('plus').classList.remove("fa-spin")    
            })
            .catch(err=>{
                console.log(err)
            })
        },
        todoedit(){
            document.getElementById('plus').classList.remove("fa-plus")
            document.getElementById('plus').classList.add("fa-spinner")
            document.getElementById('plus').classList.add("fa-spin")
            this.$store.dispatch('edit',{index:this.user.todos[this.index].id,todo:this.todoed}).then((res)=>{
                this.user.todos=res
                this.index=0
                this.todoed=''
                document.getElementById('plus').classList.add("fa-plus")
                document.getElementById('plus').classList.remove("fa-spinner")
                document.getElementById('plus').classList.remove("fa-spin")    
            })
            .catch(err=>{
                console.log(err)
            })
        },
        logout(){
            this.user={}
            this.$store.dispatch('logout')
            this.$router.push({name:'Login'})
        }
    },
    watch:{
        user:'realTodos'
    },
    beforeCreate(){
        this.$store.dispatch('home').then(res=>{
            this.user=res
        })
    },
    created(){
        window.scrollTo(0,0)
    }
}
</script>

<style scoped>
.home{
    min-height: 100vh;
    background-color: #f5f5f5;
}
.head{
    padding:25px;
    text-align: center;
    margin: 0;
}
.head2{
    text-align: center;
    font-size: 1.45rem;
    margin-bottom: 40px;
}
.head2 span{
    display: block;
}
.todolist{
    width: 35%;
    margin: 0 auto;
    padding-bottom: 40px;
    overflow: hidden;
}
.mb-3{
    margin: 0!important;
}
.fa{
    color: rgb(59, 160, 219);
    font-size: 1.4rem;
}
li{
    font-size: 1.18rem;
}
.input-group-append{
    cursor: pointer;
}
.list-group-item{
    position: relative;
}
.fa-pencil{
    position: absolute;
    right: 20px;
    cursor: pointer;
}
.modal-body input{
    width: 100%;
}
#logout{
    position: absolute;
    right: 0;
    margin-top: 15px;
    margin-right: 15px;
    border-radius: 25%;
}
.scene{
    position: absolute;
    height: 100vh;
    z-index: 1;
    top: 0;
    left: 0;
    width: 100%;
    background-color: #f5f5f5;
    display: flex;
    align-items: center;
    justify-content: center;
}
.editsym{
    color: #fff!important;
}
@media only screen and (max-width: 768px){
    .todolist{
        width: 100%;
        margin: 0 auto;
        padding-bottom: 40px;
        overflow: hidden;
    }
}
</style>