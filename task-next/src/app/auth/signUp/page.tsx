import FundTitrComp from "../../components/shared/FundTitrComp"
import FormSignup from "./components/FormSignup"

const signUp = () => {
  return (
    <div className="flex flex-col items-center gap-10 text-center py-10">
        <h1 className="text-2xl font-semibold text-gray-700">Create your personal account</h1>
        <FundTitrComp />
        <FormSignup />
    </div>
  )
}

export default signUp