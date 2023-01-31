/* 
This components creates the Navbar on top of the app. 
It also handles selection of tabs and calls the wallet connect function. 
*/ 

import React, { useContext } from "react";
import { UserContext } from "./userContext";
import { Button, Grid, Icon, Menu, Segment } from "semantic-ui-react";
import 'semantic-ui-css/semantic.min.css';

// creates the Navbar at the top of the page. 
const NavBar = ({ connectWeb3, disconnectWeb3, changeChain, web3ChainId }) => {
    //  { getSigner }

    // navbar interacts with three contextual elements: tab and settab (reading and setting selected tab) 
    // and walletAddress: logging in with a wallet. 
    const { tab, setTab, walletAddress, ensName, walletConnected } = useContext(UserContext);

    // The login button changes appearance with user being logged in or not.
    // Login is assessed by (non)existance of const walletAddress. 
    const renderButton = () => {

        // If wallet is not connected, return a button which allows them to connect their wllet
        if (walletConnected == false) {

          return (
            <div>
            <Button.Group color='blue'>
            <Button  disabled >
                Modo Visitante 
            </Button>
            <Button  primary 
                onClick = { connectWeb3 } >
                Iniciar sesión
            </Button>
            </Button.Group>
            </div>
          );
        }

        // If wallet is on the wrong network, return a red button requesting to change network. 
        // Button does not have any functionality at the moment. (hence basic color scheme)
        if (walletConnected && web3ChainId !== 5) {
            return (
            <div> 
                <Button.Group color='red'>
                <Button disabled> 
                    Red Incorrecta
                </Button>
                <Button basic color = "red"  
                         onClick = { changeChain } >
                    Cambiarse a la red Ethereum Goerli
                </Button>
                </Button.Group>
              </div>
            );
          } else {
            // If wallet is  connected, return a green button that states wallet connected. 
            // Button does not have any functionality at the moment. (hence basic color scheme)
            if ( ensName ) {
            return (
                <div> 
                <Button.Group color='green'>
                <Button disabled> 
                    Conectado a: { ensName }
                </Button>
                <Button basic color = "grey"  
                        onClick = { disconnectWeb3 } >
                    Desconectar
                </Button>
                </Button.Group>
                </div>
            );
            } else {
                return (
                    <div> 
                    <Button.Group color='green'>
                    <Button disabled > 
                    Conectado a: {walletAddress.substring(0,5)}...{walletAddress.substring(38,42)}  
                    </Button>
                    <Button basic color = "grey" 
                            onClick = { disconnectWeb3 } > 
                        Desconectar
                    </Button>
                    </Button.Group>
                    </div>
                );
            }
          }
        }

    // Renders the navbar. 
    // per item, if clicked, setTab is set to the name of the tab. 
    return (        
            <Menu >
                <Menu.Item 
                    name='Home'
                    active={tab === 'Home'}
                    onClick={() => setTab('Home')}
                >
                    Inicio
                    {/* <Icon name='checkmark' size = 'large'/> */}
                </Menu.Item>  
                <Menu.Item 
                    name='Manual'
                    active={tab === 'About'}
                    onClick={() => setTab('About')}
                />
                <Grid container columns= {1} >
                        <Grid.Row centered>
                        <Menu secondary>
                            
                            <Menu.Item 
                                name='Cargar Documento'
                                active={tab === 'Certify'}
                                onClick={() => setTab('Certify')} >
                            </Menu.Item> 
                            
                            <Menu.Item 
                                name='Verificar Documento'
                                active={tab === 'DocHash_Certs'}
                                onClick={() => setTab('DocHash_Certs')}
                            />

                            <Menu.Item 
                                name='Documentos emitidos'
                                active={tab === 'Issued_Certs'}
                                onClick={() => setTab('Issued_Certs')}
                            />
                            <Menu.Item 
                                name='Certificados recibidos'
                                active={tab === 'Received_Certs'}
                                onClick={() => setTab('Received_Certs')}
                            />
                        </Menu>
                    </Grid.Row>
                </Grid>
                 {/* rendering the login button created above */}
                <Menu.Item >
                    { renderButton() }
                </Menu.Item>   
            </Menu>
    );
};

export default NavBar
