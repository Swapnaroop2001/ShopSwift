
import { AspectRatio } from '@radix-ui/react-aspect-ratio'
import './App.css'
import { Button } from './components/ui/button'

function App() {


  return (
    <>
      <div className="flex flex-col  min-h-svh">
        <Button variant='destructive' size='default'>Click me 2 times</Button>
        <Button variant='default' size='sm'>Click me 2 times</Button>
        <Button variant='default' size='lg'>Click me 2 times</Button>
        <Button variant='link' size='sm'>Click me 2 times</Button>
        <AspectRatio ratio={16 / 9} >
        <div className="bg-red-500"></div>
        </AspectRatio>
    </div>
    </>
  )
}

export default App
