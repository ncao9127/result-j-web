import React, { useState, useEffect } from 'react';
import HomeFooter from '../../components/Home/HomeFooter';

const CGPAPercentage = () => {
    const [cgpa, setCGPA] = useState('');
    const [percentage, setPercentage] = useState('');

    useEffect(() => {
        // Calculate percentage whenever cgpa changes
        const calculatedPercentage = parseFloat(cgpa) * 10 - 5;
        setPercentage(calculatedPercentage.toFixed(2)); // Round to 2 decimal places
    }, [cgpa]);

    return (
        <div>
            <div className='text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] justify-center items-center text-center m-10'>
                <div className="">
                    <h2 className='text-lg font-bold mb-2'>JNTUH CGPA To Percentage</h2>
                    <p>The JNTUH CGPA to Percentage calculator estimates the percentage equivalent of your CGPA at Jawaharlal Nehru Technological University Hyderabad (JNTUH). To obtain the JNTUH percentage, multiply your CGPA by 10 and subtract 5. This conversion helps approximate the marks you would have scored on a percentage scale.</p>
                </div>
                {/* box */}
                <div className='bg-white mt-6 border-2 border-gray-100 rounded-xl shadow-2xl w-[90%] mx-[5%] md:w-[55%] md:mx-[23%] '>
                    <div className=''>
                        <form className='flex gap-2 justify-center items-center m-4'>
                            <label className="block">
                                <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                                    CGPA
                                </span>
                                <input
                                    type="number"
                                    name="CGPA"
                                    aria-label="Enter your CGPA on a 10-point scale"
                                    value={cgpa}
                                    onChange={(e) => setCGPA(e.target.value)}
                                    className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                                    placeholder="Enter Your CGPA"
                                    required
                                />
                            </label>
                            <label className="block">
                                <span className=" after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                                    Percentage (%)
                                </span>
                                <input
                                    type="number"
                                    name="percentage"
                                    value={percentage}
                                    className="text-center 
                      disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
                      peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                                    placeholder="Your Percentage"
                                    disabled
                                />
                            </label>
                        </form>
                    </div>
                </div>
                <div className="mt-10">
                    <h2 className='text-lg font-bold mb-2'>JNTUH Grading System</h2>
                    <p>The Jawaharlal Nehru Technological University Hyderabad (JNTUH) Grading System is a straightforward method for evaluating students, using a 10-point scale to gauge their performance. It assigns letter grades based on their scores in various aspects like theory subjects, practicals, seminars, and projects.
                        <br /><br />
                        For instance, if a student achieves a score between 90% and 100%, they receive the top grade of ‘O’ (Outstanding); if their score falls within the range of 80% to 89%, they’re awarded an ‘A+’ (Excellent), and so on across the grade spectrum.
                        <br /><br />
                        The highest grade, ‘O,’ earns the most points, while the lowest, ‘F,’ signifies a failure to pass the course. Moreover, an ‘Ab’ grade is assigned in cases of absence from an exam, indicating the need for a makeup exam.
                        <br /><br />
                        A student who obtains an F grade in any subject must retake the examination as a supplementary student. A student who does not appear for the examination in any subject will be considered to have failed and must also retake the examination as an additional student.
                        <br /><br />
                        The Jawaharlal Nehru Technological University Hyderabad (JNTUH) grading system uses a 10-point absolute grading system with the following letter grades and corresponding percentage of marks:
                    </p>
                </div>
                <div className='mt-10'>
                    <h2 className='text-lg font-bold mb-2'>Letter Grade With Grade Points, Grade Definition, and Marks Percentage</h2>
                    <table className="border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 p-2">Letter Grade</th>
                                <th className="border border-gray-300 p-2">Grade Points</th>
                                <th className="border border-gray-300 p-2">Grade Definition</th>
                                <th className="border border-gray-300 p-2">Marks Percentage</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="border border-gray-300 p-2">O</td>
                                <td className="border border-gray-300 p-2">10</td>
                                <td className="border border-gray-300 p-2">Outstanding</td>
                                <td className="border border-gray-300 p-2">90% to 100%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">A+</td>
                                <td className="border border-gray-300 p-2">9.0</td>
                                <td className="border border-gray-300 p-2">Excellent</td>
                                <td className="border border-gray-300 p-2">80% to 89.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">A</td>
                                <td className="border border-gray-300 p-2">8.0</td>
                                <td className="border border-gray-300 p-2">Very Good</td>
                                <td className="border border-gray-300 p-2">70% to 79.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">B+</td>
                                <td className="border border-gray-300 p-2">7.0</td>
                                <td className="border border-gray-300 p-2">Good</td>
                                <td className="border border-gray-300 p-2">60% to 69.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">B</td>
                                <td className="border border-gray-300 p-2">6.0</td>
                                <td className="border border-gray-300 p-2">Average</td>
                                <td className="border border-gray-300 p-2">50% to 59.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">C</td>
                                <td className="border border-gray-300 p-2">5.0</td>
                                <td className="border border-gray-300 p-2">Pass</td>
                                <td className="border border-gray-300 p-2">40% to 49.9%</td>
                            </tr>
                            <tr>
                                <td className="border border-gray-300 p-2">F</td>
                                <td className="border border-gray-300 p-2">0.0</td>
                                <td className="border border-gray-300 p-2">Fail</td>
                                <td className="border border-gray-300 p-2">Below 40%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

            </div>
            <br /><br />
            <HomeFooter />
        </div>
    );
};

export default CGPAPercentage;