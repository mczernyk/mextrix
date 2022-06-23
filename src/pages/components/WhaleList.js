import React from 'react'
import PropTypes from 'prop-types'

class WhaleList extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {whaleOrders} = this.props

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
          {whaleOrders &&
            <tbody>
            {whaleOrders.map((order, i) => (
              <tr key={i}>
                <td>{order.time}</td>
                <td>{order.side}</td>
                <td>{order.price}</td>
                <td>{order.quantity}</td>
              </tr>
            ))}
          </tbody>}
        </table>
      </div>
    )
  }
}

WhaleList.propTypes = {
  time: PropTypes.string,
  side: PropTypes.string,
  price: PropTypes.number,
  quantity: PropTypes.number
}

export default WhaleList
