import { Component } from "react";
import React from "react";
import { nanoid } from 'nanoid';
import ContactForm from "./Form/ContactForm";
import Filter from "./Filter/Filter";
import ContactsList from "./ContactsList/ContactsList";
import { Container, MainTitle, SecondTitle } from "./Container.styled";


export default class App extends Component {

  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {

    const contacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(contacts);

    if (parsedContacts) {
      this.setState({ contacts: parsedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {

    const nextContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (nextContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(nextContacts));
    }

  }


  addContact = ({name, number}) => {
      const normalizedName = name.toString().toLowerCase();

      const modelId = nanoid();
      
      let inContacts = false;

    this.state.contacts.forEach(contact => {
      if (contact.name.toString().toLowerCase() === normalizedName) {
        alert(`${name} is already in contacts`);
        inContacts = true;
      }
    });

    if (inContacts) {
      return;
    }

    const contact = {
      name,
      number,
      id: modelId,
    };
    
    this.setState(prevState => (
      { contacts: [contact, ...prevState.contacts], }));
  }

  deleteContact = contactId => {
    this.setState(prevState => ({
      contacts: prevState.contacts.find(contact => contact.id !== contactId),
    }));
  };

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  };
  
  getVisibleContacts = () => {
    const { filter} = this.state;
    const normalizedFilter = filter.toLowerCase();

    return this.state.contacts.filter(contact =>
      contact.name.toString().toLowerCase().includes(normalizedFilter),
    );
  };

    
  render() {
      
   const visibleContacts = this.getVisibleContacts();
      
    return (
        <Container>
           <MainTitle>Phonebook</MainTitle>
        <ContactForm onSubmit={this.addContact} />
        
          <SecondTitle>Contacts</SecondTitle>
        <Filter value={this.state.filter} onChange={this.changeFilter}/>
         
        <ContactsList
          contacts={visibleContacts}
          onDeleteContact={this.deleteContact}
        
        />
          </Container>
      );
    }

    }
