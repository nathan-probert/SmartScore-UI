import Link from 'next/link'

export const metadata = {
    title: 'Account',
}

export default function AccountPage() {
    return (
        <div className="flex flex-col items-center justify-center h-screen text-center p-5">
            <h1 className="text-6xl font-bold text-gray-500">Under Construction</h1>
            <p className="text-lg text-gray-500 my-4">
                This page is still a work in progress.
            </p>

            <img
                src="/images/construction.png"
                alt="Under Construction"
                className="w-72 mb-6"
            />

            <Link href="/">
                <div className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                    Go back home
                </div>
            </Link>
        </div>
    )
}
