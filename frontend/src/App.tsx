import { Button } from "@/components/ui/button"
import FlexibleContainer from "@/components/ui/flexible-container"
import { ModeToggle } from "@/components/mode-toggle"
import Accounts from "@/components/accounts"
import Posts from "@/components/posts"
import Coverages from "@/components/coverages"
import Sender from "@/components/sender"

function App() {
  return (
    <>
      <FlexibleContainer>
        <div className="w-full h-full flex flex-col gap-6 rounded-lg">
          <div className="flex justify-end gap-3 items-center">
            <ModeToggle />
          </div>
          <div className="w-full grid lg:grid-cols-4 gap-6">
            <Accounts />
            <Posts />
            <Coverages />
            <Sender />
            {/* <div className="w-full h-64 bg-foreground"></div> */}
          </div>
        </div>
      </FlexibleContainer>
    </>
  )
}

export default App
