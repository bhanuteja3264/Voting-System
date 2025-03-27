// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Voting {
    struct Candidate {
        uint id;
        string name;
        uint voteCount;
    }

    address public owner;
    Candidate[] public candidates;
    mapping(address => bool) public voters;

    constructor() {
        owner = msg.sender;
    }

    function addCandidate(string memory _name) public {
        require(msg.sender == owner, "Only owner");
        candidates.push(Candidate(candidates.length, _name, 0));
    }

    function vote(uint _candidateId) public {
        require(!voters[msg.sender], "Already voted");
        candidates[_candidateId].voteCount++;
        voters[msg.sender] = true;
    }

    function getCandidates() public view returns (Candidate[] memory) {
        return candidates;
    }
}