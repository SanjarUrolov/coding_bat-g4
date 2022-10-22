import React, { useState } from "react";
//Icons
import { BsTrophy } from "react-icons/bs";
import { FaJava, FaPython, FaRegStar, FaStar } from "react-icons/fa";
import { Alert, AlertTitle, LinearProgress } from "@mui/material";
//Router dom
import { useNavigate, useParams, Link } from "react-router-dom";
//Interfaces
import { HomeProps, Language, Section } from "./types";
//Axios
import { http } from "../../servives";
//Style
import cls from "./home.module.scss";

const Home: React.FC<HomeProps> = () => {
  const navigate = useNavigate();
  const { languageID } = useParams<{ languageID: string }>();
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingSection, setLoadingSection] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);

  React.useEffect(() => {
    http.get(`/language/list-for-users`).then(({ data }) => {
      console.log("data = ", data);
      setLanguages(data.data);
      setLoading(false);
      if (!languageID) navigate(`/${data.data[0].id}`);
      console.log(data.data[0].id);
    });
  }, []);

  React.useEffect(() => {
    setLoadingSection(true);
    http.get(`/section/by-language-id/${languageID}`).then(({ data }) => {
      setSections(data.data);
      setLoadingSection(false);
      console.log(data.data);
      console.log(sections);
    });
  }, [languageID]);

  if (loading) return <LinearProgress color="success" />;

  return (
    <div className={cls.wrapper}>
      <header className={cls.header}>
        <nav className={cls.nav}>
          <div className={cls.codingbat}>
            <h1>
              Coding<span>bat</span>
            </h1>
            <p>Code practice</p>
          </div>
          <ul>
            <li>
              <Link to="about">About</Link>
            </li>

            <li>
              <Link to="help">Help</Link>
            </li>

            <li>
              <Link to="code">Code help+videos</Link>
            </li>

            <li>
              <Link to="done">Done</Link>
            </li>

            <li>
              <Link to="prefs">Prefs</Link>
            </li>
          </ul>
          <div className={cls.sign}>
            <button>Sign In</button>
            <button className={cls.btn}>Sign Up</button>
          </div>
        </nav>
        <div className={cls.navBottom}>
          <div className={cls.languages}>
            <ul>
              {languages.map((language) => {
                return (
                  <li
                    style={
                      languageID == language.id
                        ? { borderBottom: "3px solid #2DB97C" }
                        : {}
                    }
                    key={language.id}
                    onClick={() => navigate(`/${language.id}`)}
                  >
                    {language.title}
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </header>

      {/* //***************************Header section end*********************************** */}
      <main className={cls.main}>
        {loadingSection && (
          <div className={cls.progress}>
            <LinearProgress color="secondary" />
          </div>
        )}
        {sections.length > 0 &&
          sections.map((section) => {
            return (
              <div
                className={cls.box}
                key={section.id}
                onClick={() => navigate(`/section/${section.id}`)}
              >
                <div className={cls.title}>
                  <h2>{section.title}</h2>
                  <span>{section.maxRate}</span>
                </div>
                <p>{section.description}</p>
                <h4>
                  <BsTrophy /> Task
                </h4>
              </div>
            );
          })}
        {/* }) : <Alert severity="success">
         <AlertTitle>Success</AlertTitle>
         This is a success alert — <strong>check it out!</strong>
       </Alert> } */}

        {/* <img className={cls.gif}
            src="https://flevix.com/wp-content/uploads/2021/06/Neon-Loading.gif"
            alt="Loading..."
          />  */}
      </main>
    </div>
  );
};
export default Home;
