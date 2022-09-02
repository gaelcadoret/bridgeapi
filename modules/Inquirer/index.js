const inquirer = require("inquirer");

inquirer
    .prompt([
        {
            type: 'rawlist',
            name: 'mode',
            message: 'In which mode do you need to start the application ?',
            choices: [
                'Api mode',
                'Batch mode',
            ],
        }
    ])
    .then((answers) => {
        console.log(JSON.stringify(answers, null, '  '));
    });
