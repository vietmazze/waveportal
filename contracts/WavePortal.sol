// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract WavePortal {

    uint256 totalWaves;
    uint256 private seed;

    struct Wave {
        address user;
        string message;
        uint256 timestamp;
    }

    Wave[] public waves;
    mapping(address => uint256) public lastWavedAt;
    
    event NewWave(address indexed user, string message, uint256 timestamp);


    constructor() payable {
        console.log("Yo yo, I am a contract and I am smart");
        seed = (block.timestamp + block.difficulty) % 100;
    }

    function wave(string memory _message) public payable {


        ///checking to see if the msg.sender has already waved the last 15mins
        require(lastWavedAt[msg.sender] + 15 minutes < block.timestamp, "Wait 15m");
        // update the user timestamp
        lastWavedAt[msg.sender] = block.timestamp;

        totalWaves += 1;
        console.log("%s has waved!", msg.sender);
        //store the new wave data into the array
        waves.push(Wave({user:msg.sender,message: _message, timestamp:block.timestamp }));
        //emit a log relating to new wave
        emit NewWave(msg.sender,_message, block.timestamp);


        //creating random nunmber, keep in mind it's not truly random and ppl can game it
        seed = (block.difficulty + block.timestamp) % 100;
        console.log("Random seed generated %d", seed);

         //sending ether to msg.sender
        if(seed <=50) {
            console.log("%s won!", msg.sender);

            uint256 prizeAmount = 0.0001 ether;
            require(prizeAmount <= address(this).balance, "Not enough fund to send prize");

            (bool success,) = payable(msg.sender).call{value: prizeAmount}("");
            require(success, "Failed to send ether");
        }
        
    }

    function getAllWaves() public view returns(Wave[] memory) {
        return waves;
    }

    function getTotalWave() public view returns (uint256) {
        console.log("We have %d total waves!", totalWaves);
        return totalWaves;
    }

}