import { useLoginUserMutation } from "@/redux/api/authApi";
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

function LoginScreen() {
  const navigate = useNavigate();
  const [loginUser, { data, isError, isSuccess, error }] =
    useLoginUserMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success(data?.message);
      navigate("/");

      const localStorageData: { accessToken: string; email: string } = {
        accessToken: data.data.accessToken,
        email: data.data.email,
      };
      localStorage.setItem("Bookshelf-Info", JSON.stringify(localStorageData));
      window.location.reload();
    }
    if (isError) {
      toast.error((error as any)?.data?.message);
    }
  }, [isSuccess, isError]);

  const form = useForm({
    initialValues: {
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
    loginUser(data);
  };
  return (
    <div className="mt-20">
      <Container size={"xs"}>
        <Paper radius="md" p="xl" withBorder>
          <Text size="lg" weight={500}>
            Welcome to Book Catalog
          </Text>

          <form onSubmit={form.onSubmit((data) => handleSubmit(data))}>
            <Stack>
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
              <Anchor component={Link} to="/sign-up" color="dimmed" size="xs">
                Don't have an account? Register
              </Anchor>
            </Group>
            <button
              type="submit"
              className="bg-blue-500 w-full py-2 rounded text-white font-medium mt-3"
            >
              Login
            </button>
          </form>
        </Paper>
      </Container>
    </div>
  );
}

export default LoginScreen;
