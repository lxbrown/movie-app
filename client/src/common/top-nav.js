import React, { useState } from "react";
import { useHistory } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

import movieService from '../services/movieService';

export default function TopNav() {
  let history = useHistory();
  const [searchText, setSearchText] = useState('')

  const handleRoute = route => () => {
    history.push({ pathname: route });
  };

  const handleSearchInput = event => {
    setSearchText(event.target.value)
  };

  const handleSearchSubmit = () => {
    if (searchText) {
      history.push({
        pathname: "/results/" + searchText,
        state: {
          searchText: searchText
        }
      });
    } else {
      alert("Please enter some search text!");
    }
  };

  const refresh = () => {
    movieService.refresh().then(history.push({
      pathname: "/movie"
    }))
  }
  
  return (
    <Navbar bg="dark" variant="dark" fixed="top">
      <Nav className="mr-auto">
        <Nav.Link onClick={handleRoute("/movie")}>Home</Nav.Link>
      </Nav>
      <Button onClick={refresh} className="mr-sm-2" variant="outline-info">
        Refresh 
      </Button>
      <Form inline>
        <FormControl
          onChange={handleSearchInput}
          value={searchText}
          type="text"
          placeholder="Search"
          className="mr-sm-2"
        />
        <Button onClick={handleSearchSubmit} variant="outline-info">
        Search
        </Button>
      </Form>
    </Navbar>
  )
}