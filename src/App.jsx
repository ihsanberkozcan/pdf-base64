
import { Container, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import './App.css'
import MyDropzone from './components/MyDropzone'


function App() {

  return (
    <MantineProvider>
      <Container size="lg">
        <MyDropzone />
      </Container>
    </MantineProvider>
  )
}

export default App
