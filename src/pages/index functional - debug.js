// import React, {useState, useEffect} from "react"
// import dateFormat from 'dateformat'
// import Websocket from 'react-websocket'
// import Orderbook from "./components/Orderbook.js"
// import LiquidationList from "./components/LiquidationList.js"
// import WhaleList from "./components/WhaleList.js"
// import "./style.css"








// // markup
// const IndexPage = () => {
//   const [instrument, setInstrument] = useState('XBTUSD')
//   const [askOrders, setAskOrders] = useState([])
//   const [bidOrders, setBidOrders] = useState([])
//   const [liquidations, setLiquidations] = useState([])
//   const [whaleOrders, setWhaleOrders] = useState([])
//   const [whaleAndLiq, setWhaleAndLiq] = useState([])

//   const handleData = (apiData) => {
//     console.log(apiData)
//     let data = JSON.parse(apiData)

//     let sortHelper = ordersArray => {
//       return ordersArray.map(order => {
//         return Object.assign({}, order)
//       })
//     }

//     var replaced = {'-': '', ' ': '', ':': ''}

//     // LIQUIDATIONS
//     if (data.table === 'liquidation' && data.action === 'insert') {
//       let liqData = data.data[0]
//       // side = "Sell" = liq long /"Buy"= liq short
//       let liqSide = liqData.side
//       let liqPrice = liqData.price
//       let liqQty = liqData.leavesQty
//       const day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss')

//       // create single trade liquidation object
//       let liquidationObj = {
//         type: 'liquidation',
//         time: day,
//         side: liqSide,
//         price: liqPrice,
//         quantity: liqQty
//       }

//       // set state, limit length
//       if (liquidations.length < 13 && liquidations) {
//         setLiquidations(
//           (prevState) => prevState.set(liquidations, [liquidationObj, ...prevState.liquidations])
//         )

//         // this.setState(prevState => ({
//           // liquidations: [liquidationObj, ...prevState.liquidations]
//           // whaleAndLiq: [...prevState.liquidations, ...prevState.whaleOrders]
//         // }))
//       } else {
//         let newState = liquidations.slice(0, -1)
//         setLiquidations(
//           (prevState) => prevState.set(liquidations, [liquidationObj, ...newState])
//         )

//         // this.setState(prevState => ({
//           // liquidations: [liquidationObj, ...newState]
//           // whaleAndLiq: [newState, ...prevState.whaleOrders]
//         // }))
//       }
//       // let combinedState = [...this.state.liquidations, ...this.state.whaleOrders]

//       // this.setState({
//       //   whaleAndLiq: combinedState.sort((a, b)=> a.time > b.time)
//       // })

//       let combinedState = [
//         ...liquidations,
//         ...whaleOrders
//       ]

//       combinedState.sort((order1, order2) => {
//         return (
//           +order1.time.replace(/[- :]/g, m => replaced[m]) >
//           +order2.time.replace(/[- :]/g, m => replaced[m])
//         )
//       })
//       // let combinedSort = sortHelper(combinedState).sort((order1, order2) => {
//       //   return +order1.time.replace(/[- :]/g, m => replaced[m]) > +order2.time.replace(/[- :]/g, m => replaced[m])
//       // })

//       setWhaleAndLiq(combinedState)

//       console.log('liqobj', liquidationObj)
//       console.log('liq', liquidations)
//     }
//     // WHALE ORDER TRACKER - ORDER SIZE OVER $100,000
//     if (data.table === 'orderBookL2_25' && data.action === 'insert') {
//       if (!data.data) {
//         console.log('no data')
//         return
//       }
//       let orderData = data.data
//       const day = dateFormat(new Date(), 'yyyy-mm-dd h:MM:ss')

//       // create whale order object; filter size
//       let whaleArray = orderData.map(order => {
//         if (order.size > 100000) {
//           return {
//             type: 'whale',
//             time: day,
//             side: order.side,
//             quantity: order.size,
//             price: order.price
//           }
//         }
//       })

//       // set state with filtered orders, ignore trades below threshold, limit length
//       for (let i = 0; i < whaleArray.length; i++) {
//         if (whaleArray[i]) {
//           if (whaleOrders.length < 13) {
//             setWhaleOrders(
//               (prevState) => prevState.set(whaleOrders, [whaleArray[i], ...prevState.whaleOrders])
//             )

//             // this.setState(prevState => ({
//             //   whaleOrders: [whaleArray[i], ...prevState.whaleOrders]
//             //   // whaleAndLiq: [...prevState.liquidations, ...prevState.whaleOrders]
//             // }))
//           } else {
//             let newState = whaleOrders.slice(0, -1)
//             setWhaleOrders(
//               (prevState) => prevState.set(whaleOrders, [whaleArray[i], ...newState])
//             )

//             // this.setState(prevState => ({
//             //   whaleOrders: [whaleArray[i], ...newState]
//             //   // whaleAndLiq: [...prevState.liquidations, ...newState]
//             // }))
//           }
//         }
//       }

//       let combinedState = [
//         ...liquidations,
//         ...whaleOrders
//       ]

//       combinedState.sort((order1, order2) => {
//         return (
//           +order1.time.replace(/[- :]/g, m => replaced[m]) >
//           +order2.time.replace(/[- :]/g, m => replaced[m])
//         )
//       })

//       setWhaleAndLiq(combinedState)

//       // this.setState({
//       //   whaleAndLiq: combinedState
//       // })

//       console.log('whale liq',whaleAndLiq)
//     }

//     // ORDER BOOK
//     if (data.table === 'orderBook10') {
//       if (!data.data) {
//         console.log('no data')
//         return
//       }
//       let orderData = data.data[0]

//       // get each ask price/amount from array; convert to obj for askOrders array
//       let time = dateFormat(orderData.timestamp, 'yyyy-mm-dd h:MM:ss')
//       let askOrders = orderData.asks.map(ask => {
//         return {
//           time: time,
//           side: 'Sell',
//           price: ask[0],
//           quantity: ask[1]
//         }
//       })
//       // get each bid price/amount from array; convert to obj for bidOrders array
//       let bidOrders = orderData.bids.map(bid => {
//         return {
//           time: time,
//           side: 'Buy',
//           price: bid[0],
//           quantity: bid[1]
//         }
//       })

//       // set state with askOrders/bidOrders arrays of ask/bid objects
//       setAskOrders(askOrders)
//       setBidOrders(bidOrders)

//       // this.setState({
//       //   askOrders: askOrders,
//       //   bidOrders: bidOrders
//       // })
//     }
//   }

//   useEffect(() => {
//     setInstrument()
//   }, [])


//   return (
//     <main>
//       <div className="mainContainer">
//         <Websocket
//           url="wss:/ws.bitmex.com/realtime?subscribe=liquidation:XBTUSD,orderBook10:XBTUSD,orderBookL2_25:XBTUSD"
//           onMessage={handleData.bind(this)}
//         />

//         <div className="topContainer">
//           <div className="section">
//             <h2>{instrument} Liquidations</h2>
//             <div className="llContainer">
//               <LiquidationList liquidations={liquidations} />
//               <br />
//             </div>
//           </div>

//           <div className="section">
//             <h2>{instrument} Whale Tracker</h2>
//             <div className="llContainer">
//               <WhaleList whaleOrders={whaleOrders} />
//               <br />
//             </div>
//           </div>

//           <div className="sectionOb">
//             <h2>{instrument} Orderbook</h2>
//             <div className="obContainer">
//               <Orderbook
//                 askOrders={askOrders}
//                 bidOrders={bidOrders}
//               />
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }

// export default IndexPage