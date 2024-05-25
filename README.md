Thanks to Sam Selikoff, after struggling with framer motion with its layouts and keys that won't work for reusable components I found Sam's solution for resizable containers to be perfect for this issue. I adapted his implementation to a Radix Dialog with a back and forth transition between two elements. There might be some stuff to tweak yet but the thing is actually working fine. Also before implementing the `ignoreCircularReferences` to grab the children as a `key: string` I had to do some research about it and this helped me to understand that I could recover the key of each element back to the ResizablePanel component to track current children that is rendering and do the back and forth transition like so: `initial={{x: currentKey === "a" ? -512 : 512}} exist={{currentKey === "b" ? 512 : -512}}`

- Sam Selikoff: https://samselikoff.com
- Sam's video: https://www.youtube.com/watch?v=G3OyF-lRAWo&t=129s
- Circular reference explanation: https://www.youtube.com/watch?v=EaHC3QfU1NY
