import { React, Component } from 'react';
import './ContactList.css';

export default class ContactList extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!(prevProps.contacts.length === this.props.contacts.length)) {
      localStorage.setItem('contacts', JSON.stringify(this.props.contacts));
    }
  }
  render() {
    const { contacts, deleteItem } = this.props;

    return (
      <ul>
        {contacts.map(contact => {
          return (
            <li key={contact.id} className="list-item">
              {`${contact.name}: ${contact.number}`}
              <button
                id={contact.id}
                onClick={deleteItem}
                className="delete-btn"
              >
                delete
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
}
