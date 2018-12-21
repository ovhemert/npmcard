#!/usr/bin/env node

const Card = require('../src/index')
const npmUser = require('npm-user')

function showCard (user) {
  let card = new Card()

  const title = card.chalk.cyan
  const link = card.chalk.cyan
  const label = card.chalk.white.bold
  const text = card.chalk.white

  card.setHeader(title(user.name))
  card.addRow([label('    NPM:'), link(`https://www.npmjs.com/~${user.npm}`)])
  if (user.github) { card.addRow([label(' GitHub:'), link(`https://github.com/${user.github}`)]) }
  if (user.twitter) { card.addRow([label('Twitter:'), link(`https://twitter.com/${user.twitter}`)]) }
  if (user.email) { card.addRow([label('  Email:'), link(user.email)]) }
  card.addRowEmpty()
  card.addRow([label('   Card:'), text(`npx npmcard ${user.npm}`)])
  card.show()
}

async function main () {
  // get username
  if (process.argv.length < 3) { throw Error('No NPM user specified') }
  const username = process.argv[2]

  // get info from npm
  const user = await npmUser(username)
  user.npm = username
  if (!user) { throw Error('User information not found') }

  // show the card
  showCard(user)
}

main()
