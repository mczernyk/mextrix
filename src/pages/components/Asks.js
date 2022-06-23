import React from 'react'
import PropTypes from 'prop-types'

class Asks extends React.Component {
  fillPercent() {
    const {max, total} = this.props

    return (max ? total / max : 0) * 100
  }

  render() {
    const {price, quantity, total} = this.props

    return (
      <tr className="ask">
        <td className="column">{total}</td>
        <td className="column">{quantity}</td>
        <td
          className="asks"
          style={{backgroundSize: this.fillPercent() + '% 100%'}}
        >
          ${price}
        </td>
      </tr>
    )
  }
}

Asks.propTypes = {
  quantity: PropTypes.number,
  price: PropTypes.number,
  max: PropTypes.number,
  total: PropTypes.number
}

export default Asks
