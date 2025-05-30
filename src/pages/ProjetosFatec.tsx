import { useState } from "react";
import styled from "styled-components";
import Sidebar from "../components/Sidebar";
import {
  SiHtml5,
  SiBootstrap,
  SiCss3,
  SiJavascript,
  SiJquery,
  SiReact,
  SiNodedotjs,
  SiPostgresql,
} from "react-icons/si";

// 1. Importar imagens diretamente
import imgSemestre1 from ".././assets/1° Semestre.jpeg";
import imgHome2Sprint from ".././assets/home_2sprint.jpeg";

const projetos = [
  {
    titulo: "Projeto 1° Semestre 3‑Sprints ABP",
    descricao:
      "Este projeto foi desenvolvido em grupo e teve como objetivo desenvolver um sistema web que ensinasse, de forma teórica e prática, a metodologia ágil Scrum. Foi criada uma página responsiva com conteúdos educativos, questões interativas e a funcionalidade de geração de certificado para os usuários que concluíssem o curso. O sistema foi desenvolvido com HTML, Bootstrap, CSS, JavaScript e jQuery.",
    imagens: [imgSemestre1],
    tecnologias: ["HTML5", "CSS3", "Bootstrap", "JavaScript", "jQuery"],
    icones: [SiHtml5, SiCss3, SiBootstrap, SiJavascript, SiJquery],
  },
  {
    titulo: "Projeto 2° Semestre 3‑Sprints ABP",
    descricao:
      "Esse projeto foi desenvolvido em grupo seguindo a metodologia ágil Scrum. Foi feito um site onde o principal objetivo era criar um sistema de gestão para a empresa Visiona Tecnologia Espacial, com o intuito de facilitar a gestão de projetos e tarefas entre Editor, Revisor e Administrador. O sistema foi desenvolvido em React e Node.js, utilizando o banco de dados PostgreSQL.",
    imagens: [imgHome2Sprint],
    tecnologias: ["React", "Node.js", "PostgreSQL"],
    icones: [SiReact, SiNodedotjs, SiPostgresql],
  },
];

export default function Projetos() {
  return (
    <Wrapper>
      <Sidebar />
      <Content>
        <Title>Projetos Fatec:</Title>
        <Cards>
          {projetos.map((projeto, idx) => (
            <ProjetoCard key={idx}>
              <ImageCarousel images={projeto.imagens} />
              <TextContainer>
                <h2>{projeto.titulo}</h2>
                <p>{projeto.descricao}</p>
                <TecnologiasList>
                  {projeto.tecnologias.map((tech, i) => {
                    const Icon = projeto.icones[i];
                    return (
                      <TecnologiaItem key={tech}>
                        <Icon size={20} />
                        <span>{tech}</span>
                      </TecnologiaItem>
                    );
                  })}
                </TecnologiasList>
              </TextContainer>
            </ProjetoCard>
          ))}
        </Cards>
      </Content>
    </Wrapper>
  );
}

function ImageCarousel({ images }: { images: string[] }) {
  const [idx, setIdx] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const next = () => setIdx((i) => (i + 1) % images.length);
  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);

  return (
    <>
      <ImageWrapper>
        {images.length > 1 && <Arrow onClick={prev}>&lt;</Arrow>}
        <Img src={images[idx]} alt="Projeto" onClick={() => setZoomed(true)} />
        {images.length > 1 && <Arrow onClick={next}>&gt;</Arrow>}
      </ImageWrapper>

      {zoomed && (
        <ZoomModal onClick={() => setZoomed(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <CloseButton onClick={() => setZoomed(false)}>✕</CloseButton>
            {images.length > 1 && (
              <>
                <ModalArrowLeft
                  onClick={(e) => {
                    e.stopPropagation();
                    prev();
                  }}
                >
                  &lt;
                </ModalArrowLeft>
                <ModalArrowRight
                  onClick={(e) => {
                    e.stopPropagation();
                    next();
                  }}
                >
                  &gt;
                </ModalArrowRight>
              </>
            )}
            <ZoomedImage src={images[idx]} alt="Zoomed" />
          </ModalContent>
        </ZoomModal>
      )}
    </>
  );
}

// ==================== ESTILOS ====================

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
  background: #121212;
  color: #fff;
  font-family: 'Segoe UI', sans-serif;
`;

const Content = styled.main`
  flex: 1;
  padding: 60px 40px 60px 170px;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 60px 20px;
  }
`;

const Title = styled.h1`
  margin-bottom: 30px;
  font-size: 2rem;
  color: #00e0ff;
  text-align: center;
`;

const Cards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const ProjetoCard = styled.div`
  display: flex;
  align-items: center;
  background: #1f1f1f;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 0 8px rgba(0, 224, 255, 0.1);
  gap: 30px;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const TextContainer = styled.div`
  flex: 1;
  max-width: 600px;

  h2 {
    color: #00e0ff;
    margin-bottom: 15px;
  }

  p {
    color: #ccc;
    line-height: 1.6;
  }
`;

const TecnologiasList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  margin-top: 20px;
`;

const TecnologiaItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(0, 224, 255, 0.1);
  padding: 8px 15px;
  border-radius: 25px;
  color: #00e0ff;
`;

const ImageWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 250px;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
  }
`;

const Arrow = styled.button`
  background: none;
  border: none;
  color: #00e0ff;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0 10px;
`;

const Img = styled.img`
  width: 250px;
  height: 300px;
  border-radius: 12px;
  border: 2px solid #00e0ff;
  object-fit: cover;
  cursor: zoom-in;
  transition: transform 0.3s;

  &:hover {
    transform: scale(1.02);
  }

  @media (max-width: 768px) {
    width: 100%;
    height: 30vh;
  }
`;

const ZoomModal = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  position: relative;
  max-width: 90%;
  max-height: 90%;
`;

const CloseButton = styled.button`
  position: absolute;
  top: -40px;
  right: -10px;
  background: none;
  border: none;
  color: #00e0ff;
  font-size: 2rem;
`;

const ModalArrow = styled(Arrow)`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  padding: 15px;
`;

const ModalArrowLeft = styled(ModalArrow)`
  left: 20px;
`;

const ModalArrowRight = styled(ModalArrow)`
  right: 20px;
`;

const ZoomedImage = styled.img`
  max-width: 100%;
  max-height: 80vh;
  border-radius: 8px;
  border: 2px solid #00e0ff;
  object-fit: contain;
`;
