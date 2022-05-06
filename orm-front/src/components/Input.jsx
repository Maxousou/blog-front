import classnames from "classnames";

const Input = (props) => (
  <input
    {...props}
    className={classnames(
      props.className,
      "px-1.5 py-1 border-2 border-blue-680"
    )}
  />
);

export default Input;
