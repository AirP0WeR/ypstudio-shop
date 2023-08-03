import { withAuth } from "next-auth/middleware"

export default withAuth({
    callbacks: {
        authorized({ req, token }) {
            // `/admin` requires admin role
            if (req.nextUrl.pathname.startsWith("/admin")) {
                return token?.role === "admin"
            }
            // `/profile` only requires the user to be logged in
            return !!token
        },
    },
})

export const config = { matcher: ["/admin/:all*", "/profile", "/checkout"] }