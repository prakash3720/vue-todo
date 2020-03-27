import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios'

Vue.use(Vuex)

export const store=new Vuex.Store({
    state:{
        token:localStorage.getItem('token')||'',
        user:{}
    },
    getters:{
        isLoggedIn:state=>!!state.token
    },
    mutations:{

    },
    actions:{
        login:(context,data)=>{
            return new Promise((resolve,reject)=>{
                    axios.post('http://prakash3720.pythonanywhere.com/api/login/',data).then((response)=>{
                    let res=response.data
                    let token="Token "
                    token=token+res.token
                    context.state.token=token
                    localStorage.setItem('token',token)
                    axios.defaults.headers.common['Authorization']=token
                    resolve({status:1})
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        register:(context,data)=>{
            return new Promise((resolve,reject)=>{
                axios.post('http://prakash3720.pythonanywhere.com/api/profile/',data).then((response)=>{
                    resolve({status:1})
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        home:(context)=>{
            return new Promise((resolve,reject)=>{
                axios.get('http://prakash3720.pythonanywhere.com/api/profile/').then(dat=>{
                    context.state.user=dat.data[0]
                    axios.get('http://prakash3720.pythonanywhere.com/api/todo/').then(todos=>{
                        context.state.user.todos=todos.data
                        resolve(context.state.user)
                    })
                    .catch(err=>{
                        reject(err)
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        add:(context,data)=>{
            return new Promise((resolve,reject)=>{
                axios.post('http://prakash3720.pythonanywhere.com/api/todo/',data).then(dat=>{
                    axios.get('http://prakash3720.pythonanywhere.com/api/todo/').then(todos=>{
                        resolve(todos.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        delete:(context,data)=>{
            return new Promise((resolve,reject)=>{
                axios.delete(`http://prakash3720.pythonanywhere.com/api/todo/${data.index}/`).then(()=>{
                    axios.get('http://prakash3720.pythonanywhere.com/api/todo/').then(todos=>{
                        resolve(todos.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        edit:(context,data)=>{
            return new Promise((resolve,reject)=>{
                axios.patch(`http://prakash3720.pythonanywhere.com/api/todo/${data.index}/`,{todo:data.todo}).then(()=>{
                    axios.get('http://prakash3720.pythonanywhere.com/api/todo/').then(todos=>{
                        resolve(todos.data)
                    })
                    .catch(err=>{
                        console.log(err)
                    })
                })
                .catch(err=>{
                    reject(err)
                })
            })
        },
        logout:(context)=>{
            context.state.token=''
            context.state.user={}
            localStorage.removeItem('token')
            delete axios.defaults.headers.common['Authorization']
        }
    }
})