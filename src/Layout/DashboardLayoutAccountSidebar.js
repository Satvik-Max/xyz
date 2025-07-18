"use client";
import * as React from "react";
import PropTypes from "prop-types";
import { createTheme } from "@mui/material/styles";
import { AppProvider } from "@toolpad/core/AppProvider";
import { DashboardLayout } from "@toolpad/core/DashboardLayout";
import { useAuth } from "@/Context/AuthContext";
import Signin from "@/components/Authentication/Signin";
import { NAVIGATION } from "@/SampleData/NavbarData";
import { useRouter } from "next/navigation";

const demoTheme = createTheme({
  cssVariables: {
    colorSchemeSelector: "data-toolpad-color-scheme",
  },
  colorSchemes: { light: true, dark: false },
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 600,
      lg: 1200,
      xl: 1536,
    },
  },
});

function DashboardLayoutAccountSidebar(props) {
  const { window, children } = props;
  const { user, logoutUser } = useAuth();

  const isAuthorized =
    user?.labels &&
    Array.isArray(user?.labels) &&
    user.labels.some((label) => ["admin", "creator", "viewer"].includes(label));

  if (!user) {
    return <Signin />;
  } else if (!isAuthorized) {
    return <div>Access Denied
      <button onClick={logoutUser} >Logout </button>
    </div>;
  }

  const [session, setSession] = React.useState({
    user: {
      name: user?.name,
      email: user?.email,
      image:
        "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
    },
  });

  const authentication = React.useMemo(() => {
    return {
      signIn: () => {
        setSession({
          user: {
            name: user?.name,
            email: user?.email,
            image:
              "https://static.vecteezy.com/system/resources/previews/005/129/844/non_2x/profile-user-icon-isolated-on-white-background-eps10-free-vector.jpg",
          },
        });
      },
      signOut: () => {
        logoutUser();
        setSession(null);
      },
    };
  }, [logoutUser, user?.email, user?.name]);

  const DUMMY_BASE = "https://example.com";
  function useRouterCustom(initialUrl = "/") {
    const navigate = useRouter();
    const [url, setUrl] = React.useState(() => new URL(initialUrl, DUMMY_BASE));
    const router = React.useMemo(() => {
      return {
        pathname: url.pathname,
        searchParams: url.searchParams,
        navigate: (newUrl) => {
          const nextUrl = new URL(newUrl, DUMMY_BASE);
          if (
            nextUrl.pathname !== url.pathname ||
            nextUrl.search !== url.search
          ) {
            navigate.push(newUrl);
            setUrl(nextUrl);
          }
        },
      };
    }, [url.pathname, url.search, url.searchParams]);
    return router;
  }

  const router = useRouterCustom("/");
  const demoWindow = window !== undefined ? window() : undefined;

  return (
    <AppProvider
      session={session}
      authentication={authentication}
      navigation={NAVIGATION}
      router={router}
      theme={demoTheme}
      window={demoWindow}
      branding={{
        // logo: <img src="/logo.svg" alt="MUI logo" />,
        title: "GCOEN ADMIN",
        homeUrl: "/",

      }}
    >
      <DashboardLayout>
        <div className="p-5">{children}</div>
      </DashboardLayout>
    </AppProvider>
  );
}

DashboardLayoutAccountSidebar.propTypes = {
  window: PropTypes.func,
};

export default DashboardLayoutAccountSidebar;
