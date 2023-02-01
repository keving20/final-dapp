/* 
For now, this is a completely static page. 
I seperated it in a left and right side, that are combined at the end. 
Main reaosn to do so is that I might want to implement some more fancy transitions down the line.  
*/

import { useContext } from "react";
import { UserContext } from "./userContext";
import {
    Container,
    Header,
    Button,
    Segment,
    Grid,
    Transition,
} from "semantic-ui-react";

const FrontPage = () => {
    const { tab, setTab } = useContext(UserContext);
    const visible = false;

    const leftSidePage = (
        <Container className="userInputBox">
            <Segment
                basic
                textAlign="center"
                style={{
                    marginBottom: "3em",
                    marginTop: ".5em",
                    fontSize: "large",
                    color: "none",
                }}
            >
                <Header
                    as="h1"
                    content="DAPP FOR DOCS TESSTTTTTTTT"
                    style={{
                        fontSize: "5em",
                        fontWeight: "normal",
                        marginBottom: 0,
                        color: "#494847",
                    }}
                />
                <Header
                    as="h2"
                    content="Esta aplicación descentralizada (DAPP) permite cargar documentos (archivos u otros datos sin procesar) junto con una descripción en la  Red Blockchain Ethereum Y consultar si su hash está indexado.
                    La huella de un archivo es un código calculado sobre su contenido, único e inmutable(hash). Una vez que el contenido está anclado a la red, su autor puede probar la autenticidad del mismo."
                    style={{
                        fontSize: "1.2em",
                        fontWeight: "normal",
                        marginTop: "2em",
                        color: "#7A7877",
                        textAlign : "justify",
                    }}
                />
                <Button
                    primary
                    size="huge"
                    onClick={() => setTab("DocHash_Certs")}
                    style={{ marginTop: ".9rem" }}
                >Probar la autenticidad de un documento</Button>
            </Segment>
        </Container>
    );

    if (tab == "Home") {
        return (
            <Container>
                <Grid padded>
                    <Grid.Column width="15">{leftSidePage}</Grid.Column>
                </Grid>
            </Container>
        );
    }
};

export default FrontPage;
