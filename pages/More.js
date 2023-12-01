import { BiArrowBack as BackIcon } from "react-icons/bi";
import Link from 'next/link';
import Head from "next/head";

export default function More() {

    return (
        <>
            <div className='m-2'>
                <Head>
                    <title>
                        JNTUH RESULTS | More Features
                    </title>
                    <meta
                        name="description"
                        content="Check out here more features ."
                        key="desc"
                    />
                </Head>
                <div class="pt-10 pb-5 text-center">
                    <h1 class="mx-auto max-w-4xl font-display text-5xl font-medium tracking-tight text-slate-900 sm:text-7xl dark:text-white">Instant Access<span class="relative whitespace-nowrap text-blue-600">
                        <svg aria-hidden="true" viewBox="0 0 418 42" class="absolute top-2/3 left-0 h-[0.58em] w-full fill-blue-300/70" preserveAspectRatio="none">
                            <path d="M203.371.916c-26.013-2.078-76.686 1.963-124.73 9.946L67.3 12.749C35.421 18.062 18.2 21.766 6.004 25.934 1.244 27.561.828 27.778.874 28.61c.07 1.214.828 1.121 9.595-1.176 9.072-2.377 17.15-3.92 39.246-7.496C123.565 7.986 157.869 4.492 195.942 5.046c7.461.108 19.25 1.696 19.17 2.582-.107 1.183-7.874 4.31-25.75 10.366-21.992 7.45-35.43 12.534-36.701 13.884-2.173 2.308-.202 4.407 4.442 4.734 2.654.187 3.263.157 15.593-.78 35.401-2.686 57.944-3.488 88.365-3.143 46.327.526 75.721 2.23 130.788 7.584 19.787 1.924 20.814 1.98 24.557 1.332l.066-.011c1.201-.203 1.53-1.825.399-2.335-2.911-1.31-4.893-1.604-22.048-3.261-57.509-5.556-87.871-7.36-132.059-7.842-23.239-.254-33.617-.116-50.627.674-11.629.54-42.371 2.494-46.696 2.967-2.359.259 8.133-3.625 26.504-9.81 23.239-7.825 27.934-10.149 28.304-14.005.417-4.348-3.529-6-16.878-7.066Z"></path>
                        </svg>
                        <span class="relative">More Features</span>
                    </span>
                    </h1>
                    <p class="mx-auto mt-6 max-w-2xl text-base tracking-tight text-slate-700 dark:text-slate-300">We always strive to bring you the best. If you have any suggestions, please let us know.</p>
                </div>
                <Link href="/">
                    <div className="flex items-center justify-center cursor-pointer">
                        <BackIcon size="1.5rem" className="text-gray-400" />
                        <h3 className="text-lg sm:text-2xl font-bold ml-2">Home</h3>
                    </div>
                </Link>

                <div className="flex-col flex items-center justify-center">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-10">
                        {/* Grid elements */}
                        {/* <GridItem
                            title="Exam Results"
                            description="Get here present examination results"
                            link="/features/Examresults"
                        /> */}
                        <GridItem
                            title="Backlogs Fee"
                            description="get here the complete fee estimation"
                            link="/features/Backlogsfee"
                        />
                        <GridItem
                            title="HallTicket Generate"
                            description="view the entire supply exam schedule"
                            link="/features/Hallticketgenerator"
                        />
                        <GridItem
                            title="GPA Calculator"
                            description="Get Your SGPA And CGPA Calculation Manually"
                            link="/GPACalculator"
                        />
                        <GridItem
                            title="CGPA Percentage"
                            description="Get Your CGPA Percentage Here"
                            link="/features/CGPAPercentage"
                        />
                        <GridItem
                            title="Institutes Profile"
                            description="get here the complete fee estimation"
                            link="/features/Institutes"
                        />
                        <GridItem
                            title="Exam Results Link"
                            description="directly redirect to the jntuh results page"
                            link="/features/Examresultslink"
                        />
                        <GridItem
                            title="Suggestions"
                            description="please lets us know!"
                            link="https://telegram.me/JntuhResultschatBot"
                        />
                        {/* Add more GridItem components as needed */}
                    </div>
                </div>
            </div>
        </>
    );
}

// Grid item component
const GridItem = ({ title, description, link }) => (
    <div className="max-w-sm mb-4">
        <Link href={link}>
            <a className="block p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                <div className="flex gap-2 ">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
                </div>
                <p className="font-normal text-gray-700 dark:text-gray-400 capitalize">{description}</p>
            </a>
        </Link>
    </div>
);
