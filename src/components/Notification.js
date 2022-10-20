import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Alert } from 'react-bootstrap'

const Notification = () => {
  const notification = useSelector((state) => state.notification)
  const [visibility, setVisibility] = useState('hidden')

  useEffect(() => {
    if (notification.text !== '') {
      setVisibility('visible')
      let timeoutID = setTimeout(() => {
        setVisibility('hidden')
      }, 3000)
      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [notification])

  const notificationVariant = (notificationType) => {
    if (notificationType === 'notification') return 'success'
    else return 'danger'
  }

  const notificationStyle = () => {
    return {
      /*    position: 'fixed',
      fontSize: '20px',
      bottom: '0px',
      left: '0px',
      padding: '20px',
      width: '100%',
      textAlign: 'center',
      backgroundColor: notificationColor(type),*/
      visibility: visibility,
    }
  }

  /*return (
    <div style={notificationStyle(notification.type)}>{notification.text}</div>
  )*/
  return (
    <div style={notificationStyle()}>
      <Alert variant={notificationVariant(notification.type)}>
        {notification.text}
      </Alert>
    </div>
  )
}

export default Notification
