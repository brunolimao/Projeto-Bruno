import React from 'react'
import axios from "axios";
import NavbarHome from '../../components/NavbarHome';
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';

import '../style/watchlist.css'



function Watchlist (){

  
  const navigate = useNavigate()

  

	const handleSubmit = async (e) => {

		e.preventDefault();

    const loader = document.getElementById('loader');
    loader.classList.add('loader')

		const usersInput = document.getElementById("users");
		const optionInput = document.getElementById("option");


		const users = usersInput.value;
		const option = optionInput.value;

		try {
		  const response = await axios.post('http://localhost:3001/letterboxd/watchlist', {
				users: users,
				option: option,

		  });
		  console.log(response.data);

			navigate('/letterboxd/resultwatchlist',{state:{result:response.data}});
		} catch (error) {
		  console.error(error);
		}
  }

  const handleOnClick = async(e) => {
    let valorAtual = document.getElementById("option").value
    console.log(valorAtual)
    if (valorAtual === 'off'){
      document.getElementById("option").value = 'on'
    } else {
      document.getElementById("option").value = 'off'
    }
  }

  return (
    <div className='vh-100 watchlist'>
      
      <NavbarHome/>
      <Container>
        <Row className="justify-content-md-center mt-5">
          <Col xs lg="6">
          <Card className='mb-5'>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Usuários</Form.Label>
                  <Form.Control required type="text" placeholder="Separar usuários por vírgula e sem espaço. Ex: brunolimao,malusampaio" id="users"/>
                </Form.Group>
                <Form.Group className="mb-3" >
                  <Form.Check type="switch" label="Todos?" defaultChecked id="option" onClick={handleOnClick}/>
                </Form.Group>
                <Button variant="primary" type="submit">
                  Confirmar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          <div id="loader" className=""></div>
  
          
          </Col>
        </Row>
        
      </Container>
      
    </div>
  )


}

export default Watchlist
