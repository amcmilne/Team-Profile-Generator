const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");


//const OUTPUT_DIR = path.resolve(__dirname, "output");
//const outputPath = path.join(OUTPUT_DIR, "main.html");

const render = require("./lib/htmlRenderer");


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
const memberChoices = ['yes', 'no'];
const Employee = require("./lib/employee");
const Engineer = require("./lib/engineer");
const Manager = require("./lib/manager");
const Intern = require("./lib/intern");
const finalTeamArray = [];


const name = "";
const role = "";
const id = 0;
const email = "";
const teamMember = "";

//get initial information about the employee
const addTeamMembers = () =>
    inquirer.prompt([
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
        }])

        .then((data) => {
            name = data.name;
            role = `${data.role}`;
            id = data.id;
            email = data.email;
            const teamMember = "";// = (name, role, id, email);
            //finalTeamArray.push(teamMember);
            // addNewTeamMembers();

            if (role === "Manager") {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter office number',
                        name: 'officeNumber'
                    },
                ])
                    .then(q2 => {
                        teamMember = new Manager(name, id, email, q2.officeNumber);
                    });
            }
            else if (role === "Intern") {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter school name',
                        name: 'school'
                    },
                ])
                    .then(q2 => {
                        teamMember = new Intern(name, id, email, q2.school);
                    });

            }
            else if (role === "Engineer") {
                inquirer.prompt([
                    {
                        type: 'input',
                        message: 'Enter Github',
                        name: 'github'
                    },
                ])
                    .then(q2 => {
                        teamMember = new Engineer(name, id, email, q2.github);
                    });
            }
            else {
                teamMember = new Employee(name, id, email);
            }

            const addNewTeamMembers = () =>
                inquirer.prompt([
                    {
                        type: "checkbox",
                        message: "Would you like to add another team member?",
                        choices: memberChoices,
                        name: "additionalMembers",
                    },
                    {
                        type: 'checkbox',
                        message: "Please select employee role.",
                        choices: roleChoices,
                        name: 'role',
                    },
                ])
        });


const collectInputs = async (inputs = []) => {
    const prompts = [
        {
            type: 'input',
            name: 'inputValue',
            message: 'Enter some input: '
        },
        {
            type: 'confirm',
            name: 'again',
            message: 'Enter another input? ',
            default: true
        }
    ];

    const { again, ...answers } = await inquirer.prompt(prompts);
    const newInputs = [...inputs, answers];
    return again ? collectInputs(newInputs) : newInputs;
};

const main = async () => {
    const inputs = await collectInputs();
    console.log(inputs);
};

main();

function init() {
    //addTeamMembers()
    //.then(() => console.log('test'))
    //.catch((err) => console.error(err))
};


function conditionalRoleQuestions(role) {

};

//init();