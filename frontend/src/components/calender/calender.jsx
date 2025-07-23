import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

const localizer = momentLocalizer(moment)

const CalendarComponent = ({ events = [] }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h2 className="text-2xl font-semibold mb-4 text-blue-700">My Calendar</h2>
        <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 400, backgroundColor: '#f0f6ff', borderRadius: '12px' , width: '100%' , margin: '10px' , padding: '10px'  , minHeight: '100px' , minWidth: '100px' , maxWidth: '100%' , maxHeight: '100%'  , display: 'flex' , justifyContent: 'center' , alignItems: 'center' }}
        className="calendar-custom"
        />
  </div>
)

export default CalendarComponent
