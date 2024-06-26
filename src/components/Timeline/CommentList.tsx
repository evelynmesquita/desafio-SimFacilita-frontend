import styled from "styled-components";
import { CommentType } from "../../interfaces/interfaces";
import dayjs from "dayjs";

export default function CommentList({
  commentsData,
}: {
  commentsData: CommentType;
}) {
  const formattedDate = dayjs(commentsData.createdAt).format("DD-MM-YYYY");

  return (
    <CommentContainer>
      <AuthorPost>
        <div>
          <img src={commentsData.User.profileUrl} />
          <h1>{commentsData.User.name}</h1>
          <h1>{commentsData.User.lastName}</h1>
          <h2>{formattedDate}</h2>
        </div>
        <h3>{commentsData.comment}</h3>
      </AuthorPost>
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  background-color: #ffffff;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 10px;
  background-color: #ffffff;
  border: 1px solid #d4d0d0;
`;

const AuthorPost = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;

  div {
    display: flex;
    flex-direction: column;
    margin-left: 20px;
    width: 100%;
    max-width: 100px;
  }

  img {
    width: 50px;
    height: 50px;
    border-radius: 100px;
    border: 2px solid #9acb4b;
    box-shadow: rgba(0, 0, 0, 0.7) 0px 1px 4px;
    margin-bottom: 10px;
  }

  h1 {
    font-size: 15px;
    font-weight: 500;
  }

  h2 {
    margin-top: 5px;
    font-size: 9px;
  }

  h3 {
    width: 100%;
  }
`;
