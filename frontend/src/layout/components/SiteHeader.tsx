import {
  Burger,
  Container,
  Group,
  Header,
  createStyles,
  rem,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useState } from "react";
import { Link } from "react-router-dom";

const useStyles = createStyles((theme) => ({
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    height: "100%",
  },
  links: {
    [theme.fn.smallerThan("sm")]: {
      display: "none",
    },
  },
  burger: {
    [theme.fn.largerThan("sm")]: {
      display: "none",
    },
  },
  link: {
    display: "block",
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: "none",
    color:
      theme.colorScheme === "dark"
        ? theme.colors.dark[0]
        : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  linkActive: {
    "&, &:hover": {
      backgroundColor: theme.fn.variant({
        variant: "light",
        color: theme.primaryColor,
      }).background,
      color: theme.fn.variant({ variant: "light", color: theme.primaryColor })
        .color,
    },
  },
}));

function SiteHeader() {
  const [opened, { toggle }] = useDisclosure(false);
  const [active, setActive] = useState("/home");
  const { classes, cx } = useStyles();

  return (
    <Header height={60} mb={120}>
      <Container className={classes.header}>
        <div>Book Catalog</div>
        <Group spacing={5} className={classes.links}>
          <Link
            to="/home"
            className={cx(classes.link, {
              [classes.linkActive]: active === "/home",
            })}
            onClick={() => {
              setActive("/home");
            }}
          >
            Home
          </Link>
          <Link
            to="/all-books"
            className={cx(classes.link, {
              [classes.linkActive]: active === "/all-books",
            })}
            onClick={() => {
              setActive("/all-books");
            }}
          >
            All Books
          </Link>
          <Link
            to="/sign-in"
            className={cx(classes.link, {
              [classes.linkActive]: active === "/sign-in",
            })}
            onClick={() => {
              setActive("/sign-in");
            }}
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className={cx(classes.link, {
              [classes.linkActive]: active === "/sign-up",
            })}
            onClick={() => {
              setActive("/sign-up");
            }}
          >
            Sign Up
          </Link>
        </Group>

        <Burger
          opened={opened}
          onClick={toggle}
          className={classes.burger}
          size="sm"
        />
      </Container>
    </Header>
  );
}

export default SiteHeader;
