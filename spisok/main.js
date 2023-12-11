
const todoItem = {
    props: ["todo", "index"],
    emits: ["complete-done"],
    methods: {
        completed() {
            this.$emit("comlete-done")
           // this.$emit("comlete-done")
        }
    },


    template: `
    <div>
        {{index}} - {{todo.title}}
  
       <input type="checkbox" :checked="todo.completed" v-on:click="completed">
    </div>
    `,
////     // <input type="checkbox" :checked="todo.completed" v-on:click="complete">
};

const app = Vue.createApp(
    {
        data() {
            return {
                todoList: [
                    {
                        "title": "задача 1",
                        "completed": false,
                        "noActive": false
                    },
                    {
                        "title": "задача 2",
                        "completed": false,
                        "noActive": false
                    }
                ],
            }
        },
        methods: {
            
            makeDone(index) {
                // console.log("before",this.todoList[index]);
                this.todoList[index].completed = !this.todoList[index].completed;
                // console.log("after",this.todoList[index]);
            },
            add() {
                if (!this.itemForAdd.trim()) {
                    return;
                }
                this.todoList.push(
                    {
                        "title": this.itemForAdd,
                        "completed": false,
                        "noActive": false,
                        "id": this.todoList.length + 1
                    }
                )
            },
            del(index) {
                console.log(index);
                this.todoList.splice(index,

                    1);
            },
            filter1() {
                this.todoList.forEach(element => {
                    if (element.completed == false) { element.noActive = true }
                    else { element.noActive = false }
                });
            },
            filter2() {
                this.todoList.forEach(element => {
                    if (element.completed == true) { element.noActive = true }
                    else { element.noActive = false }
                });
            },
            allTasks() {
                this.todoList.forEach(element => {
                    element.noActive = false
                });
            },
            sort1() {
                this.todoList = this.todoList.sort((a, b) => a.title > b.title ? 1 : -1);
            },
            sort2() {
                this.todoList = this.todoList.sort((a, b) => a.id < b.id ? 1 : -1);
            },
            sort3() {
                this.todoList = this.todoList.sort((a, b) => b.id < a.id ? 1 : -1);
            }
        }
        ,
        components: {
            "todo-item": todoItem,
        },


        mounted() {
            //  fetch('https://jsonplaceholder.typicode.com/todos/')
            //      .then(response => response.json())
            //      .then(json => (this.todoList = json))
        }
    }
)
app.mount("#app")