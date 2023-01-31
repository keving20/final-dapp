/*
This file creates the component to check for certificates by document, issuer address or recipient address. 
In each case the object userInput is updated that triggers the relevant calls in index.js to the contract.    
*/

import React, { useContext } from "react";
import { UserContext } from "./userContext";
import { Container, Button, Icon, Segment, Form, Input, Header } from "semantic-ui-react"; 
import { utils } from "ethers"; 

let fileInput; 
 
const CheckCertificates = ({ handleSubmit }) => {

  const { setUserInput, tab, loading } = useContext(UserContext);
  
  // Takes an uploaded document, creates a hash using keccak256 and sets it as userinput. 
  const changeHandler = async (e) => {

    fileInput = e.target.files[0]; 
    let fileReader = false;
    let result; 
  
    fileReader = new FileReader();
    fileReader.readAsDataURL(fileInput);
    fileReader.onload = function () {
    result = fileReader.result; 
    // NB: Hashing algorithm:  
    setUserInput(utils.keccak256( utils.toUtf8Bytes(result) )); 
    }
  }

    // These are input comoponents that take an address - either issuer or recipient according to selected tab.   
    if (tab == 'Issued_Certs' || 
        tab == 'Received_Certs') {

        return (
            <Container >
                <Segment placeholder textAlign = 'center' style={{
                    marginBottom: '3em',
                    marginTop: '.5em',
                    }}>
                        
                        <Header as ="h2"> 
                        { tab == 'Issued_Certs' ? 
                          '¿Qué documentos emitió una dirección Eth?' : 
                          '¿Qué documentos recibió una dirección Eth?'                
                        }
                        </Header>
                        <Container textAlign = 'center'> 
                        { tab == 'Issued_Certs' ? 
                          <Icon name='user outline' 
                                size = 'huge'
                                style={{
                                    marginTop: '.2em', 
                                    marginBottom: '.5em'
                              }} /> : 
                            <Icon name='checkmark' 
                                  size = 'huge' 
                                  style={{
                                    marginTop: '.2em', 
                                    marginBottom: '.5em'
                              }} />   
                        }
                          
                        </Container>
                        <Form onSubmit = { handleSubmit } >                                     
                          <Segment textAlign = 'center' style={{ }}>
                          <Header as ="h4" content = 'Paso 1: Ingrese dirección ethereum' />
                          <input 
                              type='text'
                              placeholder='0x00000...' 
                              onChange = {(e) => setUserInput(e.target.value)} 
                              />
                          </Segment>
                          <Segment  textAlign = 'center' style={{ }}>
                          <Header as ="h4" content = 'Paso 2: Enviar dirección' />
                            <Button fluid primary loading = { loading == 'loading' }
                            style={{
                              marginBottom: '.5em',
                              marginTop: '1em',
                              textAlign: 'center',
                              fontSize: 'medium',
                            }}>
                            Enviar
                            </Button> 
                          </Segment>
                          <Segment  textAlign = 'center' style={{ }}>
                            <Header as ="h4" content = 'Paso 3: Compruebe los resultados.' />
                            <Icon name='arrow circle right' color = 'blue' size = 'big' >
                          </Icon>
                          </Segment>
                        </Form>
                  </Segment>
            </Container>
        ) 
    }

    // These is input comoponent that takes a file - this can be anyfile.    
    if (tab == 'DocHash_Certs') {

        return (
          <Container >
                <Segment placeholder textAlign = 'center' style={{
                    marginBottom: '3em',
                    marginTop: '.5em',
                    }}>
                        <Header as ="h2" content = '¿Desea verificar la autenticidad de un documento?' /> 
                        <Container textAlign = 'center'> 
                          <Icon name='file image outline' size = 'huge' style={{
                                marginTop: '.2em', marginBottom: '-.3em'
                                }}>
                          </Icon>
                        </Container>
                        <Form onSubmit = { handleSubmit }>
                          <Segment textAlign = 'center' style={{ }}>
                          <Header as ="h4" content = 'Paso 1: Seleccione un archivo' />
                            <Container fluid>
                                <input  className="custom-file-input"
                                  type="file"                 
                                  single="true"
                                  // as file cannot be set as userinput directly, a change handler (see above) is called first. 
                                  onChange={ changeHandler } 
                                  style={{marginBottom: '0.5em' }}
                                />
                              {/* The document will not be saved in your browser or uploaded to a server. */}
                            </Container>
                          </Segment>
                          <Segment  textAlign = 'center' style={{ }}>
                            <Header as ="h4" content = 'Paso 2: Verificación del archivo' />
                            <Button primary loading = { loading == 'loading'  }
                              style={{
                                marginBottom: '.5em',
                                marginTop: '.0em',
                                textAlign: 'center',
                                fontSize: 'medium',
                                }}>
                                Verificar
                            </Button>  
                          </Segment>
                          <Segment  textAlign = 'center' style={{ }}>
                            <Header as ="h4" content = 'Paso 3: Revisión de los resultados' />
                            <Icon name='arrow circle right' color = 'blue' size = 'big' >
                          </Icon>
                          </Segment>
                        </Form>
                  </Segment>
            </Container>
        ) 
      }
}

export default CheckCertificates