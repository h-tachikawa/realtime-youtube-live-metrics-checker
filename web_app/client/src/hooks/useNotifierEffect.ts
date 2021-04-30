import { Slide, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { notifierState } from "../recoil/atom/notifier";

export const useNotifierEffect = () => {
  const [ notifier, setNotifier ] = useRecoilState(notifierState);

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
