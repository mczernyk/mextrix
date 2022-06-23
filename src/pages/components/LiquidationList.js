import React from 'react'
import PropTypes from 'prop-types'

class LiquidationList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {liquidations} = this.props

    return (
      <div className="llChart">
        <table>
          <thead>
            <tr>
              <th>Time</th>
              <th>Side</th>
              <th>Price</th>
              <th>Size</th>
            </tr>
          </thead>
          {liquidations && <tbody>
            {liquidations.map((liquidation, i) => (
              <tr key={i}>
                <td>{liquidation.time}</td>
                <td>{liquidation.side}</td>
                <td>{liquidation.price}</td>
                <td>{liquidation.quantity}</td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    )
  }
}

LiquidationList.propTypes = {
  time: PropTypes.string,
  side: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default LiquidationList
