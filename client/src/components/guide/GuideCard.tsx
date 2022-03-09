import React from 'react';
import styled, { css } from 'styled-components';
import { useState } from 'react';
import Modal from '../ui/modal/Modal';
import GuideInfo from './GuideInfo';

type StyleProps = {
  id: string;
};

type Props = {
  question: string;
  title: string;
  descriptions: string[];
  answers: string[];
  url: string;
  id: string;
};

const GuideCard: React.FC<Props> = ({
  title,
  question,
  descriptions,
  answers,
  url,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  return (
    <>
      {isModalOpen && (
        <Modal
          className='guide'
          onConfirm={handleCloseModal}
          onCancel={handleCloseModal}
        >
          <GuideInfo
            title={title}
            descriptions={descriptions}
            answers={answers}
            url={url}
          />
        </Modal>
      )}
      <div>
        <GuideCardContainer onClick={handleOpenModal} id={id} />
        <p>{question}</p>
      </div>
    </>
  );
};

export default GuideCard;

const GuideCardContainer = styled.div`
  width: 22rem;
  height: 16rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.4);
  margin: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: 200ms ease-in-out;
  ${({ id }: StyleProps) => css`
    background-image: url('images/${id}_cover.jpg');
  `}
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  &:hover {
    transform: scale(1.03);
  }

  & + p {
    font-size: 1.1rem;
    margin: 0.7rem;
    color: black;
  }
`;
