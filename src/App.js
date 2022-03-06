import React , {Component} from 'react';
import StudentList from './views/StudentsList/StudentsList';
import './App.scss';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
            <div className="col-12"> 
              <StudentList></StudentList>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
