/*
  The `Cta` (Call to Action) React component is a reusable button component designed to serve as a call-to-action button in various parts of the application. It accepts props such as button class, click handler, children (inner content), and an optional disabled state.

  Component:
  - Cta: A reusable button component for call-to-action purposes.

  Key Functionalities:
  - Renders a button with the specified class (`btnClass`).
  - Optionally accepts a click handler (`clickHandler`) for handling button clicks.
  - Supports an optional disabled state (`disabled`) to control the button's interactivity.
  - Displays the inner content (`children`) within the button.

  Note: This component promotes reusability, allowing developers to easily integrate call-to-action buttons with customizable styles and functionality across different parts of the application.
*/



const Cta = ({btnClass, clickHandler, children, disabled}) => {
    return (    
      <button className={`m-1 ${btnClass}`} disabled={disabled} onClick={clickHandler? clickHandler: null}>{children}</button>
    )
  }

export default Cta