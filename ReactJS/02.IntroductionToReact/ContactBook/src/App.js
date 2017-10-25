import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

// import Contact from './Contact'
import DetailedContact from './DetailedContact'

let contacts = [
  {
    "firstName": "Ivan",
    "lastName": "Ivanov",
    "phone": "0888 123 456",
    "email": "i.ivanov@gmail.com"
  },
  {
    "firstName": "Jordan",
    "lastName": "Kirov",
    "phone": "0988 456 789",
    "email": "jordk@gmail.com"
  },
  {
    "firstName": "Maria",
    "lastName": "Petrova",
    "phone": "0899 987 654",
    "email": "mar4eto@abv.bg"
  },
  {
    "firstName": "Sterling",
    "lastName": "Archer",
    "phone": "0123 123 123",
    "email": "archer@misix.com"
  },
  {
    "firstName": "Lana",
    "lastName": "Kane",
    "phone": "0123 423 873",
    "email": "lana@misix.com"
  },
  {
    "firstName": "Cyril",
    "lastName": "Figgis",
    "phone": "0123 176 679",
    "email": "cyril@misix.com"
  },
  {
    "firstName": "Cheryl",
    "lastName": "Tunt",
    "phone": "0123 277 380",
    "email": "cheryl@misix.com"
  },
  {
    "firstName": "Pam",
    "lastName": "Poovey",
    "phone": "0123 070 768",
    "email": "pam@misix.com"
  },
  {
    "firstName": "Malory",
    "lastName": "Archer",
    "phone": "0123 999 999",
    "email": "malory@misix.com"
  }
]

let idx = 0;

class Contact extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="contact" data-id={this.props.person.id} onClick={() => {
        idx = this.props.person.index;
        ReactDOM.render(ReactDOM.render(<App />, document.getElementById('root')));
      }}>
        <span className="avatar small">&#9787;</span>
        <span className="title">{this.props.person.firstName} {this.props.person.lastName}</span>
      </div>
    );
  }
}


class App extends Component {

  render() {
    return (

      <div className="container">
        <header>&#9993; Contact Book</header>
        <div id="book">
          <div id="list">
            <h1>Contacts</h1>
            <div className="content">

              {contacts.map((c, index) => {
                c.index = index;
                return <Contact key={index} person={c} />
              })}


            </div>
          </div>
          <div id="details">
            <h1>Details</h1>

            {
              <DetailedContact person={idx} />
            }

          </div>
        </div>
        <footer>Contact Book SPA &copy; 2017</footer>
      </div>
    );
  }
}

export default App;
