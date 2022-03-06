import React , {Component} from 'react';
import ContactsList from './views/ContactsList/ContactsList';
import './App.scss';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <div className="row">
            <div className="col-12"> 
              <ContactsList></ContactsList>
            </div>
        </div>
      </div>
    );
  }
}

export default App;
