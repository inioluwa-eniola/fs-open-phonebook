const Notification = ({ message }) => {
    if (message.status === null) {
        return null
    }

    return (
        <div style={message.style}>
            {message.status}
        </div>
    )
}

export default Notification 