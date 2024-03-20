import { Button } from "@/components/ui/button"
import FlexibleContainer from "@/components/ui/flexible-container"
import { ModeToggle } from "@/components/mode-toggle"
import Accounts from "@/components/accounts"
import Posts from "@/components/posts"

function App() {
  return (
    <>
      <FlexibleContainer>
        <div className="w-full h-full flex flex-col gap-6 rounded-lg">
          <div className="flex justify-end gap-3 items-center">
            <Button variant="outline" className="w-40">Start</Button>
            <ModeToggle />
          </div>
          <div className="w-full grid lg:grid-cols-3 gap-6">
            <Accounts />
            <Posts />
            <div className="w-full h-64 bg-foreground"></div>
          </div>
        </div>
      </FlexibleContainer>
    </>
  )
}

export default App
