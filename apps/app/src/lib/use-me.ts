import type { MeResponse } from "@selfgrow/shared";
import { useEffect, useState } from "react";
import { ApiError, api } from "./api";

type State =
  | { status: "loading" }
  | { status: "anonymous" }
  | { status: "ready"; me: MeResponse }
  | { status: "error" };

export function useMe() {
  const [state, setState] = useState<State>({ status: "loading" });
  useEffect(() => {
    api<MeResponse>("/me")
      .then((me) => setState({ status: "ready", me }))
      .catch((e) =>
        setState(
          e instanceof ApiError && e.status === 401 ? { status: "anonymous" } : { status: "error" },
        ),
      );
  }, []);
  return state;
}
