import classnames from "classnames";

const Button = (props) => {
  <button
    {...props}
    className={classnames(
      props.className,
      "px-2 py-1.5 bg-blue-680 text-lg text-black font-bold active:bg-blue-700"
    )}
  />;
};

export default Button;
