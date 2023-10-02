import { useCreateUserMutation } from "@/redux/api/authApi";
import {
  Anchor,
  Container,
  Group,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

function RegisterScreen() {
  const navigate = useNavigate();
  const [createUser, { data, isError, isSuccess, error }] =
    useCreateUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/sign-in");
    }
    if (isError) {
      toast.error((error as any)?.data?.message);
    }
  }, [isSuccess, isError, data?.message]);

  const form = useForm({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },

    validate: {
      email: (val) => (/^\S+@\S+$/.test(val) ? null : "Invalid email"),
      password: (val) =>
        val.length <= 5
          ? "Password should include at least 6 characters"
          : null,
    },
  });

  const handleSubmit = (data: any) => {
    createUser(data);
  };
  return (
    <div className="my-20">
      <Container size={"xs"}>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Book Catalog
          </Text>

          <form onSubmit={form.onSubmit((data) => handleSubmit(data))}>
            <Stack>
              <TextInput
                label="Name"
                placeholder="Your name"
                value={form.values.name}
                onChange={(event) =>
                  form.setFieldValue("name", event.currentTarget.value)
                }
                radius="md"
              />
              <TextInput
                required
                label="Email"
                placeholder="hello@mantine.dev"
                value={form.values.email}
                onChange={(event) =>
                  form.setFieldValue("email", event.currentTarget.value)
                }
                error={form.errors.email && "Invalid email"}
                radius="md"
              />

              <PasswordInput
                required
                label="Password"
                placeholder="Your password"
                value={form.values.password}
                onChange={(event) =>
                  form.setFieldValue("password", event.currentTarget.value)
                }
                error={
                  form.errors.password &&
                  "Password should include at least 6 characters"
                }
                radius="md"
              />
            </Stack>

            <Group position="apart" mt="xl">
              <Anchor component={Link} to="/sign-in" color="dimmed" size="xs">
                Already have an account? Login
              </Anchor>
            </Group>
            <button
              type="submit"
              className="bg-blue-500 w-full py-2 rounded text-white font-medium mt-3"
            >
              Register
            </button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default RegisterScreen;
