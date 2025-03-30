# sit737-2025-prac4c
SIT737- Cloud Native Application Development Task 4.1C: Enhanced Functionality for the Calculator Microservice

# Calculator Microservice

## Introduction
This microservice is a simple REST API built with Node.js and Express that performs basic arithmetic operations (addition, subtraction, multiplication, and division) and advanced operations like Square Root, Exponential and Modulo. It also includes logging with Winston for monitoring requests and errors.

## Features
- RESTful API for basic and advanced arithmetic operations
- Error handling for invalid inputs , division by zero and square root of negative number
- Logging using Winston
- API testing using Postman

## Prerequisites
Before running this microservice, ensure you have the following installed:
- Node.js (v14 or later)
- npm (Node Package Manager)
- Postman (optional for testing API endpoints)

## Installation and Setup
1. **Clone the repository:**
   ```sh
   git clone <repository-url>
   cd sit737-2025-prac4c
   ```
2. **Install required dependencies:**
   ```sh
   npm install express winston
   ```
3. **Run the microservice:**
   ```sh
   node app.js
   ```
