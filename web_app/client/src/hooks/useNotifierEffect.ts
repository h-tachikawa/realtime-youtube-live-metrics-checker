import { Slide, toast } from "react-toastify";
import { useRecoilState } from "recoil";
import { notifierState } from "../recoil/atom/notifier";
import { useEffect } from "react";

// 単体でテストが書きにくく、かつ実際に通知が表示されることは Container のテストで確認できるため、テストは書かない。
export const useNotifierEffect = () => {
  const [ notifier, setNotifier ] = useRecoilState(notifierState);

  useEffect(() => {
    if (notifier.type === "none") {
      return () => {};
    }

    switch(notifier.type) {
      case "info":
        toast.info(notifier.text, { hideProgressBar: true, transition: Slide, onClose: (props) => {
          setNotifier({type: "none" });
        }});
        return () => setNotifier({ type: "none" });
      case "error":
        toast.error(notifier.text, { hideProgressBar: true, transition: Slide, onClose: (props) => {
          setNotifier({type: "none" });
        }});
        return () => setNotifier({ type: "none" });
      default:
        return () => setNotifier({ type: "none" });
    }
  }, [notifier.type]);
};
