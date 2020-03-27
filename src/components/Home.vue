<template>
    <div class="home" v-if="user">
        <button id="logout" class="btn btn-dark btn-sm" data-toggle="tooltip" data-placement="left" title="Logout" @click="logout"><i class="fa fa-sign-out editsym"></i></button>
        <div class="container">
            <h2 class="head">ToDo</h2>
            <p class="head2">Welcome <strong>{{user.name}}</strong>,<span>Let's see your ToDo's</span></p>
            <div class="todolist">
                <ul class="list-group">
                    <li class="list-group-item" v-for="(item,index) in user.todos" :key=index>
                        <span v-if="item.todo.length>25">{{item.todo.slice(0,20)}}...</span>
                        <span v-else>{{item.todo}}</span>
                    <i @click="edittodo(index)" data-toggle="modal" data-target="#todomodal" class="fa fa-pencil"></i>
                    </li>
                    <li class="add list-group-item">
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" v-model="newtodo" v-on:keyup.enter="addItem">
                            <div class="input-group-append" @click="addItem">
                                <span class="input-group-text"><i class="fa fa-plus"></i></span>
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
                            <button type="button" class="btn btn-primary" @click="todoedit" data-dismiss="modal"><i class="fa fa-save editsym"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name:'Home',
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
                this.$store.dispatch('add',{todo:this.newtodo}).then(res=>{
                    this.user.todos=res
                    this.newtodo=''
                })
                .catch(err=>{
                    console.log(err)
                })
            }
        },
        realTodos(){
            this.user.todos=this.user.todos
        },
        edittodo(index){
            this.index=index
            this.todoed=this.user.todos[index].todo
        },
        deletetodo(){
            this.$store.dispatch('delete',{index:this.user.todos[this.index].id}).then((res)=>{
                this.user.todos=res
                this.index=0
                this.todoed=''    
            })
            .catch(err=>{
                console.log(err)
            })
        },
        todoedit(){
            this.$store.dispatch('edit',{index:this.user.todos[this.index].id,todo:this.todoed}).then((res)=>{
                this.user.todos=res
                this.index=0
                this.todoed=''    
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
    font-size: 1.6rem;
    margin-bottom: 40px;
}
.head2 span{
    display: block;
}
.todolist{
    width: 40%;
    margin: 0 auto;
    padding-bottom: 40px;
    overflow: hidden;
}
.mb-3{
    margin: 0!important;
}
.fa{
    color: rgb(76, 182, 129);
    font-size: 1.3rem;
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