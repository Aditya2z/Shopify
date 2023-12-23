function Thumb(props){
    return(<button
        className='text-3xl text-white bg-black p-2 w-16 h-16 text-center leading-16 absolute top-0 right-0'
        onClick={props.handleCartToggle}
      >
        <i className="fas fa-shopping-cart"></i>
      </button>)
}

export default Thumb;