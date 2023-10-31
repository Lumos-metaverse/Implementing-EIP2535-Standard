// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {LibTodoStorage} from "../libraries/LibTodoStorage.sol";


contract TodoFacet{
    function createTask(string memory _content) external {
        LibTodoStorage.createTask(_content);
    }

    function toggleTask(uint256 _taskId) external {
        LibTodoStorage.toggleTask(_taskId);
    }

    function getTask(uint256 _taskId) external view returns (string memory content, bool isCompleted) {
       return LibTodoStorage.getTask(_taskId);
    } 

    function removeTask(uint256 _taskId) external {
        LibTodoStorage.removeTask(_taskId);
    }
    
    function getTaskCount() external view returns (uint256) {
        return LibTodoStorage.getTaskCount();
    }

    
}