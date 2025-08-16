import { useEffect, useState } from 'react'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { useGetlogsMutation } from '../../redux/apislice'
import { useSelector } from 'react-redux'
const localizer = momentLocalizer(moment)

function CalendarComponent() {
  const [getlogs] = useGetlogsMutation()
  const id = useSelector((state) => state.user.id)
  const [events, setEvents] = useState([])
  const [dayStatusMap, setDayStatusMap] = useState({})

  useEffect(() => {
    const fetchlogs = async () => {
      const response = await getlogs(id)
      const logs = response.data.logs
      const allEvents = []
      const statusMap = {}

      logs.forEach(log => {
        const dateStr = log.date
        statusMap[dateStr] = log.status
        const punches = log.punchs
        const status = log.status

        for (let i = 0; i < punches.length; i += 2) {
          const startTime = punches[i]
          const endTime = punches[i + 1] || punches[i]

          const format = "M/D/YYYY HH:mm"
          const start = moment(`${dateStr} ${startTime}`, format).toDate()
          const end = moment(`${dateStr} ${endTime}`, format).toDate()

          allEvents.push({
            title: `${status.charAt(0).toUpperCase() + status.slice(1)}`,
            start,
            end,
            status
          })
        }
      })

      setEvents(allEvents)
      setDayStatusMap(statusMap)
    }

    fetchlogs()
  }, [])

  const dayPropGetter = (date) => {
    const dateKey = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
    const status = dayStatusMap[dateKey]

    if (date.getDay() === 0) {
      return {
        className: 'sunday-holiday',
        style: {
          backgroundColor: '#bae6fd'
        }
      }
    }

    if (status === 'present') {
      return {
        className: 'present-day',
        style: {
          backgroundColor: '#dcfce7'
        }
      }
    }

    return {}
  }

  const eventStyleGetter = (event) => {
    let backgroundColor = '#3174ad'
    if (event.status === 'halfday') backgroundColor = '#facc15'
    if (event.status === 'present') backgroundColor = '#22c55e'
    if (event.status === 'pending') backgroundColor = '#ef4444'

    return {
      style: {
        backgroundColor,
        borderRadius: '6px',
        opacity: 0.8,
        color: 'white',
        padding: '20px 8px',
        fontSize: '0.875rem',
        fontWeight: 500,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }
    }
  }

  const CustomAgendaEvent = ({ event }) => (
    <div className="py-2">
      <div className="font-medium">{event.title}</div>
      <div className="text-sm opacity-80">
        {moment(event.start).format('h:mm A')} - {moment(event.end).format('h:mm A')}
      </div>
    </div>
  )

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-3">Attendance Calendar</h2>

      <div className="calendar-container">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          style={{
            height: 600,
            backgroundColor: '#f9fafb',
            borderRadius: '0.75rem',
            padding: '1rem',
          }}
          eventPropGetter={eventStyleGetter}
          dayPropGetter={dayPropGetter}
          components={{
            agenda: {
              event: CustomAgendaEvent
            }
          }}
          messages={{
            today: 'Today',
            previous: 'Back',
            next: 'Next',
            month: 'Month',
            week: 'Week',
            day: 'Day',
            agenda: 'Agenda'
          }}
        />
      </div>

      <div className="flex flex-wrap gap-4 mt-6 justify-center">
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#22c55e] rounded mr-2"></div>
          <span className="text-sm">Present</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#facc15] rounded mr-2"></div>
          <span className="text-sm">Half Day</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#ef4444] rounded mr-2"></div>
          <span className="text-sm">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#3174ad] rounded mr-2"></div>
          <span className="text-sm">Leave</span>
        </div>
        <div className="flex items-center">
          <div className="w-4 h-4 bg-[#bae6fd] rounded mr-2"></div>
          <span className="text-sm">Sunday (Holiday)</span>
        </div>
      </div>

      <style jsx global>{`
        .present-day {
          background-color: #dcfce7 !important;
        }

        .sunday-holiday {
          background-color: #bae6fd !important;
        }

        .rbc-agenda-view {
          border-radius: 0.5rem;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        .rbc-agenda-content {
          font-size: 0.9rem;
        }

        .rbc-agenda-table thead {
          background-color: #f3f4f6;
        }

        .rbc-agenda-time-cell {
          font-weight: 500;
          padding: 12px 16px;
        }

        .rbc-agenda-event-cell {
          padding: 12px 16px;
        }

        .rbc-toolbar {
          margin-bottom: 1.5rem;
          flex-wrap: wrap;
          gap: 0.5rem;
        }

        .rbc-btn-group button {
          border-radius: 0.375rem !important;
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
          font-weight: 500;
          color: #4b5563;
          border: 1px solid #d1d5db !important;
          background: white;
        }

        .rbc-active {
          background-color: #3b82f6 !important;
          color: white !important;
          border-color: #3b82f6 !important;
          box-shadow: 0 1px 2px rgba(0,0,0,0.05);
        }

        .rbc-month-view, .rbc-time-view {
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid #e5e7eb;
        }

        .rbc-off-range-bg {
          background-color: #f9fafb;
        }

        .rbc-date-cell {
          padding: 4px 8px;
          text-align: center;
          font-weight: 500;
        }

        .rbc-today {
          background-color: #dbeafe;
        }
      `}</style>
    </div>
  )
}

export default CalendarComponent
