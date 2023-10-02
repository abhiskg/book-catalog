import { userInfoFromLocalstorage } from "@/utils/utils";
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
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

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

  const user = userInfoFromLocalstorage;
  const navigate = useNavigate();

  const logoutHandle = () => {
    localStorage.removeItem("Bookshelf-Info");
    toast.success("Log out successfully");
    navigate("/");
    window.location.reload();
  };

  return (
    <Header height={60}>
      <Container className={classes.header} size={"lg"}>
        <Link to="/" className={classes.link}>
          Book Catalog
        </Link>
        <Group spacing={5} className={classes.links}>
          <Link
            to="/"
            className={cx(classes.link, {
              [classes.linkActive]: active === "/",
            })}
            onClick={() => {
              setActive("/");
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
          {user?.accessToken && (
            <>
              <Link
                to="/book/wishlist"
                className={cx(classes.link, {
                  [classes.linkActive]: active === "/book/wishlist",
                })}
                onClick={() => {
                  setActive("/book/wishlist");
                }}
              >
                Wishlist
              </Link>
              <Link
                to="/book/plan-to-read"
                className={cx(classes.link, {
                  [classes.linkActive]: active === "/book/plan-to-read",
                })}
                onClick={() => {
                  setActive("/book/plan-to-read");
                }}
              >
                Book Plan
              </Link>
            </>
          )}
          {!user?.accessToken ? (
            <>
              {" "}
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
            </>
          ) : (
            <button
              onClick={logoutHandle}
              className="bg-blue-400 text-sm text-white font-medium px-2 py-1 rounded"
            >
              Log Out
            </button>
          )}
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
