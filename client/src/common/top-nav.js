import React, { useState } from "react";
import { useHistory,  
         NavLink } from 'react-router-dom';

import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import movieService from '../movie/movie-service';

export default function TopNav() {
  let history = useHistory();
  const [searchText, setSearchText] = useState('')

  const handleSearchInput = event => {
    setSearchText(event.target.value)
  };

  const handleSearchSubmit = () => {
    if (searchText) {
      history.push({
        pathname: "/results/" + searchText
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
        <Nav.Link as={NavLink} to='/movie'>Home</Nav.Link>
      </Nav>
      <Button onClick={refresh} className="mr-sm-2" variant="outline-info">
        Refresh 
      </Button>
      <Form inline>
        <Form.Group controlId="formSearch">
          <Form.Control
            type="text"
            className="mr-sm-2"
            placeholder="Search"
            onChange={handleSearchInput}
            value={searchText} />
        </Form.Group>
        <Button onClick={handleSearchSubmit} variant="outline-info" type="submit">
        Search
        </Button>
      </Form>
    </Navbar>
  )
}