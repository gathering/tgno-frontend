export function callOnceAvailable<T extends HTMLElement>({
  element,
  callback,
  check,
  readyEvent,
}: {
  element: T | null;
  callback: (element: T) => void;
  check: (element: T) => boolean;
  readyEvent: string;
}) {
  if (!element) {
    return;
  }

  if (check(element)) {
    callback(element);
    return;
  } else {
    const ready = () => {
      if (check(element)) {
        callback(element);
        element.removeEventListener(readyEvent, ready);
      }
    };
    element.addEventListener(readyEvent, ready);
  }
}
