import Head from 'next/head';
import React, { useState } from 'react';
import GPAview from "../components/ui/GPAview"

const GPACalculator = () => {

  const defaultSgpaForm = { subject: '', grade: '', credit: '' };
  const defaultCgpaForm = { semester: '', sgpa: '' };

  const [selectedButton, setSelectedButton] = useState('sgpa');
  const [sgpaForms, setSgpaForms] = useState([defaultSgpaForm]);
  const [cgpaForms, setCgpaForms] = useState([defaultCgpaForm]);
  const [sgpaResult, setSgpaResult] = useState(null);
  const [cgpaResult, setCgpaResult] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const calculateSGPA = () => {
    const gradePoints = {
      'O': 10,
      'A+': 9,
      'A': 8,
      'B+': 7,
      'B': 6,
      'C': 5,
      'D': 0,
      'F': 0,
      'P': 0,
      'Ab': 0,
      '-': 0,
    };

    const totalCredits = sgpaForms.reduce((total, form) => total + parseFloat(form.credit), 0);
    const totalGradePoints = sgpaForms.reduce((total, form) => {
      const credit = parseFloat(form.credit);
      const gradePoint = gradePoints[form.grade.toUpperCase()] || 0; // Default to 0 if grade is not found
      return total + (credit * gradePoint);
    }, 0);

    const sgpa = totalGradePoints / totalCredits;
    console.log('Calculated SGPA:', sgpa.toFixed(2));

    // Set the result and form data
    setSgpaResult(sgpa.toFixed(2));
  };

  const calculateCGPA = () => {
    const totalSemesters = cgpaForms.length;
    const totalSGPAs = cgpaForms.reduce((total, form) => total + parseFloat(form.sgpa), 0);

    const cgpa = totalSGPAs / totalSemesters;
    console.log('Calculated CGPA:', cgpa.toFixed(2));

    // Set the result and form data
    setCgpaResult(cgpa.toFixed(2));
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleAddSubject = () => {
    setSgpaForms([...sgpaForms, defaultSgpaForm]);
  };

  const handleAddSemester = () => {
    setCgpaForms([...cgpaForms, defaultCgpaForm]);
  };

  const handleReset = () => {
    if (selectedButton === 'sgpa') {
      setSgpaForms([defaultSgpaForm]);
    } else {
      setCgpaForms([defaultCgpaForm]);
    }
  };

  const handleSGPASubmit = () => {
    // Log SGPA calculation logic here
    // For now, just log the form values
    calculateSGPA();
    console.log('SGPA Form Values:', sgpaForms);
    setModalVisible(true);
  };

  const handleCGPASubmit = () => {
    // Log CGPA calculation logic here
    // For now, just log the form values
    calculateCGPA();
    console.log('CGPA Form Values:', cgpaForms);
    setModalVisible(true);
  };


  const handleInputChange = (index, form, field, value) => {
    if (selectedButton === 'sgpa') {
      const updatedForms = [...sgpaForms];
      updatedForms[index][field] = value;
      setSgpaForms(updatedForms);
    } else {
      const updatedForms = [...cgpaForms];
      updatedForms[index][field] = value;
      setCgpaForms(updatedForms);
    }
  };

  // Function to hide the modal
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div className='relative flex min-h-screen flex-col justify-center overflow-hidden' >
      <Head>
        <title>
          JNTUH | GPA Calculator
        </title>
        <meta
          name="description"
          content="Check out your GPA calculation here."
          key="desc"
        />
      </Head>
      <img src="/beams.jpg" alt="" class="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2" width="1308" />
      <div class="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
      <div className="flex m-4 justify-center mt-10 text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%]] relative ">
        <div className='rounded-xl flex bg-gray-100 px-2 py-2 font-medium text-sm'>
          <button
            className={`flex items-center px-4 py-2 rounded-xl dark:text-black ${selectedButton === 'sgpa' ? 'bg-gray-200' : ''}`}
            onClick={() => handleButtonClick('sgpa')}
          >
            SGPA
          </button>
          <button
            className={`flex items-center px-3 py-2 rounded-xl dark:text-black ${selectedButton === 'cgpa' ? 'bg-gray-200' : ''}`}
            onClick={() => handleButtonClick('cgpa')}
          >
            CGPA
          </button>
        </div>
      </div>

      <div className='w-[90%] mx-[5%] md:w-[55%] md:mx-[23%] justify-center items-center text-center text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] relative'>
        {selectedButton === 'sgpa' && (
          <div className='bg-white mt-6 border-2 border-gray-100 rounded-xl shadow-2xl'>
            <div className='bg-pink-100 text-left py-2 px-4 rounded-xl dark:text-black'>
              <h1 className='font-bold text-lg mt-4 '>SGPA Calculator</h1>
              <p className='text-xs'>Semester Grade Point Average</p>
            </div>
            {sgpaForms.map((form, index) => (
              <div key={index} className='m-4'>
                <form className='flex gap-2 justify-center items-center m-4'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                      Subject
                    </span>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={(e) => handleInputChange(index, 'sgpa', 'subject', e.target.value.toUpperCase())}
                      className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                      placeholder="Enter Subject Name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                      Grade
                    </span>
                    <select
                      name="grade"
                      value={form.grade}
                      onChange={(e) => handleInputChange(index, 'sgpa', 'grade', e.target.value)}
                      className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                      required
                    >
                      <option value="">Select Grade</option>
                      <option value="O">O</option>
                      <option value="A+">A+</option>
                      <option value="A">A</option>
                      <option value="B+">B+</option>
                      <option value="B">B</option>
                      <option value="C">C</option>
                      <option value="D">D</option>
                      <option value="F">F</option>
                      <option value="P">P</option>
                      <option value="Ab">Ab</option>
                      <option value="-">MAL</option>
                    </select>
                  </label>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                      Credit
                    </span>
                    <input
                      type="number"
                      name="credit"
                      value={form.credit}
                      onChange={(e) => handleInputChange(index, 'sgpa', 'credit', e.target.value.toUpperCase())}
                      className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                      placeholder="Subject credit"
                      required
                    />
                  </label>
                </form>
              </div>
            ))}
            <button onClick={handleAddSubject} className=' bg-purple-100 text-purple-800 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300'>Add Subject</button><br /><br />
            <button onClick={handleSGPASubmit} className="bg-violet-500 px-2.5 py-0.5 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded">
              Calculate SGPA
            </button>
            <br />
            <br />
            {isModalVisible && <GPAview title="SGPA" formData={sgpaForms} result={sgpaResult} onClose={handleCloseModal} />}
          </div>
        )}


        {selectedButton === 'cgpa' && (
          <div className='bg-white mt-6 border-2 border-gray-100 rounded-xl shadow-2xl dark:text-black '>
            <div className='bg-sky-100 text-left py-2 px-4 rounded-xl'>
              <h1 className='font-bold text-lg mt-4 '>CGPA Calculator</h1>
              <p className='text-xs capitalize'>Cumulative grade point average</p>
            </div>
            {cgpaForms.map((form, index) => (
              <div key={index} className='m-4'>
                <form className='flex gap-2 items-center justify-center m-4'>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                      Sem
                    </span>
                    <input
                      type="text"
                      name="semester"
                      value={form.semester}
                      onChange={(e) => handleInputChange(index, 'cgpa', 'semester', e.target.value.toUpperCase())}
                      className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                      placeholder="Semester Name"
                      required
                    />
                  </label>
                  <label className="block">
                    <span className="after:content-['*'] after:ml-0.5 after:text-red-500 block font-medium text-slate-700 text-left">
                      SGPA
                    </span>
                    <input
                      type="number"
                      name="sgpa"
                      value={form.sgpa}
                      onChange={(e) => handleInputChange(index, 'cgpa', 'sgpa', e.target.value)}
                      className="text-center peer mt-1 px-2 py-1 bg-white border shadow-sm border-slate-300 placeholder-slate-400 focus:outline-none focus:border-sky-500 focus:ring-sky-500 block rounded-md sm:text-sm focus:ring-1 dark:text-black"
                      placeholder="sGPA"
                      required
                    />
                  </label>
                </form>
              </div>
            ))}
            <button onClick={handleAddSemester} className=' bg-purple-100 text-purple-800 font-medium text-[45%] sm:text-[60%] md:text-[80%] lg:text-[100%] px-2.5 py-0.5 rounded dark:bg-purple-900 dark:text-purple-300'>Add Semester</button><br /><br />
            <button onClick={handleCGPASubmit} className="bg-violet-500 px-2.5 py-0.5 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300 rounded-lg">
              Calculate CGPA
            </button>
            <br />
            <br />
            {isModalVisible && <GPAview title="CGPA" formData={cgpaForms} result={cgpaResult} onClose={handleCloseModal} />}
          </div>
        )}

        <div className='mb-4 text-right text-[85%]'>
          <button onClick={handleReset}>
            Reset
          </button>
        </div>
      </div>
    </div>
  );
};

export default GPACalculator;
