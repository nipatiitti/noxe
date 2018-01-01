import React, { Component } from 'react';

import './components/styles.css'

import fire from './components/fire';

class App extends Component {
  constructor(props) {
    super(props);
    let str = Math.random().toString(36).slice(2);
    this.state = {
      switched: false,
      buttonValue: "Info",
      classToggle: '',
      data: [{header: false, info: "Loading"}],
      value: '',
      source: str
    };

    this.fireRef = fire.database().ref();
  }

  componentWillMount(){
    this.listenForItems();
  }

  listenForItems() {
    this.fireRef.child(this.state.source + "/data").on('value', (snapshot) => {
      let infos = [];
      snapshot.forEach((child) => {
        infos.push({
          header: child.val().header,
          info: child.val().info,
          _key: child.key
        });
      })

      this.setState({data: infos});

    })
  }


  addInfo(header, info) {
    fire.database().ref(this.state.source + "/data").push({header, info});
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    event.preventDefault();
    if (this.state.value.replace(/\s+/g,"") !== '')
      this.addInfo(this.state.switched, this.state.value);
    else
      alert("Sry but you can't add empty lines")
    this.setState({value: ''});
  }

  sourceChange(event) {
    this.setState({source: event.target.value});
  }

  sourceUpdate(event) {
    if (this.state.source.replace(/\s+/g,"") !== '') {
      if (window.confirm('Are you sure you want to change source?')) {
        this.fireRef.off();
        this.listenForItems();
      }
    }
    else
      alert("You can't use empty name")

  }

  toggle(event) {
    event.preventDefault();
    let text;
    let classNameText = '';
    if (this.state.switched) {
      text = "Info";
    } else {
      text = "Header";
      classNameText = "button2"
    }
    this.setState({
        switched: !this.state.switched,
        buttonValue: text,
        classToggle: classNameText
    });
  };

  render() {
    var listItems = this.state.data.map((item) =>
      <li key={item._key} className={item.header ? "headerListItem" : "listItem"}>
          {item.info}
      </li>
    );

    return (
      <div className="mainDiv">
        <div className="formDiv">
          <div className="flex marginRight" />
          <div className="flex5">
          <input  className="input-text" type="text"
                  value={this.state.source}
                  onKeyDown={(event) => {
                    if(event.key === 'Enter') this.sourceUpdate(event);
                  }}
                  onChange={(event) => this.sourceChange(event)}
          />
          <button className="button3 button" type="button" onClick={(event) => this.sourceUpdate(event)}>Update</button>
          </div>
          <div className="flex marginLeft"/>
        </div>
        <div className="formDiv">
          <button className={this.state.classToggle + " button"} type="button" onClick={(event) => this.toggle(event)}>{this.state.buttonValue}</button>
          <input  className="input-text" type="text"
                  placeholder="Add line..."
                  value={this.state.value}
                  onKeyDown={(event) => {
                    if(event.key === 'Enter') this.handleSubmit(event);
                    else if (event.keyCode === 9) this.toggle(event);
                  }}
                  onChange={(event) => this.handleChange(event)} />
          <button className="button" type="button" onClick={(event) => this.handleSubmit(event)}>Submit</button>
        </div>
        <ul>
          {listItems}
        </ul>
      </div>
    );
  }
}

export default App;
