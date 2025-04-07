import { CollapseActionType, CollapseState } from "./Collapse";

export const reducer = (state: CollapseState, action: CollapseActionType) => {
  switch (action) {
    case CollapseActionType.close:
      return { ...state, opened: false };

    case CollapseActionType.unmount:
      return { mounted: false, opened: false };

    case CollapseActionType.mount:
      return { ...state, mounted: true };

    case CollapseActionType.open:
      return { mounted: true, opened: true };
  }
};