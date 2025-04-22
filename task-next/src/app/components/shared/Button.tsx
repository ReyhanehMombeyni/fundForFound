interface buttonType {
    btnType: number;
    text: string;
}
const Button:React.FC<buttonType> = ({btnType, text}) => {
  return (
    <button className={`btn px-5 rounded-lg ${btnType===1 ? "btn-primary" : "btn-outline btn-primary"}`}>{text}</button>
  )
}

export default Button