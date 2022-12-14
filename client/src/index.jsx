import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';
const axios = require('axios');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      repos: []
    }
  }

  search (term) {
    console.log(`${term} was searched`);
    // TODO
    // send an ajax request to server
    $.ajax({
      // url: the parse api or website we want to send a request to
      url: 'http://localhost:1128/repos',
      // type: tells server what action to take
      type: 'POST',
      // data: data to be sent to the server (stringified Object)
      data: JSON.stringify({username: term}),
      // contentType: format of the contenet providing to the server, format of content expected from server
      contentType: 'application/json',
      // success: callback function that lets you know it is successful
      success: this.get.bind(this), // will be refactored to do a get request from server to rerender the DOM
      // error: callback function that lets you know that it is a failiure
      error: ()=> {
        throw ('already in storage');
      }
    })
  }
  componentDidMount() {
    axios.get('http://localhost:1128/repos')
    .then(response => {
      console.log(response.data)
      this.setState({repos: response.data});
    })
  }
  get() {
    axios.get('http://localhost:1128/repos')
      .then(response => {
        console.log(response.data)
        this.setState({repos: response.data});
      })
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/> {/* // passes function to Search component */}
      <RepoList repos={this.state.repos}/> {/* // passes state into ReopList component */}
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));