import { useState } from "react";
import "./App.css";
import * as Dialog from "@radix-ui/react-dialog";
import { motion } from "framer-motion";
import { MotionConfig } from "framer-motion";
import useMeasure from "react-use-measure";
import { AnimatePresence } from "framer-motion";

let duration = 0.25;

function App() {
  const [content, setContent] = useState("a");

  const draftA = (
    <div key={content} className="flex flex-col gap-3">
      <p className="text-blue-400 font-mono">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis aut
        reprehenderit, sint, temporibus voluptatem molestias ullam nesciunt,
        neque iure cumque ratione minus et libero dolorem! Rerum doloremque
        culpa corrupti dolor!
      </p>
      <button
        className="font-mono capitalize text-emerald-600 bg-emerald-200 py-1.5 px-2 rounded-md w-fit"
        onClick={() => setContent("b")}
      >
        Go to form →
      </button>
    </div>
  );
  const draftB = (
    <div key={content} className="flex flex-col gap-3">
      <p className="text-violet-400 font-mono">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Blanditiis aut
      </p>
      <div>
        <form action="">
          <label className="flex flex-col" htmlFor="">
            Name
            <input
              className="bg-white border border-stone-400 rounded-md"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="">
            Surname
            <input
              className="bg-white border border-stone-400 rounded-md"
              type="text"
            />
          </label>
          <label className="flex flex-col" htmlFor="">
            Description
            <input
              className="bg-white border border-stone-400 rounded-md"
              type="text"
            />
          </label>
        </form>
      </div>
      <div className="flex items-center justify-between">
        <button
          className="font-mono capitalize text-orange-600 bg-orange-200 py-1.5 px-2 rounded-md w-fit"
          onClick={() => setContent("a")}
        >
          ← Go back
        </button>
        <button className="font-mono capitalize text-blue-600 bg-blue-200 py-1.5 px-2 rounded-md w-fit">
          Send
        </button>
      </div>
    </div>
  );

  const modalContent = {
    a: draftA,
    b: draftB,
  };
  return (
    <Dialog.Root onOpenChange={() => setContent("a")}>
      <Dialog.Trigger>open</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=closed]:animate-[dialog-overlay-hide_200ms] data-[state=open]:animate-[dialog-overlay-show_200ms]" />
        <MotionConfig transition={{ duration: duration }}>
          <Dialog.Content asChild className="">
            <div className="absolute inset-x-0 mx-auto bottom-0 top-0 right-0 left-0 m-auto max-w-lg rounded-md bg-white text-gray-900 shadow h-fit">
              <div className="pt-8 px-8">
                <p className="font-mono text-2xl">This is a dialog</p>
              </div>
              <ResizablePanel>{modalContent[content]}</ResizablePanel>
            </div>
          </Dialog.Content>
        </MotionConfig>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default App;

function ResizablePanel({ children }) {
  let [ref, { height }] = useMeasure();

  const childrenToString = JSON.stringify(children, ignoreCircularReferences());
  const currentKey = JSON.parse(childrenToString)?.key;

  return (
    <motion.div
      animate={{ height: height }}
      className="overflow-hidden relative"
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={childrenToString}
          initial={{
            // opacity: 0,
            x: currentKey === "a" ? -512 : 512,
          }}
          animate={{
            // opacity: 1,
            x: 0,
            // transition: { duration: duration / 2, delay: duration / 2 },
          }}
          exit={{
            // opacity: 0,
            x: currentKey === "b" ? 512 : -512,
            // transition: { duration: duration / 2 }
          }}
        >
          <div ref={ref} className={`${height ? "absolute" : "relative"} p-8`}>
            {/* <h1>hello</h1> */}
            {children}
          </div>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
}

const ignoreCircularReferences = () => {
  const seen = new WeakSet();
  return (key, value) => {
    if (key.startsWith("_")) return; // Don't compare React's internal props.
    if (typeof value === "object" && value !== null) {
      if (seen.has(value)) return;
      seen.add(value);
    }
    return value;
  };
};

//448px
