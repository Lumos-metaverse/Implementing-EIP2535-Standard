// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

library LibTodoStorage {
    bytes32 constant TODO_STORAGE_POSITION = keccak256("diamond.standard.todo.storage");

    struct Task{
        string content;
        bool isCompleted;
    }

    struct TodoStorage {
        Task[] tasks;
    }

    //Declare the Create task function in the storage library to be used in the 'ToDo' Facet
    function createTask(string memory _content) internal {
        TodoStorage storage ts = diamondStorage();
        ts.tasks.push(Task({
            content: _content,
            isCompleted: false
        }));
        emit TaskCreated(_content, ts.tasks.length - 1);
    }

    //Declare the Toggle task completion function in the storage library to be used in the 'Todo' Facet
    function toggleTask(uint256 _taskId) internal {
        TodoStorage storage ts = diamondStorage();
        require(_taskId < ts.tasks.length, "Invalid taskId");
        ts.tasks[_taskId].isCompleted = !ts.tasks[_taskId].isCompleted;
        emit TaskCompleted(_taskId, ts.tasks[_taskId].isCompleted);
    }

     // Declare the Get specific task details function in the storage library to be used in the 'Todo' Facet
    function getTask(uint256 _taskId) internal view returns (string memory content, bool isCompleted) {
        TodoStorage storage ts = diamondStorage();
        require(_taskId < ts.tasks.length, "Invalid taskId");
        Task memory task = ts.tasks[_taskId];
        return (task.content, task.isCompleted);
    }

    // Declare the Remove task function in the storage library to be used in the 'Todo' Facet
    function removeTask(uint256 _taskId) internal {
        TodoStorage storage ts = diamondStorage();
        require(_taskId < ts.tasks.length, "Invalid taskId");

        // Removing the task
        for (uint256 i = _taskId; i < ts.tasks.length - 1; i++) {
            ts.tasks[i] = ts.tasks[i + 1];
        }
        ts.tasks.pop();

    }

     // Declare the Get the total number of tasks in the storage library to be used in the 'Todo' Facet
    function getTaskCount() internal view returns (uint256) {
        TodoStorage storage ts = diamondStorage();
        return ts.tasks.length;
    }

    function diamondStorage() internal pure returns (TodoStorage storage ts) {
        bytes32 position = TODO_STORAGE_POSITION;
        assembly {
            ts.slot := position
        }
    }

    // Event to notify clients
    event TaskCreated(string content, uint256 taskId);
    event TaskCompleted(uint256 taskId, bool isCompleted);

}