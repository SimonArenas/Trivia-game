import { useStore } from "@/app/context";
import { Switch } from "@headlessui/react";
import clsx from "clsx";

export default function Toggle() {
  const { isTextToSpeechActivated, setTextToSpeechActivated } = useStore();

  return (
    <Switch.Group
      as="div"
      className="flex items-center justify-center relative"
    >
      <Switch
        checked={isTextToSpeechActivated}
        onChange={() => setTextToSpeechActivated(!isTextToSpeechActivated)}
        className={clsx(
          isTextToSpeechActivated ? "bg-indigo-600" : "bg-gray-200",
          "relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-600 focus:ring-offset-2"
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            isTextToSpeechActivated ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out"
          )}
        />
      </Switch>
      <Switch.Label as="span" className="ml-3 text-sm">
        <span className="font-medium text-gray-900">
          Activate text-to-speech
        </span>{" "}
      </Switch.Label>
    </Switch.Group>
  );
}
