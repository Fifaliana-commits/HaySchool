#!/usr/bin/env node

/**
 * Hay School Task Import Script for Vibe Kanban
 *
 * This script helps import tasks from the hay-school-tasks.json file
 * into your Vibe Kanban board.
 *
 * Usage:
 * 1. Make sure vibe-kanban is running (npx vibe-kanban)
 * 2. Run: node import-tasks-to-kanban.js
 */

const fs = require('fs');
const path = require('path');

const TASKS_FILE = 'hay-school-tasks.json';

function loadTasks() {
    try {
        const tasksData = fs.readFileSync(TASKS_FILE, 'utf8');
        return JSON.parse(tasksData);
    } catch (error) {
        console.error(`❌ Error loading ${TASKS_FILE}:`, error.message);
        process.exit(1);
    }
}

function displayTasksSummary(tasksData) {
    console.log('🎓 Hay School Development Tasks Summary');
    console.log('=' .repeat(50));
    console.log(`📊 Total Tasks: ${tasksData.metadata.totalTasks}`);
    console.log(`⏱️  Total Estimated Hours: ${tasksData.metadata.totalEstimatedHours}`);
    console.log(`🔴 High Priority: ${tasksData.metadata.highPriorityTasks}`);
    console.log(`🟡 Medium Priority: ${tasksData.metadata.mediumPriorityTasks}`);
    console.log(`🟢 Low Priority: ${tasksData.metadata.lowPriorityTasks}`);
    console.log('');
}

function displayBoardSummary(board) {
    console.log(`📋 ${board.name}`);
    console.log(`   ${board.description}`);
    console.log(`   📝 Tasks: ${board.tasks.length}`);

    const priorityCount = board.tasks.reduce((acc, task) => {
        acc[task.priority] = (acc[task.priority] || 0) + 1;
        return acc;
    }, {});

    console.log(`   🔴 High: ${priorityCount.High || 0}, 🟡 Medium: ${priorityCount.Medium || 0}, 🟢 Low: ${priorityCount.Low || 0}`);
    console.log('');
}

function displayTaskDetails(board, taskIndex) {
    const task = board.tasks[taskIndex];
    console.log(`🔢 ${task.id}`);
    console.log(`📝 ${task.title}`);
    console.log(`📋 ${task.description}`);
    console.log(`⭐ Priority: ${task.priority}`);
    console.log(`👤 Assignee: ${task.assignee}`);
    console.log(`⏱️  Estimated: ${task.estimatedHours} hours`);
    console.log(`🏷️  Tags: ${task.tags.join(', ')}`);
    console.log(`📋 Requirements: ${task.requirements.join(', ')}`);
    console.log('');
}

function displayImportInstructions() {
    console.log('📋 MANUAL TASK IMPORT INSTRUCTIONS');
    console.log('=' .repeat(50));
    console.log('');
    console.log('Since Vibe Kanban doesn\'t have a direct API import,');
    console.log('you\'ll need to manually create these tasks:');
    console.log('');
    console.log('1. Open your browser to the Vibe Kanban server');
    console.log('2. Create boards for each category:');
    console.log('   • Core Platform Architecture');
    console.log('   • Interactive Learning System');
    console.log('   • Chatbot Assistance System');
    console.log('   • Quality Assurance & Testing');
    console.log('');
    console.log('3. For each task above, create a card with:');
    console.log('   • Title (task title)');
    console.log('   • Description (task description + requirements)');
    console.log('   • Labels (priority: High/Medium/Low)');
    console.log('   • Assignee (if applicable)');
    console.log('   • Due date (estimated completion)');
    console.log('');
    console.log('4. Place tasks in appropriate columns:');
    console.log('   • Backlog: Not started');
    console.log('   • In Progress: Currently working on');
    console.log('   • Review: Ready for review');
    console.log('   • Done: Completed');
    console.log('');
}

function main() {
    console.log('🚀 Hay School Task Import Tool for Vibe Kanban');
    console.log('=' .repeat(50));
    console.log('');

    const tasksData = loadTasks();
    displayTasksSummary(tasksData);

    console.log('📋 BOARD BREAKDOWN');
    console.log('=' .repeat(50));
    tasksData.boards.forEach(board => {
        displayBoardSummary(board);
    });

    console.log('🎯 TASK DETAILS BY BOARD');
    console.log('=' .repeat(50));
    console.log('');

    tasksData.boards.forEach(board => {
        console.log(`📋 ${board.name.toUpperCase()}`);
        console.log('-' .repeat(30));
        board.tasks.forEach((task, index) => {
            displayTaskDetails(board, index);
        });
    });

    displayImportInstructions();

    console.log('✅ Task breakdown complete!');
    console.log(`📄 Full task details saved in: ${TASKS_FILE}`);
    console.log('🎯 Ready to import into Vibe Kanban');
}

// Run the script
if (require.main === module) {
    main();
}

module.exports = { loadTasks, displayTasksSummary, displayBoardSummary, displayTaskDetails };
