import React, {Component} from 'react';
import axios from 'axios';

export default class EditTodo extends Component {

    constructor(props){
        super(props);

        this.state = {
            todo_description: '',
            todo_responsible: '',
            todo_priority: '',
            todo_completed: false
         }
    }

    componentDidMount() {
        //request current todo from backend
        axios.get('http://localhost:4000/todos/edit/'+this.props.match.params.id)
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
    render () {
        return (
            <div>
                <h3>Update Todo</h3>
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
                        <div className="form-check form-check-inline">
                        <label>Due by: </label>
                        <input  type="date"
                                className="form-control"
                                value={this.state.todo_priority}
                                onChange={this.onChangeTodoPriority}
                                />
                    </div>
                    </div>  
                    <div className="form-check">
                        <input type="checkbox"
                                className="form-check-input"
                                id="completedCheckbox"
                                name="completedCheckbox"
                                onChange={this.onChangeTodoCompleted}
                                checked={this.state.todo_completed}
                                value={this.state.todo_completed}
                                />
                        <label className="form-check-label" htmlFor="completedCheckBox">
                            Completed
                        </label>
                    </div> 
                    <br/>
                    <div className="form-group">
                        <input type="submit" value="Update Todo" clasName="btn btn-primary"/>
                    </div>  
                </form>
            </div>
        )
    }
}