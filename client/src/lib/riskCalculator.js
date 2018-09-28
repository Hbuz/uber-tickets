export const calculateRisk = (selectedTicket, tickets) => {
  let risk = 0
  //RISK 1
  risk = tickets ? tickets.filter(ticket => ticket.user.id == selectedTicket.id).length === 1 ? 10 : 0 : 0
  // console.log("RISK 1: "+risk)
  //RISK 2
  const averagePrice = getAveragePrice(tickets)
  const percentageDiff = Math.abs(100 - (selectedTicket.price * 100) / averagePrice)
  risk += selectedTicket.price < averagePrice ? percentageDiff : percentageDiff > 10 ? -10 : -percentageDiff
  // console.log("RISK 2: "+risk)
  //RISK 3
  const hours = selectedTicket.createdAt ? new Date(selectedTicket.createdAt).getHours() : 0
  risk += hours >= 9 && hours <= 17 ? -10 : 10
  // console.log("RISK 3: "+risk + " Date: "+selectedTicket.createdAt + " Hours: "+hours)
  //RISK 4
  risk += selectedTicket.comments ? selectedTicket.comments.length > 3 ? 5 : 0 : 0
  // console.log("RISK 4: "+risk)
  if (risk < 5) {
    return 5
  } else if (risk > 95) {
    return 95
  } else {
    return risk
  }
}

const getAveragePrice = (tickets) => {
  return tickets ? tickets.reduce((total, ticket) => total + ticket.price, 0) / tickets.length : 0
}
