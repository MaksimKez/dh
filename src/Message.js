import PropTypes from "prop-types";

function Message(props) {
  return <p className="message">{props.message}</p>;
}

Message.defaultProps = {
  message: "Hello from the Message component",
};

Message.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Message;
