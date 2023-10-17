import React, { useState } from 'react'
import axios from "axios";
import NavbarHome from '../../components/NavbarHome';
import {useNavigate} from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';

import styles from '../style/getWatchlist.module.css'



function GetWatchlist (){

  
  const navigate = useNavigate()

  const [mensagem, setMensagem] = useState("")
  const [numFilmes, setNumFilmes] = useState("")


	const handleSubmit = async (e) => {

		e.preventDefault();

    const loader = document.getElementById('loader');
    loader.classList.add(styles.loader)
    setMensagem("Coletando watchlists...")

		const usersInput = document.getElementById("users");
		const optionInput = document.getElementById("option");

    document.getElementById("submit-button").disabled = true;


		const users = usersInput.value;
		const option = optionInput.value;

    let result = ""

    try {
		  const response1 = await axios.post('http://localhost:3001/letterboxd/tempo', {
				users: users,
		  });
      setNumFilmes("Tempo estimado: " + response1.data.tempo + " segundos")

		  const response2 = await axios.post('http://localhost:3001/letterboxd/coleta', {
				users: users,
		  });
      result = response2.data
	
		  const response3 = await axios.post('http://localhost:3001/letterboxd/filmesEmComum', {
				users: users,
				option: option,
        filmes: result,

		  });
			setMensagem("Coletando filmes em comum...")
      setNumFilmes("Tempo estimado: " + response3.data.message[1] + " segundos")
      let result1 = response3.data.message[0]
		
		  const response4 = await axios.post('http://localhost:3001/letterboxd/final', {
        filmes: result1,
		  });
    
			navigate('/letterboxd/resultwatchlist',{state:{result:response4.data}});
		} catch (error) {
		  console.error(error);
		} 
  }

  const handleOnClick = async(e) => {
    let valorAtual = document.getElementById("option").value
    if (valorAtual === 'off'){
      document.getElementById("option").value = 'on'
    } else {
      document.getElementById("option").value = 'off'
    }
  }

  return (
    <div className={'h-100 vh-100 '+ styles.watchlist}>
      
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
                <Button variant="success" id="submit-button" type="submit">
                  Confirmar
                </Button>
              </Form>
            </Card.Body>
          </Card>
          
          <div id="loader" className=""></div>
          
          <Row className={'justify-content-center my-2 ' + styles['text-color-white']}>{mensagem}</Row>
          <Row className={'justify-content-center ' + styles['text-color-white']}>{numFilmes}</Row>
  
          
          </Col>
        </Row>
        
      </Container>
      
    </div>
  )


}

export default GetWatchlist
