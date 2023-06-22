import ClassResultPage from "../components/Classmatecgpa/ClassResultPage";
import Head from 'next/head';
const classresult = () => {

    return (
        <>
            <Head>
                <title>
                    JNTUH | CLASSMATE CGPA
                </title>
                <meta
                    name="description"
                    content="Check out classmate result particular semester with in a go."
                    key="desc"
                />
            </Head>
            <ClassResultPage />

        </>
    )
}

export default classresult;