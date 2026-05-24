import type { Dispatch, ReactNode, SetStateAction } from "react";

import { useState } from "react";

// https://github.com/jacobparis/with-react/blob/main/packages/with-react/src/index.tsx
type Children<T> = (
  state: T,
  setState: Dispatch<SetStateAction<T>>,
) => ReactNode;

function WithState<StateValue>(props: {
  children: Children<StateValue>;
  initialState: (() => StateValue) | StateValue;
}): ReactNode;
function WithState<StateValue>(props: {
  children: Children<StateValue | undefined>;
  initialState?: undefined;
}): ReactNode;
function WithState<StateValue>({
  children,
  initialState,
}: {
  children: Children<StateValue | undefined>;
  initialState?: (() => StateValue) | StateValue;
}) {
  const [state, setState] = useState<StateValue | undefined>(initialState);

  return children(state, setState);
}

export { WithState };
