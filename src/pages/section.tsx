import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { http } from "../servives";
import { Language, Problem } from "./home/types";

interface SectionProps {}

const Section: React.FC<SectionProps> = () => {
 const { sectionID } = useParams<{ sectionID: string }>();
 const [problems, setProblems] = useState<Problem[]>([]);
//  const [loading, setLoading] = useState(true);
//  const [loadingSection, setLoadingSection] = useState(true);

 React.useEffect(() => {
  http.get(`/problem/by-section/${sectionID}`).then(({ data }) => {
    setProblems(data.data);
    console.log(data.data);
  });
}, [sectionID]);
    
    return(

     <div>
      Section sectionID = ${sectionID}
     <ol>
     {problems.map((problem)=>{
        return (
           <li>{problem.description}</li>
          //  <li>{problem.id}</li>
          //  <li>{problem.methodSignature}</li>
          //  <li>{problem.title}</li>
        )
      })}
     </ol>
    </div>
    )
 
  };
export default Section;
