import Link from 'next/link';

export const metadata = {
  title: 'Help',
}

export default function Help() {
  return (
    <div className="container mx-auto p-6">
      <div className="relative inline-block mb-6">
        <h1 className="text-5xl font-bold text-center mb-2">Help & About</h1>
        <div className="absolute left-0 right-0 bottom-0 h-1 bg-primary" style={{ marginLeft: '10%', marginRight: '10%' }}></div>
      </div>
      <nav className="flex pb-16">
        <ul className="space-y-2 text-left">
          <li>
            <Link href="#section1" className="text-link hover:underline">
              Section 1: What is SmartScore
            </Link>
          </li>
          <li>
            <Link href="#section2" className="text-link hover:underline">
              Section 2: Making your Tim&apos;s Picks
            </Link>
          </li>
          <li>
            <Link href="#section3" className="text-link hover:underline">
              Section 3: Contact Support
            </Link>
          </li>
        </ul>
      </nav>

      <div id="section1" className="mb-16 scroll-mt-24">
        <h2 className="text-4xl font-semibold mb-2">What is SmartScore</h2>
        <p className="">
            &nbsp;&nbsp;&nbsp;&nbsp;
            SmartScore is a user-friendly platform designed to assist you in the 
            <span className="relative group">
                <a className="text-link hover:underline" target="_blank" href="https://www.timhortons.ca/tims-nhl-hockey-challenge"> Tim Horton&apos;s Hockey Challenge</a>
                <span className="absolute left-1/2 transform -translate-x-1/2 mt-[-2rem] w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Win rewards by predicting NHL goal scorers daily
                </span>
            </span>.
            To do this, SmartScore leverages cloud computing with machine learning and AI to generate probabilities of each player scoring.
            For convenience, SmartScore also provides a toggle feature to switch between the Tim Horton&apos;s and NHL versions of the game.
        </p>
        <br />

        <h2 className="text-xl">Tim Horton&apos;s Mode:</h2>
        <div className="ml-5">
            <img src="/images/toggle-nhl.png" alt="SmartScore Screenshot" className="h-auto w-20" />
            <p>In Tim Horton&apos;s mode, only players who can actually be selected for today will be displayed, divided into their respective
                <span className="relative group">
                    <a className="text-link hover:underline" target="_blank" href="https://www.timhortons.ca/tims-nhl-hockey-challenge"> Tim&apos;s Group</a>
                    <span className="absolute left-1/2 transform -translate-x-1/2 mt-[-2rem] w-max bg-gray-800 text-white text-sm rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        You can select one player from each of 3 groups per day
                    </span>
                </span>
                . This makes it easy to compare players and make your winning selection!
            </p>
            <br />
        </div>

        <h2 className="text-xl">NHL Mode:</h2>
        <div className="ml-5">
            <img src="/images/toggle-tims.png" alt="SmartScore Screenshot" className="h-auto w-20" />
            <p>In NHL mode, all players will be shown, regardless of whether or not they can be picked for Tims. This can be useful to simply compare all players and helping you make informed decisions!</p>
            <br />
            <p><span className="font-bold">**Disclaimer:**</span> The predictions and analyses provided by SmartScore are for informational purposes only. While we strive to provide accurate data, SmartScore does not guarantee the accuracy or completeness of any predictions. Users are encouraged to use their discretion and judgment when making betting decisions. SmartScore will not be liable for any losses or damages incurred as a result of reliance on the predictions made by the platform.</p>
            </div>
        </div>

      <div id="section2" className="mb-16">
        <h2 className="text-4xl font-semibold mb-2">Making your Tim&apos;s Picks</h2>
        <ul className="space-y-2 text-left ml-5">
          <li>
              1. Navigate to the Tim Horton&apos;s app, and select the &quot;Hockey Challenge&quot; tab.
          </li>
          <li>
              2. Select one player from each group using the dropdown menus. This is where SmartScore comes in! Our platform provides you with the predicted probability of each player scoring in each group, so you can make an informed decision.
          </li>
          <li>
              3. Lock in your picks, then check back in the next day to see how you did and make your next predictions!
          </li>
        </ul>

      </div>
      <div id="section3" className="mb-6">
        <h2 className="text-4xl font-semibold mb-2">Contact Support</h2>
        <p className="">
          &nbsp;&nbsp;&nbsp;&nbsp;
          Feel free to reach out to me at nathanprobert@rogers.com if you have any issues, questions or suggestions!
        </p>
      </div>
    </div>
  );
}
