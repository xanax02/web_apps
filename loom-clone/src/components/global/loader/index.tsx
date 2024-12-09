import React from "react";
import { Spinner } from "./spinner";

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
};

export default function Loader({ state, className, color, children }: Props) {
  return state ? (
    <div>
      <Spinner />
    </div>
  ) : (
    children
  );
}
