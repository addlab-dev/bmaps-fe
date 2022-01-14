const Spinner = ({size,color}) => {
    return (
        <div class=" flex justify-center items-center">
                  <div class={`animate-spin rounded-full h-${size} w-${size} border-b-2 border-${color}`}></div>
        </div>
    )
}

export default Spinner