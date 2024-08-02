const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const amountsPaid = { Ram: 50, Sham: 30, Rahim: 20 };
const totalAmount = 100;
const weights = { Ram: 0, Sham: 0, Rahim: 0 };
const apples = { Ram: [], Sham: [], Rahim: [] };
let appleList = [];

function getAppleWeights() {
    rl.question('Enter apple weight in gram (-1 to stop): ', (input) => {
        const weight = parseInt(input);
        if (weight === -1) {
            distributeApples();
            rl.close();
        } else {
            appleList.push(weight);
            getAppleWeights();
        }
    });
}

function distributeApples() {
    const totalWeight = appleList.reduce((sum, weight) => sum + weight, 0);

    const shares = {
        Ram: (amountsPaid.Ram / totalAmount) * totalWeight,
        Sham: (amountsPaid.Sham / totalAmount) * totalWeight,
        Rahim: (amountsPaid.Rahim / totalAmount) * totalWeight
    };

    appleList.sort((a, b) => b - a);

    function allocateApples(share, person) {
        let allocatedWeight = 0;
        appleList = appleList.filter(weight => {
            if (allocatedWeight + weight <= share) {
                allocatedWeight += weight;
                apples[person].push(weight);
                return false;
            }
            return true;
        });
        weights[person] = allocatedWeight;
    }

    allocateApples(shares.Ram, 'Ram');
    allocateApples(shares.Sham, 'Sham');
    allocateApples(shares.Rahim, 'Rahim');

    console.log('Distribution Result:');
    console.log(`Ram : ${apples.Ram.join(' ')}`);
    console.log(`Sham : ${apples.Sham.join(' ')}`);
    console.log(`Rahim : ${apples.Rahim.join(' ')}`);
}

console.log('Enter apple weights:');
getAppleWeights();
