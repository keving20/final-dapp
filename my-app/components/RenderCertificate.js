/*
This component renders certificates. 
It ignores any revoked certificates and provides possibility to revoke when logged in user is allowed to revoke.
*/

// Setup
import React, { useContext } from "react";
import { Header, Button, Card, Container, Segment } from "semantic-ui-react"; 
import { UserContext } from "../components/userContext";
import 'semantic-ui-css/semantic.min.css';

const RenderCertificate  = ({ certificate, revokeCertificate }) => {
  const { loading, walletAddress } = useContext(UserContext);
  console.log('certificate.id:', certificate.id )

  // When no certificates are found, Index.js sets the index of the message to 0 and description to 'empty'. 
  // This triggers rendering of 'No Certificate Found' message.    
  if (certificate.id === 0 && certificate.description === 'empty') {
    return (
      <Container >
      <Segment placeholder color = 'red' textAlign = 'left' style={{
          marginBottom: '.5em',
          marginTop: '.5em',
          }}>    
          <Header as ="h2" color="red" content = "No se encontraron archivos" /> 
          <Segment style={{ marginBottom: '.5em', marginTop: '.5em' }}>
            <Header as ="h4" content = "¿Porqué no se encontraron archivos?" />
            <Container>
            <li><b>El archivo no es el original.</b></li>

            <li>El archivo no se cargó correctamente.</li> 

            <li>El archivo ha sido revocado.</li> 
            
            <li>Existe un error en la aplicación.</li> 
            </Container>
          </Segment>
        </Segment>
      </Container>
    )
  }

  // This checks if certificate has been revoked: which means certificate.issuer will have been set to address(0)
  // if not revoked: renders certificate. 
  if (certificate.issuer != '0x0000000000000000000000000000000000000000') {

    return (
      <Container >
      <Segment placeholder color = 'green' textAlign = 'left' style={{
          marginBottom: '.5em',
          marginTop: '.5em',
          }}> 
          <Header as ="h3" content = {`Archivo: ${(certificate.id)+1}`} /> 
          {/* Date  */}
          <Segment style={{ marginBottom: '.5em', marginTop: '.5em' }}>
            <Header as ="h4" content = {`Cargado: ${certificate.dateTime}`} />
          </Segment>
          {/* Issuer */}
          <Segment style={{ marginBottom: '.5em', marginTop: '.5em' }}>
            <Header as ="h4" style={{ marginBottom: '.3em' }} 
                    content = {certificate.issuerEns ? `Issuer: ${certificate.issuerEns}` : "Emisor:"} />
            <Container content = {`Eth Address: ${certificate.issuer}`} />
          </Segment>
          {/* leaves out recipient if non-existent  */}
          {certificate.recipient === '0x0000000000000000000000000000000000000000' ? 
            null
            :
            <Segment style={{ marginBottom: '.5em', marginTop: '.5em' }}>
            <Header as ="h4" style={{ marginBottom: '.3em' }} 
                    content = {certificate.recipientEns ? `Recipient: ${certificate.recipientEns}` : "Receptor"} />
            <Container content = {`Eth Address: ${certificate.recipient}`} />
          </Segment> } 
          {/* leaves out description if non-existent  */}
          {certificate.description === '' ? 
            null
            :
            <Segment style={{ marginBottom: '.5em', marginTop: '.5em' }} >
            <Header as ="h4"  style={{ marginBottom: '.3em' }} content = "Descripción:" />
            <Container content = {certificate.description} />
          </Segment> } 
          {/* If the logged in account is issuer or recipient, they are given option to revoke certificate. 
          Note that the contract ALSO gives the right to revoke to the original hasher of document. (It is the 'owner' ofthat hash.)
          This has not yet been implemented in the frontend app  */}
          { certificate.issuer == walletAddress ||
            certificate.recipient == walletAddress ? 
            <Button basic fluid color='red' 
                    style={{ marginBottom: '.5em', marginTop: '1em' }}
                    content = 'Revocar' 
                    onClick={ revokeCertificate } 
                    loading = {loading === certificate.id} 
                    />   
            : null }
        </Segment>
      </Container>
    )
  }
}

export default RenderCertificate

 