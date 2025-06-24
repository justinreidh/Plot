import Link from "next/link"

export default function Profile() {
    return (
        <div>
            Profile page
            <Link href={'/subscription'}>Manage Subscription</Link>
        </div>
    )
}