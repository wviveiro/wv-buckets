import React from "react";

export type ReactFC<T = {}> = React.FC<T & { children?: React.ReactNode }>;
