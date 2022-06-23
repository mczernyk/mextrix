import React from 'react'
import PropTypes from 'prop-types'
import Asks from './Asks'
import Bids from './Bids'

class Orderbook extends React.Component {
  constructor() {
    super()
  }

  render() {
    const {askOrders=0 , bidOrders=0} = this.props


     let sortHelper = (ordersArray=[]) => {
      return ordersArray.map(order => {
        return Object.assign({}, order)
      })
    }

    let asksArray = sortHelper(askOrders).sort((ask1, ask2) => {
      return ask1.price > ask2.price
    })

    let bidsArray = sortHelper(bidOrders).sort((bid1, bid2) => {
      return bid1.price > bid2.price
    })

    let totalOrders = ordersArray => {
      return ordersArray.reduce((total, order) => {
        return total + order.quantity
      }, 0)
    }
    let totalAsks = totalOrders(askOrders)
    let totalBids = totalOrders(bidOrders)
    let max = Math.max(totalAsks, totalBids)

    let showOrders = (Type, orders) => {
      let total = 0
      return orders.map((order, i) => {
        order.total = total += order.quantity
        order.max = max
        return <Type key={i} {...order} />
      })
    }



    return (
      <div className="obChart">
        <table>
          <thead>
            <tr>
              <th>Ask Total</th>
              <th>Ask Size</th>
              <th className="thead" />
            </tr>
          </thead>
          <tfoot>
            <tr>
              <td>Bid Total</td>
              <td>Bid Size</td>
              <td className="tfoot"> </td>
            </tr>
          </tfoot>
          {(askOrders && bidOrders )&& <tbody>{showOrders(Asks, asksArray).reverse()}</tbody>}
          {(askOrders && bidOrders) && <tbody>{showOrders(Bids, bidsArray)}</tbody>}
        </table>
      </div>
    )
  }
}

Orderbook.propTypes = {
  askOrders: PropTypes.array,
  bidOrders: PropTypes.array
}

export default Orderbook
