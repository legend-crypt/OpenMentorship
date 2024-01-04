const Cta = ({btnClass, clickHandler, children, disabled}) => {
    return (    
      <button className={btnClass} disabled={disabled} onClick={clickHandler? clickHandler: null}>{children}</button>
    )
  }

export default Cta