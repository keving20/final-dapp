// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.7.0 <0.9.0;


contract CertifyDoc {
    /**struct que contien un certificado con la información del documento que se desea anclar a blockchain */
    struct certificate {
        bytes32 docHash;
        address issuer;
        address recipient;
        uint datetime;
        string description;
    }
    /** array de certificados. */ 
    certificate[] public certificates; // 
    
    /** evento que retorna información del documento anlcado dado su hash y su identificador de persona */ 
    event CertificateIssued(bytes32 indexed docHash, uint indexed index);
    
    /**Varios Hashmap para almancenar información de hash, emisores, receptores, para varios documentos */
    mapping(bytes32 => uint[]) public docHashMap; 
    

    mapping(address => uint[]) public issuerMap;   
    

    mapping(address => uint[]) public recipientMap;


    mapping(bytes32 => address) public docHashOwnerMap;
/**Funcion que ancla un vcertificado en la red de blockhain */
    function certify(bytes32 _docHash, address _recipient, string memory _description) public {        

            certificate storage newCertificate = certificates.push(); 
            newCertificate.docHash = _docHash; 
            newCertificate.issuer = msg.sender; 
            newCertificate.recipient = _recipient;  
            newCertificate.description = _description; 
            newCertificate.datetime = block.timestamp;

            docHashMap[_docHash].push(certificates.length -1);
            issuerMap[msg.sender].push(certificates.length -1);
            recipientMap[_recipient].push(certificates.length -1);


            if (docHashOwnerMap[_docHash] == 0x0000000000000000000000000000000000000000) {
                docHashOwnerMap[_docHash] = msg.sender;
            }
            
            // An event is emited when a new certificate is issued. 
            emit CertificateIssued(_docHash, certificates.length -1); 
    }

    /**
    * @dev Transfer ownership of docHash to another contract. -- This is for extended version. 
    *
    *    function changeDocHashOwner(string memory _docHash, address newDocHashOwner) public {
    *        require(msg.sender == docHashOwnerMap[_docHash], "You are not the owner of this docHash.");
    *        docHashOwnerMap[_docHash] = newDocHashOwner;
    *    }
    */
    
    /** @dev retrieves index of certificates per docHash.  */ 
    function checkDocHash(bytes32 _docHash) public view returns ( uint[] memory ) {  
        return (docHashMap[_docHash]);
    } 
    
    /** @dev returns true if the  msg.sender is owner of the docHash. */ 
    function checkOwner(bytes32 _docHash) public view returns ( bool ) {
        return (msg.sender == docHashOwnerMap[_docHash]); 
    }
    
    /** @dev retrieves index of certificates per issuer of msg.sender. */ 
    function checkIssuer(address _requestedAddress) public view returns ( uint[] memory ) {  
        return issuerMap[_requestedAddress];
    }
    
    /** @dev retrieves index of certificates per recipient of msg.sender. */ 
    function checkRecipient(address _requestedAddress) public view returns ( uint[] memory ) {
        return recipientMap[_requestedAddress];
    }

    /** @dev Retrieves a single certificate based on index.
    * Idea is that frontend first calls checkDocHash or checkSender, and subsequently does a loop to this function. 
    * This places computational demand on side of frontend, not the blockchain backend. 
    * Note that it IS possible to call certificates at random. Certificates are public! 
    */
    function callCertificate(uint index) public view returns (
      bytes32, address, address, string memory, uint
      ) {
        return (
          certificates[index].docHash,
          certificates[index].issuer,
          certificates[index].recipient,
          certificates[index].description,
          certificates[index].datetime
        );
    }

    /** 
    * @dev Issuer, recipient and docHashOwner have ability to delete certificate. 
    * @param index: index of certificate to be revoked. 
    */ 
    function revokeCertificate(uint index) public {
        require(msg.sender == certificates[index].issuer || 
            msg.sender == certificates[index].recipient ||
            msg.sender == docHashOwnerMap[certificates[index].docHash], 
            "You are not allowed to revoke this certificate.");
        
        delete certificates[index];
    }
}
