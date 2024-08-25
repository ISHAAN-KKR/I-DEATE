// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CoFounderAgreementAvalanche {
    struct Agreement {
        address initiator;       // The party who initiated the agreement (either founder or co-founder)
        address otherParty;      // The other party in the agreement
        string initiatorName;
        string otherPartyName;
        string terms;
        bool initiatorAccepted;
        bool otherPartyAccepted;
    }

    Agreement public agreement;
    address public owner;

    constructor(
        string memory _initiatorName,
        string memory _otherPartyName,
        string memory _terms
    ) payable {
        owner = msg.sender;
        
        // Determine the roles based on who initiates the agreement
        agreement = Agreement({
            initiator: msg.sender,
            otherParty: address(0), // Placeholder until the other party is set
            initiatorName: _initiatorName,
            otherPartyName: _otherPartyName,
            terms: _terms,
            initiatorAccepted: false,
            otherPartyAccepted: false
        });
    }

    function setOtherParty(address _otherParty) public {
        require(msg.sender == agreement.initiator, "Only the initiator can set the other party's address");
        require(agreement.otherParty == address(0), "Other party's address already set");
        require(_otherParty != address(0), "Invalid address for other party");

        agreement.otherParty = _otherParty;
    }

    function acceptAgreement() public {
        require(msg.sender == agreement.initiator || msg.sender == agreement.otherParty, "Only the initiator or the other party can accept");

        if (msg.sender == agreement.initiator) {
            require(!agreement.initiatorAccepted, "Initiator has already accepted");
            agreement.initiatorAccepted = true;
        } else if (msg.sender == agreement.otherParty) {
            require(!agreement.otherPartyAccepted, "Other party has already accepted");
            agreement.otherPartyAccepted = true;
        }
    }

    function rejectAgreement() public {
        require(msg.sender == agreement.otherParty, "Only the other party can reject the agreement");
        require(!agreement.otherPartyAccepted, "Other party has already accepted");

        delete agreement;
    }

    function validateAgreement() public view returns (bool) {
        return agreement.initiatorAccepted && agreement.otherPartyAccepted;
    }

    function agreementStatus() public view returns (string memory) {
        if (agreement.initiatorAccepted && agreement.otherPartyAccepted) {
            return "Agreement Accepted by Both Parties";
        } else if (agreement.initiatorAccepted) {
            return "Initiator Accepted, Awaiting Other Party's Response";
        } else if (agreement.otherPartyAccepted) {
            return "Other Party Accepted, Awaiting Initiator's Response";
        } else {
            return "Agreement Pending Acceptance";
        }
    }
}
