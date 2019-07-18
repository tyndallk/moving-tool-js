import React, {Component} from 'react';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export default class DeleteTodo extends Component {

    constructor(props){
        super(props);

        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false,
            redirect: false
         }
    }

    componentDidMount() {
        //request current todo from backend
        axios.get('http://localhost:4000/todos/'+this.props.match.params.id)
             .then(response => {
                 this.setState({
                     todo_description: response.data.todo_description,
                     todo_responsible: response.data.todo_responsible,
                     todo_priority: response.data.todo_priority,
                     todo_completed: response.data.todo_completed
                 })
             })
             .catch(function(error){
                 console.log(error)
             })
    }

    onSubmit(e){
        e.preventDefault();
        const obj= {
            todo_description: this.state.todo_description,
            todo_responsible: this.state.todo_responsible,
            todo_priority: this.state.todo_priority,
            todo_completed: this.state.todo_completed
        
        };
        this.setState({
            redirect: true

        })
        axios.post('http://localhost:4000/todos/delete/'+this.props.match.params.id, obj)
             .then(res => console.log(res.data));


    }
    render () {
        const redirect = this.state.redirect
        if (redirect=== true) {
            this.setState({
                redirect: false
            })
            return <Redirect to="/"></Redirect>

        }
        return (
            <div>
                <h3>Delete Todo</h3>
                <form onSubmit={this.onSubmit}>
                    <div clasName="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.todo_description}
                                onChange={this.onChangeTodoDescription}
                                />
                     </div>    
                     <div clasName="form-group">
                        <label>Responsible: </label>
                        <input type="text"
                                className="form-control"
                                value={this.state.todo_responsible}
                                onChange={this.onChangeTodoResponsible}
                                />
                     </div> 
                     <div className="form-group">
                        <label>Due by: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.todo_priority}
                                onChange={this.onChangeTodoPriority}
                                />
                    </div>

                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Delete Todo" clasName="btn btn-primary"/>
                    </div>  
                </form>
            </div>
        )
    }
}