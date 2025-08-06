import React from 'react';
import {Link} from 'react-router';
function MainPage(props) {
    return (
        <div>
           <div>
              <ul>
                <li>
                    <Link to="/counter">카운트 예제</Link>
                </li>
                  <li>
                    <Link to="/todo">할일 예제</Link>
                </li>
                  <li>
                    <Link to="/hobby">취미 예제</Link>
                </li>
                  <li>
                    <Link to="/login">로그인 예제</Link>
                </li>
              </ul>
            </div> 
        </div>
    );
}

export default MainPage;