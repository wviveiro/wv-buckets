import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

export interface AuthRouteProps extends RouteComponentProps {
  component?: React.ComponentType<RouteComponentProps<any>>;
}
