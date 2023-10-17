import React from 'react'
import NavbarHome from '../../components/NavbarHome';
import {useLocation} from "react-router-dom";
import Card from 'react-bootstrap/Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/esm/Container';
import Button from 'react-bootstrap/Button';
import letterboxdLogo from '../../public/letterboxd-icon.png'
import {faStar, faFilm, faClock} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import '../style/resultWatchlist.css'

function ResultWatchlist (){

  const location = useLocation();

  //const navigate = useNavigate()
  

  return (
    <div className='h-100 letterboxd-result'>
      <NavbarHome/>
      <Container className='pb-5'>
        <Row className="justify-content-center my-5">
          <Col xs={12} md={12}>
            <Row className="justify-content-xs-center">
            {location.state.result.map((value, key) => { 
              return(
                <Col xs={6} md={4} key={key} className='my-2 px-1'>
                  <Card className='h-100'>
                    <Card.Header className='text-center'>
                    <Card.Img className='mx-auto imagem' style={{height:"15rem"}}   src={value.imagem} />
                    </Card.Header>
                    <Card.Body className='h-100 d-flex align-items-stretch' >
                      <Row  className='my-2 mb-3 align-items-stretch'>
                        <Card.Title className='text-center titulo card-body-text'>{value.nome}</Card.Title>
                        <Card.Text><FontAwesomeIcon icon={faStar} /> {value.nota}</Card.Text>
                        <Card.Text><FontAwesomeIcon icon={faClock} /> {value.tempo}</Card.Text>
                        <Card.Text><FontAwesomeIcon icon={faFilm} /> {value.generos}</Card.Text>
                        <Card.Text className='text-center '>
                          <Button  className='letterboxd-button' variant="" target="_blank" rel="noopener noreferrer" href={value.link}>
                            <img src={letterboxdLogo} className='imagem-logo' alt="letterboxd logo"></img>
                          </Button>
                        </Card.Text>
                      </Row>
                      
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
