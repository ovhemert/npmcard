const boxen = require('boxen')
const chalk = require('chalk')
const columnify = require('columnify')

const CARD_STYLE = { padding: 1, margin: 1, borderColor: 'green', borderStyle: 'round' }

class Card {
  constructor (options = {}) {
    this._style = { ...CARD_STYLE, ...options }
    this._header = null
    this._content = []
    this._footer = null
  }

  addRow (items = []) {
    this._content.push(items)
    return this
  }

  addRowEmpty () {
    this.addRow([])
    return this
  }

  get chalk () {
    return chalk
  }

  setFooter (item) {
    this._footer = item
    return this
  }

  setHeader (item) {
    this._header = item
    return this
  }

  show (options = {}) {
    let data = ''

    // header
    if (this._header) { data += `${this._header}\n\n` }
    // content
    const items = this._content.map(item => {
      return item.reduce((prev, curr, idx) => {
        const key = `col${idx}`
        prev[key] = curr
        return prev
      }, {})
    })
    const content = columnify(items, { showHeaders: false })
    data += content
    // footer
    if (this._footer) { data += `\n\n${this._footer}` }

    // output
    const output = boxen(data, this._style)
    console.log(output)
  }
}

module.exports = Card
