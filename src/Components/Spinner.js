const Spinner = ({size,color}) => {
    return (
        <div className=" flex justify-center items-center">
                  <div className={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-${color}`}></div>
        </div>
    )
}

export default Spinner