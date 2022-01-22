import { parseDate, } from '@quasar/quasar-ui-qcalendar/src/index.js'

const CURRENT_DAY = new Date()
function getCurrentDay (day) {
  const newDay = new Date(CURRENT_DAY)
  newDay.setDate(day)
  const tm = parseDate(newDay)
  return tm.date
}

export const events = [
    {
      id: 1,
      title: '1st of the Month',
      details: 'Everything is funny as long as it is happening to someone else',
      date: getCurrentDay(1),
      bgcolor: 'orange'
    },
    {
      id: 2,
      title: 'Sisters Birthday',
      details: 'Buy a nice present',
      date: getCurrentDay(4),
      bgcolor: 'green',
      icon: 'fas fa-birthday-cake'
    },
    {
      id: 3,
      title: 'Meeting',
      details: 'Time to pitch my idea to the company',
      date: getCurrentDay(10),
      time: '10:00',
      duration: 120,
      bgcolor: 'red',
      icon: 'fas fa-handshake'
    },
    {
      id: 4,
      title: 'Lunch',
      details: 'Company is paying!',
      date: getCurrentDay(10),
      time: '11:30',
      duration: 90,
      bgcolor: 'teal',
      icon: 'fas fa-hamburger'
    },
    {
      id: 5,
      title: 'Visit mom',
      details: 'Always a nice chat with mom',
      date: getCurrentDay(20),
      time: '17:00',
      duration: 90,
      bgcolor: '#234344',
      icon: 'fas fa-car'
    },
    {
      id: 6,
      title: 'Conference',
      details: 'Teaching Javascript 101',
      date: getCurrentDay(22),
      time: '08:00',
      duration: 540,
      bgcolor: 'blue',
      icon: 'fas fa-chalkboard-teacher'
    },
    {
      id: 7,
      title: 'Girlfriend',
      details: 'Meet GF for dinner at Swanky Restaurant',
      date: getCurrentDay(22),
      time: '19:00',
      duration: 180,
      bgcolor: 'teal',
      icon: 'fas fa-utensils'
    },
    {
      id: 8,
      title: 'Rowing',
      details: 'Stay in shape!',
      date: getCurrentDay(27),
      bgcolor: 'purple',
      icon: 'rowing',
      days: 2
    },
    {
      id: 9,
      title: 'Fishing',
      details: 'Time for some weekend R&R',
      date: getCurrentDay(27),
      bgcolor: 'purple',
      icon: 'fas fa-fish',
      days: 2
    },
    {
      id: 10,
      title: 'Vacation',
      details: 'Trails and hikes, going camping! Don\'t forget to bring bear spray!',
      date: getCurrentDay(29),
      bgcolor: 'purple',
      icon: 'fas fa-plane',
      days: 5
    }
  ]