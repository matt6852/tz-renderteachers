import React from "react";
import { useGlobalContext} from "./Context";

const Results = () => {
  const {
    listOfTeachers,
    subjectName,
    teachersIds,
    handleapge,
    isLoading,
  } = useGlobalContext();
 

  if (listOfTeachers.length > 0) {
    return (
      <main className="results">
        {listOfTeachers.map((teacher, index) => {
          const {
            photoPathLarge,
            firstName,
            patrName,
            teachingSubjects,
            id,
          } = teacher;

          const { priceRemote } = teachingSubjects[0];

          return (
            <article className="teaher-info card" key={id}>
              <div className="img-container">
                {" "}
                <img
                  className="teacher-img"
                  src={photoPathLarge}
                  alt={firstName}
                />
                <div className="teacer-info-center">
                  <p className="teacher-name">
                    {firstName} {patrName}
                  </p>
                  <p className="teaher-subject">{subjectName}</p>
                  <p className="teacher-price"> от {priceRemote} p </p>{" "}
                </div>
              </div>
            </article>
          );
        })}
        <div className="center">
          {teachersIds.length > listOfTeachers.length ? (
            <button
              disabled={isLoading}
              className="form-item-btn-more"
              onClick={handleapge}
            >
              {" "}
              Загрузить еще
            </button>
          ) : null}
        </div>
        <div className={`${isLoading && "loader"}`}></div>;
      </main>
    );
  }
  return <div className={`${isLoading && "loader"}`}></div>;
};

export default Results;
