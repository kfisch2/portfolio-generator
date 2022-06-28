// node fileSystem library module
const fs = require('fs')

// grab generatePage function from page-template.js
const generatePage = require('./src/page-template.js')

const profileDataArgs = process.argv.slice(2)

const [name, github] = profileDataArgs;


fs.writeFile('./index.html', generatePage(name, github), err => {
  if (err) throw err;

  console.log('Portfolio complete! Checkout index.html to see the output')
})