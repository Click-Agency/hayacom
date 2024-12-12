import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface WithAuthRedirectProps {
  isAuthenticated: boolean;
}

const withAuthRedirect = <P extends object>(
  WrappedComponent: React.ComponentType<P>
): React.FC<P & WithAuthRedirectProps> => {
  const ComponentWithAuthRedirect: React.FC<P & WithAuthRedirectProps> = ({
    isAuthenticated,
    ...props
  }) => {
    const navigate = useNavigate();

    useEffect(() => {
      if (!isAuthenticated) {
        navigate("/"); // Redirect to home if not authenticated
      }
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? <WrappedComponent {...(props as P)} /> : null;
  };

  return ComponentWithAuthRedirect;
};

export default withAuthRedirect;
