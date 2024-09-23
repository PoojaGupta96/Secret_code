const fs = require('fs');

// Function to decode a number from a given base
const decodeValue = (base, value) => parseInt(value, parseInt(base));

// Lagrange interpolation function to find the constant term c
const lagrangeInterpolation = (points) => {
    let result = 0;
    const numPoints = points.length;

    points.forEach(([xi, yi], i) => {
        let li = 1;

        points.forEach(([xj], j) => {
            if (i !== j) {
                li *= (0 - xj) / (xi - xj);
            }
        });

        result += li * yi;
    });

    return result;
};

// Function to process a single test case
const processTestCase = (filePath) => {
    const inputData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    const { n, k } = inputData.keys;

    const points = [];

    // Decode points from input data
    for (let i = 1; i <= n; i++) {
        const key = i.toString();
        const pointData = inputData[key];

        if (pointData) {
            const decodedValue = decodeValue(pointData.base, pointData.value);
            points.push([i, decodedValue]); // (x, y) pairs
        } else {
            console.error(`Key ${key} not found in input data`);
        }
    }

    // Compute constant term c using the first k points
    const constantTermC = lagrangeInterpolation(points.slice(0, k));

    console.log(`For test case ${filePath}, the constant term c is: ${constantTermC}`);
};

// Main function to run all test cases
const main = () => {
    ['input1.json', 'input2.json'].forEach(processTestCase);
};

main();
