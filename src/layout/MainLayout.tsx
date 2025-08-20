import type { ChildrenProp } from "../@types/children-type";
import Dialog from "../components/message/Dialog";

const MainLayout = ({children}:ChildrenProp) => {
  return (
    <>
        <Dialog/>
        {children}
    </>
  )
}

export default MainLayout
