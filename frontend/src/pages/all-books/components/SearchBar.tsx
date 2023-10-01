import { Button, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const navigate = useNavigate();
  const form = useForm({
    initialValues: {
      search: "",
    },
  });

  const handleSubmit = (data: any) => {
    console.log(data);
    navigate(`/all-books/?search=${data.search}`);
  };
  return (
    <div>
      <form onSubmit={form.onSubmit((data) => handleSubmit(data))}>
        <Stack>
          <TextInput
            required
            placeholder="hello@mantine.dev"
            value={form.values.search}
            onChange={(event) =>
              form.setFieldValue("search", event.currentTarget.value)
            }
            error={form.errors.search && "Invalid search"}
            radius="md"
          />
        </Stack>

        <Button type="submit" radius="xl">
          Login
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;
