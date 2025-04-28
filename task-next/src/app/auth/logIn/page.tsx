import FundTitrComp from "@/app/components/shared/FundTitrComp"
import FormLogin from "./components/FormLogin"

const logIn = () => {
  return (
    <div className="flex flex-col items-center gap-10 text-center py-10">
        <FundTitrComp />
        <FormLogin />
    </div>
  )
}

export default logIn