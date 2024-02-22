
const Wrapper = ({children, className}) => {
  return (
    <div className={`max-w-[1240px] mx-auto px-3 ${className}`}>
        {children}
    </div>
  )
}

export default Wrapper