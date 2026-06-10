Download the React DevTools for a better development experience: https://react.dev/link/react-devtools
2recharts.js?v=36f72ef7:7342 The width(-1) and height(-1) of chart should be greater than 0,
       please check the style of container, or the props width(100%) and height(100%),
       or add a minWidth(0) or minHeight(undefined) or use aspect(undefined) to control the
       height and width.
warn @ recharts.js?v=36f72ef7:7342
Academy.tsx:223 Uncaught ReferenceError: ChevronRight is not defined
    at Academy.tsx:223:24
    at Array.map (<anonymous>)
    at Academy (Academy.tsx:203:22)
    at Object.react_stack_bottom_frame (react-dom_client.js?v=36f72ef7:12868:12)
    at renderWithHooks (react-dom_client.js?v=36f72ef7:4213:19)
    at updateFunctionComponent (react-dom_client.js?v=36f72ef7:5569:16)
    at beginWork (react-dom_client.js?v=36f72ef7:6140:20)
    at runWithFiberInDEV (react-dom_client.js?v=36f72ef7:851:66)
    at performUnitOfWork (react-dom_client.js?v=36f72ef7:8429:92)
    at workLoopSync (react-dom_client.js?v=36f72ef7:8325:37)
react-dom_client.js?v=36f72ef7:5258 An error occurred in the <Academy> component.

Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://react.dev/link/error-boundaries to learn more about error boundaries.

the above errors i got them from the clinical academy for the student dahsbaord, fix that because it displays for a second then it becomes blank. I have also added a new image in the project folder, i want you to use it for the logo in all the pages and also as the favicon.