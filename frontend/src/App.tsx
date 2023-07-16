import { MantineProvider, Text } from "@mantine/core";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Text>Welcome</Text>
    </MantineProvider>
  );
}

export default App;
