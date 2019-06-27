import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';


const Todo = props => (
    <tr>
        <td>{props.todo_description}</td>
        <td>{props.todo_responsible}</td>
        <td>{props.todo_priority}</td>
        <td>
            <Link to={"/edit/"+props.todo._id}>Edit</Link>
        </td>
    </tr>
)

export default class TodosList extends Component {

    // introduce constructor so we can set initial state
    constructor(props) {
        super(props);
        //stating todos will contain some type of array
        this.state = {todos: []};
    }

    componentDidMount() {
        axios.get('http://localhost:4000/todos/')
             .then(response => {
                 this.setState({todos: response.data});
             })
             .catch(function (error) {
                 console.log(error);
             })
    }

    todoList() {
        return this.state.todos.map(function(currentTodo, i){
            return <Todo todo={currentTodo} key={i}/>;
        });
    }

    render () {
        //returns the list of todos
        return (
            <div>
                <h3>Moving Todos</h3>
                <table className="table table-striped" style={{ marginTop: 20}} >
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Responsible</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.todoList() }
                    </tbody>
                </table> 
            </div>
        )
    }
}