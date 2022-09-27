import { withServerSideAuth } from "@clerk/nextjs/ssr";




import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn,UserButton } from '@clerk/nextjs';
import { useRouter } from 'next/router';


import '../styles/globals.css'
//  List pages you want to be publicly accessible, or leave empty if
//  every page requires authentication. Use this naming strategy:
//   "/"              for pages/index.js
//   "/foo"           for pages/foo/index.js
//   "/foo/bar"       for pages/foo/bar.js
//   "/foo/[...bar]"  for pages/foo/[...bar].js
const publicPages = [];

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  
  // Get the pathname
  const { pathname } = useRouter();

  // Check if the current route matches a public page
  const isPublicPage = publicPages.includes(pathname);
  


  var userButton=<UserButton/>;
  // If the current route is listed as public, render it directly
  // Otherwise, use Clerk to require authentication
  pageProps.userButton=userButton;
  // pageProps.userButton=user;
  return getLayout(
    <ClerkProvider>
      {isPublicPage ? (
        <Component {...pageProps} />
      ) : (
        <>
          <SignedIn>
              <Component {...pageProps} />  
          </SignedIn>
          <SignedOut>
            <RedirectToSignIn />
          </SignedOut>
        </>
      )}
    </ClerkProvider>
  );
}

export default MyApp;



