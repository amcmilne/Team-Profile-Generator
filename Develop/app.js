const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");




// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```



const roleChoices = ['Manager', 'Intern', 'Engineer'];
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
//const util = require("util");

let finalTeam = [];

const defaultQuestions = async () => {
    let questions = [
        {
            type: 'input',
            message: "Enter employee name?",
            name: 'name',
            default: "Team Member",
        },
        {
            type: 'checkbox',
            message: "Please select employee role.",
            choices: roleChoices,
            name: 'role',
        },
        {
            type: 'input',
            message: "What is employee ID number?",
            name: 'id',
        },
        {
            type: 'input',
            message: "What is employee email address?",
            name: 'email',
        }
    ];

    const answers = await inquirer.prompt(questions);
    return answers;
};

const followUpQuestion1 = async (role = []) => {
    let prompt = [];

    if (role === "Manager") {
        prompt = [
            {
                type: 'input',
                message: 'Enter office number:',
                name: 'officeNumber'
            },
        ];
        const answer = await inquirer.prompt(prompt);
        return answer;
    }
    else if (role === "Intern") {
        prompt = [
            {
                type: 'input',
                message: 'Enter school name:',
                name: 'school'
            },
        ];
        const answer = await inquirer.prompt(prompt);
        return answer;
    }
    else if (role === "Engineer") {
        prompt = [
            {
                type: 'input',
                message: 'Enter Github:',
                name: 'github'
            },
        ];
        const answer = await inquirer.prompt(prompt);
        return answer;
    }
    else {
        return null;
    }
};

const addTeamMember = async () => {
    const firstAnswers = await defaultQuestions();

    const id = firstAnswers.id;
    const name = firstAnswers.name;
    const role = `${firstAnswers.role}`;
    const email = firstAnswers.email;

    const secondAnswers = await followUpQuestion1(role);

    let teamMember;

    if (role === "Manager") {
        teamMember = new Manager(name, id, email, secondAnswers.officeNumber);
    }
    else if (role === "Intern") {
        teamMember = new Intern(name, id, email, secondAnswers.school);
    }
    else if (role === "Engineer") {
        teamMember = new Engineer(name, id, email, secondAnswers.github);
    }
    else {
        teamMember = new Employee(name, id, email);
    }

    finalTeam.push(teamMember);
};

const addTeamMembers = async () => {
    await addTeamMember();

    const p = [
        {
            type: 'confirm',
            name: 'addMember',
            message: 'Enter another person? ',
            default: true
        }
    ];

    const { addMember } = await inquirer.prompt(p);

    return addMember ? addTeamMembers() : addMember;
}

function renderHTML() {
    const render = require("./lib/htmlRenderer");
    const OUTPUT_DIR = path.resolve(__dirname, "output");
    const outputPath = path.join(OUTPUT_DIR, "team.html");

    var html = render(finalTeam);
    {
        fs.writeFile('./output/team.html', html, function (err) {
            if (err) console.log(err)
        })
    }
}

const init = async () => {
    const test = await addTeamMembers(); 
    renderHTML();
};

init();