import React from "react";

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import movieService from '../services/movieService';

class TopNav extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        searchText: ''
      }
    }

    handleRoute = route => () => {
      this.props.history.push({ pathname: route });
    };
  
    handleSearchInput = event => {
      this.setState({
        searchText: event.target.value
      });
    };
  
    handleSearchSubmit = () => {
      if (this.state.searchText) {
        this.props.history.push({
          pathname: "/results?search=" + this.state.searchText,
          state: {
            searchText: this.state.searchText
          }
        });
      } else {
        alert("Please enter some search text!");
      }
    };

    refresh = () => {
      movieService.refresh().then(this.props.history.push({
        pathname: "/movie"
      }))
    }
  
    render() {
      return (
        <Navbar bg="dark" variant="dark" fixed="top">
            <Nav className="mr-auto">
                <Nav.Link onClick={this.handleRoute("/movie")}>Home</Nav.Link>
            </Nav>
            <Button onClick={this.refresh} className="mr-sm-2" variant="outline-info">
              Refresh 
            </Button>
            <Form inline>
                <FormControl
                onChange={this.handleSearchInput}
                value={this.state.searchText}
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                />
                <Button onClick={this.handleSearchSubmit} variant="outline-info">
                Search
                </Button>
            </Form>
        </Navbar>
      )
    }
  }
  
  export default TopNav;