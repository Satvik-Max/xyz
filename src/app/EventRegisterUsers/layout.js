import EventHeaderUser from '@/components/Events/EventHeaderUser';
import React from 'react'

const EventRegisterUsersLayout = ({ children }) => {
  return (
    <div>
        <EventHeaderUser/>
      {children}
    </div>
  )
}

export default EventRegisterUsersLayout;
