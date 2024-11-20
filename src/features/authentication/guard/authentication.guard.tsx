import { ComponentType } from "react";
import { withAuthenticationRequired } from "./with-authentication-required";
import { Loading } from "@/components/common/Loading";

interface AuthenticationGuardProps {
  Component: ComponentType<object>;
}

const onRedirectingComponent = (): JSX.Element => <Loading />;

export const AuthenticationGuard = ({
  Component,
}: AuthenticationGuardProps): JSX.Element => {
  const Authorized = withAuthenticationRequired(Component, {
    onRedirecting: onRedirectingComponent,
  });

  return <Authorized />;
};

