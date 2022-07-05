const inquirer = require('inquirer')

const generateSite = require('./utils/generate-site.js')

// grab generatePage function from page-template.js
const generatePage = require('./src/page-template.js');
// const { userInfo } = require('os');

// import object from generate-site file
const { writeFile, copyFile } = require('./utils/generate-site.js');



// Generate user questions
const promptUser = () => {
  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is your name?',
      //requires user to enter name
      validate: nameInput => {
        if (nameInput) {
          return true;
        } else {
          console.log("You must provide your name");
          return false;
        }
      }
    },
    {
      type: 'input',
      name: 'github',
      message: 'What is your github name?',
      validate: githubName => {
        if (githubName) {
          return true;
        } else {
          console.log("You must provide your github name")
        }
      }
    },
    {
      type: 'confirm',
      name: 'confirmAbout',
      message: 'Would you like to include an "About Me" section?',
      default: true
    },
    {
      type: 'input',
      name: 'about',
      message: 'Provide some information about yourself.',
      when: ({ confirmAbout }) => {
        if (confirmAbout) {
          return true;
        } else {
          return false;
        }
      }
    }
  ])
};

const promptProject = portfolioData => {
  if (!portfolioData.projects) {
    portfolioData.projects = [];
  }

  return inquirer.prompt([
    {
      type: 'input',
      name: 'name',
      message: 'What is the name of your project?'
    },
    {
      type: 'input',
      name: 'description',
      message: 'Provide a description of your project (Required)',
      validate: projectDescription => {
        if (projectDescription) {
          return true;
        } else {
          console.log("You must provide a description for this project");
          return false;
        }
      }
    },
    {
      type: 'checkbox',
      name: 'languages',
      message: 'What did you build this project with? (Check all that apply)',
      choices: ['Javascript', 'HTML', 'CSS', 'ES6', 'jQuery', 'Bootstrap', 'Node']
    },
    {
      type: 'input',
      name: 'link',
      message: 'Enter your Github link to your project. (Required)',
      validate: linkInput => {
        if (linkInput) {
          return true;
        } else {
          console.log("You must provide your github link");
          return false;
        }
      }
    },
    {
      type: 'confirm',
      name: 'feature',
      message: 'Would you like to feature this project?',
      default: false
    },
    {
      type: 'confirm',
      name: 'confirmAddProject',
      message: 'Would you like to enter another project?',
      default: false,
    }


  ]).then(projectData => {
    portfolioData.projects.push(projectData);
    if (projectData.confirmAddProject) {
      return promptProject(portfolioData)
    } else {
      return portfolioData;
    }
  }
  )
}


// writeFile function
// fs.writeFile('./dist/index.html', pageHTML, err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Page created! Check out index.html in this directory to see it!');
// });

// //copyFile function
// fs.copyFile('./src/style.css', './dist/style.css', err => {
//   if (err) {
//     console.log(err);
//     return;
//   }
//   console.log('Style sheet copied successfully!');
// });


// prompt and display user questions/answers
promptUser()
  .then(promptProject)
  .then(portfolioData => {
    return generatePage(portfolioData)
  })
  .then(pageHTML => {
    return writeFile(pageHTML)
  })
  .then(writeFileResponse => {
    console.log(writeFileResponse);
    return copyFile();
  })
  .then(copyFileResponse => {
    console.log(copyFileResponse)
  })
  .catch(err => {
    console.log(err)
  })

