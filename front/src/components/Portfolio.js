import React, { useContext, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { UserStateContext } from "../App";
import * as Api from "../api";
import User from "./user/User";
import EducationContainer from "./education/EducationContainer";
import AwardContainer from "./award/AwardContainer";
import ProjectContainer from "./project/ProjectContainer";
import CertificateContainer from "./certificate/CertificateContainer";
import BookmarkButton from "./bookmark/BookmarkButton";
import Spinner from "./spinner/Spinner";
import "./style/app.scss";

function Portfolio() {
  const navigate = useNavigate();
  const params = useParams();

  const [portfolioOwner, setPortfolioOwner] = useState(null);
  const [isFetchCompleted, setIsFetchCompleted] = useState(false);

  const userState = useContext(UserStateContext);

  const fetchPorfolioOwner = async (ownerId) => {
    const res = await Api.get("api/users", ownerId);
    const ownerData = res.data.data;
    setPortfolioOwner(ownerData);
    setIsFetchCompleted(true);
  };

  useEffect(() => {
    if (!userState.user) {
      navigate("/login", { replace: true });
      return;
    }

    if (params.userId) {
      const ownerId = params.userId;
      fetchPorfolioOwner(ownerId);
    } else {
      const ownerId = userState.user.id;
      fetchPorfolioOwner(ownerId);
    }
  }, [params, userState, navigate]);

  if (!isFetchCompleted) {
    return <Spinner />;
  }

  return (
    <div className="portfolio-container">
      <section className="section portfolio-content">
        <div className="title-container">
          <h2 className="portfolio-title">Work Single Page</h2>
          <p className="portfolio-sub-title">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            necessitatibus incidunt ut officiis explicabo inventore.
          </p>
        </div>
        <div className="user-container">
          <User
            portfolioOwnerId={portfolioOwner.id}
            isEditable={portfolioOwner.id === userState.user?.id}
          />
          {userState.user && <BookmarkButton user={portfolioOwner} />}
        </div>

        <div className="mvps-container">
          <div className="mvp-container">
            <EducationContainer
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </div>
          <div className="mvp-container">
            <AwardContainer
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </div>
        </div>

        <div className="mvps-container">
          <div className="mvp-container">
            <CertificateContainer
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </div>
          <div className="mvp-container">
            <Projects
              portfolioOwnerId={portfolioOwner.id}
              isEditable={portfolioOwner.id === userState.user?.id}
            />
          </div>
        </div>
      </section>
    </div>
  );
}

export default Portfolio;
