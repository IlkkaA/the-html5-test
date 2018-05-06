import React from 'react';
import Axios from 'axios';
import Uuid from 'uuid/v4';
import './index.css';
import './styles/NewParticipantForm.css';
import './styles/ParticipantTable.css';

import Header from './components/Header';
import ListTitle from './components/ListTitle';
import NewParticipantForm from './components/NewParticipantForm';
import ParticipantTable from './components/ParticipantTable';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUuid: null,
      newId: '',
      newName: '',
      newEmail: '',
      newPhone: '',
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      isSubmitBtnDisabled: true,
      participants: [],
      editedParticipants: [],
      columnSortedBy: '',
      ascendingDir: false

    };
  }

  componentDidMount = () => {
    Axios.get('https://my.api.mockaroo.com/new-html5-test.json?key=f913ed70')
      .then(response => {
        response.data.map(participant => {
          if (participant.isEditing) {
            participant.isEditing = false;
            return participant;
          }
          return participant;
        });
        this.setState({
          newId: response.data.length + 1,
          participants: response.data,
          editedParticipants: response.data
        });
    });
    this.generateNewUuid();
  }

  generateNewUuid = () => {
    let uuid = Uuid();
    this.setState({newUuid: uuid})
  }

  handleNewParticipantInput = (fieldName, fieldValue) => {
    this.setState({[fieldName]: fieldValue},
     () => {this.validateField(fieldName, fieldValue)});
  }

  validateField(fieldName, fieldValue) {
    switch(fieldName) {
      case 'newName':
        (fieldValue.match(/^[a-zåäöä,',-]{2,15}[\s][a-zåäö,',-]{1,25}$/i)) ?
          this.setState({nameValid: true}, () => {this.toggleSubmitButton()})
          :
          this.setState({nameValid: false}, () => {this.toggleSubmitButton()})
        break;
      case 'newEmail':
        (fieldValue.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,4})$/i)) ?
          this.setState({emailValid: true}, () => {this.toggleSubmitButton()})
          :
          this.setState({emailValid: false}, () => {this.toggleSubmitButton()})
        break;
      case 'newPhone':
        (fieldValue.match('^[0-9]{10}$')) ?
          this.setState({phoneValid: true}, () => {this.toggleSubmitButton()})
          :
          this.setState({phoneValid: false}, () => {this.toggleSubmitButton()})
        break;
      default:
        break;
    }
  }

  toggleSubmitButton = () => {
    (this.state.nameValid && this.state.emailValid && this.state.phoneValid) ?
      this.setState({isSubmitBtnDisabled: false})
      :
      this.setState({isSubmitBtnDisabled: true})
  }

  newParticipantHandler = e => {
    e.preventDefault();
    this.setState({
      participants: [
        {
          uuid: this.state.newUuid,
          id: this.state.newId,
          fullName: this.state.newName,
          email: this.state.newEmail,
          phone: this.state.newPhone,
          isEditing: false
        },
        ...this.state.participants
      ],
      editedParticipants: [
        {
          uuid: this.state.newUuid,
          id: this.state.newId,
          fullName: this.state.newName,
          email: this.state.newEmail,
          phone: this.state.newPhone,
          isEditing: false
        },
        ...this.state.participants
      ],
      newId: this.state.newId + 1,
      newName: '',
      newEmail: '',
      newPhone: '',
      nameValid: false,
      emailValid: false,
      phoneValid: false,
      isSubmitBtnDisabled: true
    },
    this.generateNewUuid()
    );
  }

  startParticipantEditing = id => {
    let editedParticipantsCopy = this.state.editedParticipants.slice();
    let indexOfSaved = editedParticipantsCopy.findIndex(index => index.id === id);
    let participantsCopy = this.state.participants.slice();
    let indexOfEdited = participantsCopy.findIndex(index => index.id === id);
    editedParticipantsCopy[indexOfSaved] = participantsCopy[indexOfEdited];
    this.setState({
      editedParticipants: editedParticipantsCopy
    }, this.changeEditingStatus(id));
  }

  endParticipantEditing = id => {
    this.changeEditingStatus(id);
  }

  changeEditingStatus = id => {
    this.setState({
      participants: this.state.participants.map(participant => {
        if (participant.id === id) {
          return {
            ...participant,
            isEditing: !participant.isEditing
          };
        }
        return {
          ...participant
        }
      })
    });
  }

  handleParticipantInputEdit = (id, fieldName, fieldValue) => {
    let participantsCopy = this.state.participants.slice();
    let indexOfEdited = participantsCopy.findIndex(index => index.id === id);
    participantsCopy[indexOfEdited][fieldName] = fieldValue;
    this.setState({
      participants: participantsCopy
    });
  }

  cancelEditing = id => {
    let editedParticipantsCopy = this.state.editedParticipants.slice();
    let indexOfSaved = editedParticipantsCopy.findIndex(index => index.id === id);
    let participantsCopy = this.state.participants.slice();
    let indexOfEdited = participantsCopy.findIndex(index => index.id === id);
    participantsCopy[indexOfEdited] = editedParticipantsCopy[indexOfSaved];
    this.setState({
      participants: participantsCopy
    });
  }

  removeParticipant = id => {
    this.setState({
      participants: this.state.participants.filter(participant => id !== participant.id)
    });
  }

  sortRowsBy = key => {
    let participantsByKey = this.state.participants;
    participantsByKey.sort(this.simpleSort(key, this.state.ascendingDir));

    this.setState({
      participants: participantsByKey,
      ascendingDir: !this.state.ascendingDir,
      columnSortedBy: key
    });
  }

  simpleSort = (prop, reverse) => {
      return function (a, b) {
          if (a[prop].toLowerCase() < b[prop].toLowerCase())
            {return reverse ? 1 : -1;}
          if (a[prop].toLowerCase() > b[prop].toLowerCase())
            {return reverse ? -1 : 1;}
          return 0;
      };
  }


  render() {
    let sortDirArrow = this.state.ascendingDir ? '↓' : '↑';

    return (
      <div className="App">
        <Header />

        <ListTitle />

        <NewParticipantForm
          newName={this.state.newName}
          newEmail={this.state.newEmail}
          newPhone={this.state.newPhone}
          nameValid={this.state.nameValid}
          emailValid={this.state.emailValid}
          phoneValid={this.state.phoneValid}
          isSubmitBtnDisabled={this.state.isSubmitBtnDisabled}
          handleNewParticipantInput={this.handleNewParticipantInput}
          validateField={this.validateField}
          toggleSubmitButton={this.toggleSubmitButton}
          newParticipantHandler={this.newParticipantHandler}
        />

        <ParticipantTable
          participants={this.state.participants}
          columnSortedBy={this.state.columnSortedBy}
          sortDirArrow={sortDirArrow}
          handleParticipantInputEdit={this.handleParticipantInputEdit}
          startParticipantEditing={this.startParticipantEditing}
          endParticipantEditing={this.endParticipantEditing}
          cancelEditing={this.cancelEditing}
          removeParticipant={this.removeParticipant}
          sortRowsBy={this.sortRowsBy}
        />

      </div>
    );
  }
}

export default App;
