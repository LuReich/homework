import React, { useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
function TodoList(props) {
    const id = useRef(0);

    const[todoList, setTodoList] = useState([]);
    const[inputText, setInputText] = useState('');
 
    const addTodo = () =>{

        if(inputText.trim().length === 0) {
            alert('할일을 입력');
            return false;
        }

        setTodoList( (prev) => [...prev ,  {id:++id.current, todo: inputText}] );

    }

    return (
        <div style={{width:'500px', margin:'0 auto'}}>
            <div>
                <header>
                    <h2>Todo List</h2>
                </header>
            </div>
            <div className='row'>
                 <label htmlFor='todoInput' className='form-label'>할 일</label>
                <div className='col-10'>
                    <input type='text' 
                      id='todoInput'
                      style={{width:'90%'}}
                    className='form-control' value={inputText} onChange={(e)=> setInputText(e.target.value)} />
                </div>
                <div className='col-2'>
                    <button type='button' className='btn btn-primary' onClick={addTodo}>추가</button>
                </div>           
            </div>
            <div>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>아이디</th>
                            <th>할 일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            todoList?.map(todo=>(
                                <tr key={todo.id}>
                                    <td>{todo.id}</td>
                                    <td>{todo.todo}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>

            </div>
        </div>
    );
}

export default TodoList;