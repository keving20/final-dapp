
/* 
This is an entirely static page, that provides background information on the Dapp. 
*/ 

import { useContext } from "react";
import { UserContext } from "./userContext";
import { Container, Header, Segment } from "semantic-ui-react"; 

const AboutPage = () => {
    
    const { tab, setTab, heightComponent } = useContext(UserContext);

    if (tab == "About") {

    return (  
            <Container className="userInputBox" >
                <Segment basic textAlign = "left" style={{
                    fontSize: "large",
                    }}>
                <Header
                    as="h1"
                    content="DAPP FOR DOCS" 
                    style={{
                    fontWeight: "normal",
                    marginBottom: 0,
                    color: "#676464"
                    }}
                />
                <Container 
                    style={{
                        marginTop: "1.5em",
                        color: "#BDBBBA"
                    }}
                > 
                    Plataforma para la verificación de documentos electrónicos  

                    </Container>
                </Segment>
            </Container>
        )
    }
}

export default AboutPage