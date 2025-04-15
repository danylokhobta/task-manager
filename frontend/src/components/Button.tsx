import { Link } from "react-router-dom";

type ButtonType = {
  label: string,
  link?: string,
  onClick?: () => void,
}

const Button = ({ label, link, onClick }: ButtonType) => {
  return link ? (
    <Link
      to={link}
      onClick={(e) => {
        if (onClick) {
          e.preventDefault(); // Prevents navigation if onClick is used
          e.currentTarget.blur();
          onClick();
        }
      }}
      className="px-2.5 py-1.5 bg-white hover:bg-gray-100 uppercase font-bold text-[16px] text-nowrap cursor-pointer"
    >
      {label}
    </Link>
  ) : (
    <button
      onClick={(e) => {
        if (onClick) {
          e.currentTarget.blur();
          onClick();
        }
      }}
      className="px-2.5 py-1.5 bg-white hover:bg-gray-100 uppercase font-bold text-[16px] text-nowrap cursor-pointer"
    >
      {label}
    </button>
  );
};

export default Button;