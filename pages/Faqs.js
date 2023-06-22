import { useState } from 'react';
import { BiChevronDown, BiChevronUp } from 'react-icons/bi';
import Hr from "../components/Hr/Hr";
import Link from "next/link";
import Head from 'next/head';

const Faq = () => {
    const [faqs, setFaqs] = useState([
        {
            question: 'What is Consolidated Results ?',
            answer: (
                <div>
                    Consolidated results refer to the overall performance of a student in all the semesters of a particular course or program. This means that the consolidated results take into account all the individual semester results of a student and provide an overall picture of their academic performance. Check out your results ,
                   <a className="text-blue-400 hover:text-blue-600"> <Link href="/ConsolidatedResult">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What is Sem Results ?',
            answer: (
                <div>
                    which contains the subject-wise marks, grades, and credits. It also displays the Students personal details and SGPA. Here you find the results of particular semester. Check out your results,
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="/SemResults">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What is Get Multiple Results ?',
            answer: (
                <div>
                    which contains the subject-wise marks, grades, and credits. It also displays the students personal details and SGPA for each student of particalur selected semester. Check out your results,
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="/MultiResults">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What are the benefits of using JNTUH Results Website ?',
            answer: 'This Website is build based upon students needs here is lot of stuff , Get all your results in one place. Just your hallticket, to rule them all',
            isOpen: false,
        },
        {
            question: 'Can I see my Overall backlogs ?',
            answer: (
                <div>
                    Yes! you can find your overall backlogs of btech here in this website. Go Main Home Section.
                    <br />
                    Check Here Is The Reference Of R18 Doc{' '}
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="/CGPACalculator">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'Can I see my Overall CGPA ?',
            answer: (
                <div>
                    Yes! you can see your overall CGPA of btech here in this website.
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="/CGPACalculator">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How to Fetch the List of Grades for a Semesters Students ?',
            answer: (
                <div>
                    {"Yes! you can see your overall CGPA of btech here in this website. Go to Section Home, 'Click Get Your CGPA' "}
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="MultiList">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How can I check my Jntuh result ?',
            answer: (
                <div>
                    {"Yes! you can see your overall CGPA of btech here in this website. Go to Section Home, 'Click Get Your CGPA' "}
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="MultiList">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How can I check my B Tech all semester results ?',
            answer: (
                <div>
                    {"Yes! you can see your overall CGPA of btech here in this website. Go to Section Home, 'Click Get Your CGPA' "}
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="MultiList">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What are the different types of results that I can view on the JNTUH Results website?',
            answer: (
                <div>
                    {"You can view your academic results, class results, and notifications "}
                    <a className="text-blue-400 hover:text-blue-600"> <Link href="/">Click Here To View.</Link></a>
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I view my academic results?',
            answer: (
                <div>
                    {"To view your academic results, you will need to enter your hall ticket number. You can find your hall ticket number on your admit card. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I view notifications?',
            answer: (
                <div>
                    {"To view notifications, you can click on the Notifications tab. You will see a list of all the latest notifications from JNTUH. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I report a crash or bug?',
            answer: (
                <div>
                    {" If you find any crashes or bugs, you can report them by clicking on the Help Desk tab. You will see a form where you can enter your details and describe the problem. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I support the JNTUH Results website?',
            answer: (
                <div>
                    {"If you found the JNTUH Results website helpful, you can support it by buying the developer a pizza. You can do this by clicking on the Support tab."}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'Who are the developers of the JNTUH Results website?',
            answer: (
                <div>
                    {"The developers of the JNTUH Results website are MD MOIZ UDDIN "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What are the future plans for the JNTUH Results website?',
            answer: (
                <div>
                    {"The developers of the JNTUH Results website plan to add more features in the future, such as the ability to view results of previous years and the ability to compare results with other students. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'Is there a website to view the overall performance and class results of JNTUH B.Tech students?',
            answer: (
                <div>
                    {"Yes, you can view the overall performance and class results of JNTUH B.Tech students by visiting the website"}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What is the difference between consolidated results and single results?',
            answer: (
                <div>
                    {"Consolidated results show the results of all your semesters. Single results show the results of a single semester."}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What is the difference between pass or fail list and detailed results?',
            answer: (
                <div>
                    {"Pass or fail list shows whether you passed or failed a particular semester. Detailed results show your marks in each subject."}
                </div>
            ),
            isOpen: false,
        },
        {
            question: ' What is the difference between credits eligible criteria and backlogs?',
            answer: (
                <div>
                    {"Credits eligible criteria shows the number of credits you need to pass a particular semester. Backlogs are the number of semesters you have failed. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'What is the difference between credits eligible criteria and overall backlogs list?',
            answer: (
                <div>
                    {"Credits eligible criteria shows the number of credits you need to pass in order to be eligible to graduate, while overall backlogs list shows the number of backlogs you have in total. "}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I find out my credits eligible criteria?',
            answer: (
                <div>
                    {"To find out your credits eligible criteria, you will need to visit the website and enter your hall ticket number."}
                </div>
            ),
            isOpen: false,
        },
        {
            question: 'How do I find out my overall backlogs list?',
            answer: (
                <div>
                    {"To find out your credits eligible criteria, you will need to visit the website and enter your hall ticket number."}
                </div>
            ),
            isOpen: false,
        },
    ]);

    const toggleFaq = (index) => {
        setFaqs(
            faqs.map((faq, i) => {
                if (i === index) {
                    return { ...faq, isOpen: !faq.isOpen };
                } else {
                    return { ...faq, isOpen: false };
                }
            })
        );
    };

    const renderAnswer = (answer) => {
        if (typeof answer === 'string') {
            return <p className="text-gray-600">{answer}</p>;
        } else {
            return answer;
        }
    };

    return (
        <div className="container mx-auto py-12">
                        <Head>
                <title>
                    JNTUH RESULTS | FAQS
                </title>
                <meta
                    name="description"
                    content="Check out RESULTSJNTUH website faqs .."
                    key="desc"
                />
            </Head>
            <h1 className="text-4xl font-bold text-center mb-5">Frequently Asked Questions</h1>
            <center><hr className="sm:w-96 w-48 border-gray-700 mb-6 " /></center>
            <div className="grid gap-4">
                {faqs.map((faq, index) => (
                    <div key={index} className="bg-white shadow-md rounded-md p-6">
                        <div className="flex items-center cursor-pointer mb-4" onClick={() => toggleFaq(index)}>
                            <div className="flex-1">
                                <h2 className="text-lg font-bold">{faq.question}</h2>
                            </div>
                            {faq.isOpen ? <BiChevronUp className="text-gray-400 text-2xl" /> : <BiChevronDown className="text-gray-400 text-2xl" />}
                        </div>
                        {faq.isOpen && renderAnswer(faq.answer)}
                    </div>
                ))}
            </div>
            <br />
            <center>
                <button className="w-[70px] text-white	bg-blue-700 rounded mr-1.5 text-[60%] hover:bg-yellow-400 py-[0.15em] px-[1.2em] sm:w-[180px] sm:text-[100%] font-bold" >
                    <a href='https://telegram.me/JntuhResultschatBot'>
                        Ask Questions?
                    </a>
                </button>
            </center>
            <br />
            <Hr />
        </div>
    );
};

export default Faq;