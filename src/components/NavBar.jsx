import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";
import { getPokemonTypes, getPokemonsByType } from "../libs/api-requests/requests";
import { useEffect, useState } from "react";

function NavBar({ onChange, onFilter }) {
    const [pokemonTypes, setPokemonTypes] = useState([{}]);
    
    const getPokemonTypesHandler = async () => {
        const response = await getPokemonTypes();
        setPokemonTypes(response)
    }

    useEffect(() => {
        getPokemonTypesHandler();
    }, [])

    return ( 
        <Navbar variant="dark" bg="primary" expand="lg">
            <Container>
                <Navbar.Brand href="#home">Pokedex</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title="Types" id="basic-nav-dropdown">
                        {pokemonTypes.map(type => 
                            <NavDropdown.Item 
                                onClick={() =>{ 
                                    onFilter(type.name, [{name: '', sprites:{front_default: 'https://c.tenor.com/tEBoZu1ISJ8AAAAC/spinning-loading.gif'}}]);
                                    getPokemonsByType(type.name).then(res => onFilter(type.name, res))
                                }}
                            >
                                {type.name}
                            </NavDropdown.Item>)
                        }
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;