import ClassResultPage from "../components/Classmatecgpa/ClassResultPage";
import Head from 'next/head';
import Examresultsform from "../components/Examresults/Examresultsform";
const classresult = () => {

    return (
        <>
            <Head>
                <title>
                    JNTUH | EXAM RESULTS
                </title>
                <meta
                    name="description"
                    content="Check out complete entire exams resultso jntuh here."
                    key="desc"
                />
            </Head>
            <Examresultsform />
        </>
    )
}

export default classresult;