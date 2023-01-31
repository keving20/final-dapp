/*
This component handles messaging to the user. Either negative, neutral or positive. 
In any component the setMessage function can be called, that ten results in a message on top of the app. 
There are a number of preset messages, but direct parsing of error message is also possible.
It is not entirely bug free yet.. 
*/ 

import { useContext } from "react";
import { UserContext } from "./userContext";
import { Container, Header, Segment } from "semantic-ui-react"; 

const Messages = () => {

    const { message, setMessage } = useContext(UserContext);
    let content = { }
    
    // used to let message disappear by rendering it invisible. 
    if (message === "invisible") {
        content = { color: 'green',
                    primary: '...', 
                    secondary: '...',
                    visible: false
                }
    }

    // default error message 
    // @BUG does NOT work correctly yet! 
    if (message.length > 20) {
        content = { color: 'red',
                    error: message,
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    // What follows is a list of preset messages. 
    if (message === "wrongNetwork") {
        content = { color: 'red',
                    primary: 'Cambiar a la red Goerli.',
                    secondary: 'Red de prueba Ethereum Goerli.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 3000)
    }
    if (message === "notConnected") {
        content = { color: 'red',
                    primary: 'Porfavor conecte su billetera.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }
    if (message === "MetamaskNotInstalled") {
        content = { color: 'red',
                    primary: 'Porfavor instale MetaMask.',
                    secondary: 'Esta aplicación sólo funciona con metamask, porfavor instale metamask.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }   

    if (message === "warningTestApp") {
        content = { color: 'red',
                    primary: 'DAPP FOR DOCS.',
                    secondary: 'Red de prueba Ethereum Goerli.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 3000)
    }

    if (message === "errorUpload") {
        content = { color: 'red',
                    primary: 'No fué posible cargar el archivo. ¿Está usted conectado a través de su billetera Ethereum?',
                    secondary: 'El proceso de carga de archivo requiere de una conexión a Ehtereum a través de su billetera.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    if (message === "uploadInProgress") {
        content = { color: 'blue',
                    primary: 'Cargando archivo en la Blockchain.',
                    secondary: 'Esto puede tomar unos minutos.',
                    visible: true
                }
    }

    if (message === "uploadSuccessful") {
        content = { color: 'green',
                    primary: 'Carga exitosa',
                    secondary: 'Su archivo ha sido cargando en la red de blockchain Ethereum',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    if (message === "revokeInProgress") {
        content = { color: 'blue',
                    primary: 'Revocando archivo.',
                    secondary: 'Esto puede tomar unos minutos.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    if (message === "revokeSuccessful") {
        content = { color: 'green',
                    primary: 'Revocación exitosa.',
                    secondary: 'Su archivo ha sido revocado con éxito.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }
    if (message === "errorRevoke") {
        content = { color: 'red',
                    primary: 'No fué posible revocar el archivo. ¿Está usted conectado a través de su billetera Ethereum?',
                    secondary: 'El proceso de revocación del archivo requiere de una conexión a Ehtereum a través de su billetera.',
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    if (message === "noUserInput") {
        content = { color: 'red',
                    primary: 'No se insertó una dirección de usuario', 
                    secondary: 'Porfavor inserte una dirección de usuario.', 
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }

    if (message === "invalidUserInput") {
        content = { color: 'red',
                    primary: 'Dirección de usuario no es válida', 
                    secondary: 'Porfavor inserte una dirección de usuario válida.', 
                    visible: true
                }
                setTimeout(() => { setMessage('invisible') }, 5000)
    }
    
    // Rendering actual message. 
    return (
        <Container>
            <Segment textAlign="center" 
                color = {content.color} 
                style = {{
                marginTop: '.5em',
                fontSize: 'large', 
                opacity: content.visible? '100%' : '0%'
            }}>
                <Header as='h3' 
                    color = {content.color} 
                    style = {{ 
                    marginBottom: '.5em', }}> 
                    {content.primary}
                </Header>
                {content.secondary} <br /> 
                {content.error ? `Full error message: ${content.error}` : null } 
            </Segment> 
        </Container>
    )
}

export default Messages