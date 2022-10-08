import { connect } from 'react-redux'

const Notification = (props) => {
  return (
    <p className="notification" style={{ color: 'red' }}>
      {props.notification}
    </p>
  )
}

const mapNotificationToProps = (state) => {
  return { notification: state.notification }
}

export default connect(mapNotificationToProps)(Notification)
