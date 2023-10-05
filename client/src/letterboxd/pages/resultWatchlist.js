import React from 'react'
import NavbarHome from '../../components/NavbarHome';
import {useLocation} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import letterboxdLogo from '../../public/letterboxd-icon.png'
import {faStar, faFilm} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../style/resultWatchlist.css'



function ResultWatchlist (){

  const location = useLocation();

  //const navigate = useNavigate()
  

  return (
    <div className=' watchlist'>
      <NavbarHome/>
      <Container className='pb-5'>
        <Row className="justify-content-center my-5">
          <Col xs={11} md={12}>
            <Row className="justify-content-xs-center">
            {location.state.result.map((value, key) => { 
              return(
                <Col xs={6} md={4} key={key}>
                  <Card className='my-2'  >
                    <Card.Header className='text-center'>
                    <Card.Img className='mx-auto imagem' style={{height:"15rem"}}   src={value.imagem} />
                    </Card.Header>
                    <Card.Body>
                      <Card.Title className='text-center'>{value.nome}</Card.Title>
                      <Card.Text><FontAwesomeIcon icon={faStar} /> {value.nota}</Card.Text>
                      <Card.Text><FontAwesomeIcon icon={faFilm} /> {value.generos}</Card.Text>
                      <Card.Text className='text-center'><Button variant="dark" className='' target="_blank" rel="noopener noreferrer" href={value.link}><img src={letterboxdLogo} className='imagem-logo' alt="letterboxd logo"></img></Button></Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )


}

export default ResultWatchlist
