import { useGlobalState } from "../state";
import { Slide, toast } from "react-toastify";

export const useNotifierEffect = () => {
  const [notifier, setNotifier] = useGlobalState("notifier");

  switch(notifier.type) {
    case "info":
      toast.info(notifier.text, { hideProgressBar: true, transition: Slide })
      setNotifier({type: "none" });
      break;
    case "error":
      toast.error(notifier.text, { hideProgressBar: true, transition: Slide })
      setNotifier({type: "none" });
      break;
    default:
      break;
  }
};