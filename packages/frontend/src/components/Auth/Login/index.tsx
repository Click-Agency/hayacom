import { trim } from "../../../utils/functions/general";
import Form from "./Form";
import Logo from "../../shared/Logo";
import { appRoutes } from "../../../config";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const push = useNavigate();

  return (
    <div
      className={trim(`
          flex
          flex-col
          gap-4 
          border 
          w-full 
          p-7
          items-center
          justify-center
          rounded-lg
          shadow-lg
          h-screen`)}
    >
      <Logo
        className="max-w-20 cursor-pointer"
        onClick={() => push(appRoutes.home)}
      />
      <Form />
    </div>
  );
};

export default Login;
