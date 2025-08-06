import { createBrowserRouter } from 'react-router';
import MainPage from '../pages/MainPage';
import CounterExam from '../exam/CounterExam';
import TodoList from '../exam/TodoList';
import HobbiesExam from '../exam/HobbiesEXam';
import LoginExam from '../exam/LoginExam';

const root = createBrowserRouter([
    {
        path:'',
        element :<MainPage/>,
    },
    {  
        path:'counter',
        element :<CounterExam/>
    },
    {  
        path:'todo',
        element :<TodoList/>
    },
       {  
        path:'hobby',
        element :<HobbiesExam/>
    },
       {  
        path:'login',
        element :<LoginExam/>
    }
]);

export default root;