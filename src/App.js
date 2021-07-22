import React, { Component } from 'react';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import ContactForm from './components/ContactForm/ContactForm';
import Filter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';

class App extends Component {
  state = {
    contacts: [
      { id: uuidv4(), name: 'Rosie Simpson', number: '459-12-56' },
      { id: uuidv4(), name: 'Hermione Kline', number: '443-89-12' },
      { id: uuidv4(), name: 'Eden Clements', number: '645-17-79' },
      { id: uuidv4(), name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
    name: '',
    number: '',
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.setState(prevState => {
      if (
        prevState.contacts.some(contact =>
          contact.name.includes(prevState.name),
        )
      ) {
        alert(`${prevState.name} is already in contacts`);
        return;
      }

      return {
        contacts: [
          ...prevState.contacts,
          { id: uuidv4(), name: prevState.name, number: prevState.number },
        ],
      };
    });
  };

  handleFilter = () => {
    const { filter, contacts } = this.state;

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase()),
    );
  };

  deleteItem = e => {
    const elemIndexToDelete = this.state.contacts.findIndex(
      contact => e.target.id === contact.id,
    );
    return this.setState(prevState => {
      console.log(elemIndexToDelete);
      prevState.contacts.splice(elemIndexToDelete, 1);

      return { prevState };
    });
  };

  render() {
    const { name, number, filter } = this.state;
    return (
      <div className="container">
        <h1>Phonebook</h1>
        <ContactForm
          name={name}
          number={number}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />

        <h2>Contacts</h2>
        <Filter filter={filter} handleChange={this.handleChange} />
        <ContactList
          contacts={this.handleFilter()}
          deleteItem={this.deleteItem}
        />
      </div>
    );
  }
}

export default App;
