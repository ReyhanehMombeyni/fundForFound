interface buttonType {
    btnType: number;
    text: string;
}
const Button:React.FC<buttonType> = ({btnType, text}) => {
  return (
    <button className='btn btn-primary px-5 rounded-lg'>{text}</button>
  )
}

export default Button